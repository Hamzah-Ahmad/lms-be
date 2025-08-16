import { Course } from 'src/features/course/entities/course.entity';
import { Lesson } from 'src/features/lessons/entities/lesson.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VideoQuality {
  P144 = '144p',
  P240 = '240p',
  P360 = '360p',
  P480 = '480p',
  P720 = '720p',
  P1080 = '1080p',
  P1440 = '1440p',
  P2160 = '2160p', // 4K
}

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: VideoQuality,
  })
  quality: VideoQuality;

  @ManyToOne(() => Lesson, (lesson) => lesson.videos, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @Column()
  lessonId: string; // This enables direct FK access without joining Lesson
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
