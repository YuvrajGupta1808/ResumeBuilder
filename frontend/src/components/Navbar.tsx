'use client';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    
    useDisclosure,
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
    <Box bg='gray.100' px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link href="/">
              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                AI Job Assistant
              </Text>
            </Link>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button variant="ghost" size="sm">
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
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={session.user?.image || ''} />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text>{session.user?.name}</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontSize="sm" color="gray.500">{session.user?.email}</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button variant="ghost" size="sm" w="full" justifyContent="start">
                  {link.name}
                </Button>
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
