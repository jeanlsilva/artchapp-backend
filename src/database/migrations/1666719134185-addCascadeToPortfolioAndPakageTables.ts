import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeToPortfolioAndPakageTables1666719134185 implements MigrationInterface {
    name = 'addCascadeToPortfolioAndPakageTables1666719134185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_25ad6aeb52918b25da66966d563"`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_779632f065d2ea28276883432b8" FOREIGN KEY ("portfolioImagesId") REFERENCES "portfolio_images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_25ad6aeb52918b25da66966d563" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_25ad6aeb52918b25da66966d563"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0"`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_25ad6aeb52918b25da66966d563" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_779632f065d2ea28276883432b8" FOREIGN KEY ("portfolioImagesId") REFERENCES "portfolio_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
