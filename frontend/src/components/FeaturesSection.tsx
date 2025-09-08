import {
    Badge,
    Box,
    Container,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react';
import {
    FiCheck,
    FiClock,
    FiDownload,
    FiFileText,
    FiShield,
    FiTrendingUp,
    FiUpload,
    FiZap,
} from 'react-icons/fi';

const features = [
  {
    title: 'Easy Upload',
    text: 'Simply upload your resume in PDF or Word format. Our AI will analyze and understand your experience.',
    icon: FiUpload,
    color: 'blue',
    highlight: 'Drag & Drop',
  },
  {
    title: 'Smart Tailoring',
    text: 'Enter any job description and watch as our AI customizes your resume to match the requirements perfectly.',
    icon: FiFileText,
    color: 'green',
    highlight: 'AI-Powered',
  },
  {
    title: 'Advanced AI',
    text: 'Powered by GPT-4, our system understands context and creates compelling, personalized content.',
    icon: FiZap,
    color: 'purple',
    highlight: 'GPT-4',
  },
  {
    title: 'Cover Letters',
    text: 'Get professionally written cover letters that complement your tailored resume for each application.',
    icon: FiDownload,
    color: 'orange',
    highlight: 'Professional',
  },
  {
    title: 'Secure & Private',
    text: 'Your data is encrypted and secure. We never share your personal information with third parties.',
    icon: FiShield,
    color: 'red',
    highlight: 'Encrypted',
  },
  {
    title: 'Save Time',
    text: 'What used to take hours now takes minutes. Focus on networking while we handle the customization.',
    icon: FiClock,
    color: 'teal',
    highlight: '5x Faster',
  },
];

export function FeaturesSection() {
  return (
    <Box bg="gray.50" py={24} position="relative">
      {/* Background decoration */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w="200px"
        h="200px"
        bg="brand.100"
        borderRadius="full"
        opacity={0.1}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        w="150px"
        h="150px"
        bg="purple.100"
        borderRadius="full"
        opacity={0.1}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={20}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" maxW="4xl">
            <Badge
              colorScheme="brand"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="medium"
            >
              <HStack spacing={2}>
                <FiTrendingUp />
                <Text>Trusted by thousands</Text>
              </HStack>
            </Badge>
            
            <Heading
              size="2xl"
              fontWeight={700}
              bgGradient="linear(to-r, gray.800, brand.600)"
              bgClip="text"
              lineHeight="1.2"
            >
              Why Choose Our AI Assistant?
            </Heading>
            
            <Text
              fontSize="xl"
              color="gray.600"
              lineHeight="1.6"
              maxW="3xl"
            >
              Our platform combines cutting-edge AI technology with user-friendly design
              to revolutionize your job application process. Join thousands of successful job seekers.
            </Text>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Box
                key={feature.title}
                bg="white"
                p={8}
                borderRadius="2xl"
                boxShadow="lg"
                border="1px"
                borderColor="gray.100"
                position="relative"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "2xl",
                  borderColor: `${feature.color}.200`,
                }}
                transition="all 0.3s ease"
                overflow="hidden"
              >
                {/* Background gradient */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="4px"
                  bgGradient={`linear(to-r, ${feature.color}.400, ${feature.color}.600)`}
                />
                
                {/* Feature number */}
                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  w={8}
                  h={8}
                  bg={`${feature.color}.100`}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  fontWeight="bold"
                  color={`${feature.color}.600`}
                >
                  {index + 1}
                </Box>

                <VStack spacing={6} align="start" textAlign="left">
                  {/* Icon and highlight */}
                  <HStack spacing={4} align="center">
                    <Box
                      p={3}
                      bg={`${feature.color}.100`}
                      borderRadius="xl"
                      color={`${feature.color}.600`}
                    >
                      <feature.icon size={24} />
                    </Box>
                    <Badge
                      colorScheme={feature.color}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {feature.highlight}
                    </Badge>
                  </HStack>

                  {/* Content */}
                  <VStack spacing={3} align="start">
                    <Heading size="lg" color="gray.800">
                      {feature.title}
                    </Heading>
                    <Text color="gray.600" lineHeight="1.6">
                      {feature.text}
                    </Text>
                  </VStack>

                  {/* Check icon */}
                  <HStack spacing={2} color={`${feature.color}.600`}>
                    <FiCheck />
                    <Text fontSize="sm" fontWeight="medium">
                      Included in all plans
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Bottom CTA */}
          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px"
            borderColor="gray.100"
            textAlign="center"
            maxW="2xl"
            w="full"
          >
            <VStack spacing={4}>
              <Heading size="lg" color="gray.800">
                Ready to transform your job search?
              </Heading>
              <Text color="gray.600">
                Join thousands of job seekers who have already landed their dream jobs with our AI assistant.
              </Text>
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                  ✓ Free to start
                </Badge>
                <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                  ✓ No credit card
                </Badge>
                <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                  ✓ 5-minute setup
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
