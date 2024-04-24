import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAddressColumnToUserTable1642513905499 implements MigrationInterface {
    name = 'AddAddressColumnToUserTable1642513905499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userAddressUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f65da5204a9a321e7fb9e9cb200" UNIQUE ("userAddressUuid")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200" FOREIGN KEY ("userAddressUuid") REFERENCES "user-address"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f65da5204a9a321e7fb9e9cb200"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f65da5204a9a321e7fb9e9cb200"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userAddressUuid"`);
    }

}
