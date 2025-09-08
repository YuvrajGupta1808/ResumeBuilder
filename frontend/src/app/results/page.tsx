import { CoverLetter } from '@/components/CoverLetter';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { TailoredResume } from '@/components/TailoredResume';
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
    Button,
    Container,
    Divider,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FiCheckCircle, FiDownload, FiEdit, FiHome, FiShare, FiStar } from 'react-icons/fi';

export default function ResultsPage() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex="1" p={8}>
          <Container maxW="container.xl">
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
                      Results
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                
                <HStack justify="space-between" align="start" mb={6}>
                  <VStack align="start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        p={3}
                        bg="green.100"
                        borderRadius="xl"
                        color="green.600"
                      >
                        <FiCheckCircle size={24} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Heading 
                          size="xl" 
                          fontWeight={700}
                          bgGradient="linear(to-r, gray.800, brand.600)"
                          bgClip="text"
                        >
                          Tailored Results
                        </Heading>
                        <Text color="gray.600" fontSize="lg">
                          Your resume and cover letter have been customized for the job application.
                        </Text>
                      </VStack>
                    </HStack>
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
                        <FiStar size={12} />
                        <Text>AI Generated</Text>
                      </HStack>
                    </Badge>
                  </HStack>
                </HStack>
              </Box>

              {/* Success Alert */}
              <Alert status="success" borderRadius="xl" bg="green.50" border="1px" borderColor="green.200">
                <AlertIcon color="green.500" />
                <Box>
                  <AlertTitle color="green.800" fontSize="sm" fontWeight="semibold">
                    Generation Complete!
                  </AlertTitle>
                  <AlertDescription color="green.700" fontSize="sm">
                    Your tailored resume and cover letter are ready. Review the content and download when satisfied.
                  </AlertDescription>
                </Box>
              </Alert>

              {/* Action Buttons */}
              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                border="1px"
                borderColor="gray.200"
                w="full"
              >
                <HStack justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" color="gray.800">
                      Ready to download?
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Get your tailored documents in PDF format
                    </Text>
                  </VStack>
                  <HStack spacing={3}>
                    <Button
                      leftIcon={<FiEdit />}
                      variant="outline"
                      borderColor="brand.300"
                      color="brand.600"
                      _hover={{
                        bg: "brand.50",
                        borderColor: "brand.400",
                      }}
                    >
                      Edit Content
                    </Button>
                    <Button
                      leftIcon={<FiDownload />}
                      bgGradient="linear(to-r, brand.400, brand.600)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, brand.500, brand.700)",
                        transform: "translateY(-1px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        transform: "translateY(0px)",
                      }}
                      transition="all 0.2s"
                    >
                      Download All
                    </Button>
                  </HStack>
                </HStack>
              </Box>

              {/* Stats */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  border="1px"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      bg="blue.100"
                      borderRadius="xl"
                      color="blue.600"
                    >
                      <FiCheckCircle size={24} />
                    </Box>
                    <VStack spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        95%
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Match Score
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
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      bg="green.100"
                      borderRadius="xl"
                      color="green.600"
                    >
                      <FiStar size={24} />
                    </Box>
                    <VStack spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        12
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Keywords Matched
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
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      bg="purple.100"
                      borderRadius="xl"
                      color="purple.600"
                    >
                      <FiShare size={24} />
                    </Box>
                    <VStack spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        2
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Documents Ready
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </SimpleGrid>

              <Divider borderColor="gray.300" />
              
              {/* Results Content */}
              <VStack spacing={8} w="full">
                <TailoredResume />
                <CoverLetter />
              </VStack>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
