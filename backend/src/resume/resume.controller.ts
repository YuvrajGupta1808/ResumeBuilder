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
        @Body() createResumeDto: CreateResumeDto,
        @UploadedFile() file: Express.Multer.File,
        @Request() req,
    ) {
        const resumeData = {
            ...createResumeDto,
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
}
