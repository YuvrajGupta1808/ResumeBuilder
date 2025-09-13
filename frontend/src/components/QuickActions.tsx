'use client';

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FiFileText, FiPlus, FiUpload } from 'react-icons/fi';

export function QuickActions() {
  const bg = 'white';
  const borderColor = 'gray.200';

  return (
    <Box bg={bg} border='1px' borderColor={borderColor} borderRadius='lg' p={4}>
      <VStack align='start' spacing={4}>
        <Heading size='md'>Quick Actions</Heading>

        <VStack spacing={3} w='full'>
          <Link href='/resume-upload' style={{ width: '100%' }}>
            <Button
              leftIcon={<FiUpload />}
              variant='outline'
              w='full'
              justifyContent='start'
            >
              Upload New Resume
            </Button>
          </Link>

          <Link href='/job-input' style={{ width: '100%' }}>
            <Button
              leftIcon={<FiFileText />}
              colorScheme='brand'
              w='full'
              justifyContent='start'
            >
              Tailor Resume
            </Button>
          </Link>

          <Button
            leftIcon={<FiPlus />}
            variant='ghost'
            w='full'
            justifyContent='start'
          >
            Create New Application
          </Button>
        </VStack>

        <Text fontSize='sm' color='gray.500' mt={4}>
          Get started by uploading your resume or tailoring it for a specific
          job.
        </Text>
      </VStack>
    </Box>
  );
}
