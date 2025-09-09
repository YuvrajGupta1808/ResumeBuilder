'use client';

import { useApiClient } from '@/lib/api-client';
import {
    Box,
    SimpleGrid,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Stats {
  totalResumes: number;
  totalApplications: number;
  successRate: number;
  thisMonthApplications: number;
}

export function StatsCards() {
  const apiClient = useApiClient();
  const [stats, setStats] = useState<Stats>({
    totalResumes: 0,
    totalApplications: 0,
    successRate: 0,
    thisMonthApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const bg = 'white';
  const borderColor = 'gray.200';

  useEffect(() => {
    fetchStats();
  }, [apiClient]);

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/user/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            bg={bg}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            p={6}
          >
            <Box h="20" bg="gray.200" borderRadius="md" />
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
      <Box
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <Stat>
          <StatLabel>Total Resumes</StatLabel>
          <StatNumber>{stats.totalResumes}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Active resumes
          </StatHelpText>
        </Stat>
      </Box>

      <Box
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <Stat>
          <StatLabel>Applications Sent</StatLabel>
          <StatNumber>{stats.totalApplications}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            This month: {stats.thisMonthApplications}
          </StatHelpText>
        </Stat>
      </Box>

      <Box
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <Stat>
          <StatLabel>Success Rate</StatLabel>
          <StatNumber>{stats.successRate}%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Response rate
          </StatHelpText>
        </Stat>
      </Box>

      <Box
        bg={bg}
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
      >
        <Stat>
          <StatLabel>Time Saved</StatLabel>
          <StatNumber>24h</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            This month
          </StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
}
