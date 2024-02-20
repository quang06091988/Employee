import { IsNumber } from 'class-validator';

export class RemovePriceDto {
    @IsNumber()
    productId: number;
    
    @IsNumber()
    providerId: number;
}