'use client';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        // Check if we have a session
        const session = await getSession();
        if (session) {
          router.push('/');
        }
      }
    } catch (err) {
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md justify-center" justifyContent="center" alignItems="center" py={12}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading size="lg" mb={2}>
                Sign In
              </Heading>
              <Text color="gray.600">
                Enter your credentials to access your account
              </Text>
            </Box>

            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}

            {/* OAuth Providers */}
            <VStack spacing={3} w="full">
              <Button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                colorScheme="red"
                variant="outline"
                size="lg"
                w="full"
                leftIcon={<Text>🔍</Text>}
              >
                Continue with Google
              </Button>

              <Button
                onClick={() => signIn('github', { callbackUrl: '/' })}
                colorScheme="gray"
                variant="outline"
                size="lg"
                w="full"
                leftIcon={<Text>🐙</Text>}
              >
                Continue with GitHub
              </Button>
            </VStack>

            <HStack w="full">
              <Divider />
              <Text fontSize="sm" color="gray.500">
                OR
              </Text>
              <Divider />
            </HStack>

            {/* Email/Password Form */}
            <Box as="form" onSubmit={handleSubmit} w="full">
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In with Email
                </Button>
              </VStack>
            </Box>

            <Box textAlign="center">
              <Text fontSize="sm" color="gray.600">
                Demo: Use any email and password to sign in
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}