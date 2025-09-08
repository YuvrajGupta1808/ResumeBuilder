import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB
            },
        }),
    ],
    providers: [ResumeService],
    controllers: [ResumeController],
    exports: [ResumeService],
})
export class ResumeModule { }
