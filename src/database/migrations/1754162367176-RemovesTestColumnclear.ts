import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovesTestColumnclear1754162367176 implements MigrationInterface {
    name = 'RemovesTestColumnclear1754162367176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "test" character varying NOT NULL`);
    }

}
