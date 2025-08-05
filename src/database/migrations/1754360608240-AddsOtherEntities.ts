import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsOtherEntities1754360608240 implements MigrationInterface {
    name = 'AddsOtherEntities1754360608240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "courseId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."video_quality_enum" AS ENUM('144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p')`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quality" "public"."video_quality_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "lessonIdId" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_authored_courses_course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_3090f3128244e7f7cb63cddb3e8" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eaf596a913ff3964fe7613f9dc" ON "user_authored_courses_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac30712cb65f9e77dab364bac3" ON "user_authored_courses_course" ("courseId") `);
        await queryRunner.query(`CREATE TABLE "user_enrolled_courses_course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_042007bd22db48b784dbc7e2f85" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9617733bbbd3615212e56b9d11" ON "user_enrolled_courses_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e95acf471c57298669e2f83a13" ON "user_enrolled_courses_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "course" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_e4296007dc83a534a0597fbaa6c" FOREIGN KEY ("lessonIdId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_authored_courses_course" ADD CONSTRAINT "FK_eaf596a913ff3964fe7613f9dc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_authored_courses_course" ADD CONSTRAINT "FK_ac30712cb65f9e77dab364bac31" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_enrolled_courses_course" ADD CONSTRAINT "FK_9617733bbbd3615212e56b9d119" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_enrolled_courses_course" ADD CONSTRAINT "FK_e95acf471c57298669e2f83a13a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_enrolled_courses_course" DROP CONSTRAINT "FK_e95acf471c57298669e2f83a13a"`);
        await queryRunner.query(`ALTER TABLE "user_enrolled_courses_course" DROP CONSTRAINT "FK_9617733bbbd3615212e56b9d119"`);
        await queryRunner.query(`ALTER TABLE "user_authored_courses_course" DROP CONSTRAINT "FK_ac30712cb65f9e77dab364bac31"`);
        await queryRunner.query(`ALTER TABLE "user_authored_courses_course" DROP CONSTRAINT "FK_eaf596a913ff3964fe7613f9dc5"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_e4296007dc83a534a0597fbaa6c"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e95acf471c57298669e2f83a13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9617733bbbd3615212e56b9d11"`);
        await queryRunner.query(`DROP TABLE "user_enrolled_courses_course"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac30712cb65f9e77dab364bac3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaf596a913ff3964fe7613f9dc"`);
        await queryRunner.query(`DROP TABLE "user_authored_courses_course"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TYPE "public"."video_quality_enum"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
    }

}
