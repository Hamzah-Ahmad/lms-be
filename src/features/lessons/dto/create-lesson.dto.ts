import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsString()
  duration?: number;



  @IsArray()
  @IsUUID('4', { each: true })
  videos: string[];

  @IsUUID('4')
  course: string;

  
}
