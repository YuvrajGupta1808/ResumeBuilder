'use client';

import { apiConfig } from '@/lib/api';
import { useApiClient } from '@/lib/api-client';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
  VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
// PDF extraction will be handled server-side or with a different approach
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { FiCheck, FiFile, FiUploadCloud } from 'react-icons/fi';
import { z } from 'zod';

const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(100, 'Resume content must be at least 100 characters'),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

export function ResumeUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const toast = useToast();
  const borderColor = 'gray.300';
  const apiClient = useApiClient();

  // Function to extract text from PDF using server-side extraction
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post('/resumes/extract-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Check if there's an error in the response
      if (response.data.error) {
        console.log('PDF extraction error:', response.data.error);
        // Return the fallback text if available, otherwise throw error
        if (response.data.text) {
          return response.data.text;
        }
        throw new Error(response.data.error);
      }
      
      const extractedText = response.data.text;
      
      if (extractedText && extractedText.length > 50) {
        return extractedText;
      } else {
        return `PDF file uploaded: ${file.name}

Note: Limited text was extracted from this PDF. Please review and add any missing content manually.

${extractedText || 'No text could be extracted from this PDF file.'}`;
      }
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF. Please add your resume content manually.');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.tex'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadedFile(file);
        setValue('title', file.name.replace(/\.[^/.]+$/, ''));
        
        // Handle PDF files
        if (file.type === 'application/pdf') {
          setIsExtracting(true);
          try {
            const extractedText = await extractTextFromPDF(file);
            setValue('content', extractedText);
            toast({
              title: 'PDF Text Extracted Successfully!',
              description: 'Text has been extracted from your PDF. Please review and edit if needed.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } catch (error) {
            console.error('PDF extraction error:', error);
            setValue('content', 'Resume content extracted from file...');
            toast({
              title: 'PDF Extraction Failed',
              description: 'Could not extract text from PDF. Please add your resume content manually.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } finally {
            setIsExtracting(false);
          }
        } else if (file.name.endsWith('.tex')) {
          // Handle LaTeX files
          setIsExtracting(true);
          try {
            const latexContent = await file.text();
            setValue('content', latexContent);
            toast({
              title: 'LaTeX File Loaded Successfully!',
              description: 'LaTeX content has been loaded. You can edit it before saving.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } catch (error) {
            console.error('LaTeX file reading error:', error);
            setValue('content', 'LaTeX content loaded from file...');
            toast({
              title: 'LaTeX File Reading Failed',
              description: 'Could not read LaTeX file. Please try again.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } finally {
            setIsExtracting(false);
          }
        } else {
          // For other files, set placeholder text
          setValue('content', 'Resume content extracted from file...');
        }
      }
    },
  });

  const testApiConnection = async () => {
    console.log('=== Testing API Connection ===');
    console.log('API Base URL:', apiConfig.baseURL);
    console.log('Environment:', apiConfig.isDevelopment ? 'Development' : 'Production');
    
    try {
      // Test profile endpoint with authenticated client
      console.log('Testing profile endpoint with authenticated client...');
      const profileResponse = await apiClient.get('/user/profile');
      console.log('✅ Profile endpoint successful:', profileResponse.data);
      
      toast({
        title: 'API Connection Test',
        description: 'Successfully connected to backend!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('❌ API connection failed:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      });
      
      let errorMessage = error.message || 'Cannot connect to backend';
      if (error.response?.status) {
        errorMessage = `HTTP ${error.response.status}: ${errorMessage}`;
      }
      
      toast({
        title: 'API Connection Test Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data: ResumeFormData) => {
    console.log('=== Resume Upload Form Submission ===');
    console.log('API Base URL:', apiConfig.baseURL);
    console.log('Environment:', apiConfig.isDevelopment ? 'Development' : 'Production');
    console.log('Form data:', data);
    console.log('Uploaded file:', uploadedFile);
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('originalContent', data.content); // Backend expects this field
      if (uploadedFile) {
        formData.append('file', uploadedFile);
        console.log('File details:', {
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type,
        });
      }

      console.log('Sending request to /resumes endpoint...');
      const response = await apiClient.post('/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Upload successful:', response.data);
      toast({
        title: 'Resume uploaded successfully!',
        description: `Resume "${data.title}" has been saved.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form after successful upload
      setUploadedFile(null);
      setValue('title', '');
      setValue('content', '');
    } catch (error: any) {
      console.error('❌ Upload error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error config:', error.config);
      
      // Show more detailed error message
      let errorMessage = 'Please try again later.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to backend server. Please check if the backend is running.';
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage = 'Request timed out. The server may be slow or unresponsive.';
      }
      
      toast({
        title: 'Error uploading resume',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box w="full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8} align="stretch">
          <FormControl>
            <FormLabel 
              fontSize="lg" 
              fontWeight="700" 
              color="gray.800" 
              mb={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <FiUploadCloud size={20} />
              Upload Resume File
            </FormLabel>
            <Box
              {...getRootProps()}
              border="3px dashed"
              borderColor={isDragActive ? 'brand.400' : 'gray.300'}
              borderRadius="2xl"
              p={12}
              textAlign="center"
              cursor="pointer"
              bg={isDragActive ? 'brand.50' : 'gray.50'}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'brand.400',
                  bg: 'brand.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(0, 136, 255, 0.15)',
                },
              }}
            >
              <input {...getInputProps()} />
              {uploadedFile ? (
                <VStack spacing={4}>
                  <Box
                    p={4}
                    bg="green.100"
                    borderRadius="full"
                    color="green.600"
                  >
                    <FiCheck size={32} />
                  </Box>
                  <VStack spacing={2}>
                    <HStack spacing={2} align="center">
                      <FiFile size={18} />
                      <Text fontWeight="700" fontSize="lg" color="gray.800">
                        {uploadedFile.name}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" fontWeight="500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • File uploaded successfully
                    </Text>
                  </VStack>
                </VStack>
              ) : (
                <VStack spacing={4}>
                  <Box
                    p={4}
                    bg="brand.100"
                    borderRadius="full"
                    color="brand.600"
                  >
                    <FiUploadCloud size={32} />
                  </Box>
                  <VStack spacing={2}>
                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                      {isExtracting
                        ? 'Extracting text from PDF...'
                        : isDragActive
                        ? 'Drop the file here...'
                        : 'Drag & drop your resume here, or click to select'}
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="500">
                      {isExtracting
                        ? 'Please wait while we extract the text content'
                        : 'Supports PDF, DOC, DOCX, and LaTeX (.tex) files up to 10MB'}
                    </Text>
                  </VStack>
                </VStack>
              )}
            </Box>
          </FormControl>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel 
              fontSize="lg" 
              fontWeight="700" 
              color="gray.800" 
              mb={4}
              display="flex"
              alignItems="center"
              gap={3}
              ml={2}
            >
              <FiFile size={20} />
              Resume Title
            </FormLabel>
            <Input
              {...register('title')}
              placeholder="e.g.,  Software Engineer Resume  •  Marketing Manager CV  •  Data Scientist Profile"
              size="lg"
              h="60px"
              borderRadius="xl"
              border="2px solid"
              borderColor="gray.200"
              bg="white"
              ml={6}
              mr={6}
              px={6}
              width={"32%"}
              _hover={{
                borderColor: 'brand.300',
              }}
              _focus={{
                borderColor: 'brand.400',
                boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
              }}
              fontSize="md"
              fontWeight="500"
              _placeholder={{
                color: 'gray.400',
                fontSize: 'md',
              }}
            />
            <FormErrorMessage ml={6} fontSize="sm" fontWeight="500">
              {errors.title?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel 
              fontSize="lg" 
              fontWeight="700" 
              color="gray.800" 
              mb={4}
              display="flex"
              alignItems="center"
              gap={3}
              ml={2}
            >
              <FiFile size={20} />
              Resume Content
            </FormLabel>
            <Text ml={6} fontSize="sm" color="gray.600" mb={4} fontWeight="500" lineHeight="1.6">
              Paste your resume content here or upload a file above. Include all your experience, skills, and achievements.
            </Text>
            <Textarea
              {...register('content')}
              placeholder="Paste your resume content here or upload a file above...

Example:
JOHN DOE
Senior Software Engineer
Email: john.doe@email.com | Phone: (555) 123-4567

PROFESSIONAL SUMMARY
• 5+ years of experience in full-stack development
• Expertise in React, Node.js, and cloud technologies
• Strong problem-solving and leadership skills

WORK EXPERIENCE
Software Engineer | ABC Company | 2020-Present
• Developed and maintained web applications using React and Node.js
• Collaborated with cross-functional teams to deliver high-quality software
• Improved application performance by 30% through optimization techniques
..."
              rows={12}
              borderRadius="xl"
              border="2px solid"
              borderColor="gray.200"
              bg="white"
              ml={6}
              mr={6}
              px={6}
              py={4}
              width={"85%"}
              _hover={{
                borderColor: 'brand.300',
              }}
              _focus={{
                borderColor: 'brand.400',
                boxShadow: '0 0 0 3px rgba(0, 136, 255, 0.1)',
              }}
              fontSize="md"
              fontWeight="500"
              resize="vertical"
              minH="280px"
              _placeholder={{
                color: 'gray.400',
                fontSize: 'sm',
                lineHeight: '1.5',
              }}
            />
            <FormErrorMessage ml={6} fontSize="sm" fontWeight="500">
              {errors.content?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            size="lg"
            isLoading={isUploading}
            loadingText="Uploading..."
            h="56px"
            borderRadius="xl"
            fontSize="lg"
            fontWeight="700"
            bg="linear-gradient(135deg, #0088ff 0%, #0066cc 100%)"
            color="white"
            border="none"
            ml={6}
            mr={6}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(0, 136, 255, 0.3)',
                bg: 'linear-gradient(135deg, #0077ee 0%, #0055bb 100%)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
            leftIcon={<FiUploadCloud size={20} />}
          >
            Upload Resume
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
