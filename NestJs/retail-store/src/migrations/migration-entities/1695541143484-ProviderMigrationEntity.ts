import { MigrationInterface, QueryRunner } from "typeorm"

export class ProviderMigrationEntity1695541143484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "provider"("name") VALUES ('Uyên'), ('Quân')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "provider"("name") VALUES ('Uyên'), ('Quân')`
        )
    }

}
