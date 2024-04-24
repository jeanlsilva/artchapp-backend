import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPackageImagesTableIdColumn1648737500054 implements MigrationInterface {
  name = 'AlterPackageImagesTableIdColumn1648737500054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "package_images" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service_images" ALTER COLUMN "id" DROP DEFAULT`);
  }
}
