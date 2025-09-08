import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';
import { TailorResumeDto } from './dto/tailor-resume.dto';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('tailor-resume')
    @ApiOperation({ summary: 'Tailor resume and generate cover letter' })
    async tailorResume(@Body() tailorResumeDto: TailorResumeDto, @Request() req) {
        return this.aiService.tailorResume(tailorResumeDto, req.user.id);
    }
}
