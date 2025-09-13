import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateJobHistoryDto } from './dto/create-job-history.dto';
import { UpdateJobHistoryDto } from './dto/update-job-history.dto';
import { JobService } from './job.service';

@ApiTags('job-history')
@Controller('job-history')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create job history' })
  create(@Body() createJobHistoryDto: CreateJobHistoryDto, @Request() req) {
    return this.jobService.create(createJobHistoryDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user job histories' })
  findAll(@Request() req) {
    return this.jobService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job history by ID' })
  findOne(@Param('id') id: string, @Request() req) {
    console.log('Getting job history for ID:', id);
    console.log('User ID:', req.user.id);
    return this.jobService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update job history' })
  update(
    @Param('id') id: string,
    @Body() updateJobHistoryDto: UpdateJobHistoryDto,
    @Request() req
  ) {
    return this.jobService.update(id, updateJobHistoryDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete job history' })
  remove(@Param('id') id: string, @Request() req) {
    return this.jobService.remove(id, req.user.id);
  }
}
