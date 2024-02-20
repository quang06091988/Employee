import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { Provider } from '../../providers/entities/provider.entity'
import { Product } from '../../products/entities/product.entity'

@Entity()
@Unique(["provider", "product"])
export class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.prices)
    product: Product;
    @Column()
    productId: number;

    @ManyToOne(() => Provider, (provider) => provider.prices)
    provider: Provider;
    @Column()
    providerId: number;

    @Column()
    importPricePerWholesaleUnit: number;
}