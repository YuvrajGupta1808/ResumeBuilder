'use client';

import { api } from '@/lib/api';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
    VStack,
    
    useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(100, 'Resume content must be at least 100 characters'),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

export function ResumeUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const toast = useToast();
  const borderColor = 'gray.300';

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
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadedFile(file);
        // In a real app, you'd extract text from the file here
        // For now, we'll just set a placeholder
        setValue('content', 'Resume content extracted from file...');
        setValue('title', file.name.replace(/\.[^/.]+$/, ''));
      }
    },
  });

  const onSubmit = async (data: ResumeFormData) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }

      await api.post('/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Resume uploaded successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error uploading resume',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box maxW="2xl" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Upload Resume File</FormLabel>
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor={isDragActive ? 'brand.400' : borderColor}
              borderRadius="md"
              p={8}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: 'brand.400' }}
            >
              <input {...getInputProps()} />
              {uploadedFile ? (
                <Box>
                  <Text fontWeight="semibold">{uploadedFile.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </Box>
              ) : (
                <Box>
                  <Text>
                    {isDragActive
                      ? 'Drop the file here...'
                      : 'Drag & drop your resume here, or click to select'}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Supports PDF, DOC, DOCX files
                  </Text>
                </Box>
              )}
            </Box>
          </FormControl>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Resume Title</FormLabel>
            <Input
              {...register('title')}
              placeholder="e.g., Software Engineer Resume"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel>Resume Content</FormLabel>
            <Textarea
              {...register('content')}
              placeholder="Paste your resume content here or upload a file above..."
              rows={10}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            isLoading={isUploading}
            loadingText="Uploading..."
            w="full"
          >
            Upload Resume
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
