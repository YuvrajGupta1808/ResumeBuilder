'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Icon,
    Text,
    VStack
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiStar } from 'react-icons/fi';

export function HeroSection() {
  const { data: session } = useSession();

  return (
    <Box
      position="relative"
      bgGradient="linear(to-br, brand.50, blue.50, purple.50)"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-50%"
        right="-20%"
        w="600px"
        h="600px"
        bg="brand.100"
        borderRadius="full"
        opacity={0.1}
        transform="rotate(45deg)"
      />
      <Box
        position="absolute"
        bottom="-30%"
        left="-10%"
        w="400px"
        h="400px"
        bg="purple.100"
        borderRadius="full"
        opacity={0.1}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          textAlign="center"
          align="center"
          spacing={{ base: 8, md: 12 }}
          py={{ base: 16, md: 20 }}
        >
          {/* Badge */}
          <Box
            bg="white"
            px={4}
            py={2}
            borderRadius="full"
            border="1px"
            borderColor="brand.200"
            boxShadow="sm"
          >
            <HStack spacing={2}>
              <FiStar color="brand.400" />
              <Text fontSize="sm" fontWeight="medium" color="brand.600">
                Trusted by 10,000+ job seekers
              </Text>
            </HStack>
          </Box>

          {/* Main heading */}
          <VStack spacing={6}>
            <Heading
              fontWeight={700}
              fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
              lineHeight="110%"
              letterSpacing="-0.02em"
              bgGradient="linear(to-r, gray.800, brand.600)"
              bgClip="text"
            >
              AI-Powered Job Application{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, brand.400, brand.600)"
                bgClip="text"
                position="relative"
              >
                Assistant
                <Box
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  h="3px"
                  bgGradient="linear(to-r, brand.400, brand.600)"
                  borderRadius="full"
                  opacity={0.3}
                />
              </Text>
            </Heading>

            <Text
              color="gray.600"
              maxW="4xl"
              fontSize={{ base: 'lg', md: 'xl' }}
              lineHeight="1.6"
              fontWeight="400"
            >
              Transform your job applications with cutting-edge AI technology. Upload your resume, 
              enter any job description, and get a perfectly tailored resume and cover letter in minutes. 
              Save hours of work and dramatically increase your chances of landing your dream job.
            </Text>
          </VStack>

          {/* Stats */}
          <HStack
            spacing={{ base: 6, md: 12 }}
            justify="center"
            flexWrap="wrap"
            bg="white"
            px={8}
            py={4}
            borderRadius="xl"
            boxShadow="lg"
            border="1px"
            borderColor="gray.100"
          >
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                10K+
              </Text>
              <Text fontSize="sm" color="gray.600">
                Resumes Tailored
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                95%
              </Text>
              <Text fontSize="sm" color="gray.600">
                Success Rate
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                5min
              </Text>
              <Text fontSize="sm" color="gray.600">
                Average Time
              </Text>
            </VStack>
          </HStack>

          {/* CTA Buttons */}
          <VStack spacing={4}>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              {session ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    px={8}
                    py={6}
                    bgGradient="linear(to-r, brand.400, brand.600)"
                    color="white"
                    borderRadius="xl"
                    fontSize="lg"
                    fontWeight="600"
                    _hover={{
                      bgGradient: "linear(to-r, brand.500, brand.700)",
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                    _active={{
                      transform: "translateY(0px)",
                    }}
                    transition="all 0.2s"
                    rightIcon={<FiArrowRight />}
                    boxShadow="lg"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  px={8}
                  py={6}
                  bgGradient="linear(to-r, brand.400, brand.600)"
                  color="white"
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="600"
                  _hover={{
                    bgGradient: "linear(to-r, brand.500, brand.700)",
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                  }}
                  _active={{
                    transform: "translateY(0px)",
                  }}
                  transition="all 0.2s"
                  rightIcon={<FiArrowRight />}
                  boxShadow="lg"
                  onClick={() => window.location.href = '/api/auth/signin'}
                >
                  Get Started Free
                </Button>
              )}
              
              <Button
                size="lg"
                px={8}
                py={6}
                variant="outline"
                borderColor="brand.300"
                color="brand.600"
                borderRadius="xl"
                fontSize="lg"
                fontWeight="600"
                _hover={{
                  bg: "brand.50",
                  borderColor: "brand.400",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "translateY(0px)",
                }}
                transition="all 0.2s"
                leftIcon={<FiPlay />}
              >
                Watch Demo
              </Button>
            </HStack>

            <Text fontSize="sm" color="gray.500">
              No credit card required • Free forever plan available
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
