import { Navbar } from '@/components/Navbar';
import { ResumeUploadForm } from '@/components/ResumeUploadForm';
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
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiCheck, FiHome, FiShield, FiUpload } from 'react-icons/fi';

export default function ResumeUploadPage() {
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
                      Upload Resume
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
                        <FiUpload size={24} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Heading 
                          size="xl" 
                          fontWeight={700}
                          bgGradient="linear(to-r, gray.800, brand.600)"
                          bgClip="text"
                        >
                          Upload Resume
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                          Upload your resume to get started with AI-powered job application assistance.
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                  
                  <Badge
                    colorScheme="blue"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack spacing={1}>
                      <FiShield size={12} />
                      <Text>Secure Upload</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>

              {/* Info Alert */}
              <Alert status="info" borderRadius="xl" bg="blue.50" border="1px" borderColor="blue.200">
                <AlertIcon color="blue.500" />
                <Box>
                  <AlertTitle color="blue.800" fontSize="sm" fontWeight="semibold">
                    Supported Formats
                  </AlertTitle>
                  <AlertDescription color="blue.700" fontSize="sm">
                    We support PDF, DOC, and DOCX files up to 10MB. Your resume will be processed securely and privately.
                  </AlertDescription>
                </Box>
              </Alert>

              {/* Features */}
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
                    What happens after upload?
                  </Heading>
                  <VStack spacing={3} align="start" w="full">
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="green.100"
                        borderRadius="lg"
                        color="green.600"
                      >
                        <FiCheck size={16} />
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        AI analyzes your skills, experience, and qualifications
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="green.100"
                        borderRadius="lg"
                        color="green.600"
                      >
                        <FiCheck size={16} />
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        Extract key information for job matching
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box
                        p={2}
                        bg="green.100"
                        borderRadius="lg"
                        color="green.600"
                      >
                        <FiCheck size={16} />
                      </Box>
                      <Text fontSize="sm" color="gray.600">
                        Ready for AI-powered resume tailoring
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              
              {/* Upload Form */}
              <Box w="full">
                <ResumeUploadForm />
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
