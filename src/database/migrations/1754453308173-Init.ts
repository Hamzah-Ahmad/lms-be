import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754453308173 implements MigrationInterface {
    name = 'Init1754453308173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('instructor', 'student')`);
        await queryRunner.query(`CREATE TYPE "public"."user_authprovider_enum" AS ENUM('google', 'credentials')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'student', "authProvider" "public"."user_authprovider_enum" NOT NULL DEFAULT 'credentials', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subtitle" character varying, "description" character varying NOT NULL, "audience" text array NOT NULL, "learningOutcomes" text array NOT NULL, "requirements" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "courseId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."video_quality_enum" AS ENUM('144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p')`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quality" "public"."video_quality_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "lessonIdId" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_authored_courses_course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_3090f3128244e7f7cb63cddb3e8" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eaf596a913ff3964fe7613f9dc" ON "user_authored_courses_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac30712cb65f9e77dab364bac3" ON "user_authored_courses_course" ("courseId") `);
        await queryRunner.query(`CREATE TABLE "user_enrolled_courses_course" ("userId" uuid NOT NULL, "courseId" uuid NOT NULL, CONSTRAINT "PK_042007bd22db48b784dbc7e2f85" PRIMARY KEY ("userId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9617733bbbd3615212e56b9d11" ON "user_enrolled_courses_course" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e95acf471c57298669e2f83a13" ON "user_enrolled_courses_course" ("courseId") `);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_e95acf471c57298669e2f83a13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9617733bbbd3615212e56b9d11"`);
        await queryRunner.query(`DROP TABLE "user_enrolled_courses_course"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac30712cb65f9e77dab364bac3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaf596a913ff3964fe7613f9dc"`);
        await queryRunner.query(`DROP TABLE "user_authored_courses_course"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TYPE "public"."video_quality_enum"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_authprovider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
