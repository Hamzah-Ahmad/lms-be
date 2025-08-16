import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class LessonsService {
  constructor(
    @InjectQueue('transcode-queue') private readonly transcodeQueue: Queue,
  ) {}


  async enqueueVideo({
    filePath,
    lessonTitle
  }){

    console.log("LOGGER - lessons.service")
    await this.transcodeQueue.add('transcode', { filePath, lessonTitle });

  }
}
