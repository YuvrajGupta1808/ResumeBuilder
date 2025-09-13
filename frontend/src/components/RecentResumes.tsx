'use client';

import { useApiClient } from '@/lib/api-client';
import { Resume } from '@/types';
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiCalendar, FiEye, FiFileText } from 'react-icons/fi';

export function RecentResumes() {
  const apiClient = useApiClient();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const bg = 'white';
  const borderColor = 'gray.200';

  useEffect(() => {
    fetchResumes();
  }, [apiClient]);

  const fetchResumes = async () => {
    try {
      const response = await apiClient.get('/resumes');
      setResumes(response.data.slice(0, 5)); // Show only recent 5
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewResume = (resume: Resume) => {
    // Create a new window/tab to view the resume content
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${resume.title}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px; 
                line-height: 1.6;
              }
              pre { 
                white-space: pre-wrap; 
                word-wrap: break-word; 
                background: #f5f5f5; 
                padding: 20px; 
                border-radius: 8px;
                border: 1px solid #ddd;
              }
            </style>
          </head>
          <body>
            <h1>${resume.title}</h1>
            <p><strong>Created:</strong> ${new Date(resume.createdAt).toLocaleDateString()}</p>
            <hr>
            <pre>${resume.content}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  if (loading) {
    return (
      <Box
        bg={bg}
        border='1px'
        borderColor={borderColor}
        borderRadius='lg'
        p={6}
      >
        <Text>Loading resumes...</Text>
      </Box>
    );
  }

  return (
    <Box bg={bg} border='1px' borderColor={borderColor} borderRadius='lg' p={4}>
      <VStack align='start' spacing={4}>
        <Heading size='md'>Recent Resumes</Heading>

        {resumes.length === 0 ? (
          <Text color='gray.500' fontSize='sm'>
            No resumes uploaded yet. Upload your first resume to get started.
          </Text>
        ) : (
          <VStack spacing={3} w='full'>
            {resumes.map(resume => (
              <Box
                key={resume.id}
                p={2}
                border='1px'
                borderColor={borderColor}
                borderRadius='md'
                w='full'
                _hover={{ bg: 'gray.50' }}
                cursor='pointer'
              >
                <HStack justify='space-between' align='start'>
                  <HStack spacing={3}>
                    <FiFileText color='brand.400' />
                    <VStack align='start' spacing={1}>
                      <Text fontWeight='semibold' fontSize='sm'>
                        {resume.title}
                      </Text>
                      <HStack spacing={2}>
                        <FiCalendar size={12} color='gray.400' />
                        <Text fontSize='xs' color='gray.500'>
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Button
                    size='xs'
                    variant='ghost'
                    leftIcon={<FiEye />}
                    onClick={() => viewResume(resume)}
                    colorScheme='blue'
                  >
                    View
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
