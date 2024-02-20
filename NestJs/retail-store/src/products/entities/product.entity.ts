import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity'
import { Price } from '../../prices/entities/price.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    @Column()
    wholesaleUnit: string;

    @Column()
    retailUnit: string;

    @Column()
    numberOfRetailUnitPerWholesaleUnit: number;

    @Column()
    sellPricePerRetailUnit: number;

    @OneToMany(() => Price, (price) => price.product)
    prices: Price[];
}