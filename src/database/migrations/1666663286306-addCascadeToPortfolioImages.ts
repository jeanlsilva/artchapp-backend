import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeToPortfolioImages1666663286306 implements MigrationInterface {
    name = 'addCascadeToPortfolioImages1666663286306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b614708b689475984e84bb2d780"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b614708b689475984e84bb2d780" FOREIGN KEY ("userAvatarUuid") REFERENCES "user-avatar"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200" FOREIGN KEY ("userAddressUuid") REFERENCES "user-address"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_779632f065d2ea28276883432b8" FOREIGN KEY ("portfolioImagesId") REFERENCES "portfolio_images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50" FOREIGN KEY ("packageImageId") REFERENCES "package_images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480"`);
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_779632f065d2ea28276883432b8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b614708b689475984e84bb2d780"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_e1aea836f0ff17a8a3d6b3ffa50" FOREIGN KEY ("packageImageId") REFERENCES "package_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_779632f065d2ea28276883432b8" FOREIGN KEY ("portfolioImagesId") REFERENCES "portfolio_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200" FOREIGN KEY ("userAddressUuid") REFERENCES "user-address"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b614708b689475984e84bb2d780" FOREIGN KEY ("userAvatarUuid") REFERENCES "user-avatar"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
