import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { BullModule } from '@nestjs/bullmq';
import { LessonVideoProcessor } from './processors/lesson-video.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    BullModule.registerQueue({
      name: 'transcode-queue',
    }),
  ],
  providers: [LessonsService, LessonVideoProcessor],
  controllers: [LessonsController],
})
export class LessonsModule {}
