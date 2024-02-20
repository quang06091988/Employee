import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Price } from './entities/price.entity'
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Price])],
    providers: [PricesService],
    controllers: [PricesController]
})
export class PricesModule {}
