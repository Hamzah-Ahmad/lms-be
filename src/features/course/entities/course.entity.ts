import { Lesson } from 'src/features/lessons/entities/lesson.entity';
import { User } from 'src/features/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  name: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  audience: string[];

  @Column('text', { array: true })
  learningOutcomes: string[];

  @Column("text", { array: true })
  requirements: string[];

  @ManyToMany(() => User, user => user.authoredCourses)
  instructors: User[];

  @ManyToMany(() => User, user => user.enrolledCourses)
  students: User[];

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @DeleteDateColumn()
  deleteAt: Date;
}