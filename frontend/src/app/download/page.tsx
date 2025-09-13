import { AppLayout } from '@/components/AppLayout';
import { DownloadPageContent } from '@/components/DownloadPageContent';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiDownload, FiHome } from 'react-icons/fi';

export default function DownloadPage() {
  return (
    <AppLayout>
      <Box bg='gray.50' p={8}>
        <Container maxW='container.xl' mx='auto' className='centered-content'>
          <VStack align='start' spacing={8}>
            {/* Header Section */}
            <Box w='full'>
              <Breadcrumb mb={4}>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/' color='gray.500'>
                    <HStack spacing={2}>
                      <FiHome size={12} />
                      <Text fontSize='sm'>Home</Text>
                    </HStack>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/dashboard' color='gray.500'>
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color='brand.600' fontWeight='medium'>
                    Download Documents
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <HStack justify='space-between' align='start' mb={6}>
                <VStack align='start' spacing={2}>
                  <Heading
                    size='xl'
                    fontWeight={700}
                    bg='linear(to-r, gray.800, brand.600)'
                    bgClip='text'
                  >
                    Download Documents
                  </Heading>
                  <Text color='gray.600' fontSize='lg'>
                    Download your tailored resume and cover letter in
                    professional PDF format.
                  </Text>
                </VStack>

                <HStack spacing={3}>
                  <Box p={3} bg='brand.100' borderRadius='xl' color='brand.600'>
                    <FiDownload size={24} />
                  </Box>
                </HStack>
              </HStack>
            </Box>

            {/* Main Content */}
            <Box w='full'>
              <DownloadPageContent />
            </Box>
          </VStack>
        </Container>
      </Box>
    </AppLayout>
  );
}
