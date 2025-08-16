import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { LessonsService } from './lessons.service';

const uploadPath = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname?.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any, @Body() body: any) {
    const filePath = `uploads/${file.filename}`;

    await this.lessonService.enqueueVideo({
      filePath,
      lessonTitle: body.lessonTitle,
    });
  }
}
