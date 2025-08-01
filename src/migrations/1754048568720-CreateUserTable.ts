import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1754048568720 implements MigrationInterface {
    name = 'CreateUserTable1754048568720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('instructor', 'student')`);
        await queryRunner.query(`CREATE TYPE "public"."user_authprovider_enum" AS ENUM('google', 'credentials')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'student', "authProvider" "public"."user_authprovider_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_authprovider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
