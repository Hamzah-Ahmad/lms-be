import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/features/user/user.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/features/auth/auth.module';
import { CourseModule } from 'src/features/course/course.module';
import { LessonsModule } from 'src/features/lessons/lessons.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    BullModule.forRoot({
      connection: {
        host: 'lms-redis',
        port: 6379,
      },
    }),
    UserModule,
    AuthModule,
    CourseModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
