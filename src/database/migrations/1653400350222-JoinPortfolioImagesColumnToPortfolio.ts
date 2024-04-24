import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinPortfolioImagesColumnToPortfolio1653400350222 implements MigrationInterface {
    name = 'JoinPortfolioImagesColumnToPortfolio1653400350222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(1000) NOT NULL, "ref" character varying(1000) NOT NULL, "main" boolean NOT NULL, "weight" integer NOT NULL, "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "portfolioId" uuid, CONSTRAINT "PK_4fb584b54f9368be1a6612a4e83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "portfolioImagesId" uuid`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "UQ_779632f065d2ea28276883432b8" UNIQUE ("portfolioImagesId")`);
        await queryRunner.query(`ALTER TABLE "portfolio_images" ADD CONSTRAINT "FK_be3f7681f30a65af82d0a350309" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_779632f065d2ea28276883432b8" FOREIGN KEY ("portfolioImagesId") REFERENCES "portfolio_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "portfolio_images" DROP CONSTRAINT "FK_be3f7681f30a65af82d0a350309"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "UQ_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "portfolioImagesId"`);
        await queryRunner.query(`DROP TABLE "portfolio_images"`);
    }

}
