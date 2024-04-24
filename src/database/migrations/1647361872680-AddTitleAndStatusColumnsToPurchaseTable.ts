import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTitleAndStatusColumnsToPurchaseTable1647361872680 implements MigrationInterface {
    name = 'AddTitleAndStatusColumnsToPurchaseTable1647361872680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ADD "title" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "finished" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "finished"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "title"`);
    }

}
