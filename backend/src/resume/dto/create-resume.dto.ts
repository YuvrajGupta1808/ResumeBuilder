import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResumeDto {
    @ApiProperty({ example: 'Software Engineer Resume' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'John Doe\nSoftware Engineer\n...' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'John Doe\nSoftware Engineer\n...' })
    @IsString()
    @IsNotEmpty()
    originalContent: string;

    @ApiProperty({ example: 'resume.pdf', required: false })
    @IsOptional()
    @IsString()
    fileName?: string;

    @ApiProperty({ example: 1024000, required: false })
    @IsOptional()
    @IsNumber()
    fileSize?: number;
}
