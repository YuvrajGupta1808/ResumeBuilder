import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import OpenAI from 'openai';
import { CacheService } from '../cache/cache.service';
import { JobService } from '../job/job.service';
import { DockerLatexService } from '../latex/docker-latex.service';
import { LatexService } from '../latex/latex.service';
import { ResumeService } from '../resume/resume.service';
import { TailorResumeDto } from './dto/tailor-resume.dto';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private openai: OpenAI;

    constructor(
        private configService: ConfigService,
        private resumeService: ResumeService,
        private jobService: JobService,
        private cacheService: CacheService,
        private latexService: LatexService,
        private dockerLatexService: DockerLatexService,
    ) {
        this.openai = new OpenAI({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }

    async tailorResume(tailorResumeDto: TailorResumeDto, userId: string) {
        const { resumeId, jobTitle, company, jobDescription } = tailorResumeDto;

        // Get resume data
        const resume = await this.resumeService.findOne(resumeId, userId);
        if (!resume) {
            throw new Error('Resume not found');
        }

        // Check cache first for tailored content only (not job history)
        const jobDescHash = crypto.createHash('sha256').update(jobDescription).digest('hex').slice(0, 16);
        const cacheKey = `tailor:${resumeId}:${jobDescHash}`;
        const cached = await this.cacheService.get(cacheKey);

        let tailoredResume: string;
        let coverLetter: string;

        if (cached) {
            this.logger.log('Returning cached tailored content');
            const cachedData = JSON.parse(cached);
            tailoredResume = cachedData.tailoredResume;
            coverLetter = cachedData.coverLetter;
        } else {
            // Create tailored resume
            tailoredResume = await this.createTailoredResume(
                resume.content,
                jobTitle,
                company,
                jobDescription,
            );

            // Create cover letter
            coverLetter = await this.createCoverLetter(
                resume.content,
                jobTitle,
                company,
                jobDescription,
            );

            // Cache the tailored content (without job history)
            await this.cacheService.set(cacheKey, JSON.stringify({
                tailoredResume,
                coverLetter,
            }), 3600);
        }

        try {
            // Check if the original resume was LaTeX and compile if needed
            let finalTailoredResume = tailoredResume;
            let finalCoverLetter = coverLetter;

            if (this.isLatexContent(resume.content)) {
                this.logger.log('Original resume was LaTeX, compiling tailored content to PDF using Docker');

                try {
                    // Compile tailored resume LaTeX to PDF using Docker
                    const resumePdfBuffer = await this.dockerLatexService.compileLatexToPdf(tailoredResume);
                    finalTailoredResume = `PDF_COMPILED:${resumePdfBuffer.toString('base64')}`;

                    // Compile cover letter LaTeX to PDF using Docker
                    const coverLetterPdfBuffer = await this.dockerLatexService.compileLatexToPdf(coverLetter);
                    finalCoverLetter = `PDF_COMPILED:${coverLetterPdfBuffer.toString('base64')}`;

                    this.logger.log('Successfully compiled LaTeX to PDF using Docker');
                } catch (compileError) {
                    this.logger.error('Failed to compile LaTeX to PDF with Docker:', compileError);
                    // Fall back to plain text if compilation fails
                    this.logger.log('Falling back to plain text format');
                }
            }

            // Save job history (always create new job history entry)
            const jobHistory = await this.jobService.create({
                resumeId,
                jobTitle,
                company,
                jobDescription,
                tailoredResume: finalTailoredResume,
                coverLetter: finalCoverLetter,
            }, userId);

            const result = {
                tailoredResume: finalTailoredResume,
                coverLetter: finalCoverLetter,
                jobHistoryId: jobHistory.id,
            };

            this.logger.log('AI Service Result:', JSON.stringify(result, null, 2));

            return result;
        } catch (error) {
            this.logger.error('Error tailoring resume:', error);
            throw new Error('Failed to tailor resume');
        }
    }

    private isLatexContent(content: string): boolean {
        // Check for common LaTeX patterns
        const latexPatterns = [
            /\\documentclass/,
            /\\begin\{document\}/,
            /\\end\{document\}/,
            /\\section/,
            /\\subsection/,
            /\\textbf/,
            /\\textit/,
            /\\item/,
            /\\begin\{itemize\}/,
            /\\begin\{enumerate\}/,
        ];

        return latexPatterns.some(pattern => pattern.test(content));
    }

    private async createTailoredResume(
        originalResume: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const isLatex = this.isLatexContent(originalResume);

        if (isLatex) {
            return this.createTailoredLatexResume(originalResume, jobTitle, company, jobDescription);
        } else {
            return this.createTailoredTextResume(originalResume, jobTitle, company, jobDescription);
        }
    }

    private async createTailoredTextResume(
        originalResume: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert resume writer. Your task is to make MINOR, TARGETED adjustments to the existing resume to better match the job requirements.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME CONTENT:
${originalResume}

CRITICAL INSTRUCTIONS - MAKE MINIMAL CHANGES ONLY:
1. PRESERVE the original resume structure, format, and layout exactly
2. KEEP all original information - names, dates, companies, projects, education
3. ONLY make these specific changes:
   - Reorder skills to put job-relevant ones first
   - Reorder projects/experience to highlight most relevant ones first
   - Add job-relevant keywords to the projects/experience
   - Add job related made up projects in place of the least relevant ones
   - Adjust the professional summary to mention job-relevant skills
4. DO NOT change:
   - Personal information (name, contact, location)
   - Company names, job titles, or dates
   - Project names or descriptions (only remove if replacing)
   - Education details
   - Overall resume length or structure
5. Use keywords from the job description naturally in existing content
6. Maintain the same tone and writing style
7. Keep the same number of bullet points and sections

GOAL: Make the resume 10-15% more relevant to the job while keeping 85-90% of the original content unchanged.

Return ONLY the slightly adjusted resume content, no additional commentary.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer who makes MINIMAL, TARGETED adjustments to LaTeX resumes while PRESERVING the LaTeX format. You preserve 85-90% of the original content and only make subtle changes to improve job relevance. Never add fictional information or completely rewrite content. Always return valid LaTeX code.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || '';
    }

    private async createTailoredLatexResume(
        originalLatex: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert resume writer. Your task is to make MINOR, TARGETED adjustments to the LaTeX resume to better match the job requirements while PRESERVING the LaTeX format.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

ORIGINAL LATEX RESUME:
${originalLatex}

        CRITICAL INSTRUCTIONS:
        1. PRESERVE the LaTeX format EXACTLY - do not modify any LaTeX commands, spacing, or formatting
        2. KEEP the document structure, packages, and ALL formatting commands identical
        3. ONLY make these specific changes to the CONTENT within the LaTeX:
            - Reorder skills to put job-relevant ones first
            - Reorder experience/project sections to highlight most relevant ones first
            - Add job-relevant keywords to existing descriptions
            - Add job-related made-up projects in place of the least relevant ones
        4. DO NOT change:
            - Personal information (name, contact, location)
            - Company names, job titles, or dates
            - Education details
            - ANY LaTeX commands, spacing, or formatting
            - Document structure, packages, or layout
            - Overall resume length or structure
        5. Use keywords from the job description naturally in existing content
        6. Keep the same number of bullet points and sections
        7. PRESERVE ALL LaTeX formatting commands including \\textbf{}, \\hfill, \\\\, spacing commands, etc.

        GOAL: Make the resume 10-15% more relevant to the job while keeping 85-90% of the original content unchanged and preserving the EXACT LaTeX format.

        IMPORTANT: Copy the LaTeX structure EXACTLY as provided, including all \\textbf{}, \\hfill, \\\\, spacing commands, and formatting. Only change the text content, not the LaTeX commands.

        Return ONLY the tailored resume in LaTeX format, no additional commentary.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer who makes MINIMAL, TARGETED adjustments to LaTeX resumes while PRESERVING the EXACT LaTeX format and ALL formatting commands. You preserve 85-90% of the original content and only make subtle changes to improve job relevance. Never modify LaTeX commands, spacing, or formatting.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.3,
        });

        return completion.choices[0].message.content || '';
    }

    private async createCoverLetter(
        resumeContent: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const isLatex = this.isLatexContent(resumeContent);

        if (isLatex) {
            return this.createLatexCoverLetter(resumeContent, jobTitle, company, jobDescription);
        } else {
            return this.createTextCoverLetter(resumeContent, jobTitle, company, jobDescription);
        }
    }

    private async createTextCoverLetter(
        resumeContent: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert cover letter writer. Create a compelling cover letter for the following job application using ONLY the information from the candidate's resume.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S RESUME:
${resumeContent}

CRITICAL INSTRUCTIONS:
1. Use ONLY the information provided in the candidate's resume above
2. DO NOT add any fake information, fake experiences, or fictional details
3. DO NOT create made-up achievements, skills, or qualifications
4. Base your cover letter strictly on what's in the resume
5. Highlight 2-3 key qualifications from the resume that match the job requirements
6. Show enthusiasm for the role and company
7. Keep it concise (3-4 paragraphs)
8. Use a professional but engaging tone
9. Include a strong opening and closing
10. If the resume doesn't contain certain information, DO NOT mention it
11. Reference specific projects, experiences, or skills mentioned in the resume
12. Connect the candidate's background to the job requirements naturally

IMPORTANT: Only reference skills, experiences, and achievements that are actually mentioned in the resume. Be specific and authentic.

Return ONLY the cover letter content, no additional commentary or explanations.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert cover letter writer who creates compelling, authentic cover letters using ONLY the information provided in the candidate\'s resume. You reference specific projects, experiences, and skills from the resume to create a personalized, genuine cover letter.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || '';
    }

    private async createLatexCoverLetter(
        resumeContent: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert cover letter writer. Create a compelling cover letter for the following job application using ONLY the information from the candidate's resume.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S RESUME:
${resumeContent}

CRITICAL INSTRUCTIONS:
1. Use ONLY the information provided in the candidate's resume above
2. DO NOT add any fake information, fake experiences, or fictional details
3. DO NOT create made-up achievements, skills, or qualifications
4. Base your cover letter strictly on what's in the resume
5. Highlight 2-3 key qualifications from the resume that match the job requirements
6. Show enthusiasm for the role and company
7. Keep it concise (3-4 paragraphs)
8. Use a professional but engaging tone
9. Include a strong opening and closing
10. If the resume doesn't contain certain information, DO NOT mention it
11. Reference specific projects, experiences, or skills mentioned in the resume
12. Connect the candidate's background to the job requirements naturally
13. FORMAT the cover letter in LaTeX format with proper document structure

IMPORTANT: Only reference skills, achievements, and experiences that are actually mentioned in the resume content.

Return ONLY the cover letter content in LaTeX format with proper document structure, no additional commentary or explanations.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert cover letter writer who creates compelling, authentic cover letters using ONLY the information provided in the candidate\'s resume. You reference specific projects, experiences, and skills from the resume to create a personalized, genuine cover letter.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || '';
    }
}
