import { Injectable } from '@nestjs/common';
import { JobHistory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) { }

    async create(createJobHistoryDto: CreateJobHistoryDto, userId: string): Promise<JobHistory> {
        return this.prisma.jobHistory.create({
            data: {
                ...createJobHistoryDto,
                userId,
            },
        });
    }

    async findAll(userId: string): Promise<JobHistory[]> {
        return this.prisma.jobHistory.findMany({
            where: { userId },
            include: {
                resume: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string, userId: string): Promise<JobHistory | null> {
        return this.prisma.jobHistory.findFirst({
            where: { id, userId },
            include: {
                resume: true,
            },
        });
    }

    async update(id: string, updateJobHistoryDto: UpdateJobHistoryDto, userId: string): Promise<JobHistory> {
        return this.prisma.jobHistory.update({
            where: { id, userId },
            data: updateJobHistoryDto,
        });
    }

    async remove(id: string, userId: string): Promise<JobHistory> {
        return this.prisma.jobHistory.delete({
            where: { id, userId },
        });
    }
}
