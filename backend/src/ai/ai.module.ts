import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../cache/cache.module';
import { JobModule } from '../job/job.module';
import { LatexModule } from '../latex/latex.module';
import { ResumeModule } from '../resume/resume.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [ConfigModule, JobModule, ResumeModule, CacheModule, LatexModule],
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
