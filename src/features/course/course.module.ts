import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, User])],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {}
