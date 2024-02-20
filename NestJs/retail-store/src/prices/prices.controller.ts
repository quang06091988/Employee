import { Controller, UseGuards, Post, Get, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { AuthGuard } from '../shared-features/auth.guard';
import { PricesService } from './prices.service';
import { InsertPriceDto } from './dtos/insert-price.dto';
import { UpdatePriceDto } from './dtos/update-price.dto';
import { RemovePriceDto } from './dtos/remove-price-dto';
import { FindPricesDto } from './dtos/find-prices.dto';
import { TransformResponse } from '../shared-features/transform.interceptor';
import { PriceDto } from './dtos/price.dto';

@Controller('prices')
@UseGuards(AuthGuard)
@TransformResponse(PriceDto)
export class PricesController {
    constructor(private service: PricesService) {}
    
    @Post()
    insertPrice(@Body() insertPrice: InsertPriceDto) {
        return this.service.insertPrice(insertPrice);
    }

    @Put()
    updatePrice(@Body() updatePrice: UpdatePriceDto) {
        return this.service.updatePrice(updatePrice);
    }

    @Delete()
    removePrice(@Body() removePrice: RemovePriceDto) {
        return this.service.removePrice(removePrice)
    }

    @Get()
    findPrices(@Body() findPrices: FindPricesDto) {
        return this.service.findPrices(findPrices);
    }

    @Get('/caculate-profit-per-retail-unit/:productId')
    caculateProfitPerRetailUnit(@Param('productId') productId) {
        return this.service.caculateProfitPerRetailUnit(productId);
    }
}
