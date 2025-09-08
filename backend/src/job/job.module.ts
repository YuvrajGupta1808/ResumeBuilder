import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
    providers: [JobService],
    controllers: [JobController],
    exports: [JobService],
})
export class JobModule { }
