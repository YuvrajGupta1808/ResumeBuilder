import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class LatexService {
    private readonly resumeTemplate = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{hyperref}

% Custom colors
\\definecolor{primary}{RGB}{0, 136, 255}
\\definecolor{secondary}{RGB}{64, 64, 64}

% Remove page numbers
\\pagestyle{empty}

% Section formatting
\\titleformat{\\section}{\\large\\bfseries\\color{primary}}{}{0em}{}[\\vspace{-0.5em}\\color{primary}\\rule{\\textwidth}{0.5pt}\\vspace{0.5em}]
\\titleformat{\\subsection}{\\normalsize\\bfseries}{}{0em}{}
\\titleformat{\\subsubsection}{\\normalsize\\bfseries\\itshape}{}{0em}{}

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{#1}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand{\\labelitemii}{$\\circ$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

% Header
\\newcommand{\\resumeHeader}[6]{
\\begin{center}
    {\\Huge \\textbf{#1}} \\\\ \\vspace{1pt}
    \\small #2 $|$ #3 $|$ #4 $|$ #5 $|$ #6
\\end{center}
}

\\begin{document}

% Header
\\resumeHeader{{{name}}}{{{email}}}{{{phone}}}{{{location}}}{{{linkedin}}}{{{website}}}

% Professional Summary
\\section{Professional Summary}
{{{summary}}}

% Education
\\section{Education}
\\resumeSubHeadingListStart
{{{education}}}
\\resumeSubHeadingListEnd

% Skills
\\section{Technical Skills}
\\resumeItemListStart
{{{skills}}}
\\resumeItemListEnd

% Experience
\\section{Experience}
\\resumeSubHeadingListStart
{{{experience}}}
\\resumeSubHeadingListEnd

% Projects
\\section{Projects}
\\resumeSubHeadingListStart
{{{projects}}}
\\resumeSubHeadingListEnd

\\end{document}`;

    private readonly coverLetterTemplate = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}

% Custom colors
\\definecolor{primary}{RGB}{0, 136, 255}

% Remove page numbers
\\pagestyle{empty}

% Custom commands
\\newcommand{\\header}[4]{
\\begin{center}
    {\\Large \\textbf{#1}} \\\\ \\vspace{5pt}
    #2 $|$ #3 $|$ #4
\\end{center}
\\vspace{20pt}
}

\\begin{document}

% Header
\\header{{{name}}}{{{email}}}{{{phone}}}{{{location}}}

% Date
\\today
\\\\ \\vspace{10pt}

% Recipient
{{#if hiringManager}}
{{hiringManager}}
{{else}}
Hiring Manager
{{/if}}
\\\\
{{company}}
\\\\
{{location}}

\\vspace{20pt}

Dear {{#if hiringManager}}{{hiringManager}}{{else}}Hiring Manager{{/if}},

\\vspace{10pt}

{{{body}}}

\\vspace{20pt}

Sincerely,
\\\\
{{name}}

\\end{document}`;

    generateResumeLatex(resumeData: any): string {
        const template = Handlebars.compile(this.resumeTemplate);

        // Parse the resume content to extract structured data
        const parsedData = this.parseResumeContent(resumeData.content);

        return template(parsedData);
    }

    generateCoverLetterLatex(coverLetterData: any, resumeData: any): string {
        const template = Handlebars.compile(this.coverLetterTemplate);

        // Parse the resume content to extract contact info
        const parsedResume = this.parseResumeContent(resumeData.content);

        const data = {
            name: parsedResume.name,
            email: parsedResume.email,
            phone: parsedResume.phone,
            location: parsedResume.location,
            company: coverLetterData.company,
            hiringManager: coverLetterData.hiringManager || '',
            body: this.formatCoverLetterBody(coverLetterData.content)
        };

        return template(data);
    }

    private parseResumeContent(content: string): any {
        const lines = content.split('\\n');
        let currentSection = '';
        let parsedData: any = {
            name: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            website: '',
            summary: '',
            education: '',
            skills: '',
            experience: '',
            projects: ''
        };

        // Extract name (first line)
        if (lines.length > 0) {
            parsedData.name = lines[0].trim();
        }

        // Extract contact info
        for (let i = 1; i < Math.min(5, lines.length); i++) {
            const line = lines[i].trim();
            if (line.includes('@')) {
                parsedData.email = line;
            } else if (line.includes('(') && line.includes(')')) {
                parsedData.phone = line;
            } else if (line.includes('linkedin.com')) {
                parsedData.linkedin = line;
            } else if (line.includes('github.com') || line.includes('www.')) {
                parsedData.website = line;
            } else if (line && !line.includes('•') && !line.includes('-')) {
                parsedData.location = line;
            }
        }

        // Parse sections
        let currentContent = '';
        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.toUpperCase().includes('PROFESSIONAL SUMMARY')) {
                currentSection = 'summary';
                currentContent = '';
            } else if (trimmedLine.toUpperCase().includes('EDUCATION')) {
                currentSection = 'education';
                currentContent = '';
            } else if (trimmedLine.toUpperCase().includes('SKILLS')) {
                currentSection = 'skills';
                currentContent = '';
            } else if (trimmedLine.toUpperCase().includes('EXPERIENCE')) {
                currentSection = 'experience';
                currentContent = '';
            } else if (trimmedLine.toUpperCase().includes('PROJECTS')) {
                currentSection = 'projects';
                currentContent = '';
            } else if (trimmedLine && currentSection) {
                currentContent += trimmedLine + '\\n';
            }
        }

        // Format the content for LaTeX
        parsedData.summary = this.formatSummary(currentContent);
        parsedData.education = this.formatEducation(currentContent);
        parsedData.skills = this.formatSkills(currentContent);
        parsedData.experience = this.formatExperience(currentContent);
        parsedData.projects = this.formatProjects(currentContent);

        return parsedData;
    }

    private formatSummary(content: string): string {
        return content.replace(/\\n/g, ' ').trim();
    }

    private formatEducation(content: string): string {
        const lines = content.split('\\n').filter(line => line.trim());
        let formatted = '';

        for (const line of lines) {
            if (line.trim()) {
                formatted += `\\resumeSubheading{${line.trim()}}{}{}{}\\\\`;
            }
        }

        return formatted;
    }

    private formatSkills(content: string): string {
        const lines = content.split('\\n').filter(line => line.trim());
        let formatted = '';

        for (const line of lines) {
            if (line.trim() && (line.includes('•') || line.includes('-'))) {
                const skill = line.replace(/[•-]/, '').trim();
                formatted += `\\resumeItem{${skill}}\\\\`;
            }
        }

        return formatted;
    }

    private formatExperience(content: string): string {
        const lines = content.split('\\n').filter(line => line.trim());
        let formatted = '';
        let currentJob = '';
        let currentCompany = '';
        let currentDates = '';
        let currentLocation = '';

        for (const line of lines) {
            if (line.includes('|') && !line.includes('•') && !line.includes('-')) {
                // This is a job title line
                const parts = line.split('|');
                if (parts.length >= 2) {
                    currentJob = parts[0].trim();
                    currentCompany = parts[1].trim();
                    if (parts.length >= 3) {
                        currentDates = parts[2].trim();
                    }
                    if (parts.length >= 4) {
                        currentLocation = parts[3].trim();
                    }
                }
            } else if (line.includes('•') || line.includes('-')) {
                // This is a bullet point
                const bullet = line.replace(/[•-]/, '').trim();
                formatted += `\\resumeSubItem{${bullet}}\\\\`;
            }
        }

        if (currentJob && currentCompany) {
            formatted = `\\resumeSubheading{${currentJob}}{${currentDates}}{${currentCompany}}{${currentLocation}}\\\\${formatted}`;
        }

        return formatted;
    }

    private formatProjects(content: string): string {
        const lines = content.split('\\n').filter(line => line.trim());
        let formatted = '';
        let currentProject = '';
        let currentDates = '';

        for (const line of lines) {
            if (line.includes('|') && !line.includes('•') && !line.includes('-')) {
                // This is a project title line
                const parts = line.split('|');
                if (parts.length >= 1) {
                    currentProject = parts[0].trim();
                    if (parts.length >= 2) {
                        currentDates = parts[1].trim();
                    }
                }
            } else if (line.includes('•') || line.includes('-')) {
                // This is a bullet point
                const bullet = line.replace(/[•-]/, '').trim();
                formatted += `\\resumeSubItem{${bullet}}\\\\`;
            }
        }

        if (currentProject) {
            formatted = `\\resumeSubheading{${currentProject}}{${currentDates}}{}{}\\\\${formatted}`;
        }

        return formatted;
    }

    private formatCoverLetterBody(content: string): string {
        // Split into paragraphs and format for LaTeX
        const paragraphs = content.split('\\n\\n').filter(p => p.trim());
        let formatted = '';

        for (const paragraph of paragraphs) {
            formatted += paragraph.trim() + '\\n\\n';
        }

        return formatted;
    }

    async convertPdfToLatex(pdfBuffer: Buffer): Promise<string> {
        try {
            // Extract text from PDF
            const data = await pdfParse(pdfBuffer);
            const extractedText = data.text.trim();

            // Parse the extracted text and convert to LaTeX format
            const _parsedData = this.parseResumeContent(extractedText);

            // Generate LaTeX using the template
            return this.generateResumeLatex({ content: extractedText });
        } catch (error) {
            throw new Error(`Failed to convert PDF to LaTeX: ${error.message}`);
        }
    }

    async compileLatexToPdf(latexContent: string): Promise<Buffer> {
        try {
            const fs = require('fs');
            const path = require('path');
            const { exec } = require('child_process');
            const { promisify } = require('util');
            const execAsync = promisify(exec);

            // Create a temporary directory
            const tempDir = path.join(process.cwd(), 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            // Generate unique filename
            const timestamp = Date.now();
            const texFileName = `resume_${timestamp}.tex`;
            const pdfFileName = `resume_${timestamp}.pdf`;
            const texFilePath = path.join(tempDir, texFileName);
            const pdfFilePath = path.join(tempDir, pdfFileName);

            // Write LaTeX content to file
            fs.writeFileSync(texFilePath, latexContent, 'utf8');

            // Compile LaTeX to PDF using pdflatex with full path
            try {
                const pdflatexPath = '/usr/local/texlive/2025/bin/universal-darwin/pdflatex';
                const { stdout, stderr } = await execAsync(`"${pdflatexPath}" -output-directory="${tempDir}" -interaction=nonstopmode "${texFilePath}"`, {
                    timeout: 30000, // 30 second timeout
                    cwd: tempDir
                });

                // Check if PDF was created
                if (fs.existsSync(pdfFilePath)) {
                    const pdfBuffer = fs.readFileSync(pdfFilePath);

                    // Clean up temporary files
                    try {
                        fs.unlinkSync(texFilePath);
                        fs.unlinkSync(pdfFilePath);
                        // Also clean up auxiliary files
                        const auxFile = path.join(tempDir, `resume_${timestamp}.aux`);
                        const logFile = path.join(tempDir, `resume_${timestamp}.log`);
                        if (fs.existsSync(auxFile)) fs.unlinkSync(auxFile);
                        if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
                    } catch (cleanupError) {
                        console.warn('Failed to clean up temporary files:', cleanupError);
                    }

                    return pdfBuffer;
                } else {
                    throw new Error(`PDF compilation failed. LaTeX output: ${stderr || stdout}`);
                }
            } catch (compileError) {
                // Clean up on error
                try {
                    if (fs.existsSync(texFilePath)) fs.unlinkSync(texFilePath);
                } catch (cleanupError) {
                    console.warn('Failed to clean up temporary files:', cleanupError);
                }

                throw new Error(`LaTeX compilation failed: ${compileError.message}`);
            }
        } catch (error) {
            throw new Error(`Failed to compile LaTeX to PDF: ${error.message}`);
        }
    }

    validateLatexContent(latexContent: string): { isValid: boolean; errors: string[] } {
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
            errors
        };
    }

    extractLatexMetadata(latexContent: string): any {
        const metadata: any = {};

        // Extract document class
        const docClassMatch = latexContent.match(/\\documentclass\[([^\]]*)\]\{([^}]+)\}/);
        if (docClassMatch) {
            metadata.documentClass = docClassMatch[2];
            metadata.options = docClassMatch[1];
        }

        // Extract packages
        const packageMatches = latexContent.match(/\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g);
        if (packageMatches) {
            metadata.packages = packageMatches.map(match => {
                const pkgMatch = match.match(/\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/);
                return pkgMatch ? pkgMatch[1] : null;
            }).filter(Boolean);
        }

        // Extract title if present
        const titleMatch = latexContent.match(/\\title\{([^}]+)\}/);
        if (titleMatch) {
            metadata.title = titleMatch[1];
        }

        return metadata;
    }
}
