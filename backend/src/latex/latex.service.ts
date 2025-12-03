import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class LatexService {
  private readonly resumeTemplate = `\\documentclass[a4paper,8pt]{article}
\\usepackage[a4paper,top=0.3in,left=0.4in,right=0.4in,bottom=0.2in]{geometry} % Ultra-compact margins
\\usepackage{times}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}

% Ultra-compact spacing for single page
\\titleformat{\\section}{\\small\\bfseries}{}{0em}{}  
\\titlespacing{\\section}{0pt}{1pt}{0pt} % Minimal spacing
\\setlength{\\parskip}{0pt} % No paragraph breaks
\\setlength{\\parindent}{0pt}
\\setlength{\\baselineskip}{9pt} % Ultra-tight line spacing

\\begin{document}
\\hyphenpenalty=10000
\\exhyphenpenalty=10000
\\sloppy

\\begin{center}
    {\\large \\textbf{{{name}}}} \\\\[0.01cm]
    \\href{mailto:{{{email}}}}{{{email}}} $\\cdot$ {{{location}}} $\\cdot$ {{{phone}}}\\\\[0.02cm]
    \\href{https://www.linkedin.com/in/{{{linkedin}}}}{linkedin.com/in/{{{linkedin}}}} $\\cdot$ 
    \\href{https://www.{{{website}}}}{www.{{{website}}}} $\\cdot$ 
    \\href{https://github.com/{{{github}}}}{github.com/{{{github}}}}
\\end{center}

\\section*{EDUCATION}
\\vspace{-0.1cm}
\\hrulefill \\\\
{{{education}}}

\\section*{SKILLS}
\\vspace{-0.1cm}
\\hrulefill \\\\[-0.2cm]
\\begin{itemize}[noitemsep, topsep=0pt, parsep=0pt, leftmargin=0pt]
{{{skills}}}
\\end{itemize}

\\section*{EXPERIENCE}
\\vspace{-0.1cm}
\\hrulefill \\\\
{{{experience}}}

\\section*{PROJECTS}
\\vspace{-0.1cm}
\\hrulefill \\\\
{{{projects}}}

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
      body: this.formatCoverLetterBody(coverLetterData.content),
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
      github: '',
      education: '',
      skills: '',
      experience: '',
      projects: '',
    };

    // Extract name (first line)
    if (lines.length > 0) {
      parsedData.name = lines[0].trim();
    }

    // Extract contact info from first few lines
    for (let i = 1; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      if (line.includes('@') && !parsedData.email) {
        parsedData.email = line;
      } else if (
        line.includes('(') &&
        line.includes(')') &&
        !parsedData.phone
      ) {
        parsedData.phone = line;
      } else if (line.includes('linkedin.com') && !parsedData.linkedin) {
        const match = line.match(/linkedin\.com\/in\/([^\\s]+)/);
        if (match) parsedData.linkedin = match[1];
      } else if (line.includes('github.com') && !parsedData.github) {
        const match = line.match(/github\.com\/([^\\s]+)/);
        if (match) parsedData.github = match[1];
      } else if (
        (line.includes('www.') || line.includes('http')) &&
        !parsedData.website
      ) {
        const match = line.match(/www\.([^\\s]+)/);
        if (match) parsedData.website = match[1];
      } else if (
        line &&
        !line.includes('•') &&
        !line.includes('-') &&
        !line.includes('|') &&
        !parsedData.location &&
        line.length > 3
      ) {
        parsedData.location = line;
      }
    }

    // Parse sections dynamically
    let sectionContents: any = {
      education: '',
      skills: '',
      experience: '',
      projects: '',
      summary: '',
      objective: '',
      work: '',
      employment: '',
      professional: '',
      technical: '',
      programming: '',
      languages: '',
      certifications: '',
      awards: '',
      achievements: '',
      volunteer: '',
      activities: '',
      interests: '',
      hobbies: '',
    };

    for (const line of lines) {
      const trimmedLine = line.trim();
      const upperLine = trimmedLine.toUpperCase();

      // Check for section headers
      if (upperLine.includes('EDUCATION') || upperLine.includes('ACADEMIC')) {
        currentSection = 'education';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('SKILLS') ||
        upperLine.includes('TECHNICAL') ||
        upperLine.includes('PROGRAMMING') ||
        upperLine.includes('LANGUAGES')
      ) {
        currentSection = 'skills';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('EXPERIENCE') ||
        upperLine.includes('WORK') ||
        upperLine.includes('EMPLOYMENT') ||
        upperLine.includes('PROFESSIONAL')
      ) {
        currentSection = 'experience';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('PROJECTS') ||
        upperLine.includes('PORTFOLIO')
      ) {
        currentSection = 'projects';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('SUMMARY') ||
        upperLine.includes('OBJECTIVE') ||
        upperLine.includes('PROFILE')
      ) {
        currentSection = 'summary';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('CERTIFICATIONS') ||
        upperLine.includes('CERTIFICATES')
      ) {
        currentSection = 'certifications';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('AWARDS') ||
        upperLine.includes('ACHIEVEMENTS')
      ) {
        currentSection = 'awards';
        sectionContents[currentSection] = '';
      } else if (
        upperLine.includes('VOLUNTEER') ||
        upperLine.includes('ACTIVITIES')
      ) {
        currentSection = 'volunteer';
        sectionContents[currentSection] = '';
      } else if (
        trimmedLine &&
        currentSection &&
        !upperLine.includes('SECTION') &&
        !upperLine.includes('HEADER')
      ) {
        sectionContents[currentSection] += trimmedLine + '\\n';
      }
    }

    // Format the content for LaTeX using the new formatting methods
    parsedData.education = this.formatEducationNew(sectionContents.education);
    parsedData.skills = this.formatSkillsNew(
      sectionContents.skills ||
      sectionContents.technical ||
      sectionContents.programming
    );
    parsedData.experience = this.formatExperienceNew(
      sectionContents.experience ||
      sectionContents.work ||
      sectionContents.employment
    );
    parsedData.projects = this.formatProjectsNew(sectionContents.projects);

    // Ensure content fits on one page by limiting items
    parsedData = this.limitContentForOnePage(parsedData);

    return parsedData;
  }

  private limitContentForOnePage(parsedData: any): any {
    // Limit skills to 5 items maximum (more aggressive)
    if (parsedData.skills) {
      const skillLines = parsedData.skills.split('\\item');
      if (skillLines.length > 6) {
        // 5 items + 1 empty first element
        parsedData.skills = skillLines.slice(0, 6).join('\\item');
      }
    }

    // Limit experience to 2 entries maximum (more aggressive)
    if (parsedData.experience) {
      const expSections = parsedData.experience.split('\\textbf{');
      if (expSections.length > 3) {
        // 2 entries + 1 empty first element
        parsedData.experience = expSections.slice(0, 3).join('\\textbf{');
      }
    }

    // Limit projects to 3 entries maximum and remove duplicates
    if (parsedData.projects) {
      const projSections = parsedData.projects.split('\\textbf{');
      if (projSections.length > 4) {
        // 3 entries + 1 empty first element
        parsedData.projects = projSections.slice(0, 4).join('\\textbf{');
      }

      // Remove duplicate project content
      parsedData.projects = this.removeDuplicateProjectContent(
        parsedData.projects
      );
    }

    return parsedData;
  }

  private removeDuplicateProjectContent(projectsContent: string): string {
    if (!projectsContent) return '';

    const sections = projectsContent.split('\\textbf{');
    const uniqueProjects: string[] = [];
    const seenDescriptions = new Set<string>();

    for (let i = 1; i < sections.length; i++) {
      // Skip first empty element
      const section = sections[i];
      if (!section.trim()) continue;

      // Extract the project description (first bullet point)
      const bulletMatch = section.match(/\\item\s+([^\\]+)/);
      if (bulletMatch) {
        const description = bulletMatch[1].trim().toLowerCase();

        // Check if we've seen this description before
        if (!seenDescriptions.has(description)) {
          seenDescriptions.add(description);
          uniqueProjects.push('\\textbf{' + section);
        }
      } else {
        // If no bullet points, just add it
        uniqueProjects.push('\\textbf{' + section);
      }
    }

    return uniqueProjects.join('');
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

  // New formatting methods for the updated template
  private formatEducationNew(content: string): string {
    if (!content.trim()) {
      return '';
    }

    const lines = content.split('\\n').filter(line => line.trim());
    let formatted = '';
    let currentEntry = '';

    for (const line of lines) {
      if (line.trim()) {
        // Check if this line contains a university/school name (usually contains "University", "College", "Institute", etc.)
        if (
          line.includes('University') ||
          line.includes('College') ||
          line.includes('Institute') ||
          line.includes('School')
        ) {
          // If we have a previous entry, format it first
          if (currentEntry) {
            formatted += this.formatEducationEntry(currentEntry);
          }
          currentEntry = line.trim();
        } else {
          // This is additional info for the current entry
          currentEntry += ' | ' + line.trim();
        }
      }
    }

    // Format the last entry
    if (currentEntry) {
      formatted += this.formatEducationEntry(currentEntry);
    }

    return formatted;
  }

  private formatEducationEntry(entry: string): string {
    const parts = entry.split('|').map(p => p.trim());

    if (parts.length >= 2) {
      const university = parts[0];
      const location = parts[1];
      const degree = parts[2] || '';
      const date = parts[3] || '';

      let formatted = `\\textbf{${university}} \\hfill ${location} \\\\`;
      if (degree) {
        formatted += `${degree}`;
        if (date) {
          formatted += ` \\hfill ${date}`;
        }
      }
      return formatted + '\\n';
    } else {
      // Single line entry
      return `\\textbf{${entry}}\\\\`;
    }
  }

  private formatSkillsNew(content: string): string {
    if (!content.trim()) {
      return '';
    }

    const lines = content.split('\\n').filter(line => line.trim());
    let formatted = '';
    let currentCategory = '';
    let skillsInCategory: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.includes('•') || trimmedLine.includes('-')) {
        // This is a skill item
        const skill = trimmedLine.replace(/[•-]/, '').trim();
        if (currentCategory) {
          skillsInCategory.push(skill);
        } else {
          formatted += `\\item ${skill} \\\\[-0.1cm]`;
        }
      } else if (
        trimmedLine.includes(':') &&
        (trimmedLine.includes('Languages') ||
          trimmedLine.includes('Technologies') ||
          trimmedLine.includes('Tools') ||
          trimmedLine.includes('Frameworks') ||
          trimmedLine.includes('Software') ||
          trimmedLine.includes('Systems'))
      ) {
        // This is a category header
        if (currentCategory && skillsInCategory.length > 0) {
          formatted += `\\item \\textbf{${currentCategory}:} ${skillsInCategory.join(', ')} \\\\[-0.1cm]`;
        }
        currentCategory = trimmedLine.replace(':', '').trim();
        skillsInCategory = [];
      } else if (
        trimmedLine &&
        !trimmedLine.includes('SECTION') &&
        !trimmedLine.includes('HEADER')
      ) {
        // This might be a skill or category
        if (currentCategory) {
          skillsInCategory.push(trimmedLine);
        } else {
          formatted += `\\item ${trimmedLine} \\\\[-0.1cm]`;
        }
      }
    }

    // Handle the last category
    if (currentCategory && skillsInCategory.length > 0) {
      formatted += `\\item \\textbf{${currentCategory}:} ${skillsInCategory.join(', ')} \\\\[-0.1cm]`;
    }

    return formatted;
  }

  private formatExperienceNew(content: string): string {
    if (!content.trim()) {
      return '';
    }

    const lines = content.split('\\n').filter(line => line.trim());
    let formatted = '';
    let currentJob = '';
    let currentCompany = '';
    let currentDates = '';
    let currentLocation = '';
    let bulletPoints: string[] = [];
    let isNewJob = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (
        trimmedLine.includes('|') &&
        !trimmedLine.includes('•') &&
        !trimmedLine.includes('-')
      ) {
        // This is a job title line with pipe separators
        if (currentJob && currentCompany) {
          formatted += this.formatExperienceEntry(
            currentCompany,
            currentJob,
            currentDates,
            currentLocation,
            bulletPoints
          );
        }

        const parts = trimmedLine.split('|');
        currentJob = parts[0].trim();
        currentCompany = parts[1].trim();
        currentDates = parts[2] ? parts[2].trim() : '';
        currentLocation = parts[3] ? parts[3].trim() : '';
        bulletPoints = [];
        isNewJob = true;
      } else if (trimmedLine.includes('•') || trimmedLine.includes('-')) {
        // This is a bullet point
        const bullet = trimmedLine.replace(/[•-]/, '').trim();
        bulletPoints.push(bullet);
        isNewJob = false;
      } else if (
        trimmedLine &&
        !trimmedLine.includes('SECTION') &&
        !trimmedLine.includes('HEADER')
      ) {
        // This might be a company name, job title, or date
        if (isNewJob || (!currentJob && !currentCompany)) {
          // Try to detect if this is a company name (usually contains Inc, Corp, LLC, etc.)
          if (
            trimmedLine.includes('Inc') ||
            trimmedLine.includes('Corp') ||
            trimmedLine.includes('LLC') ||
            trimmedLine.includes('Ltd') ||
            trimmedLine.includes('Company') ||
            trimmedLine.includes('University') ||
            trimmedLine.includes('College')
          ) {
            if (!currentCompany) {
              currentCompany = trimmedLine;
            } else if (!currentJob) {
              currentJob = trimmedLine;
            }
          } else if (
            trimmedLine.match(/\\d{4}/) ||
            trimmedLine.includes('Present') ||
            trimmedLine.includes('Current')
          ) {
            // This looks like a date
            currentDates = trimmedLine;
          } else if (!currentJob) {
            currentJob = trimmedLine;
          } else if (!currentCompany) {
            currentCompany = trimmedLine;
          }
        }
      }
    }

    // Format the last job entry
    if (currentJob && currentCompany) {
      formatted += this.formatExperienceEntry(
        currentCompany,
        currentJob,
        currentDates,
        currentLocation,
        bulletPoints
      );
    }

    return formatted;
  }

  private formatExperienceEntry(
    company: string,
    job: string,
    dates: string,
    location: string,
    bullets: string[]
  ): string {
    let formatted = `\\textbf{${company}}`;
    if (location) {
      formatted += ` \\hfill ${location}`;
    }
    formatted += ` \\\\`;

    if (job) {
      formatted += `${job}`;
      if (dates) {
        formatted += ` \\hfill ${dates}`;
      }
    }

    if (bullets.length > 0) {
      formatted += `\\begin{itemize}[noitemsep, topsep=0pt, parsep=0pt]`;
      for (const bullet of bullets) {
        formatted += `    \\item ${bullet}`;
      }
      formatted += `\\end{itemize}`;
    }

    return formatted + '\\n';
  }

  private formatProjectsNew(content: string): string {
    if (!content.trim()) {
      return '';
    }

    const lines = content.split('\\n').filter(line => line.trim());
    let formatted = '';
    let currentProject = '';
    let currentDates = '';
    let bulletPoints: string[] = [];
    let isNewProject = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (
        trimmedLine.includes('|') &&
        !trimmedLine.includes('•') &&
        !trimmedLine.includes('-')
      ) {
        // This is a project title line with pipe separators
        if (currentProject) {
          formatted += this.formatProjectEntry(
            currentProject,
            currentDates,
            bulletPoints
          );
        }

        const parts = trimmedLine.split('|');
        currentProject = parts[0].trim();
        currentDates = parts[1] ? parts[1].trim() : '';
        bulletPoints = [];
        isNewProject = true;
      } else if (trimmedLine.includes('•') || trimmedLine.includes('-')) {
        // This is a bullet point
        const bullet = trimmedLine.replace(/[•-]/, '').trim();
        bulletPoints.push(bullet);
        isNewProject = false;
      } else if (
        trimmedLine &&
        !trimmedLine.includes('SECTION') &&
        !trimmedLine.includes('HEADER')
      ) {
        // This might be a project name or date
        if (isNewProject || !currentProject) {
          if (
            trimmedLine.match(/\\d{4}/) ||
            trimmedLine.includes('Present') ||
            trimmedLine.includes('Current')
          ) {
            // This looks like a date - ensure it's in the past for projects
            let dateStr = trimmedLine;
            if (dateStr.includes('Present') || dateStr.includes('Current')) {
              // Convert "Present" or "Current" to a past date for projects
              const currentYear = new Date().getFullYear();
              dateStr = dateStr.replace(
                /Present|Current/g,
                `${currentYear - 1}`
              );
            } else {
              // Check if the date is in the future and convert to past
              const yearMatch = dateStr.match(/(\\d{4})/);
              if (yearMatch) {
                const year = parseInt(yearMatch[1]);
                const currentYear = new Date().getFullYear();
                if (year > currentYear) {
                  // Convert future year to past year
                  dateStr = dateStr.replace(
                    year.toString(),
                    (currentYear - 1).toString()
                  );
                }
              }
            }
            currentDates = dateStr;
          } else if (!currentProject) {
            currentProject = trimmedLine;
          }
        }
      }
    }

    // Format the last project entry
    if (currentProject) {
      formatted += this.formatProjectEntry(
        currentProject,
        currentDates,
        bulletPoints
      );
    }

    return formatted;
  }

  private formatProjectEntry(
    project: string,
    dates: string,
    bullets: string[]
  ): string {
    let formatted = `\\textbf{${project}}`;
    if (dates) {
      formatted += ` \\hfill ${dates}`;
    }

    if (bullets.length > 0) {
      formatted += `\\begin{itemize}[noitemsep, topsep=0pt, parsep=0pt]`;
      for (const bullet of bullets) {
        formatted += `    \\item ${bullet}`;
      }
      formatted += `\\end{itemize}`;
    }

    return formatted + '\\n';
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
        const pdflatexPath =
          '/usr/local/texlive/2025/bin/universal-darwin/pdflatex';
        const { stdout, stderr } = await execAsync(
          `"${pdflatexPath}" -output-directory="${tempDir}" -interaction=nonstopmode "${texFilePath}"`,
          {
            timeout: 30000, // 30 second timeout
            cwd: tempDir,
          }
        );

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
          throw new Error(
            `PDF compilation failed. LaTeX output: ${stderr || stdout}`
          );
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

  validateLatexContent(latexContent: string): {
    isValid: boolean;
    errors: string[];
  } {
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

  extractLatexMetadata(latexContent: string): any {
    const metadata: any = {};

    // Extract document class
    const docClassMatch = latexContent.match(
      /\\documentclass\[([^\]]*)\]\{([^}]+)\}/
    );
    if (docClassMatch) {
      metadata.documentClass = docClassMatch[2];
      metadata.options = docClassMatch[1];
    }

    // Extract packages
    const packageMatches = latexContent.match(
      /\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g
    );
    if (packageMatches) {
      metadata.packages = packageMatches
        .map(match => {
          const pkgMatch = match.match(
            /\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/
          );
          return pkgMatch ? pkgMatch[1] : null;
        })
        .filter(Boolean);
    }

    // Extract title if present
    const titleMatch = latexContent.match(/\\title\{([^}]+)\}/);
    if (titleMatch) {
      metadata.title = titleMatch[1];
    }

    return metadata;
  }
}
