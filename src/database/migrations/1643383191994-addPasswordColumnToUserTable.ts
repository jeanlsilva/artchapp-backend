import {MigrationInterface, QueryRunner} from "typeorm";

export class addPasswordColumnToUserTable1643383191994 implements MigrationInterface {
    name = 'addPasswordColumnToUserTable1643383191994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
