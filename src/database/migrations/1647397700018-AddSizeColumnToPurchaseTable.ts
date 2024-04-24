import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSizeColumnToPurchaseTable1647397700018 implements MigrationInterface {
    name = 'AddSizeColumnToPurchaseTable1647397700018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ADD "size" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "payment_method" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "payment_method" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "size"`);
    }

}
