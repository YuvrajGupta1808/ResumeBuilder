import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getUserStats(userId: string) {
    const [totalResumes, totalApplications] = await Promise.all([
      this.prisma.resume.count({
        where: { userId },
      }),
      this.prisma.jobHistory.count({
        where: { userId },
      }),
    ]);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const thisMonthApplications = await this.prisma.jobHistory.count({
      where: {
        userId,
        createdAt: {
          gte: thisMonth,
        },
      },
    });

    return {
      totalResumes,
      totalApplications,
      thisMonthApplications,
      successRate:
        totalApplications > 0
          ? Math.round((thisMonthApplications / totalApplications) * 100)
          : 0,
    };
  }
}
