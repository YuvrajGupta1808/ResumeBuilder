'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiHome, FiRefreshCw } from 'react-icons/fi';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Configuration Error',
          description:
            'There is a problem with the server configuration. Please contact support.',
        };
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          description:
            'You do not have permission to sign in with this account.',
        };
      case 'Verification':
        return {
          title: 'Verification Error',
          description:
            'The verification token has expired or has already been used.',
        };
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          description: 'The credentials you provided are incorrect.',
        };
      case 'EmailSignin':
        return {
          title: 'Email Sign In Error',
          description: 'There was an error sending the sign in email.',
        };
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign In Error',
          description: 'There was an error with the OAuth provider.',
        };
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          description: 'There was an error during the OAuth callback.',
        };
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          description: 'There was an error creating your account.',
        };
      case 'EmailCreateAccount':
        return {
          title: 'Account Creation Error',
          description:
            'There was an error creating your account with this email.',
        };
      case 'Callback':
        return {
          title: 'Callback Error',
          description: 'There was an error in the callback URL.',
        };
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Not Linked',
          description:
            'To confirm your identity, sign in with the same account you used originally.',
        };
      case 'SessionRequired':
        return {
          title: 'Session Required',
          description: 'Please sign in to access this page.',
        };
      default:
        return {
          title: 'Authentication Error',
          description:
            'An unexpected error occurred during authentication. Please try again.',
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <Box
      minH='100vh'
      bg='linear-gradient(135deg, #f7fafc 0%, #e6f7ff 50%, #f0f9ff 100%)'
      display='flex'
      alignItems='center'
      position='relative'
      overflow='hidden'
    >
      {/* Background decorations */}
      <Box
        position='absolute'
        top='-50%'
        right='-20%'
        w='600px'
        h='600px'
        bg='linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))'
        borderRadius='full'
        opacity={0.6}
      />
      <Box
        position='absolute'
        bottom='-30%'
        left='-10%'
        w='400px'
        h='400px'
        bg='linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08))'
        borderRadius='full'
        opacity={0.5}
      />

      <Container maxW='md' position='relative' zIndex={1}>
        <VStack spacing={8} align='center'>
          {/* Error Alert */}
          <Alert
            status='error'
            variant='subtle'
            borderRadius='xl'
            p={6}
            w='full'
            bg='rgba(254, 242, 242, 0.9)'
            border='1px solid'
            borderColor='red.200'
            boxShadow='0 10px 25px rgba(239, 68, 68, 0.1)'
          >
            <AlertIcon boxSize='18px' color='red.500' />
            <Box textAlign='center'>
              <AlertTitle fontSize='lg' fontWeight='700' color='red.700' mb={2}>
                {errorInfo.title}
              </AlertTitle>
              <AlertDescription color='red.600'>
                {errorInfo.description}
              </AlertDescription>
            </Box>
          </Alert>

          {/* Main content */}
          <VStack spacing={6} textAlign='center'>
            <Heading
              size='xl'
              fontWeight='800'
              color='gray.900'
              letterSpacing='-0.02em'
            >
              Oops! Something went wrong
            </Heading>
            <Text color='gray.600' fontSize='lg' maxW='sm'>
              We encountered an issue while trying to sign you in. Don't worry,
              you can try again or return to the home page.
            </Text>

            {/* Action buttons */}
            <VStack spacing={4} w='full'>
              <Link href='/auth/signin'>
                <Button
                  size='lg'
                  w='full'
                  h={14}
                  bg='linear-gradient(135deg, #0088ff 0%, #005899 100%)'
                  color='white'
                  borderRadius='xl'
                  fontSize='md'
                  fontWeight='700'
                  leftIcon={<FiRefreshCw />}
                  _hover={{
                    bg: 'linear-gradient(135deg, #0070cc 0%, #004066 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 136, 255, 0.3)',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition='all 0.3s ease'
                  boxShadow='0 4px 12px rgba(0, 136, 255, 0.2)'
                >
                  Try Signing In Again
                </Button>
              </Link>

              <Link href='/'>
                <Button
                  size='lg'
                  w='full'
                  h={14}
                  variant='outline'
                  borderColor='gray.300'
                  color='gray.700'
                  borderRadius='xl'
                  fontSize='md'
                  fontWeight='600'
                  leftIcon={<FiHome />}
                  _hover={{
                    bg: 'gray.50',
                    borderColor: 'gray.400',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition='all 0.3s ease'
                  boxShadow='0 4px 12px rgba(0, 0, 0, 0.05)'
                >
                  Go to Home Page
                </Button>
              </Link>
            </VStack>

            {/* Support info */}
            <Box
              p={4}
              bg='white'
              borderRadius='lg'
              border='1px'
              borderColor='gray.200'
              w='full'
              textAlign='center'
            >
              <Text fontSize='sm' color='gray.600' mb={2}>
                Need help? Contact our support team
              </Text>
              <Text fontSize='sm' fontWeight='600' color='brand.600'>
                support@ai-job-assistant.com
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
