import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class DockerLatexService {
  private readonly logger = new Logger(DockerLatexService.name);
  private readonly dockerImageName = 'resume-builder-latex';
  private readonly tempDir = path.join(process.cwd(), 'temp');

  constructor() {
    // Ensure temp directory exists
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  async compileLatexToPdf(latexContent: string): Promise<Buffer> {
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(8).toString('hex');
    const workDir = path.join(this.tempDir, `latex_${timestamp}_${randomId}`);

    try {
      // Create working directory
      fs.mkdirSync(workDir, { recursive: true });

      // Write LaTeX content to file
      const texFileName = 'main.tex';
      const texFilePath = path.join(workDir, texFileName);
      fs.writeFileSync(texFilePath, latexContent, 'utf8');

      // Build Docker image if it doesn't exist
      await this.ensureDockerImage();

      // Run Docker container to compile LaTeX
      const outputDir = path.join(workDir, 'output');
      const pdfFileName = 'main.pdf';
      const pdfFilePath = path.join(outputDir, pdfFileName);

      const dockerCommand = [
        'docker run --rm',
        `-v "${workDir}:/workspace"`,
        `-e OUTPUT_DIR="/workspace/output"`,
        `-e MAIN_LATEX_FILE="${texFileName}"`,
        `-e TOC="false"`,
        this.dockerImageName,
      ].join(' ');

      this.logger.log(`Running Docker command: ${dockerCommand}`);

      const { stdout, stderr } = await execAsync(dockerCommand, {
        timeout: 60000, // 60 second timeout
        cwd: workDir,
      });

      this.logger.log('Docker compilation stdout:', stdout);
      if (stderr) {
        this.logger.warn('Docker compilation stderr:', stderr);
      }

      // Check if PDF was created
      if (fs.existsSync(pdfFilePath)) {
        const pdfBuffer = fs.readFileSync(pdfFilePath);
        this.logger.log(`PDF successfully compiled: ${pdfBuffer.length} bytes`);
        return pdfBuffer;
      } else {
        throw new Error(
          `PDF was not created. Output: ${stdout}\nError: ${stderr}`
        );
      }
    } catch (error) {
      this.logger.error('Docker LaTeX compilation failed:', error);
      this.logger.error('Error details:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        signal: error.signal,
      });
      throw new Error(`Docker LaTeX compilation failed: ${error.message}`);
    } finally {
      // Clean up working directory
      try {
        if (fs.existsSync(workDir)) {
          fs.rmSync(workDir, { recursive: true, force: true });
        }
      } catch (cleanupError) {
        this.logger.warn('Failed to clean up working directory:', cleanupError);
      }
    }
  }

  private async ensureDockerImage(): Promise<void> {
    try {
      // Check if image exists
      await execAsync(`docker image inspect ${this.dockerImageName}`, {
        timeout: 10000,
      });
      this.logger.log('Docker image already exists');
    } catch (error) {
      // Image doesn't exist, build it
      this.logger.log('Building Docker image...');
      const dockerfilePath = path.join(process.cwd(), 'Dockerfile.latex');

      if (!fs.existsSync(dockerfilePath)) {
        throw new Error('Dockerfile.latex not found');
      }

      const buildCommand = `docker build -f ${dockerfilePath} -t ${this.dockerImageName} .`;
      this.logger.log(`Building with command: ${buildCommand}`);

      const { stdout, stderr } = await execAsync(buildCommand, {
        timeout: 300000, // 5 minute timeout for build
        cwd: process.cwd(),
      });

      this.logger.log('Docker build stdout:', stdout);
      if (stderr) {
        this.logger.warn('Docker build stderr:', stderr);
      }

      this.logger.log('Docker image built successfully');
    }
  }

  async validateLatexContent(
    latexContent: string
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Basic LaTeX validation
    if (!latexContent.includes('\\documentclass')) {
      errors.push('Missing \\documentclass declaration');
    }

    if (!latexContent.includes('\\begin{document}')) {
      errors.push('Missing \\begin{document}');
    }

    if (!latexContent.includes('\\end{document}')) {
      errors.push('Missing \\end{document}');
    }

    // Check for unmatched braces
    const openBraces = (latexContent.match(/\{/g) || []).length;
    const closeBraces = (latexContent.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push('Unmatched braces in LaTeX content');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async testCompilation(): Promise<boolean> {
    try {
      const testLatex = `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\begin{document}
\\title{Test Document}
\\author{Test Author}
\\date{\\today}
\\maketitle
\\section{Introduction}
This is a test document to verify LaTeX compilation.
\\end{document}`;

      await this.compileLatexToPdf(testLatex);
      this.logger.log('LaTeX compilation test successful');
      return true;
    } catch (error) {
      this.logger.error('LaTeX compilation test failed:', error);
      return false;
    }
  }
}
