import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyPurchaseTable1647342972199 implements MigrationInterface {
    name = 'ModifyPurchaseTable1647342972199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ADD "packageId" uuid`);
        await queryRunner.query(`ALTER TABLE "specialty" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "specialty" ADD "slug" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "vat_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_03cf969a67995601346892e6e16" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_03cf969a67995601346892e6e16"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "vat_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specialty" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "specialty" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "packageId"`);
    }

}
