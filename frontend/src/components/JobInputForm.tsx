'use client';

import { api } from '@/lib/api';
import { Resume } from '@/types';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const jobInputSchema = z.object({
  resumeId: z.string().min(1, 'Please select a resume'),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters'),
});

type JobInputFormData = z.infer<typeof jobInputSchema>;

export function JobInputForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInputFormData>({
    resolver: zodResolver(jobInputSchema),
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes');
      setResumes(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching resumes',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data: JobInputFormData) => {
    setIsProcessing(true);
    try {
      const response = await api.post('/ai/tailor-resume', data);
      
      toast({
        title: 'Resume tailored successfully!',
        description: 'Your resume and cover letter are ready.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to results page
      window.location.href = `/results?jobHistoryId=${response.data.jobHistoryId}`;
    } catch (error) {
      toast({
        title: 'Error processing request',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box maxW="2xl" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.resumeId}>
            <FormLabel>Select Resume</FormLabel>
            <Select
              {...register('resumeId')}
              placeholder="Choose a resume to tailor"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.resumeId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.jobTitle}>
            <FormLabel>Job Title</FormLabel>
            <Input
              {...register('jobTitle')}
              placeholder="e.g., Senior Software Engineer"
            />
            <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.company}>
            <FormLabel>Company Name</FormLabel>
            <Input
              {...register('company')}
              placeholder="e.g., Google, Microsoft, etc."
            />
            <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.jobDescription}>
            <FormLabel>Job Description</FormLabel>
            <Textarea
              {...register('jobDescription')}
              placeholder="Paste the complete job description here..."
              rows={12}
            />
            <FormErrorMessage>{errors.jobDescription?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            isLoading={isProcessing}
            loadingText="Processing..."
            w="full"
          >
            Tailor Resume & Generate Cover Letter
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
