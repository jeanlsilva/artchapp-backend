import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1640530112008 implements MigrationInterface {
    name = 'InitialMigration1640530112008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_types" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ebc3ada3243ba1d6d2eb727a328" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "specialty" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9cf4ae334dc4a1ab1e08956460e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-avatar" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "ref" character varying NOT NULL, "weight" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f2efe104807b7badce33d210395" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "email" character varying(255), "phone" character varying, "description" character varying(500), "vat_number" character varying(15) NOT NULL, "firebase_uid" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roleUuid" uuid, "specialtyId" uuid, "boardId" uuid, "userAvatarUuid" uuid, CONSTRAINT "REL_b614708b689475984e84bb2d78" UNIQUE ("userAvatarUuid"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUuid" uuid, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "description" character varying(500), "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "portfolioId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-address" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userUuid" uuid, CONSTRAINT "REL_fad77c07cf706a6e52a5b05fbf" UNIQUE ("userUuid"), CONSTRAINT "PK_482d9dc6e06cc481be4d74a0230" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_method" character varying(255) NOT NULL, "delivery_address" character varying(255), "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUuid" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "description" character varying(500), "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_308364c66df656295bc4ec467c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, "comment" character varying(500), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUuid" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(1000) NOT NULL, "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" uuid, CONSTRAINT "PK_d99f2c54bf48af54e7952abe0c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package_images" ("id" uuid NOT NULL, "url" character varying(1000) NOT NULL, "description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "packageId" uuid, CONSTRAINT "PK_1fa7be3b95575d35dafe70c7555" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_skills_skill" ("usersUuid" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_eb5407f715f12945bc2de701863" PRIMARY KEY ("usersUuid", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_992f32136bd639ed5a6668fc34" ON "users_skills_skill" ("usersUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_9de18e774763eb53aa1044809d" ON "users_skills_skill" ("skillId") `);
        await queryRunner.query(`CREATE TABLE "purchase_packages" ("purchase" uuid NOT NULL, "package" uuid NOT NULL, CONSTRAINT "PK_182724aaf41f59ab121c1004167" PRIMARY KEY ("purchase", "package"))`);
        await queryRunner.query(`CREATE INDEX "IDX_034daf653fe3b9bfce62cba303" ON "purchase_packages" ("purchase") `);
        await queryRunner.query(`CREATE INDEX "IDX_a32bf2766bafeaee82d6d82795" ON "purchase_packages" ("package") `);
        await queryRunner.query(`CREATE TABLE "package_services_service" ("packageId" uuid NOT NULL, "serviceId" uuid NOT NULL, CONSTRAINT "PK_a24f2e37bb60058642ce00ff96f" PRIMARY KEY ("packageId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_692754d0ae6fad46b8cdb1054b" ON "package_services_service" ("packageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf8cb3b47fbc93646728a599a1" ON "package_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b39d66a4614c9ce63dba591b093" FOREIGN KEY ("roleUuid") REFERENCES "user_types"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1dc69d0524c62da152bc8131539" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6522d5a65fc85cc92081c8aadbc" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b614708b689475984e84bb2d780" FOREIGN KEY ("userAvatarUuid") REFERENCES "user-avatar"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_a193038017a6f87f6a449f7a2bf" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-address" ADD CONSTRAINT "FK_fad77c07cf706a6e52a5b05fbf0" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_c2e348e8a6cffb1a1e5bd44f00b" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_images" ADD CONSTRAINT "FK_16a4a9b1cc823e6d8ec4b0102ab" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_images" ADD CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_skills_skill" ADD CONSTRAINT "FK_992f32136bd639ed5a6668fc348" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_skills_skill" ADD CONSTRAINT "FK_9de18e774763eb53aa1044809d4" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_packages" ADD CONSTRAINT "FK_034daf653fe3b9bfce62cba303f" FOREIGN KEY ("purchase") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_packages" ADD CONSTRAINT "FK_a32bf2766bafeaee82d6d827951" FOREIGN KEY ("package") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package_services_service" ADD CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_cf8cb3b47fbc93646728a599a17"`);
        await queryRunner.query(`ALTER TABLE "package_services_service" DROP CONSTRAINT "FK_692754d0ae6fad46b8cdb1054bb"`);
        await queryRunner.query(`ALTER TABLE "purchase_packages" DROP CONSTRAINT "FK_a32bf2766bafeaee82d6d827951"`);
        await queryRunner.query(`ALTER TABLE "purchase_packages" DROP CONSTRAINT "FK_034daf653fe3b9bfce62cba303f"`);
        await queryRunner.query(`ALTER TABLE "users_skills_skill" DROP CONSTRAINT "FK_9de18e774763eb53aa1044809d4"`);
        await queryRunner.query(`ALTER TABLE "users_skills_skill" DROP CONSTRAINT "FK_992f32136bd639ed5a6668fc348"`);
        await queryRunner.query(`ALTER TABLE "package_images" DROP CONSTRAINT "FK_8d4abd1dd43c5efb211cdade6a2"`);
        await queryRunner.query(`ALTER TABLE "service_images" DROP CONSTRAINT "FK_16a4a9b1cc823e6d8ec4b0102ab"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_c2e348e8a6cffb1a1e5bd44f00b"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_84f381a4c1dd32b1a4faadad480"`);
        await queryRunner.query(`ALTER TABLE "user-address" DROP CONSTRAINT "FK_fad77c07cf706a6e52a5b05fbf0"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_a193038017a6f87f6a449f7a2bf"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_8ae1501aea70855057fb1ca17c0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b614708b689475984e84bb2d780"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6522d5a65fc85cc92081c8aadbc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1dc69d0524c62da152bc8131539"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b39d66a4614c9ce63dba591b093"`);
        await queryRunner.query(`DROP INDEX "IDX_cf8cb3b47fbc93646728a599a1"`);
        await queryRunner.query(`DROP INDEX "IDX_692754d0ae6fad46b8cdb1054b"`);
        await queryRunner.query(`DROP TABLE "package_services_service"`);
        await queryRunner.query(`DROP INDEX "IDX_a32bf2766bafeaee82d6d82795"`);
        await queryRunner.query(`DROP INDEX "IDX_034daf653fe3b9bfce62cba303"`);
        await queryRunner.query(`DROP TABLE "purchase_packages"`);
        await queryRunner.query(`DROP INDEX "IDX_9de18e774763eb53aa1044809d"`);
        await queryRunner.query(`DROP INDEX "IDX_992f32136bd639ed5a6668fc34"`);
        await queryRunner.query(`DROP TABLE "users_skills_skill"`);
        await queryRunner.query(`DROP TABLE "package_images"`);
        await queryRunner.query(`DROP TABLE "service_images"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "package"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "user-address"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user-avatar"`);
        await queryRunner.query(`DROP TABLE "specialty"`);
        await queryRunner.query(`DROP TABLE "user_types"`);
    }

}
