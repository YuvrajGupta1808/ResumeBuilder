import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobHistoryDto {
  @ApiProperty({ example: 'clx1234567890' })
  @IsString()
  @IsNotEmpty()
  resumeId: string;

  @ApiProperty({ example: 'Senior Software Engineer' })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ example: 'Google' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'We are looking for a Senior Software Engineer...' })
  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ApiProperty({ example: 'John Doe\nSenior Software Engineer...' })
  @IsString()
  @IsNotEmpty()
  tailoredResume: string;

  @ApiProperty({ example: 'Dear Hiring Manager,\nI am writing to express...' })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;
}
