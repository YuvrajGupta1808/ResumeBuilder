import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
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
    <Box
      bg='linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)'
      py={32}
      position='relative'
      overflow='hidden'
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 85%, rgba(0, 136, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)
          `,
          animation: 'subtleFloat 20s ease-in-out infinite',
        },
        '@keyframes subtleFloat': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(5px) rotate(-0.5deg)' },
        },
      }}
    >
      {/* Enhanced Background decorations */}
      <Box
        position='absolute'
        top='15%'
        right='8%'
        w='300px'
        h='300px'
        bg='linear-gradient(135deg, rgba(0, 136, 255, 0.08), rgba(0, 112, 204, 0.08))'
        borderRadius='full'
        opacity={0.6}
        animation='gentlePulse 12s ease-in-out infinite'
        sx={{
          '@keyframes gentlePulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
            '50%': { transform: 'scale(1.1)', opacity: 0.4 },
          },
        }}
      />
      <Box
        position='absolute'
        bottom='25%'
        left='8%'
        w='250px'
        h='250px'
        bg='linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(22, 163, 74, 0.08))'
        borderRadius='full'
        opacity={0.5}
        animation='gentleFloat 18s ease-in-out infinite'
        sx={{
          '@keyframes gentleFloat': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' },
          },
        }}
      />
      <Box
        position='absolute'
        top='60%'
        left='75%'
        w='180px'
        h='180px'
        bg='linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(217, 119, 6, 0.06))'
        borderRadius='full'
        opacity={0.4}
        animation='driftSlow 25s ease-in-out infinite'
        sx={{
          '@keyframes driftSlow': {
            '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
            '25%': { transform: 'translateX(30px) translateY(-20px)' },
            '50%': { transform: 'translateX(-20px) translateY(25px)' },
            '75%': { transform: 'translateX(-30px) translateY(-10px)' },
          },
        }}
      />

      <Container
        maxW='container.xl'
        mx='auto'
        position='relative'
        zIndex={1}
        className='centered-content'
      >
        <VStack spacing={20}>
          {/* Enhanced Header */}
          <VStack spacing={8} textAlign='center' maxW='5xl' className='fade-in'>
            <Badge
              colorScheme='brand'
              px={6}
              py={3}
              borderRadius='full'
              fontSize='sm'
              fontWeight='600'
              letterSpacing='wide'
              textTransform='uppercase'
              bg='rgba(0, 136, 255, 0.1)'
              color='brand.700'
              border='1px'
              borderColor='rgba(0, 136, 255, 0.2)'
              boxShadow='0 4px 12px rgba(0, 136, 255, 0.15)'
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0, 136, 255, 0.2)',
                },
              }}
            >
              <HStack spacing={2}>
                <Box
                  animation='bounce 2s infinite'
                  sx={{
                    '@keyframes bounce': {
                      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                      '40%': { transform: 'translateY(-4px)' },
                      '60%': { transform: 'translateY(-2px)' },
                    },
                  }}
                >
                  <FiTrendingUp size={16} />
                </Box>
                <Text>Trusted by thousands</Text>
              </HStack>
            </Badge>

            <Heading
              size='2xl'
              fontWeight={800}
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              lineHeight='1.1'
              letterSpacing='-0.02em'
              sx={{
                background:
                  'linear-gradient(135deg, #1a202c 0%, #0088ff 60%, #005899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'textGradient 6s ease infinite',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                '@keyframes textGradient': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              }}
            >
              Why Choose Our AI Assistant?
            </Heading>

            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              color='gray.700'
              lineHeight='1.7'
              maxW='4xl'
              fontWeight='400'
              className='text-balance'
              sx={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            >
              Our platform combines cutting-edge AI technology with
              user-friendly design to revolutionize your job application
              process. Join thousands of successful job seekers.
            </Text>
          </VStack>

          {/* Enhanced Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w='full'>
            {features.map((feature, index) => (
              <Box
                key={feature.title}
                bg='rgba(255, 255, 255, 0.95)'
                backdropFilter='blur(20px)'
                p={10}
                borderRadius='3xl'
                boxShadow='0 10px 25px rgba(0, 0, 0, 0.1)'
                border='1px'
                borderColor='rgba(0, 136, 255, 0.1)'
                position='relative'
                className='card-hover'
                sx={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `scaleIn 0.6s ease-out ${index * 0.1 + 0.5}s both`,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    borderColor: `rgba(${
                      feature.color === 'blue'
                        ? '0, 136, 255'
                        : feature.color === 'green'
                          ? '34, 197, 94'
                          : feature.color === 'purple'
                            ? '147, 51, 234'
                            : feature.color === 'orange'
                              ? '245, 158, 11'
                              : feature.color === 'red'
                                ? '239, 68, 68'
                                : '20, 184, 166'
                    }, 0.3)`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, rgba(${
                      feature.color === 'blue'
                        ? '0, 136, 255'
                        : feature.color === 'green'
                          ? '34, 197, 94'
                          : feature.color === 'purple'
                            ? '147, 51, 234'
                            : feature.color === 'orange'
                              ? '245, 158, 11'
                              : feature.color === 'red'
                                ? '239, 68, 68'
                                : '20, 184, 166'
                    }, 0.05) 0%, transparent 70%)`,
                    borderRadius: '24px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                overflow='hidden'
              >
                {/* Enhanced Background gradient */}
                <Box
                  position='absolute'
                  top='0'
                  left='0'
                  right='0'
                  h='6px'
                  bg={`linear-gradient(135deg, ${feature.color}.400, ${feature.color}.600, ${feature.color}.500)`}
                  sx={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientFlow 3s ease infinite',
                    '@keyframes gradientFlow': {
                      '0%, 100%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                    },
                  }}
                />

                {/* Enhanced Feature number */}
                <Box
                  position='absolute'
                  top={6}
                  right={6}
                  w={10}
                  h={10}
                  bg={`linear-gradient(135deg, ${feature.color}.100, ${feature.color}.200)`}
                  borderRadius='full'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  fontSize='sm'
                  fontWeight='800'
                  color={`${feature.color}.700`}
                  border='2px'
                  borderColor={`${feature.color}.300`}
                  boxShadow={`0 4px 8px rgba(${
                    feature.color === 'blue'
                      ? '0, 136, 255'
                      : feature.color === 'green'
                        ? '34, 197, 94'
                        : feature.color === 'purple'
                          ? '147, 51, 234'
                          : feature.color === 'orange'
                            ? '245, 158, 11'
                            : feature.color === 'red'
                              ? '239, 68, 68'
                              : '20, 184, 166'
                  }, 0.2)`}
                  sx={{
                    animation: 'numberPulse 2s ease-in-out infinite',
                    '@keyframes numberPulse': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                    },
                  }}
                >
                  {index + 1}
                </Box>

                <VStack spacing={8} align='start' textAlign='left'>
                  {/* Enhanced Icon and highlight */}
                  <HStack spacing={5} align='center'>
                    <Box
                      p={4}
                      bg={`linear-gradient(135deg, ${feature.color}.100, ${feature.color}.200)`}
                      borderRadius='2xl'
                      color={`${feature.color}.700`}
                      border='2px'
                      borderColor={`${feature.color}.300`}
                      boxShadow={`0 8px 16px rgba(${
                        feature.color === 'blue'
                          ? '0, 136, 255'
                          : feature.color === 'green'
                            ? '34, 197, 94'
                            : feature.color === 'purple'
                              ? '147, 51, 234'
                              : feature.color === 'orange'
                                ? '245, 158, 11'
                                : feature.color === 'red'
                                  ? '239, 68, 68'
                                  : '20, 184, 166'
                      }, 0.15)`}
                      sx={{
                        transition: 'all 0.3s ease',
                        '.chakra-card:hover &': {
                          transform: 'scale(1.1) rotate(5deg)',
                          boxShadow: `0 12px 24px rgba(${
                            feature.color === 'blue'
                              ? '0, 136, 255'
                              : feature.color === 'green'
                                ? '34, 197, 94'
                                : feature.color === 'purple'
                                  ? '147, 51, 234'
                                  : feature.color === 'orange'
                                    ? '245, 158, 11'
                                    : feature.color === 'red'
                                      ? '239, 68, 68'
                                      : '20, 184, 166'
                          }, 0.25)`,
                        },
                      }}
                    >
                      <feature.icon size={28} />
                    </Box>
                    <Badge
                      colorScheme={feature.color}
                      px={4}
                      py={2}
                      borderRadius='full'
                      fontSize='xs'
                      fontWeight='700'
                      letterSpacing='wide'
                      textTransform='uppercase'
                      boxShadow={`0 4px 8px rgba(${
                        feature.color === 'blue'
                          ? '0, 136, 255'
                          : feature.color === 'green'
                            ? '34, 197, 94'
                            : feature.color === 'purple'
                              ? '147, 51, 234'
                              : feature.color === 'orange'
                                ? '245, 158, 11'
                                : feature.color === 'red'
                                  ? '239, 68, 68'
                                  : '20, 184, 166'
                      }, 0.2)`}
                      sx={{
                        transition: 'all 0.3s ease',
                        '.chakra-card:hover &': {
                          transform: 'translateX(4px)',
                          boxShadow: `0 6px 12px rgba(${
                            feature.color === 'blue'
                              ? '0, 136, 255'
                              : feature.color === 'green'
                                ? '34, 197, 94'
                                : feature.color === 'purple'
                                  ? '147, 51, 234'
                                  : feature.color === 'orange'
                                    ? '245, 158, 11'
                                    : feature.color === 'red'
                                      ? '239, 68, 68'
                                      : '20, 184, 166'
                          }, 0.3)`,
                        },
                      }}
                    >
                      {feature.highlight}
                    </Badge>
                  </HStack>

                  {/* Enhanced Content */}
                  <VStack spacing={4} align='start'>
                    <Heading
                      size='lg'
                      fontSize='xl'
                      fontWeight='700'
                      color='gray.900'
                      lineHeight='1.3'
                      letterSpacing='-0.01em'
                    >
                      {feature.title}
                    </Heading>
                    <Text
                      color='gray.700'
                      lineHeight='1.7'
                      fontSize='md'
                      fontWeight='400'
                      sx={{
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      }}
                    >
                      {feature.text}
                    </Text>
                  </VStack>

                  {/* Enhanced Check icon */}
                  <HStack
                    spacing={3}
                    color={`${feature.color}.700`}
                    fontWeight='600'
                    sx={{
                      transition: 'all 0.3s ease',
                      '.chakra-card:hover &': {
                        transform: 'translateX(4px)',
                        color: `${feature.color}.800`,
                      },
                    }}
                  >
                    <Box
                      w={6}
                      h={6}
                      bg={`linear-gradient(135deg, ${feature.color}.100, ${feature.color}.200)`}
                      borderRadius='full'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      border='2px'
                      borderColor={`${feature.color}.300`}
                    >
                      <FiCheck size={12} />
                    </Box>
                    <Text fontSize='sm'>Included in all plans</Text>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Enhanced Bottom CTA */}
          <Box
            bg='rgba(255, 255, 255, 0.95)'
            backdropFilter='blur(20px)'
            p={12}
            borderRadius='3xl'
            boxShadow='0 20px 40px rgba(0, 0, 0, 0.1)'
            border='1px'
            borderColor='rgba(0, 136, 255, 0.1)'
            textAlign='center'
            maxW='4xl'
            w='full'
            className='scale-in'
            sx={{
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15)',
                borderColor: 'rgba(0, 136, 255, 0.2)',
              },
            }}
          >
            <VStack spacing={8}>
              <Heading
                size='lg'
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight='800'
                color='gray.900'
                lineHeight='1.2'
                letterSpacing='-0.02em'
                sx={{
                  background:
                    'linear-gradient(135deg, #1a202c 0%, #0088ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ready to transform your job search?
              </Heading>
              <Text
                color='gray.700'
                fontSize={{ base: 'lg', md: 'xl' }}
                lineHeight='1.6'
                fontWeight='400'
                maxW='2xl'
                className='text-balance'
              >
                Join thousands of job seekers who have already landed their
                dream jobs with our AI assistant.
              </Text>
              <HStack spacing={6} flexWrap='wrap' justify='center'>
                <Badge
                  colorScheme='green'
                  px={6}
                  py={3}
                  borderRadius='full'
                  fontSize='sm'
                  fontWeight='700'
                  letterSpacing='wide'
                  textTransform='uppercase'
                  boxShadow='0 4px 12px rgba(34, 197, 94, 0.2)'
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.05)',
                      boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
                    },
                  }}
                >
                  ✨ Free to start
                </Badge>
                <Badge
                  colorScheme='blue'
                  px={6}
                  py={3}
                  borderRadius='full'
                  fontSize='sm'
                  fontWeight='700'
                  letterSpacing='wide'
                  textTransform='uppercase'
                  boxShadow='0 4px 12px rgba(0, 136, 255, 0.2)'
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.05)',
                      boxShadow: '0 8px 20px rgba(0, 136, 255, 0.3)',
                    },
                  }}
                >
                  💳 No credit card
                </Badge>
                <Badge
                  colorScheme='purple'
                  px={6}
                  py={3}
                  borderRadius='full'
                  fontSize='sm'
                  fontWeight='700'
                  letterSpacing='wide'
                  textTransform='uppercase'
                  boxShadow='0 4px 12px rgba(147, 51, 234, 0.2)'
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.05)',
                      boxShadow: '0 8px 20px rgba(147, 51, 234, 0.3)',
                    },
                  }}
                >
                  ⚡ 5-minute setup
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
