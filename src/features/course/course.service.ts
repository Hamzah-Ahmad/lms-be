import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createCourse(body: CreateCourseDto) {
    const instructors = await this.userRepository.findBy({
      id: In(body.instructors),
    });
    const course =  this.courseRepository.create({
        ...body,
        instructors
    });

    return await this.courseRepository.save(course)

  }
}
