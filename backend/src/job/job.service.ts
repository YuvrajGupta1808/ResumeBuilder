import { Injectable } from '@nestjs/common';
import { JobHistory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async create(
    createJobHistoryDto: CreateJobHistoryDto,
    userId: string
  ): Promise<JobHistory> {
    console.log('Creating job history with data:', createJobHistoryDto);
    console.log('User ID:', userId);

    const result = await this.prisma.jobHistory.create({
      data: {
        ...createJobHistoryDto,
        userId,
      },
    });

    console.log('Created job history:', result);
    return result;
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
    console.log('Finding job history with ID:', id, 'for user:', userId);

    const result = await this.prisma.jobHistory.findFirst({
      where: { id, userId },
      include: {
        resume: true,
      },
    });

    console.log('Found job history:', result);
    return result;
  }

  async update(
    id: string,
    updateJobHistoryDto: UpdateJobHistoryDto,
    userId: string
  ): Promise<JobHistory> {
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
