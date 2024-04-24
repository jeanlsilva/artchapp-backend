import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinTableToPackagePortfolioRelation1651057479051 implements MigrationInterface {
    name = 'AddJoinTableToPackagePortfolioRelation1651057479051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio_packages_package" ("portfolioId" uuid NOT NULL, "packageId" uuid NOT NULL, CONSTRAINT "PK_d5b83a3ea3f3331b26529cd0554" PRIMARY KEY ("portfolioId", "packageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79f7ef85c3ce5629892077e4a6" ON "portfolio_packages_package" ("portfolioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_32a14569651cae59017b1d821a" ON "portfolio_packages_package" ("packageId") `);
        await queryRunner.query(`CREATE TABLE "package_portfolios_portfolio" ("packageId" uuid NOT NULL, "portfolioId" uuid NOT NULL, CONSTRAINT "PK_c4f779d039aa60291b35167088f" PRIMARY KEY ("packageId", "portfolioId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8c5d3f65b7b1e0eae49cc8721" ON "package_portfolios_portfolio" ("packageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1808b4e46869c498ed850029dd" ON "package_portfolios_portfolio" ("portfolioId") `);
        await queryRunner.query(`ALTER TABLE "portfolio_packages_package" ADD CONSTRAINT "FK_79f7ef85c3ce5629892077e4a6f" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages_package" ADD CONSTRAINT "FK_32a14569651cae59017b1d821a8" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_portfolios_portfolio" ADD CONSTRAINT "FK_d8c5d3f65b7b1e0eae49cc8721a" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_portfolios_portfolio" ADD CONSTRAINT "FK_1808b4e46869c498ed850029ddf" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_portfolios_portfolio" DROP CONSTRAINT "FK_1808b4e46869c498ed850029ddf"`);
        await queryRunner.query(`ALTER TABLE "package_portfolios_portfolio" DROP CONSTRAINT "FK_d8c5d3f65b7b1e0eae49cc8721a"`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages_package" DROP CONSTRAINT "FK_32a14569651cae59017b1d821a8"`);
        await queryRunner.query(`ALTER TABLE "portfolio_packages_package" DROP CONSTRAINT "FK_79f7ef85c3ce5629892077e4a6f"`);
        await queryRunner.query(`DROP INDEX "IDX_1808b4e46869c498ed850029dd"`);
        await queryRunner.query(`DROP INDEX "IDX_d8c5d3f65b7b1e0eae49cc8721"`);
        await queryRunner.query(`DROP TABLE "package_portfolios_portfolio"`);
        await queryRunner.query(`DROP INDEX "IDX_32a14569651cae59017b1d821a"`);
        await queryRunner.query(`DROP INDEX "IDX_79f7ef85c3ce5629892077e4a6"`);
        await queryRunner.query(`DROP TABLE "portfolio_packages_package"`);
    }

}
