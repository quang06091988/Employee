import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductMigrationEntity1695541305494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "product"("name", "wholesaleUnit", "retailUnit", "numberOfRetailUnitPerWholesaleUnit", "sellPricePerRetailUnit") 
            VALUES ('Hộp Cơm', 'Thùng', 'Cây', 4, 44), ('Hộp Xôi', 'Thùng', 'Cây', 4, 34)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "product"("name", "wholesaleUnit", "retailUnit", "numberOfRetailUnitPerWholesaleUnit", "sellPricePerRetailUnit") 
            VALUES ('Hộp Cơm', 'Thùng', 'Cây', 4, 44), ('Hộp Xôi', 'Thùng', 'Cây', 4, 34)`
        )
    }

}
