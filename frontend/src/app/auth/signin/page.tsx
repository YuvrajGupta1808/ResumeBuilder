'use client';

import { Navbar } from '@/components/Navbar';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Icon,
    Spinner,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChrome, FiGithub } from 'react-icons/fi';

export default function SignIn() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToast();

    const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
    const error = searchParams?.get('error');

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (session) {
                router.push('/dashboard');
            }
        };
        checkSession();
    }, [router]);

    const handleSignIn = async (provider: string) => {
        setIsLoading(provider);
        try {
            const result = await signIn(provider, {
                callbackUrl,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Sign in failed',
                    description: 'Please try again or contact support.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else if (result?.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            toast({
                title: 'An error occurred',
                description: 'Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <>
        <Navbar />
        <Box
            minH="100vh"
            bg="linear-gradient(135deg, #f7fafc 0%, #e6f7ff 50%, #f0f9ff 100%)"
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
        >
            {/* Background decorations */}
            <Box
                position="absolute"
                top="-50%"
                right="-20%"
                w="600px"
                h="600px"
                bg="linear-gradient(135deg, rgba(0, 136, 255, 0.1), rgba(0, 112, 204, 0.1))"
                borderRadius="full"
                opacity={0.6}
            />
            <Box
                position="absolute"
                bottom="-30%"
                left="-10%"
                w="400px"
                h="400px"
                bg="linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))"
                borderRadius="full"
                opacity={0.5}
            />

            <Container mx="auto" position="relative" zIndex={1}>
                <VStack spacing={8} align="center">
                    {/* Logo */}
                    <Link href="/">
                        <HStack spacing={3} align="center">
                            <Box
                                w={12}
                                h={12}
                                bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 4px 12px rgba(0, 136, 255, 0.3)"
                            >
                                <Text fontSize="lg" fontWeight="bold" color="white">
                                    AI
                                </Text>
                            </Box>
                            <VStack spacing={0} align="start">
                                <Text
                                    fontSize="xl"
                                    fontWeight="800"
                                    letterSpacing="-0.02em"
                                    sx={{
                                        background: 'linear-gradient(135deg, #1a202c 0%, #0088ff 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Job Assistant
                                </Text>
                                <Text
                                    fontSize="xs"
                                    color="gray.500"
                                    fontWeight="500"
                                    letterSpacing="wide"
                                    textTransform="uppercase"
                                >
                                    Powered by AI
                                </Text>
                            </VStack>
                        </HStack>
                    </Link>

                    {/* Main content */}
                    <VStack spacing={6} w="full">
                        <VStack spacing={4} textAlign="center">
                            <Heading
                                size="xl"
                                fontWeight="800"
                                color="gray.900"
                                letterSpacing="-0.02em"
                            >
                                Welcome Back
                            </Heading>
                            <Text
                                color="gray.600"
                                fontSize="lg"
                                maxW="sm"
                            >
                                Sign in to your account to access your personalized AI job assistant
                            </Text>
                        </VStack>

                        {/* Error message */}
                        {error && (
                            <Alert status="error" borderRadius="lg" w="full">
                                <AlertIcon />
                                <Box>
                                    <AlertTitle>Authentication Error!</AlertTitle>
                                    <AlertDescription>
                                        {error === 'Configuration' && 'There is a problem with the server configuration.'}
                                        {error === 'AccessDenied' && 'Access denied. You do not have permission to sign in.'}
                                        {error === 'Verification' && 'The verification token has expired or has already been used.'}
                                        {error === 'Default' && 'An unexpected error occurred. Please try again.'}
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        )}

                        {/* Sign in buttons */}
                        <VStack spacing={4} w="full">
                            <Button
                                size="lg"
                                w="full"
                                h={48}
                                bg="white"
                                color="gray.900"
                                border="2px solid"
                                borderColor="gray.200"
                                borderRadius="xl"
                                fontSize="md"
                                fontWeight="600"
                                leftIcon={
                                    isLoading === 'google' ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <Icon as={FiChrome} boxSize={24} />
                                    )
                                }
                                _hover={{
                                    bg: 'gray.50',
                                    borderColor: 'gray.300',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s ease"
                                onClick={() => handleSignIn('google')}
                                isDisabled={isLoading !== null}
                                boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                            >
                                {isLoading === 'google' ? 'Signing in...' : 'Continue with Google'}
                            </Button>

                            <Button
                                size="lg"
                                w="full"
                                h={48}
                                bg="gray.900"
                                color="white"
                                borderRadius="xl"
                                fontSize="md"
                                fontWeight="600"
                                leftIcon={
                                    isLoading === 'github' ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <Icon as={FiGithub} boxSize={24} />
                                    )
                                }
                                _hover={{
                                    bg: 'gray.800',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                transition="all 0.2s ease"
                                onClick={() => handleSignIn('github')}
                                isDisabled={isLoading !== null}
                                boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                            >
                                {isLoading === 'github' ? 'Signing in...' : 'Continue with GitHub'}
                            </Button>
                        </VStack>

                        {/* Terms */}
                        <Text
                            fontSize="sm"
                            color="gray.500"
                            textAlign="center"
                            maxW="sm"
                        >
                            By signing in, you agree to our{' '}
                            <Text as="span" color="brand.600" fontWeight="500">
                                Terms of Service
                            </Text>{' '}
                            and{' '}
                            <Text as="span" color="brand.600" fontWeight="500">
                                Privacy Policy
                            </Text>
                        </Text>
                    </VStack>
                </VStack>
            </Container>
        </Box>
        </>
    );
}
