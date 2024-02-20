import { DataSource } from "typeorm"
import { ProviderMigrationEntity1695541143484 } from '../migration-entities/1695541143484-ProviderMigrationEntity'
import { ProductMigrationEntity1695541305494 } from '../migration-entities/1695541305494-ProductMigrationEntity'
import {UserMigrationEntity1696148646221 } from '../migration-entities/1696148646221-UserMigrationEntity';

export const PostgresMigrationDatasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres_admin",
    password: "admin",
    database: "retail-store",
    migrations: [ProviderMigrationEntity1695541143484, ProductMigrationEntity1695541305494, UserMigrationEntity1696148646221]
})