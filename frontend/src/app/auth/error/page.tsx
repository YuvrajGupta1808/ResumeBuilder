'use client';

import { Alert, AlertIcon, Box, Button, Card, CardBody, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading size="lg" mb={2} color="red.500">
                Authentication Error
              </Heading>
            </Box>

            <Alert status="error">
              <AlertIcon />
              {getErrorMessage(error)}
            </Alert>

            <VStack spacing={4}>
              <Text textAlign="center" color="gray.600">
                Please try signing in again or contact support if the problem persists.
              </Text>

              <Button as={Link} href="/auth/signin" colorScheme="blue">
                Try Again
              </Button>

              <Button as={Link} href="/" variant="outline">
                Go Home
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}