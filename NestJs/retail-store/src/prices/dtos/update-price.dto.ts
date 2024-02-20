import { IsNumber } from 'class-validator';

export class UpdatePriceDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    providerId: number;

    @IsNumber()
    importPricePerWholesaleUnit: number;
}