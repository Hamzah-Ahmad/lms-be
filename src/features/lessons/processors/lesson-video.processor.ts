import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('transcode-queue')
export class LessonVideoProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('Processing job:', job.data);
  }
}
