import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugColumnToSpecialtyTable1645633551688 implements MigrationInterface {
  name = 'AddSlugColumnToSpecialtyTable1645633551688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "specialty" ADD "slug" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "specialty" DROP COLUMN "slug"`);
  }
}
