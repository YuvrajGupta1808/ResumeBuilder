export interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Resume {
    id: string;
    userId: string;
    title: string;
    content: string;
    originalContent: string;
    fileName: string;
    fileSize: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface JobHistory {
    id: string;
    userId: string;
    resumeId: string;
    jobTitle: string;
    company: string;
    jobDescription: string;
    tailoredResume: string;
    coverLetter: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TailorResumeRequest {
    resumeId: string;
    jobDescription: string;
    jobTitle: string;
    company: string;
}

export interface TailorResumeResponse {
    tailoredResume: string;
    coverLetter: string;
    jobHistoryId: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
