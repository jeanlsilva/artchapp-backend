import {MigrationInterface, QueryRunner} from "typeorm";

export class AddActiveColumnToPackageTable1651152467360 implements MigrationInterface {
    name = 'AddActiveColumnToPackageTable1651152467360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" ADD "active" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "active"`);
    }

}
