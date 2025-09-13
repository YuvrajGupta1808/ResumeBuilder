import { Module } from '@nestjs/common';
import { DockerLatexService } from './docker-latex.service';
import { LatexController } from './latex.controller';
import { LatexService } from './latex.service';

@Module({
    providers: [LatexService, DockerLatexService],
    controllers: [LatexController],
    exports: [LatexService, DockerLatexService],
})
export class LatexModule { }
