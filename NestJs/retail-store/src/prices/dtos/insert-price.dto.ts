import { IsNumber } from 'class-validator';

export class InsertPriceDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    providerId: number;

    @IsNumber()
    importPricePerWholesaleUnit: number;
}