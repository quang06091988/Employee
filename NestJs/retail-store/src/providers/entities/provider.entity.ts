import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Product } from '../../products/entities/product.entity'
import { Price } from '../../prices/entities/price.entity'

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    @OneToMany(() => Price, (price) => price.provider)
    prices: Price[];
}