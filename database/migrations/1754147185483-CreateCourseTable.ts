import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable1754147185483 implements MigrationInterface {
    name = 'CreateCourseTable1754147185483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subtitle" character varying, "description" character varying NOT NULL, "audience" text array NOT NULL, "learningOutcomes" text array NOT NULL, "requirements" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
