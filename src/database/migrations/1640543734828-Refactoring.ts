import {MigrationInterface, QueryRunner} from "typeorm";

export class Refactoring1640543734828 implements MigrationInterface {
    name = 'Refactoring1640543734828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package_services" ("package" uuid NOT NULL, "service" uuid NOT NULL, CONSTRAINT "PK_5c1d492adbaf7130c142af3dfb2" PRIMARY KEY ("package", "service"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d7428522426704d006816cbb0" ON "package_services" ("package") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb8b0ec8fe1db2c45df763144d" ON "package_services" ("service") `);
        await queryRunner.query(`ALTER TABLE "package_services" ADD CONSTRAINT "FK_7d7428522426704d006816cbb03" FOREIGN KEY ("package") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_services" ADD CONSTRAINT "FK_cb8b0ec8fe1db2c45df763144dc" FOREIGN KEY ("service") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_services" DROP CONSTRAINT "FK_cb8b0ec8fe1db2c45df763144dc"`);
        await queryRunner.query(`ALTER TABLE "package_services" DROP CONSTRAINT "FK_7d7428522426704d006816cbb03"`);
        await queryRunner.query(`DROP INDEX "IDX_cb8b0ec8fe1db2c45df763144d"`);
        await queryRunner.query(`DROP INDEX "IDX_7d7428522426704d006816cbb0"`);
        await queryRunner.query(`DROP TABLE "package_services"`);
    }

}
