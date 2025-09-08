import { JobInputForm } from '@/components/JobInputForm';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Badge,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FiBriefcase, FiFileText, FiHome, FiTarget, FiZap } from 'react-icons/fi';

export default function JobInputPage() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex="1" p={8}>
          <Container maxW="container.lg">
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
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" color="gray.500">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color="brand.600" fontWeight="medium">
                      Job Input
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                
                <HStack justify="space-between" align="start" mb={6}>
                  <VStack align="start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        p={3}
                        bg="brand.100"
                        borderRadius="xl"
                        color="brand.600"
                      >
                        <FiBriefcase size={24} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Heading 
                          size="xl" 
                          fontWeight={700}
                          bgGradient="linear(to-r, gray.800, brand.600)"
                          bgClip="text"
                        >
                          Job Description
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                          Enter the job description to tailor your resume and generate a cover letter.
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                  
                  <Badge
                    colorScheme="purple"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack spacing={1}>
                      <FiZap size={12} />
                      <Text>AI-Powered</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>

              {/* Info Alert */}
              <Alert status="info" borderRadius="xl" bg="purple.50" border="1px" borderColor="purple.200">
                <AlertIcon color="purple.500" />
                <Box>
                  <AlertTitle color="purple.800" fontSize="sm" fontWeight="semibold">
                    Pro Tip
                  </AlertTitle>
                  <AlertDescription color="purple.700" fontSize="sm">
                    The more detailed the job description, the better our AI can tailor your resume and cover letter to match the requirements.
                  </AlertDescription>
                </Box>
              </Alert>

              {/* Features Grid */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Box
                      p={3}
                      bg="blue.100"
                      borderRadius="xl"
                      color="blue.600"
                    >
                      <FiTarget size={24} />
                    </Box>
                    <VStack spacing={2}>
                      <Heading size="sm" color="gray.800">
                        Smart Matching
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        AI analyzes job requirements and matches them with your skills
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Box
                      p={3}
                      bg="green.100"
                      borderRadius="xl"
                      color="green.600"
                    >
                      <FiFileText size={24} />
                    </Box>
                    <VStack spacing={2}>
                      <Heading size="sm" color="gray.800">
                        Tailored Resume
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        Customize your resume to highlight relevant experience
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Box
                      p={3}
                      bg="orange.100"
                      borderRadius="xl"
                      color="orange.600"
                    >
                      <FiZap size={24} />
                    </Box>
                    <VStack spacing={2}>
                      <Heading size="sm" color="gray.800">
                        Cover Letter
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        Generate a compelling cover letter that complements your resume
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Process Steps */}
              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                border="1px"
                borderColor="gray.200"
                w="full"
              >
                <VStack spacing={4} align="start">
                  <Heading size="md" color="gray.800">
                    How it works
                  </Heading>
                  <VStack spacing={3} align="start" w="full">
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="brand.100"
                        borderRadius="lg"
                        color="brand.600"
                        fontWeight="bold"
                        minW={8}
                        textAlign="center"
                      >
                        1
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        Paste the complete job description
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="brand.100"
                        borderRadius="lg"
                        color="brand.600"
                        fontWeight="bold"
                        minW={8}
                        textAlign="center"
                      >
                        2
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        AI analyzes requirements and matches with your resume
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="brand.100"
                        borderRadius="lg"
                        color="brand.600"
                        fontWeight="bold"
                        minW={8}
                        textAlign="center"
                      >
                        3
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        Get tailored resume and cover letter in minutes
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              
              {/* Job Input Form */}
              <Box w="full">
                <JobInputForm />
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
