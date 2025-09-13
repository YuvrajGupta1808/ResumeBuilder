'use client';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Text as ChakraText,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Upload Resume', href: '/resume-upload' },
  { name: 'Job Input', href: '/job-input' },
];

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <Box
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(20px)"
      borderBottom="1px"
      borderColor="rgba(0, 136, 255, 0.1)"
      position="sticky"
      top={0}
      zIndex={1000}
      px={8}
      py={6}
          sx={{
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Flex h={20} alignItems={'center'} justifyContent={'space-between'} maxW="container.xl" mx="auto" >
        {/* Enhanced Mobile Menu Button */}
        <IconButton
          size={'lg'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          color="brand.600"
          borderRadius="full"
          _hover={{
            bg: 'brand.50',
            transform: 'scale(1.05)',
          }}
          _active={{
            transform: 'scale(0.95)',
          }}
          transition="all 0.2s ease"
        />

        <HStack spacing={10} alignItems={'center'}>
          {/* Enhanced Logo */}
          <Box>
            <Link href="/">
              <HStack spacing={3} align="center">
                <Box
                  w={10}
                  h={10}
                  bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 4px 12px rgba(0, 136, 255, 0.3)"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(5deg) scale(1.05)',
                      boxShadow: '0 8px 20px rgba(0, 136, 255, 0.4)',
                    },
                  }}
                >
                  <ChakraText fontSize="lg" fontWeight="bold" color="white">
                    AI
                  </ChakraText>
                </Box>
                <VStack spacing={0} align="start">
                  <ChakraText
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
                  </ChakraText>
                  <ChakraText
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="500"
                    letterSpacing="wide"
                    textTransform="uppercase"
                  >
                    Powered by AI
                  </ChakraText>
                </VStack>
              </HStack>
            </Link>
          </Box>

          {/* Enhanced Navigation Links */}
          <HStack as={'nav'} spacing={2} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link, index) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="ghost"
                  size="md"
                  px={6}
                  py={3}
                  borderRadius="xl"
                  fontWeight="600"
                  color="gray.700"
                  position="relative"
                  overflow="hidden"
                  sx={{
                    transition: 'all 0.3s ease',
                    animation: `slideInLeft 0.8s ease-out ${index * 0.1}s both`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 136, 255, 0.1), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      bg: 'brand.50',
                      color: 'brand.700',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0, 136, 255, 0.15)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {session ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'ghost'}
                cursor={'pointer'}
                minW={0}
                p={1}
                borderRadius="full"
                _hover={{
                  bg: 'brand.50',
                  transform: 'scale(1.05)',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
                transition="all 0.2s ease"
              >
                <Avatar
                  size={"28px"}
                  src={session.user?.image || ''}
                  border="2px solid"
                  borderColor="brand.200"
                  boxShadow="0 2px 8px rgba(0, 136, 255, 0.15)"
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'brand.400',
                      boxShadow: '0 4px 12px rgba(0, 136, 255, 0.25)',
                    },
                  }}
                />
              </MenuButton>
              <MenuList
                bg="white"
                border="1px"
                borderColor="gray.200"
                borderRadius="xl"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
                p={4}
              >
                <VStack spacing={3} align="start" mb={3}>
                  <ChakraText fontWeight="700" fontSize="md" color="gray.900">
                    {session.user?.name}
                  </ChakraText>
                  <ChakraText fontSize="sm" color="gray.600">
                    {session.user?.email}
                  </ChakraText>
                </VStack>
                <MenuDivider />
                <MenuItem
                  borderRadius="lg"
                  _hover={{
                    bg: 'brand.50',
                    color: 'brand.700',
                  }}
                  fontWeight="500"
                  onClick={() => signOut()}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              size="md"
              px={6}
              py={3}
              bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
              color="white"
              borderRadius="xl"
              fontWeight="700"
              letterSpacing="wide"
              _hover={{
                bg: "linear-gradient(135deg, #0070cc 0%, #004066 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0, 136, 255, 0.3)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.3s ease"
              onClick={() => signIn()}
              boxShadow="0 4px 12px rgba(0, 136, 255, 0.2)"
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <Box
          pb={6}
          display={{ md: 'none' }}
          bg="white"
          mx={-6}
          px={6}
          borderTop="1px"
          borderColor="gray.100"
          sx={{
            animation: 'slideIn 0.3s ease-out',
            '@keyframes slideIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Stack as={'nav'} spacing={2}>
            {Links.map((link, index) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="ghost"
                  size="lg"
                  w="full"
                  justifyContent="start"
                  px={6}
                  py={4}
                  borderRadius="xl"
                  fontWeight="600"
                  color="gray.700"
                  _hover={{
                    bg: 'brand.50',
                    color: 'brand.700',
                    transform: 'translateX(4px)',
                  }}
                  transition="all 0.2s ease"
                  sx={{
                    animation: `slideInLeft 0.4s ease-out ${index * 0.1 + 0.1}s both`,
                  }}
                >
                  {link.name}
                </Button>
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <Box pt={4} borderTop="1px" borderColor="gray.100">
              {session ? (
                <VStack spacing={3} align="center">
                  <ChakraText fontWeight="700" fontSize="md" color="gray.900">
                    {session.user?.name}
                  </ChakraText>
                  <ChakraText fontSize="sm" color="gray.600">
                    {session.user?.email}
                  </ChakraText>
                  <Button
                    variant="outline"
                    size="md"
                    w="full"
                    borderColor="red.200"
                    color="red.600"
                    _hover={{
                      bg: 'red.50',
                      borderColor: 'red.300',
                    }}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </VStack>
              ) : (
                <Button
                  size="lg"
                  w="full"
                  bg="linear-gradient(135deg, #0088ff 0%, #005899 100%)"
                  color="white"
                  borderRadius="xl"
                  fontWeight="700"
                  _hover={{
                    bg: "linear-gradient(135deg, #0070cc 0%, #004066 100%)",
                  }}
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
