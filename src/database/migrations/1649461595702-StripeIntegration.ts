import {MigrationInterface, QueryRunner} from "typeorm";

export class StripeIntegration1649461595702 implements MigrationInterface {
    name = 'StripeIntegration1649461595702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" ADD "stripe_price_id" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "stripe_id" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stripe_id"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "stripe_price_id"`);
    }

}
