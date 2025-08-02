import { User } from 'src/features/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @ManyToMany(() => User, user => user.courses)
  instructors: User[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
