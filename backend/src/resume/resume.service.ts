import { Injectable } from '@nestjs/common';
import { Resume } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
    constructor(private prisma: PrismaService) { }

    async create(createResumeDto: CreateResumeDto, userId: string): Promise<Resume> {
        return this.prisma.resume.create({
            data: {
                ...createResumeDto,
                originalContent: createResumeDto.originalContent || createResumeDto.content,
                userId,
            },
        });
    }

    async findAll(userId: string): Promise<Resume[]> {
        return this.prisma.resume.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string, userId: string): Promise<Resume | null> {
        return this.prisma.resume.findFirst({
            where: { id, userId },
        });
    }

    async update(id: string, updateResumeDto: UpdateResumeDto, userId: string): Promise<Resume> {
        return this.prisma.resume.update({
            where: { id, userId },
            data: updateResumeDto,
        });
    }

    async remove(id: string, userId: string): Promise<Resume> {
        return this.prisma.resume.delete({
            where: { id, userId },
        });
    }
}
