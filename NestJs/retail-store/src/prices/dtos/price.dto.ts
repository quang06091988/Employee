import { Expose } from 'class-transformer';

export class PriceDto {
    @Expose()
    id: number;
    @Expose()
    productId: number;
    @Expose()
    providerId: number;
    @Expose()
    importPricePerWholesaleUnit: number;

    @Expose()
    productName: string;
    @Expose()
    providerName: string;
    @Expose()
    productSellPricePerRetailUnit: number;
    @Expose()
    importPricePerRetailUnit: number;
    @Expose()
    profitPricePerRetailUnit: number;
}