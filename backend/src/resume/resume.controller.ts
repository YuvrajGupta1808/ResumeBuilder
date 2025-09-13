import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';
const pdfParse = require('pdf-parse');

@ApiTags('resumes')
@Controller('resumes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create resume' })
    async create(
        @Body('title') title: string,
        @Body('content') content: string,
        @Body('originalContent') originalContent: string,
        @UploadedFile() file: Express.Multer.File,
        @Request() req,
    ) {
        const resumeData: CreateResumeDto = {
            title,
            content,
            originalContent: originalContent || content,
            fileName: file?.originalname,
            fileSize: file?.size,
        };
        return this.resumeService.create(resumeData, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all user resumes' })
    findAll(@Request() req) {
        return this.resumeService.findAll(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get resume by ID' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.resumeService.findOne(id, req.user.id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update resume' })
    update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto, @Request() req) {
        return this.resumeService.update(id, updateResumeDto, req.user.id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete resume' })
    remove(@Param('id') id: string, @Request() req) {
        return this.resumeService.remove(id, req.user.id);
    }

    @Post('extract-pdf')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Extract text from PDF file' })
    async extractPdfText(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return { error: 'No file uploaded' };
        }

        if (file.mimetype !== 'application/pdf') {
            return { error: 'File must be a PDF' };
        }

        // Check if buffer exists, if not try to read from path
        let buffer: Buffer;
        if (file.buffer) {
            buffer = file.buffer;
        } else if (file.path) {
            const fs = require('fs');
            buffer = fs.readFileSync(file.path);
        } else {
            return {
                error: 'File buffer not available',
                text: `PDF file uploaded: ${file.originalname}\n\nNote: Could not extract text automatically. Please copy and paste your resume content manually.`
            };
        }

        try {
            const data = await pdfParse(buffer);
            return {
                text: data.text,
                pages: data.numpages,
                info: data.info,
            };
        } catch (error) {
            return {
                error: `Failed to extract text from PDF: ${error.message}`,
                text: `PDF file uploaded: ${file.originalname}\n\nNote: Could not extract text automatically. Please copy and paste your resume content manually.`
            };
        }
    }
}
