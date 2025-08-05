import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Video])]
})
export class VideosModule {}
