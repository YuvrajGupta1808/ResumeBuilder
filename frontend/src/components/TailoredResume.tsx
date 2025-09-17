'use client';

import { api } from '@/lib/api';
import { JobHistory } from '@/types';
import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import jsPDF from 'jspdf';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiCopy, FiDownload, FiEdit } from 'react-icons/fi';

export function TailoredResume() {
  const [jobHistory, setJobHistory] = useState<JobHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const searchParams = useSearchParams();
  const jobHistoryId = searchParams.get('jobHistoryId');
  const toast = useToast();
  const bg = 'white';
  const borderColor = 'gray.200';

  useEffect(() => {
    if (jobHistoryId) {
      fetchJobHistory();
    }
  }, [jobHistoryId]);

  const fetchJobHistory = async () => {
    try {
      const response = await api.get(`/job-history/${jobHistoryId}`);
      setJobHistory(response.data);
    } catch (error: any) {
      console.error('Error fetching job history:', error);
      
      // If the job history is not found, it might still be processing
      if (error.response?.status === 404) {
        toast({
          title: 'Resume Still Processing',
          description: 'Your tailored resume is still being generated. Please wait a moment and refresh the page.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        
        // Retry after 5 seconds
        setTimeout(() => {
          fetchJobHistory();
        }, 5000);
        return;
      }
      
      toast({
        title: 'Error Loading Resume',
        description: 'Failed to load the tailored resume. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!jobHistory) return;

    setDownloading(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      // Add title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Tailored Resume', margin, margin + 10);

      // Add job info
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `${jobHistory.jobTitle} at ${jobHistory.company}`,
        margin,
        margin + 25
      );

      // Add content
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(jobHistory.tailoredResume, maxWidth);
      let yPosition = margin + 40;

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });

      doc.save(`${jobHistory.jobTitle}-resume.pdf`);

      toast({
        title: 'Resume downloaded!',
        description: 'Your tailored resume has been downloaded as a PDF.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Download failed',
        description: 'Failed to generate PDF. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadTXT = () => {
    if (jobHistory) {
      const element = document.createElement('a');
      const file = new Blob([jobHistory.tailoredResume], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `${jobHistory.jobTitle}-resume.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleCopy = async () => {
    if (jobHistory) {
      await navigator.clipboard.writeText(jobHistory.tailoredResume);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <Box
        bg={bg}
        border='1px'
        borderColor={borderColor}
        borderRadius='lg'
        p={6}
      >
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="600" color="gray.700">
            Loading tailored resume...
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            This may take a few moments while we process your request.
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!jobHistory) {
    return (
      <Box
        bg={bg}
        border='1px'
        borderColor={borderColor}
        borderRadius='lg'
        p={6}
      >
        <Text>No resume data found.</Text>
      </Box>
    );
  }

  return (
    <Box bg={bg} border='1px' borderColor={borderColor} borderRadius='lg' p={6}>
      <VStack align='start' spacing={4}>
        <HStack justify='space-between' w='full'>
          <Box>
            <Heading size='md'>Tailored Resume</Heading>
            <Text fontSize='sm' color='gray.500'>
              {jobHistory.jobTitle} at {jobHistory.company}
            </Text>
          </Box>
          <HStack>
            <Button
              leftIcon={<FiCopy />}
              variant='outline'
              size='sm'
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button leftIcon={<FiEdit />} variant='outline' size='sm'>
              Edit
            </Button>
            <Button
              leftIcon={<FiDownload />}
              colorScheme='blue'
              size='sm'
              onClick={handleDownloadPDF}
              isLoading={downloading}
              loadingText='Generating...'
            >
              PDF
            </Button>
            <Button
              leftIcon={<FiDownload />}
              variant='outline'
              size='sm'
              onClick={handleDownloadTXT}
            >
              TXT
            </Button>
          </HStack>
        </HStack>

        <Divider />

        <Box
          w='full'
          p={4}
          bg='gray.50'
          borderRadius='md'
          maxH='600px'
          overflowY='auto'
        >
          <Text whiteSpace='pre-wrap' fontSize='sm' lineHeight='1.6'>
            {jobHistory.tailoredResume}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
