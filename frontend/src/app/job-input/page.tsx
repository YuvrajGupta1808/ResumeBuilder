import { JobInputForm } from '@/components/JobInputForm';
import { Navbar } from '@/components/Navbar';
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
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import { FiBriefcase, FiFileText, FiHome, FiTarget, FiZap } from 'react-icons/fi';

export default function JobInputPage() {
  return (
    <Box bg="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" minH="100vh">
      <Navbar />
      <Box display="flex">
        <Box flex="1" p={8}>
          <Container maxW="container.lg" mx="auto" className="centered-content">
            <VStack align="start" spacing={8} className="fade-in">
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
                  <VStack align="start" spacing={3} className="slide-in-left">
                    <HStack spacing={4} align="center">
                      <Box
                        p={4}
                        bg="linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.2))"
                        borderRadius="2xl"
                        color="purple.600"
                        border="2px solid"
                        borderColor="rgba(147, 51, 234, 0.2)"
                        boxShadow="0 8px 25px rgba(147, 51, 234, 0.15)"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px) scale(1.05)',
                            boxShadow: '0 15px 35px rgba(147, 51, 234, 0.25)',
                          },
                        }}
                      >
                        <FiBriefcase size={28} />
                      </Box>
                      <VStack align="start" spacing={2}>
                        <Heading 
                          size="xl" 
                          fontWeight={800}
                          sx={{
                            background: 'linear-gradient(135deg, #1a202c 0%, #9333ea 70%, #7c3aed 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 8s ease infinite',
                          }}
                        >
                          Job Description
                        </Heading>
                        <Text color="gray.600" fontSize="lg" fontWeight="500" lineHeight="1.6">
                          Enter the job description to tailor your resume and generate a cover letter.
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                  
                  <Badge
                    bg="rgba(147, 51, 234, 0.1)"
                    color="purple.700"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="600"
                    border="1px solid"
                    borderColor="rgba(147, 51, 234, 0.2)"
                    boxShadow="0 4px 12px rgba(147, 51, 234, 0.1)"
                    className="scale-in"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 8px 20px rgba(147, 51, 234, 0.2)',
                        bg: 'rgba(147, 51, 234, 0.15)',
                      },
                    }}
                  >
                    <HStack spacing={2}>
                      <FiZap size={14} />
                      <Text>AI-Powered</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>

              {/* Info Alert */}
              <Alert 
                status="info" 
                borderRadius="2xl" 
                bg="rgba(147, 51, 234, 0.05)" 
                border="1px" 
                borderColor="rgba(147, 51, 234, 0.2)"
                boxShadow="0 8px 25px rgba(147, 51, 234, 0.1)"
                className="slide-in-right"
                sx={{
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(147, 51, 234, 0.15)',
                  },
                }}
              >
                <AlertIcon color="purple.500" boxSize="18px" />
                <Box>
                  <AlertTitle color="purple.800" fontSize="sm" fontWeight="700">
                    Pro Tip
                  </AlertTitle>
                  <AlertDescription color="purple.700" fontSize="sm" fontWeight="500">
                    The more detailed the job description, the better our AI can tailor your resume and cover letter to match the requirements.
                  </AlertDescription>
                </Box>
              </Alert>

              {/* Features Grid */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full" className="scale-in">
                <Box
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(20px)"
                  p={8}
                  borderRadius="2xl"
                  border="1px"
                  borderColor="rgba(59, 130, 246, 0.2)"
                  textAlign="center"
                  boxShadow="0 8px 25px rgba(59, 130, 246, 0.1)"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(59, 130, 246, 0.2)',
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    },
                  }}
                >
                  <VStack spacing={5}>
                    <Box
                      p={4}
                      bg="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2))"
                      borderRadius="2xl"
                      color="blue.600"
                      border="2px solid"
                      borderColor="rgba(59, 130, 246, 0.2)"
                      boxShadow="0 8px 25px rgba(59, 130, 246, 0.15)"
                    >
                      <FiTarget size={28} />
                    </Box>
                    <VStack spacing={3}>
                      <Heading size="md" color="gray.800" fontWeight="700">
                        Smart Matching
                      </Heading>
                      <Text fontSize="sm" color="gray.600" fontWeight="500" lineHeight="1.6">
                        AI analyzes job requirements and matches them with your skills
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(20px)"
                  p={8}
                  borderRadius="2xl"
                  border="1px"
                  borderColor="rgba(34, 197, 94, 0.2)"
                  textAlign="center"
                  boxShadow="0 8px 25px rgba(34, 197, 94, 0.1)"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(34, 197, 94, 0.2)',
                      borderColor: 'rgba(34, 197, 94, 0.3)',
                    },
                  }}
                >
                  <VStack spacing={5}>
                    <Box
                      p={4}
                      bg="linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.2))"
                      borderRadius="2xl"
                      color="green.600"
                      border="2px solid"
                      borderColor="rgba(34, 197, 94, 0.2)"
                      boxShadow="0 8px 25px rgba(34, 197, 94, 0.15)"
                    >
                      <FiFileText size={28} />
                    </Box>
                    <VStack spacing={3}>
                      <Heading size="md" color="gray.800" fontWeight="700">
                        Tailored Resume
                      </Heading>
                      <Text fontSize="sm" color="gray.600" fontWeight="500" lineHeight="1.6">
                        Customize your resume to highlight relevant experience
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(20px)"
                  p={8}
                  borderRadius="2xl"
                  border="1px"
                  borderColor="rgba(251, 146, 60, 0.2)"
                  textAlign="center"
                  boxShadow="0 8px 25px rgba(251, 146, 60, 0.1)"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(251, 146, 60, 0.2)',
                      borderColor: 'rgba(251, 146, 60, 0.3)',
                    },
                  }}
                >
                  <VStack spacing={5}>
                    <Box
                      p={4}
                      bg="linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(251, 146, 60, 0.2))"
                      borderRadius="2xl"
                      color="orange.600"
                      border="2px solid"
                      borderColor="rgba(251, 146, 60, 0.2)"
                      boxShadow="0 8px 25px rgba(251, 146, 60, 0.15)"
                    >
                      <FiZap size={28} />
                    </Box>
                    <VStack spacing={3}>
                      <Heading size="md" color="gray.800" fontWeight="700">
                        Cover Letter
                      </Heading>
                      <Text fontSize="sm" color="gray.600" fontWeight="500" lineHeight="1.6">
                        Generate a compelling cover letter that complements your resume
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Process Steps */}
              <Box
                bg="rgba(255, 255, 255, 0.9)"
                backdropFilter="blur(20px)"
                p={8}
                borderRadius="2xl"
                border="1px"
                borderColor="rgba(0, 136, 255, 0.1)"
                w="full"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.08)"
                className="card-modern"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                <VStack spacing={6} align="start">
                  <Heading size="lg" color="gray.800" fontWeight="800">
                    How it works
                  </Heading>
                  <VStack spacing={3} align="start" w="full">
                    <HStack spacing={3}>
                      <Box
                        p={1.5}
                        bg="brand.100"
                        borderRadius="md"
                        color="brand.600"
                        fontWeight="bold"
                        minW={6}
                        h={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                      >
                        1
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        Paste the complete job description
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={1.5}
                        bg="brand.100"
                        borderRadius="md"
                        color="brand.600"
                        fontWeight="bold"
                        minW={6}
                        h={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                      >
                        2
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        AI analyzes requirements and matches with your resume
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={1.5}
                        bg="brand.100"
                        borderRadius="md"
                        color="brand.600"
                        fontWeight="bold"
                        minW={6}
                        h={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
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
              <Box 
                w="full"
                bg="rgba(255, 255, 255, 0.9)"
                backdropFilter="blur(20px)"
                p={8}
                borderRadius="2xl"
                border="1px"
                borderColor="rgba(0, 136, 255, 0.1)"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.08)"
                className="card-modern scale-in"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <JobInputForm />
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}