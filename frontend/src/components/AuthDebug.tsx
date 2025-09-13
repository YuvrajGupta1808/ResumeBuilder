'use client';

import { useApiClient } from '@/lib/api-client';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function AuthDebug() {
  const { data: session, status } = useSession();
  const apiClient = useApiClient();
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing authentication...');
      console.log('Session:', session);
      console.log('Session status:', status);

      const response = await apiClient.get('/user/stats');
      console.log('Stats response:', response.data);
      setStats(response.data);
    } catch (err: any) {
      console.error('Auth test error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
      bg='white'
    >
      <VStack spacing={4} align='stretch'>
        <Text fontSize='lg' fontWeight='bold'>
          Authentication Debug
        </Text>

        <Box>
          <Text fontWeight='semibold'>Session Status: {status}</Text>
          <Text fontSize='sm' color='gray.600'>
            {session ? `Logged in as: ${session.user?.email}` : 'Not logged in'}
          </Text>
        </Box>

        <Button onClick={testAuth} isLoading={loading} colorScheme='blue'>
          Test Authentication
        </Button>

        {stats && (
          <Box p={3} bg='green.50' borderRadius='md'>
            <Text fontWeight='semibold' color='green.800'>
              Stats Retrieved:
            </Text>
            <Text fontSize='sm' color='green.700'>
              Total Resumes: {stats.totalResumes}
            </Text>
            <Text fontSize='sm' color='green.700'>
              Total Applications: {stats.totalApplications}
            </Text>
          </Box>
        )}

        {error && (
          <Box p={3} bg='red.50' borderRadius='md'>
            <Text fontWeight='semibold' color='red.800'>
              Error:
            </Text>
            <Text fontSize='sm' color='red.700'>
              {error}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
