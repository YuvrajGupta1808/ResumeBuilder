import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DockerLatexService } from './docker-latex.service';
import { LatexService } from './latex.service';

@ApiTags('latex')
@Controller('latex')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LatexController {
    constructor(
        private readonly latexService: LatexService,
        private readonly dockerLatexService: DockerLatexService,
    ) { }

    @Post('generate-resume')
    @ApiOperation({ summary: 'Generate LaTeX resume from resume content' })
    async generateResumeLatex(@Body() body: { content: string }, @Request() req) {
        try {
            const latexContent = this.latexService.generateResumeLatex({
                content: body.content
            });

            return {
                success: true,
                latex: latexContent,
                filename: `resume_${req.user.id}_${Date.now()}.tex`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('generate-cover-letter')
    @ApiOperation({ summary: 'Generate LaTeX cover letter from content' })
    async generateCoverLetterLatex(
        @Body() body: {
            content: string;
            company: string;
            hiringManager?: string;
            resumeContent: string;
        },
        @Request() req
    ) {
        try {
            const latexContent = this.latexService.generateCoverLetterLatex(
                {
                    content: body.content,
                    company: body.company,
                    hiringManager: body.hiringManager
                },
                {
                    content: body.resumeContent
                }
            );

            return {
                success: true,
                latex: latexContent,
                filename: `cover_letter_${req.user.id}_${Date.now()}.tex`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('generate-both')
    @ApiOperation({ summary: 'Generate both LaTeX resume and cover letter' })
    async generateBothLatex(
        @Body() body: {
            resumeContent: string;
            coverLetterContent: string;
            company: string;
            hiringManager?: string;
        },
        @Request() req
    ) {
        try {
            const resumeLatex = this.latexService.generateResumeLatex({
                content: body.resumeContent
            });

            const coverLetterLatex = this.latexService.generateCoverLetterLatex(
                {
                    content: body.coverLetterContent,
                    company: body.company,
                    hiringManager: body.hiringManager
                },
                {
                    content: body.resumeContent
                }
            );

            return {
                success: true,
                resume: {
                    latex: resumeLatex,
                    filename: `resume_${req.user.id}_${Date.now()}.tex`
                },
                coverLetter: {
                    latex: coverLetterLatex,
                    filename: `cover_letter_${req.user.id}_${Date.now()}.tex`
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('convert-pdf-to-latex')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Convert PDF file to LaTeX format' })
    async convertPdfToLatex(@UploadedFile() file: Express.Multer.File, @Request() req) {
        try {
            if (!file) {
                return { success: false, error: 'No file uploaded' };
            }

            if (file.mimetype !== 'application/pdf') {
                return { success: false, error: 'File must be a PDF' };
            }

            // Get buffer from file
            let buffer: Buffer;
            if (file.buffer) {
                buffer = file.buffer;
            } else if (file.path) {
                const fs = require('fs');
                buffer = fs.readFileSync(file.path);
            } else {
                return { success: false, error: 'File buffer not available' };
            }

            const latexContent = await this.latexService.convertPdfToLatex(buffer);

            return {
                success: true,
                latex: latexContent,
                filename: `converted_${file.originalname.replace('.pdf', '')}_${Date.now()}.tex`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('compile-latex-to-pdf')
    @ApiOperation({ summary: 'Compile LaTeX content to PDF' })
    async compileLatexToPdf(@Body() body: { latexContent: string }, @Request() req) {
        try {
            // Validate LaTeX content
            const validation = this.latexService.validateLatexContent(body.latexContent);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: `LaTeX validation failed: ${validation.errors.join(', ')}`
                };
            }

            const pdfBuffer = await this.latexService.compileLatexToPdf(body.latexContent);

            return {
                success: true,
                pdf: pdfBuffer.toString('base64'),
                filename: `compiled_${req.user.id}_${Date.now()}.pdf`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('validate-latex')
    @ApiOperation({ summary: 'Validate LaTeX content' })
    async validateLatex(@Body() body: { latexContent: string }) {
        try {
            const validation = this.latexService.validateLatexContent(body.latexContent);
            const metadata = this.latexService.extractLatexMetadata(body.latexContent);

            return {
                success: true,
                validation,
                metadata
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('upload-latex')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload and process LaTeX file' })
    async uploadLatex(@UploadedFile() file: Express.Multer.File, @Request() req) {
        try {
            if (!file) {
                return { success: false, error: 'No file uploaded' };
            }

            if (!file.originalname.endsWith('.tex')) {
                return { success: false, error: 'File must be a .tex file' };
            }

            // Get content from file
            let content: string;
            if (file.buffer) {
                content = file.buffer.toString('utf-8');
            } else if (file.path) {
                const fs = require('fs');
                content = fs.readFileSync(file.path, 'utf-8');
            } else {
                return { success: false, error: 'File content not available' };
            }

            // Validate LaTeX content
            const validation = this.latexService.validateLatexContent(content);
            const metadata = this.latexService.extractLatexMetadata(content);

            return {
                success: true,
                content,
                validation,
                metadata,
                filename: file.originalname
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('compile-docker')
    @ApiOperation({ summary: 'Compile LaTeX to PDF using Docker' })
    async compileLatexWithDocker(@Body() body: { latexContent: string }, @Request() req) {
        try {
            const pdfBuffer = await this.dockerLatexService.compileLatexToPdf(body.latexContent);
            return {
                success: true,
                pdfBase64: pdfBuffer.toString('base64'),
                size: pdfBuffer.length
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    @Post('test-docker')
    @ApiOperation({ summary: 'Test Docker LaTeX compilation' })
    async testDockerCompilation(@Request() req) {
        try {
            const success = await this.dockerLatexService.testCompilation();
            return {
                success,
                message: success ? 'Docker LaTeX compilation test passed' : 'Docker LaTeX compilation test failed'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}
