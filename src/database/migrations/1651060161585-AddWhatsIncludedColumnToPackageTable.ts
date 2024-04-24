import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWhatsIncludedColumnToPackageTable1651060161585 implements MigrationInterface {
    name = 'AddWhatsIncludedColumnToPackageTable1651060161585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" ADD "whatsIncluded" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "whatsIncluded"`);
    }

}
