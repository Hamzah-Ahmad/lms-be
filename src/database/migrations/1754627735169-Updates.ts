import { MigrationInterface, QueryRunner } from "typeorm";

export class Updates1754627735169 implements MigrationInterface {
    name = 'Updates1754627735169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_e4296007dc83a534a0597fbaa6c"`);
        await queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "lessonIdId" TO "lessonId"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`);
        await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "courseId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "lessonId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_47a753668216ecdde9f56811b8b" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_47a753668216ecdde9f56811b8b"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`);
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "lessonId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "courseId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "lessonId" TO "lessonIdId"`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_e4296007dc83a534a0597fbaa6c" FOREIGN KEY ("lessonIdId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
