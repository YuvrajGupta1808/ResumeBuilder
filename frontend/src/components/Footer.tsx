import {
    Box,
    Container,
    Divider,
    HStack,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiTwitter } from 'react-icons/fi';

export function Footer() {
  return (
    <Box bg="gray.900" color="gray.300">
      <Container maxW="container.xl" mx="auto" py={16} className="centered-content">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {/* Company Info */}
          <VStack align="start" spacing={4}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              AI Job Assistant
            </Text>
            <Text fontSize="sm" lineHeight="1.6">
              Transform your job applications with cutting-edge AI technology. 
              Get perfectly tailored resumes and cover letters in minutes.
            </Text>
            <HStack spacing={4}>
              <Box
                p={2}
                bg="gray.800"
                borderRadius="lg"
                _hover={{ bg: "brand.600", cursor: "pointer" }}
                transition="all 0.2s"
              >
                <FiTwitter size={16} />
              </Box>
              <Box
                p={2}
                bg="gray.800"
                borderRadius="lg"
                _hover={{ bg: "brand.600", cursor: "pointer" }}
                transition="all 0.2s"
              >
                <FiLinkedin size={16} />
              </Box>
              <Box
                p={2}
                bg="gray.800"
                borderRadius="lg"
                _hover={{ bg: "brand.600", cursor: "pointer" }}
                transition="all 0.2s"
              >
                <FiGithub size={16} />
              </Box>
            </HStack>
          </VStack>

          {/* Product */}
          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Product
            </Text>
            <VStack align="start" spacing={2}>
              <Link href="/resume-upload" _hover={{ color: "brand.400" }}>
                Upload Resume
              </Link>
              <Link href="/job-input" _hover={{ color: "brand.400" }}>
                Job Input
              </Link>
              <Link href="/dashboard" _hover={{ color: "brand.400" }}>
                Dashboard
              </Link>
              <Link href="/results" _hover={{ color: "brand.400" }}>
                Results
              </Link>
            </VStack>
          </VStack>

          {/* Support */}
          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Support
            </Text>
            <VStack align="start" spacing={2}>
              <Link href="#" _hover={{ color: "brand.400" }}>
                Help Center
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                Documentation
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                API Reference
              </Link>
              <Link href="#" _hover={{ color: "brand.400" }}>
                Contact Us
              </Link>
            </VStack>
          </VStack>

          {/* Contact */}
          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Contact
            </Text>
            <VStack align="start" spacing={3}>
              <HStack spacing={3}>
                <FiMail color="brand.400" />
                <Text fontSize="sm">support@aijobassistant.com</Text>
              </HStack>
              <HStack spacing={3}>
                <FiPhone color="brand.400" />
                <Text fontSize="sm">+1 (555) 123-4567</Text>
              </HStack>
              <HStack spacing={3}>
                <FiMapPin color="brand.400" />
                <Text fontSize="sm">San Francisco, CA</Text>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>

        <Divider my={8} borderColor="gray.700" />

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={4}
        >
          <Text fontSize="sm" color="gray.400">
            © 2024 AI Job Application Assistant. All rights reserved.
          </Text>
          <HStack spacing={6}>
            <Link href="#" fontSize="sm" _hover={{ color: "brand.400" }}>
              Privacy Policy
            </Link>
            <Link href="#" fontSize="sm" _hover={{ color: "brand.400" }}>
              Terms of Service
            </Link>
            <Link href="#" fontSize="sm" _hover={{ color: "brand.400" }}>
              Cookie Policy
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
