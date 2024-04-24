import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeToPortfolioImagesPortfolio1666721029563 implements MigrationInterface {
    name = 'addCascadeToPortfolioImagesPortfolio1666721029563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_images" DROP CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2"`);
        await queryRunner.query(`ALTER TABLE "portfolio_images" DROP CONSTRAINT "FK_be3f7681f30a65af82d0a350309"`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_images" ADD CONSTRAINT "FK_be3f7681f30a65af82d0a350309" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_images" DROP CONSTRAINT "FK_be3f7681f30a65af82d0a350309"`);
        await queryRunner.query(`ALTER TABLE "package_images" DROP CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2"`);
        await queryRunner.query(`ALTER TABLE "portfolio_images" ADD CONSTRAINT "FK_be3f7681f30a65af82d0a350309" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
