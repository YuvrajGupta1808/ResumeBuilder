'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Box } from '@chakra-ui/react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box minH='100vh' display='flex' flexDirection='column'>
      <Navbar />
      <Box flex='1'>{children}</Box>
      <Footer />
    </Box>
  );
}
