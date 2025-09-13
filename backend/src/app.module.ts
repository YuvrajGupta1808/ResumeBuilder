import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { JobModule } from './job/job.module';
import { LatexModule } from './latex/latex.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResumeModule } from './resume/resume.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // 1 minute
                limit: 100, // 100 requests per minute
            },
        ]),
        PrismaModule,
        AuthModule,
        UserModule,
        ResumeModule,
        JobModule,
        AiModule,
        CacheModule,
        LatexModule,
    ],
})
export class AppModule { }
