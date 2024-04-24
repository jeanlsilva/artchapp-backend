import {MigrationInterface, QueryRunner} from "typeorm";

export class AddServiceTagsTable1649100362662 implements MigrationInterface {
    name = 'AddServiceTagsTable1649100362662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service-tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a0b918f303f7a857d7ddf7ff4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service-tags_services_service" ("serviceTagsId" uuid NOT NULL, "serviceId" uuid NOT NULL, CONSTRAINT "PK_8b798bb231d1e6e7751aea86329" PRIMARY KEY ("serviceTagsId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_049fc5ba03311c0be5cd11aca0" ON "service-tags_services_service" ("serviceTagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e656ee278b6939cc4ce408037" ON "service-tags_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "service-tags_services_service" ADD CONSTRAINT "FK_049fc5ba03311c0be5cd11aca0e" FOREIGN KEY ("serviceTagsId") REFERENCES "service-tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service-tags_services_service" ADD CONSTRAINT "FK_5e656ee278b6939cc4ce4080372" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service-tags_services_service" DROP CONSTRAINT "FK_5e656ee278b6939cc4ce4080372"`);
        await queryRunner.query(`ALTER TABLE "service-tags_services_service" DROP CONSTRAINT "FK_049fc5ba03311c0be5cd11aca0e"`);
        await queryRunner.query(`DROP INDEX "IDX_5e656ee278b6939cc4ce408037"`);
        await queryRunner.query(`DROP INDEX "IDX_049fc5ba03311c0be5cd11aca0"`);
        await queryRunner.query(`DROP TABLE "service-tags_services_service"`);
        await queryRunner.query(`DROP TABLE "service-tags"`);
    }

}
