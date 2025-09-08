import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { CacheService } from '../cache/cache.service';
import { JobService } from '../job/job.service';
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

        // Check cache first
        const cacheKey = `tailor:${resumeId}:${Buffer.from(jobDescription).toString('base64').slice(0, 50)}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached) {
            this.logger.log('Returning cached result');
            return JSON.parse(cached);
        }

        try {
            // Create tailored resume
            const tailoredResume = await this.createTailoredResume(
                resume.content,
                jobTitle,
                company,
                jobDescription,
            );

            // Create cover letter
            const coverLetter = await this.createCoverLetter(
                resume.content,
                jobTitle,
                company,
                jobDescription,
            );

            // Save job history
            const jobHistory = await this.jobService.create({
                resumeId,
                jobTitle,
                company,
                jobDescription,
                tailoredResume,
                coverLetter,
            }, userId);

            const result = {
                tailoredResume,
                coverLetter,
                jobHistoryId: jobHistory.id,
            };

            // Cache the result for 1 hour
            await this.cacheService.set(cacheKey, JSON.stringify(result), 3600);

            return result;
        } catch (error) {
            this.logger.error('Error tailoring resume:', error);
            throw new Error('Failed to tailor resume');
        }
    }

    private async createTailoredResume(
        originalResume: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert resume writer and career coach. Your task is to tailor the following resume to match the specific job requirements.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME:
${originalResume}

INSTRUCTIONS:
1. Analyze the job description to identify key requirements, skills, and qualifications
2. Reorganize and rephrase the resume content to highlight relevant experience
3. Use keywords from the job description naturally throughout the resume
4. Emphasize achievements and experiences that align with the job requirements
5. Maintain the original structure but optimize the content for this specific role
6. Keep the same length as the original resume
7. Ensure the resume is professional and compelling

Return ONLY the tailored resume content, no additional commentary or explanations.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert resume writer specializing in tailoring resumes for specific job applications.',
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

    private async createCoverLetter(
        resumeContent: string,
        jobTitle: string,
        company: string,
        jobDescription: string,
    ): Promise<string> {
        const prompt = `
You are an expert cover letter writer. Create a compelling cover letter for the following job application.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S RESUME:
${resumeContent}

INSTRUCTIONS:
1. Write a professional cover letter that complements the tailored resume
2. Address the hiring manager directly
3. Highlight 2-3 key qualifications that match the job requirements
4. Show enthusiasm for the role and company
5. Keep it concise (3-4 paragraphs)
6. Use a professional but engaging tone
7. Include a strong opening and closing

Return ONLY the cover letter content, no additional commentary or explanations.
`;

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert cover letter writer who creates compelling, personalized cover letters.',
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
