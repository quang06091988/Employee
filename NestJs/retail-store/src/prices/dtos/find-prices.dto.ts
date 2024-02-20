import { IsNumber, ValidateIf, isDefined } from 'class-validator';

export class FindPricesDto {
    @ValidateIf(object => isDefined(object.productId))
    @IsNumber()
    productId: number;

    @ValidateIf(object => isDefined(object.providerId))
    @IsNumber()
    providerId: number;
}