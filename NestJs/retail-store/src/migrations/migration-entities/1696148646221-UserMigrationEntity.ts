import { MigrationInterface, QueryRunner } from "typeorm"

export class UserMigrationEntity1696148646221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "user"("username", "password") VALUES ('quang', '12345678')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "user"("username", "password") VALUES ('quang', '12345678')`
        )
    }
}
