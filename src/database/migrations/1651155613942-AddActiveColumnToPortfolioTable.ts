import {MigrationInterface, QueryRunner} from "typeorm";

export class AddActiveColumnToPortfolioTable1651155613942 implements MigrationInterface {
    name = 'AddActiveColumnToPortfolioTable1651155613942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "active"`);
    }

}
