'use client';

import { AppLayout } from '@/components/AppLayout';
import { QuickActions } from '@/components/QuickActions';
import { RecentJobApplications } from '@/components/RecentJobApplications';
import { RecentResumes } from '@/components/RecentResumes';
import { StatsCards } from '@/components/StatsCards';
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { FiCalendar, FiHome, FiTrendingUp } from 'react-icons/fi';

export default function DashboardPage() {
  const { data: session } = useSession();
  
  return (
    <AppLayout>
      <Box bg="gray.50" p={8}>
          <Container maxW="container.xl" mx="auto" className="centered-content">
            <VStack align="start" spacing={8}>
              {/* Header Section */}
              <Box w="full">
                <Breadcrumb mb={4}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" color="gray.500">
                      <HStack spacing={2}>
                        <FiHome size={12} />
                        <Text fontSize="sm">Home</Text>
                      </HStack>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="brand.600" fontWeight="medium">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                
                <HStack justify="space-between" align="start" mb={6}>
                  <VStack align="start" spacing={2}>
                    <Heading 
                      size="xl" 
                      fontWeight={700}
                      bg="linear(to-r, gray.800, brand.600)"
                      bgClip="text"
                    >
                      Dashboard
                    </Heading>
                    <Text color="gray.600" fontSize="lg">
                      Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}! Here's your job application overview and insights.
                    </Text>
                  </VStack>
                  
                  <HStack spacing={3}>
                    <Badge
                      colorScheme="green"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      <HStack spacing={1}>
                        <FiTrendingUp size={12} />
                        <Text>Active</Text>
                      </HStack>
                    </Badge>
                    <Badge
                      colorScheme="blue"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      <HStack spacing={1}>
                        <FiCalendar size={12} />
                        <Text>Today</Text>
                      </HStack>
                    </Badge>
                  </HStack>
                </HStack>
              </Box>
              
              {/* Stats Cards */}
              <Box w="full">
                <StatsCards />
              </Box>
              
              {/* Main Content Grid */}
              <Grid 
                templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }} 
                gap={8} 
                w="full"
                alignItems="start"
              >
                <GridItem>
                  <RecentResumes />
                </GridItem>
                <GridItem>
                  <RecentJobApplications />
                </GridItem>
                <GridItem>
                  <QuickActions />
                </GridItem>
              </Grid>
            </VStack>
          </Container>
      </Box>
    </AppLayout>
  );
}
