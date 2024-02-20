import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
const cookieSession = require('cookie-session');
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatasource } from './datasources/postgres.datasource';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { PricesModule } from './prices/prices.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: PostgresDatasource}),
    ProductsModule,
    ProvidersModule,
    PricesModule,
    UsersModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({ keys: ['abcdefgh'] })
    ).forRoutes('*');
  }
}
