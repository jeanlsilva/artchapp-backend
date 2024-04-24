import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageRelationToServiceAndPackageTables1648578159433 implements MigrationInterface {
    name = 'AddImageRelationToServiceAndPackageTables1648578159433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" ADD "packageImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "UQ_e1aea836f0ff17a8a3d6b3ffa50" UNIQUE ("packageImageId")`);
        await queryRunner.query(`ALTER TABLE "service" ADD "serviceImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "UQ_1c7ef6a2b860ee40dd0efd1b4bc" UNIQUE ("serviceImageId")`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50" FOREIGN KEY ("packageImageId") REFERENCES "package_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_1c7ef6a2b860ee40dd0efd1b4bc" FOREIGN KEY ("serviceImageId") REFERENCES "service_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_1c7ef6a2b860ee40dd0efd1b4bc"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "UQ_1c7ef6a2b860ee40dd0efd1b4bc"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "serviceImageId"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "UQ_e1aea836f0ff17a8a3d6b3ffa50"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "packageImageId"`);
    }

}
