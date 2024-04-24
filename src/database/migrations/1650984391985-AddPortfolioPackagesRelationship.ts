import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPortfolioPackagesRelationship1650984391985 implements MigrationInterface {
    name = 'AddPortfolioPackagesRelationship1650984391985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "package-tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f05b2dacd99fd57280e263cee1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio-tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e033c37ee8b2b8a3ed2ad94a29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package-tag_packages_package" ("packageTagId" uuid NOT NULL, "packageId" uuid NOT NULL, CONSTRAINT "PK_a6974c2e30338e98a1f5db56582" PRIMARY KEY ("packageTagId", "packageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dde940bcb4490a5e8a36be5d02" ON "package-tag_packages_package" ("packageTagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_036d1410efd80fee9574962264" ON "package-tag_packages_package" ("packageId") `);
        await queryRunner.query(`CREATE TABLE "portfolio-tags_portfolios_portfolio" ("portfolioTagsId" uuid NOT NULL, "portfolioId" uuid NOT NULL, CONSTRAINT "PK_edfd81da1d2b166e1bdd00e3b98" PRIMARY KEY ("portfolioTagsId", "portfolioId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6b91119a1c934f1c9f065e532c" ON "portfolio-tags_portfolios_portfolio" ("portfolioTagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_00e19ca7139d55e093e381f678" ON "portfolio-tags_portfolios_portfolio" ("portfolioId") `);
        await queryRunner.query(`CREATE TABLE "portfolio_packages" ("portfolio" uuid NOT NULL, "package" uuid NOT NULL, CONSTRAINT "PK_94fbb52503223ec53d369cf2dc8" PRIMARY KEY ("portfolio", "package"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9562e89accc4d8e997c4eee053" ON "portfolio_packages" ("portfolio") `);
        await queryRunner.query(`CREATE INDEX "IDX_75c7ed1841a05fd27a5a466a7a" ON "portfolio_packages" ("package") `);
        await queryRunner.query(`ALTER TABLE "package-tag_packages_package" ADD CONSTRAINT "FK_dde940bcb4490a5e8a36be5d027" FOREIGN KEY ("packageTagId") REFERENCES "package-tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package-tag_packages_package" ADD CONSTRAINT "FK_036d1410efd80fee9574962264f" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio-tags_portfolios_portfolio" ADD CONSTRAINT "FK_6b91119a1c934f1c9f065e532cf" FOREIGN KEY ("portfolioTagsId") REFERENCES "portfolio-tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio-tags_portfolios_portfolio" ADD CONSTRAINT "FK_00e19ca7139d55e093e381f6787" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages" ADD CONSTRAINT "FK_9562e89accc4d8e997c4eee0535" FOREIGN KEY ("portfolio") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages" ADD CONSTRAINT "FK_75c7ed1841a05fd27a5a466a7a4" FOREIGN KEY ("package") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio_packages" DROP CONSTRAINT "FK_75c7ed1841a05fd27a5a466a7a4"`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages" DROP CONSTRAINT "FK_9562e89accc4d8e997c4eee0535"`);
        await queryRunner.query(`ALTER TABLE "portfolio-tags_portfolios_portfolio" DROP CONSTRAINT "FK_00e19ca7139d55e093e381f6787"`);
        await queryRunner.query(`ALTER TABLE "portfolio-tags_portfolios_portfolio" DROP CONSTRAINT "FK_6b91119a1c934f1c9f065e532cf"`);
        await queryRunner.query(`ALTER TABLE "package-tag_packages_package" DROP CONSTRAINT "FK_036d1410efd80fee9574962264f"`);
        await queryRunner.query(`ALTER TABLE "package-tag_packages_package" DROP CONSTRAINT "FK_dde940bcb4490a5e8a36be5d027"`);
        await queryRunner.query(`DROP INDEX "IDX_75c7ed1841a05fd27a5a466a7a"`);
        await queryRunner.query(`DROP INDEX "IDX_9562e89accc4d8e997c4eee053"`);
        await queryRunner.query(`DROP TABLE "portfolio_packages"`);
        await queryRunner.query(`DROP INDEX "IDX_00e19ca7139d55e093e381f678"`);
        await queryRunner.query(`DROP INDEX "IDX_6b91119a1c934f1c9f065e532c"`);
        await queryRunner.query(`DROP TABLE "portfolio-tags_portfolios_portfolio"`);
        await queryRunner.query(`DROP INDEX "IDX_036d1410efd80fee9574962264"`);
        await queryRunner.query(`DROP INDEX "IDX_dde940bcb4490a5e8a36be5d02"`);
        await queryRunner.query(`DROP TABLE "package-tag_packages_package"`);
        await queryRunner.query(`DROP TABLE "portfolio-tags"`);
        await queryRunner.query(`DROP TABLE "package-tag"`);
    }

}
