'use client';

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiFileText,
  FiHome,
  FiSettings,
  FiTrendingUp,
  FiUpload,
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Upload Resume', href: '/resume-upload', icon: FiUpload },
  { name: 'Job Input', href: '/job-input', icon: FiFileText },
  { name: 'Downloads', href: '/download', icon: FiTrendingUp },
  { name: 'Settings', href: '/settings', icon: FiSettings },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const bg = 'white';
  const borderColor = 'gray.200';

  if (!session) return null;

  return (
    <Box
      w='250px'
      h='100vh'
      bg={bg}
      borderRight='1px'
      borderColor={borderColor}
      p={4}
      position='fixed'
      left={0}
      top={0}
      pt='80px'
    >
      <VStack align='start' spacing={2} w='full'>
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} style={{ width: '100%' }}>
              <HStack
                p={3}
                w='full'
                borderRadius='md'
                bg={isActive ? 'brand.50' : 'transparent'}
                color={isActive ? 'brand.600' : 'gray.600'}
                _hover={{
                  bg: isActive ? 'brand.50' : 'gray.50',
                  color: isActive ? 'brand.600' : 'gray.800',
                }}
                cursor='pointer'
                transition='all 0.2s'
              >
                <item.icon size={20} />
                <Text
                  fontSize='sm'
                  fontWeight={isActive ? 'semibold' : 'normal'}
                >
                  {item.name}
                </Text>
              </HStack>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}
