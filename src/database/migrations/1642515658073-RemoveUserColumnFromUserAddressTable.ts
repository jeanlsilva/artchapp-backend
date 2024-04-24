import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUserColumnFromUserAddressTable1642515658073 implements MigrationInterface {
    name = 'RemoveUserColumnFromUserAddressTable1642515658073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address" DROP CONSTRAINT "FK_fad77c07cf706a6e52a5b05fbf0"`);
        await queryRunner.query(`ALTER TABLE "user-address" DROP CONSTRAINT "REL_fad77c07cf706a6e52a5b05fbf"`);
        await queryRunner.query(`ALTER TABLE "user-address" DROP COLUMN "userUuid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-address" ADD "userUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "user-address" ADD CONSTRAINT "REL_fad77c07cf706a6e52a5b05fbf" UNIQUE ("userUuid")`);
        await queryRunner.query(`ALTER TABLE "user-address" ADD CONSTRAINT "FK_fad77c07cf706a6e52a5b05fbf0" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
