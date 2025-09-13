'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
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
      bg="linear-gradient(135deg, #f7fafc 0%, #e6f7ff 50%, #f0f9ff 100%)"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      className="fade-in"
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 136, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
      }}
    >
      {/* Enhanced Background decorations */}
      <Box
        position="absolute"
        top="-40%"
        right="-15%"
        w="700px"
        h="700px"
        bg="linear-gradient(135deg, rgba(0, 136, 255, 0.1), rgba(0, 112, 204, 0.1))"
        borderRadius="full"
        opacity={0.6}
        transform="rotate(45deg)"
        animation="pulse 8s ease-in-out infinite"
        sx={{
          '@keyframes pulse': {
            '0%, 100%': { transform: 'rotate(45deg) scale(1)', opacity: 0.6 },
            '50%': { transform: 'rotate(45deg) scale(1.05)', opacity: 0.4 },
          },
        }}
      />
      <Box
        position="absolute"
        bottom="-25%"
        left="-8%"
        w="500px"
        h="500px"
        bg="linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))"
        borderRadius="full"
        opacity={0.5}
        animation="floatReverse 15s ease-in-out infinite"
        sx={{
          '@keyframes floatReverse': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '33%': { transform: 'translateY(15px) rotate(-0.5deg)' },
            '66%': { transform: 'translateY(-10px) rotate(0.5deg)' },
          },
        }}
      />
      <Box
        position="absolute"
        top="60%"
        left="70%"
        w="200px"
        h="200px"
        bg="linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))"
        borderRadius="full"
        opacity={0.4}
        animation="drift 12s ease-in-out infinite"
        sx={{
          '@keyframes drift': {
            '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
            '25%': { transform: 'translateX(20px) translateY(-10px)' },
            '50%': { transform: 'translateX(-10px) translateY(15px)' },
            '75%': { transform: 'translateX(-20px) translateY(-5px)' },
          },
        }}
      />

      <Container maxW="container.xl" mx="auto" position="relative" zIndex={1} className="centered-content">
        <VStack
          textAlign="center"
          align="center"
          justify="center"
          spacing={{ base: 8, md: 12 }}
          py={{ base: 16, md: 20 }}
        >
          {/* Enhanced Badge */}
          <Box
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            px={6}
            py={3}
            borderRadius="full"
            border="1px"
            borderColor="rgba(0, 136, 255, 0.2)"
            boxShadow="0 8px 32px rgba(0, 136, 255, 0.1)"
            className="scale-in"
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: '0 12px 40px rgba(0, 136, 255, 0.15)',
              },
            }}
          >
            <HStack spacing={2}>
              <Box
                animation="spin 3s linear infinite"
                sx={{
                  '@keyframes spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <FiStar color="#0088ff" size={16} />
              </Box>
              <Text fontSize="sm" fontWeight="600" color="brand.700">
                Trusted by 10,000+ job seekers
              </Text>
            </HStack>
          </Box>

          {/* Enhanced Main heading */}
          <VStack spacing={6} className="slide-in-left">
            <Heading
              fontWeight={800}
              fontSize={{ base: '4xl', sm: '5xl', md: '7xl', lg: '8xl' }}
              lineHeight="1.1"
              letterSpacing="-0.03em"
              color="gray.900"
              sx={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #1a202c 0%, #0088ff 70%, #005899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 8s ease infinite',
                '@keyframes gradientShift': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              }}
            >
              AI-Powered Job Application{' '}
              <Text
                as="span"
                position="relative"
                display="inline-block"
                sx={{
                  background: 'linear-gradient(135deg, #0088ff 0%, #005899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: 'linear-gradient(135deg, #0088ff 0%, #005899 100%)',
                    borderRadius: '2px',
                    opacity: 0.6,
                    animation: 'underlinePulse 3s ease-in-out infinite',
                  },
                  '@keyframes underlinePulse': {
                    '0%, 100%': { opacity: 0.6, transform: 'scaleX(1)' },
                    '50%': { opacity: 0.9, transform: 'scaleX(1.05)' },
                  },
                }}
              >
                Assistant
              </Text>
            </Heading>

            <Text
              color="gray.700"
              maxW="5xl"
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              lineHeight="1.7"
              fontWeight="400"
              className="text-balance slide-in-right"
              sx={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            >
              Transform your job applications with cutting-edge AI technology. Upload your resume,
              enter any job description, and get a perfectly tailored resume and cover letter in minutes.
              Save hours of work and dramatically increase your chances of landing your dream job.
            </Text>
          </VStack>

          {/* Enhanced Stats */}
          <Box
            className="scale-in"
            sx={{
              animation: 'scaleIn 0.8s ease-out 0.5s both',
            }}
          >
            <HStack
              spacing={{ base: 8, md: 16 }}
              justify="center"
              flexWrap="wrap"
              bg="rgba(255, 255, 255, 0.95)"
              backdropFilter="blur(20px)"
              px={{ base: 6, md: 12 }}
              py={{ base: 6, md: 8 }}
              borderRadius="2xl"
              boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
              border="1px"
              borderColor="rgba(0, 136, 255, 0.1)"
              className="card-hover"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <VStack spacing={2} textAlign="center">
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="800"
                  bg="linear(to-r, brand.500, brand.700)"
                  bgClip="text"
                  sx={{
                    animation: 'countUp 2s ease-out forwards',
                    '@keyframes countUp': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  10K+
                </Text>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="gray.600"
                  fontWeight="500"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Resumes Tailored
                </Text>
              </VStack>

              <VStack spacing={2} textAlign="center">
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="800"
                  bg="linear(to-r, success.500, success.600)"
                  bgClip="text"
                  sx={{
                    animation: 'countUp 2s ease-out 0.2s forwards',
                    '@keyframes countUp': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  95%
                </Text>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="gray.600"
                  fontWeight="500"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Success Rate
                </Text>
              </VStack>

              <VStack spacing={2} textAlign="center">
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="800"
                  bg="linear(to-r, warning.500, warning.600)"
                  bgClip="text"
                  sx={{
                    animation: 'countUp 2s ease-out 0.4s forwards',
                    '@keyframes countUp': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  5min
                </Text>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="gray.600"
                  fontWeight="500"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  Average Time
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Enhanced CTA Buttons */}
          <VStack spacing={6} className="slide-in-right">
            <HStack spacing={6} flexWrap="wrap" justify="center">
              {session ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    px={10}
                    py={7}
                    bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
                    color="white"
                    borderRadius="xl"
                    fontSize="lg"
                    fontWeight="700"
                    letterSpacing="wide"
                    position="relative"
                    overflow="hidden"
                    sx={{
                      backgroundSize: '200% 200%',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover::before': {
                        left: '100%',
                      },
                      '&:hover': {
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(0, 136, 255, 0.3)',
                        backgroundPosition: 'right center',
                      },
                      '&:active': {
                        transform: 'translateY(-1px) scale(1.01)',
                      },
                    }}
                    rightIcon={
                      <Box
                        sx={{
                          transition: 'transform 0.3s ease',
                          '.chakra-button:hover &': {
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <FiArrowRight />
                      </Box>
                    }
                    boxShadow="0 8px 25px rgba(0, 136, 255, 0.2)"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
                  color="white"
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="700"
                  letterSpacing="wide"
                  position="relative"
                  overflow="hidden"
                  sx={{
                    backgroundSize: '200% 200%',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 136, 255, 0.3)',
                      backgroundPosition: 'right center',
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(1.01)',
                    },
                  }}
                  rightIcon={
                    <Box
                      sx={{
                        transition: 'transform 0.3s ease',
                        '.chakra-button:hover &': {
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <FiArrowRight />
                    </Box>
                  }
                  boxShadow="0 8px 25px rgba(0, 136, 255, 0.2)"
                  onClick={() => window.location.href = '/api/auth/signin'}
                >
                  Get Started Free
                </Button>
              )}

              <Button
                size="lg"
                px={10}
                py={7}
                variant="outline"
                borderColor="rgba(0, 136, 255, 0.3)"
                color="brand.600"
                borderRadius="xl"
                fontSize="lg"
                fontWeight="700"
                letterSpacing="wide"
                bg="rgba(255, 255, 255, 0.9)"
                backdropFilter="blur(10px)"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bg: 'rgba(0, 136, 255, 0.05)',
                    borderColor: 'brand.400',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 15px 35px rgba(0, 136, 255, 0.15)',
                    color: 'brand.700',
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(1.01)',
                  },
                }}
                leftIcon={
                  <Box
                    sx={{
                      transition: 'transform 0.3s ease',
                      '.chakra-button:hover &': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <FiPlay />
                  </Box>
                }
                boxShadow="0 4px 15px rgba(0, 136, 255, 0.1)"
              >
                Watch Demo
              </Button>
            </HStack>

            <Text
              fontSize="sm"
              color="gray.600"
              fontWeight="500"
              textAlign="center"
              sx={{
                opacity: 0,
                animation: 'fadeIn 1s ease-out 1.5s forwards',
                '@keyframes fadeIn': {
                  to: { opacity: 1 },
                },
              }}
            >
              ✨ No credit card required • Free forever plan available
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
