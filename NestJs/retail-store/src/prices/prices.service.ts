import { Injectable, BadRequestException, NotFoundException, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { InsertPriceDto } from './dtos/insert-price.dto';
import { UpdatePriceDto } from './dtos/update-price.dto';
import { RemovePriceDto } from './dtos/remove-price-dto';
import { FindPricesDto } from './dtos/find-prices.dto';

@Injectable()
export class PricesService {
    constructor(@InjectRepository(Price) private repository: Repository<Price>) {}
    
    private findPriceByProductIdAndProviderId(productId, providerId) {
        return this.repository.findOneBy({productId, providerId});
    }
    private findPricesByProductId(productId) {
        return this.repository.findBy({productId});
    }

    async insertPrice(insertPrice: InsertPriceDto) {
        const reqPrice = await this.findPriceByProductIdAndProviderId(insertPrice.productId, insertPrice.providerId);
        if(reqPrice) {
            throw new BadRequestException("productId & providerId haved exists");
        }
                
        const newPrice = this.repository.create(insertPrice);
        return this.repository.save(newPrice);
    }

    async updatePrice(updatePrice: UpdatePriceDto) {
        const reqPrice = await this.findPriceByProductIdAndProviderId(updatePrice.productId, updatePrice.providerId);
        if(!reqPrice) {
            throw new NotFoundException("productId & providerId haven't exists");
        }
        
        reqPrice.importPricePerWholesaleUnit = updatePrice.importPricePerWholesaleUnit;
        return this.repository.save(reqPrice);
    }

    async removePrice(removePrice: RemovePriceDto) {
        const reqPrice = await this.findPriceByProductIdAndProviderId(removePrice.productId, removePrice.providerId);
        if(!reqPrice) {
            throw new NotFoundException("productId & providerId haven't exists");
        }

        return this.repository.remove(reqPrice);
    } 

    async findPrices(findPrices: FindPricesDto) {
        const prices = await this.repository.findBy(findPrices);
        return prices;
    }

    async caculateProfitPerRetailUnit(productId) {
        const reqPrices = await this.findPricesByProductId(productId);
        if(!reqPrices.length) {
            throw new NotFoundException("productId haven't exists");
        }

        const prices = await this.repository
        .createQueryBuilder("price")
        .select("product.name", "productName")
        .addSelect("provider.name", "providerName")
        .addSelect("product.sellPricePerRetailUnit", "productSellPricePerRetailUnit")
        .addSelect("price.importPricePerWholesaleUnit / product.numberOfRetailUnitPerWholesaleUnit", "importPricePerRetailUnit")
        .addSelect("product.sellPricePerRetailUnit - (price.importPricePerWholesaleUnit / product.numberOfRetailUnitPerWholesaleUnit)", "profitPricePerRetailUnit")
        .leftJoin("price.provider", "provider")
        .leftJoin("price.product", "product")
        .where("price.productId = :productId", { productId })
        .getRawMany();
        return prices;
    }
}