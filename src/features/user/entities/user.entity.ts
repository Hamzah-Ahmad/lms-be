import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
}

export enum AuthProvider {
    GOOGLE = 'google',
    CREDENTIALS = 'credentials'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;


  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.CREDENTIALS })
  authProvider: AuthProvider;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
}
