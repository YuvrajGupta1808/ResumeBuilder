'use client';

import { useApiClient } from '@/lib/api-client';
import { Resume } from '@/types';
import {
  Badge,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiCalendar, FiFileText } from 'react-icons/fi';

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

  if (loading) {
    return (
      <Box
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <Text>Loading resumes...</Text>
      </Box>
    );
  }

  return (
    <Box
      bg={bg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
    >
      <VStack align="start" spacing={4}>
        <Heading size="md">Recent Resumes</Heading>
        
        {resumes.length === 0 ? (
          <Text color="gray.500" fontSize="sm">
            No resumes uploaded yet. Upload your first resume to get started.
          </Text>
        ) : (
          <VStack spacing={3} w="full">
            {resumes.map((resume) => (
              <Box
                key={resume.id}
                p={3}
                border="1px"
                borderColor={borderColor}
                borderRadius="md"
                w="full"
                _hover={{ bg: 'gray.50' }}
                cursor="pointer"
              >
                <HStack justify="space-between" align="start">
                  <HStack spacing={3}>
                    <FiFileText color="brand.400" />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {resume.title}
                      </Text>
                      <HStack spacing={2}>
                        <FiCalendar size={12} color="gray.400" />
                        <Text fontSize="xs" color="gray.500">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Badge colorScheme="green" fontSize="xs">
                    Ready
                  </Badge>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
