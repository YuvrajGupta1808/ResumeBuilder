'use client';

import { useApiClient } from '@/lib/api-client';
import { Resume } from '@/types';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Select,
    Text,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiBriefcase, FiFileText, FiZap } from 'react-icons/fi';
import { z } from 'zod';

const jobInputSchema = z.object({
  resumeId: z.string().min(1, 'Please select a resume'),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  jobDescription: z
    .string()
    .min(50, 'Job description must be at least 50 characters'),
});

type JobInputFormData = z.infer<typeof jobInputSchema>;

export function JobInputForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const toast = useToast();
  const apiClient = useApiClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInputFormData>({
    resolver: zodResolver(jobInputSchema),
  });

  useEffect(() => {
    fetchResumes();
  }, [apiClient]);

  const fetchResumes = async () => {
    try {
      const response = await apiClient.get('/resumes');
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
    
    // Show initial processing toast
    toast({
      title: 'AI Processing Started',
      description: 'Our AI is analyzing the job description and tailoring your resume. This may take 30-60 seconds...',
      status: 'info',
      duration: 10000,
      isClosable: true,
    });

    try {
      // First, tailor the resume with AI with extended timeout
      const response = await apiClient.post('/ai/tailor-resume', data, {
        timeout: 120000, // 2 minutes timeout
      });
      console.log('AI tailoring response:', response.data);

      toast({
        title: 'Resume tailored successfully!',
        description: 'Your resume and cover letter are ready.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to download page
      console.log(
        'Redirecting to download page with jobHistoryId:',
        response.data.jobHistoryId
      );
      window.location.href = `/download?jobHistoryId=${response.data.jobHistoryId}`;
    } catch (error: any) {
      console.error('AI tailoring error:', error);
      
      let errorMessage = 'Please try again later.';
      let errorTitle = 'Error processing request';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorTitle = 'Request Timeout';
        errorMessage = 'The AI processing is taking longer than expected. Please try again or check back in a few minutes.';
      } else if (error.response?.status === 500) {
        errorTitle = 'Server Error';
        errorMessage = 'There was a server error. Please try again in a few minutes.';
      } else if (error.response?.status === 429) {
        errorTitle = 'Rate Limited';
        errorMessage = 'Too many requests. Please wait a moment before trying again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8} align='stretch'>
          <FormControl isInvalid={!!errors.resumeId}>
            <FormLabel
              fontSize='lg'
              fontWeight='700'
              color='gray.800'
              mb={4}
              display='flex'
              alignItems='center'
              gap={3}
              ml={2}
            >
              <FiFileText size={20} />
              Select Resume
            </FormLabel>
            <Select
              {...register('resumeId')}
              placeholder='Choose a resume to tailor for the job'
              size='lg'
              h='60px'
              borderRadius='xl'
              border='2px solid'
              borderColor='gray.200'
              bg='white'
              ml={6}
              mr={6}
              _hover={{
                borderColor: 'brand.300',
              }}
              _focus={{
                borderColor: 'brand.400',
                boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
              }}
              fontSize='md'
              fontWeight='500'
              sx={{
                '> option': {
                  bg: 'white',
                  color: 'gray.800',
                },
              }}
            >
              {resumes.map(resume => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </Select>
            <FormErrorMessage ml={6} fontSize='sm' fontWeight='500'>
              {errors.resumeId?.message}
            </FormErrorMessage>
            {resumes.length === 0 && (
              <Text
                ml={6}
                fontSize='sm'
                color='orange.500'
                mt={2}
                fontWeight='500'
              >
                No resumes found. Please upload a resume first.
              </Text>
            )}
          </FormControl>

          <HStack spacing={6} align='start'>
            <FormControl isInvalid={!!errors.jobTitle} flex='1'>
              <FormLabel
                fontSize='lg'
                fontWeight='700'
                color='gray.800'
                mb={4}
                display='flex'
                alignItems='center'
                gap={3}
                ml={2}
              >
                <FiBriefcase size={20} />
                Job Title
              </FormLabel>
              <Input
                {...register('jobTitle')}
                placeholder='e.g., Senior Software Engineer'
                size='lg'
                h='60px'
                borderRadius='xl'
                border='2px solid'
                borderColor='gray.200'
                bg='white'
                ml={6}
                mr={3}
                px={6}
                width={'72%'}
                _hover={{
                  borderColor: 'brand.300',
                }}
                _focus={{
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
                }}
                fontSize='md'
                fontWeight='500'
                _placeholder={{
                  color: 'gray.400',
                  fontSize: 'md',
                }}
              />
              <FormErrorMessage ml={6} fontSize='sm' fontWeight='500'>
                {errors.jobTitle?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.company} flex='1'>
              <FormLabel
                fontSize='lg'
                fontWeight='700'
                color='gray.800'
                mb={4}
                display='flex'
                alignItems='center'
                gap={3}
                ml={2}
              >
                <FiBriefcase size={20} />
                Company Name
              </FormLabel>
              <Input
                {...register('company')}
                placeholder='e.g., Google, Microsoft'
                size='lg'
                h='60px'
                borderRadius='xl'
                border='2px solid'
                borderColor='gray.200'
                bg='white'
                ml={3}
                mr={6}
                px={6}
                width={'72%'}
                _hover={{
                  borderColor: 'brand.300',
                }}
                _focus={{
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
                }}
                fontSize='md'
                fontWeight='500'
                _placeholder={{
                  color: 'gray.400',
                  fontSize: 'md',
                }}
              />
              <FormErrorMessage ml={3} fontSize='sm' fontWeight='500'>
                {errors.company?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.jobDescription}>
            <FormLabel
              fontSize='lg'
              fontWeight='700'
              color='gray.800'
              mb={4}
              display='flex'
              alignItems='center'
              gap={3}
              ml={2}
            >
              <FiFileText size={20} />
              Job Description
            </FormLabel>
            <Text
              ml={6}
              fontSize='sm'
              color='gray.600'
              mb={4}
              fontWeight='500'
              lineHeight='1.6'
            >
              Paste the complete job description below. The more detailed it is,
              the better we can tailor your resume and generate your cover
              letter.
            </Text>
            <Textarea
              {...register('jobDescription')}
              placeholder="Paste the complete job description here...

Example:
We are looking for a Senior Software Engineer to join our dynamic team...

• 5+ years of experience in React and Node.js
• Strong knowledge of databases and cloud services  
• Experience with agile development methodologies
• Bachelor's degree in Computer Science or related field
• Excellent communication and problem-solving skills

Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Mentor junior developers
• Participate in code reviews and technical discussions
..."
              rows={15}
              borderRadius='xl'
              border='2px solid'
              borderColor='gray.200'
              ml={6}
              mr={6}
              px={6}
              py={4}
              width={'85%'}
              bg='white'
              _hover={{
                borderColor: 'brand.300',
              }}
              _focus={{
                borderColor: 'brand.400',
                boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
              }}
              fontSize='md'
              fontWeight='500'
              resize='vertical'
              minH='320px'
              _placeholder={{
                color: 'gray.400',
                fontSize: 'sm',
                lineHeight: '1.5',
              }}
            />
            <FormErrorMessage ml={6} fontSize='sm' fontWeight='500'>
              {errors.jobDescription?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            size='lg'
            isLoading={isProcessing}
            loadingText='AI is processing... (30-60s)'
            h='56px'
            borderRadius='xl'
            fontSize='lg'
            fontWeight='700'
            bg='linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)'
            color='white'
            border='none'
            ml={6}
            mr={6}
            isDisabled={isProcessing}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: isProcessing ? 'none' : 'translateY(-2px)',
                boxShadow: isProcessing ? 'none' : '0 12px 32px rgba(147, 51, 234, 0.3)',
                bg: isProcessing ? 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)' : 'linear-gradient(135deg, #8b2bd9 0%, #6d28d9 100%)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
            leftIcon={!isProcessing ? <FiZap size={20} /> : undefined}
          >
            {isProcessing ? 'AI Processing...' : 'Tailor Resume & Generate Cover Letter'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
