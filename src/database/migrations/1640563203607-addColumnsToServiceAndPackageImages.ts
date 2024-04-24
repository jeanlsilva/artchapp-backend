import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsToServiceAndPackageImages1640563203607 implements MigrationInterface {
    name = 'addColumnsToServiceAndPackageImages1640563203607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_images" ADD "ref" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_images" ADD "main" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_images" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD "ref" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD "main" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD "weight" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_images" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "package_images" DROP COLUMN "main"`);
        await queryRunner.query(`ALTER TABLE "package_images" DROP COLUMN "ref"`);
        await queryRunner.query(`ALTER TABLE "service_images" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "service_images" DROP COLUMN "main"`);
        await queryRunner.query(`ALTER TABLE "service_images" DROP COLUMN "ref"`);
    }

}
