import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '../products/entities/product.entity'
import { Provider } from '../providers/entities/provider.entity'
import { Price } from '../prices/entities/price.entity'
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostgresDatasource implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres_admin",
        password: "admin",
        database: "retail-store",
        entities: [Product, Provider, Price, User],
        synchronize: true
    };
  }
}