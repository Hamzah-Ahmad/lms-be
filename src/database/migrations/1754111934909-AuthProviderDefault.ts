import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthProviderDefault1754111934909 implements MigrationInterface {
    name = 'AuthProviderDefault1754111934909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "authProvider" SET DEFAULT 'credentials'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "authProvider" DROP DEFAULT`);
    }

}
