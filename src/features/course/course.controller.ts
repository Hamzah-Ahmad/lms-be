import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Post('create')
  createCourse(@Body() body: CreateCourseDto) {
    return this.courseService.createCourse(body)
  }
}














// Why await is not technically required in:
// 🔹 Service
// this.userRepository.find() returns a Promise.

// If the service method just returns that Promise, there's no need to await it.

// Returning the Promise is enough for the caller to handle it.

// ✅ So:
// findAllUsers() { return this.userRepository.find(); }
// is technically correct.

// 🔹 Controller
// NestJS can automatically resolve Promises returned from controller methods.

// If you return a Promise from a service call, Nest will await it for you before sending a response.

// ✅ So:
// findAllUsers() { return this.userService.findAllUsers(); }
// is also technically correct.

// 🧠 Rule of Thumb:
// Use await only if you need to:

// Handle errors (try/catch)

// Transform data

// Wait for multiple things

// Improve readability in complex flows

// Otherwise, returning the Promise directly works just fine in both cases.