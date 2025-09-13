import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaModule } from '../prisma/prisma.module';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generate unique filename
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Accept PDF, document formats, and LaTeX files
        const allowedMimes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'text/x-tex',
          'application/x-tex',
        ];

        // Also allow .tex files by extension
        const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.tex'];
        const fileExtension = extname(file.originalname).toLowerCase();

        if (
          allowedMimes.includes(file.mimetype) ||
          allowedExtensions.includes(fileExtension)
        ) {
          cb(null, true);
        } else {
          cb(
            new Error(
              'Invalid file type. Only PDF, DOC, DOCX, TXT, and LaTeX (.tex) files are allowed.'
            ),
            false
          );
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  providers: [ResumeService],
  controllers: [ResumeController],
  exports: [ResumeService],
})
export class ResumeModule {}
