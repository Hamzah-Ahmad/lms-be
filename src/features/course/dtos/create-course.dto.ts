import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  audience: string[];

  @IsArray()
  @IsString({ each: true })
  learningOutcomes: string[];

  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  instructors: string[];
}
