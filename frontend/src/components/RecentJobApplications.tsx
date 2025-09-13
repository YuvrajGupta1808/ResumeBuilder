'use client';

import { useApiClient } from '@/lib/api-client';
import { JobHistory } from '@/types';
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCalendar, FiDownload, FiFileText } from 'react-icons/fi';

export function RecentJobApplications() {
  const apiClient = useApiClient();
  const [jobApplications, setJobApplications] = useState<JobHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const bg = 'white';
  const borderColor = 'gray.200';

  useEffect(() => {
    fetchJobApplications();
  }, [apiClient]);

  const fetchJobApplications = async () => {
    try {
      const response = await apiClient.get('/job-history');
      setJobApplications(response.data.slice(0, 5)); // Show only recent 5
    } catch (error) {
      console.error('Error fetching job applications:', error);
    } finally {
      setLoading(false);
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
        <Text>Loading job applications...</Text>
      </Box>
    );
  }

  return (
    <Box bg={bg} border='1px' borderColor={borderColor} borderRadius='lg' p={4}>
      <VStack align='start' spacing={4}>
        <Heading size='md'>Recent Job Applications</Heading>

        {jobApplications.length === 0 ? (
          <Text color='gray.500' fontSize='sm'>
            No job applications yet. Start by tailoring your resume for a
            specific job.
          </Text>
        ) : (
          <VStack spacing={3} w='full'>
            {jobApplications.map(application => (
              <Box
                key={application.id}
                p={3}
                border='1px'
                borderColor={borderColor}
                borderRadius='md'
                w='full'
                _hover={{ bg: 'gray.50' }}
              >
                <VStack align='start' spacing={3}>
                  <HStack spacing={3}>
                    <FiFileText color='brand.400' />
                    <VStack align='start' spacing={1}>
                      <Text fontWeight='semibold' fontSize='sm'>
                        {application.jobTitle}
                      </Text>
                      <Text fontSize='xs' color='gray.600'>
                        {application.company}
                      </Text>
                      <HStack spacing={2}>
                        <FiCalendar size={12} color='gray.400' />
                        <Text fontSize='xs' color='gray.500'>
                          {new Date(application.createdAt).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <HStack spacing={2} w='full'>
                    <Link
                      href={`/download?jobHistoryId=${application.id}`}
                      style={{ flex: 1 }}
                    >
                      <Button
                        leftIcon={<FiDownload />}
                        colorScheme='brand'
                        size='sm'
                        w='full'
                      >
                        Download
                      </Button>
                    </Link>
                    <Link
                      href={`/download?jobHistoryId=${application.id}`}
                      style={{ flex: 1 }}
                    >
                      <Button variant='outline' size='sm' w='full'>
                        View
                      </Button>
                    </Link>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
