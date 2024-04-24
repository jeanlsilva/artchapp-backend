import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserRelationshipToPackageTable1651167132895 implements MigrationInterface {
    name = 'AddUserRelationshipToPackageTable1651167132895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" ADD "userUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "package" ADD CONSTRAINT "FK_25ad6aeb52918b25da66966d563" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package" DROP CONSTRAINT "FK_25ad6aeb52918b25da66966d563"`);
        await queryRunner.query(`ALTER TABLE "package" DROP COLUMN "userUuid"`);
    }

}
