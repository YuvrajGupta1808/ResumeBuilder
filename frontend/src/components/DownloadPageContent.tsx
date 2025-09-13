'use client';

import { useApiClient } from '@/lib/api-client';
import { JobHistory } from '@/types';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Divider,
    HStack,
    SimpleGrid,
    Spinner,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import jsPDF from 'jspdf';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FiCheckCircle, FiDownload, FiEye, FiFileText, FiStar } from 'react-icons/fi';

export function DownloadPageContent() {
  const [jobHistory, setJobHistory] = useState<JobHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const searchParams = useSearchParams();
  const jobHistoryId = searchParams.get('jobHistoryId');
  const toast = useToast();
  const apiClient = useApiClient();

  const fetchJobHistory = useCallback(async () => {
    try {
      console.log('Fetching job history for ID:', jobHistoryId);
      const response = await apiClient.get(`/job-history/${jobHistoryId}`);
      console.log('Job history response:', response.data);
      setJobHistory(response.data);
    } catch (error: any) {
      console.error('Error fetching job history:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      toast({
        title: 'Error loading documents',
        description: 'Failed to load your tailored documents. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [jobHistoryId, apiClient, toast]);

  useEffect(() => {
    if (jobHistoryId) {
      fetchJobHistory();
    } else {
      setLoading(false);
    }
  }, [jobHistoryId, fetchJobHistory]);

  const generatePDF = (content: string, filename: string, title: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    // Add title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, margin + 10);
    
    // Add job info if available
    if (jobHistory) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`${jobHistory.jobTitle} at ${jobHistory.company}`, margin, margin + 25);
    }
    
    // Add content
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const lines = doc.splitTextToSize(content, maxWidth);
    let yPosition = margin + 40;
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });
    
    return doc;
  };

  const downloadResumePDF = async () => {
    if (!jobHistory) return;
    
    setDownloading(true);
    try {
      // Check if content is a compiled PDF
      if (jobHistory.tailoredResume.startsWith('PDF_COMPILED:')) {
        const base64Data = jobHistory.tailoredResume.replace('PDF_COMPILED:', '');
        const pdfBlob = new Blob([Buffer.from(base64Data, 'base64')], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${jobHistory.jobTitle}-resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Fallback to text-based PDF generation
        const doc = generatePDF(
          jobHistory.tailoredResume,
          `${jobHistory.jobTitle}-resume.pdf`,
          'Tailored Resume'
        );
        doc.save(`${jobHistory.jobTitle}-resume.pdf`);
      }
      
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

  const downloadCoverLetterPDF = async () => {
    if (!jobHistory) return;
    
    setDownloading(true);
    try {
      // Check if content is a compiled PDF
      if (jobHistory.coverLetter.startsWith('PDF_COMPILED:')) {
        const base64Data = jobHistory.coverLetter.replace('PDF_COMPILED:', '');
        const pdfBlob = new Blob([Buffer.from(base64Data, 'base64')], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${jobHistory.jobTitle}-cover-letter.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Fallback to text-based PDF generation
        const doc = generatePDF(
          jobHistory.coverLetter,
          `${jobHistory.jobTitle}-cover-letter.pdf`,
          'Cover Letter'
        );
        doc.save(`${jobHistory.jobTitle}-cover-letter.pdf`);
      }
      
      toast({
        title: 'Cover letter downloaded!',
        description: 'Your cover letter has been downloaded as a PDF.',
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

  const downloadAllPDFs = async () => {
    if (!jobHistory) return;
    
    setDownloading(true);
    try {
      // Download resume
      const resumeDoc = generatePDF(
        jobHistory.tailoredResume,
        `${jobHistory.jobTitle}-resume.pdf`,
        'Tailored Resume'
      );
      resumeDoc.save(`${jobHistory.jobTitle}-resume.pdf`);
      
      // Wait a bit before downloading cover letter
      setTimeout(() => {
        const coverLetterDoc = generatePDF(
          jobHistory.coverLetter,
          `${jobHistory.jobTitle}-cover-letter.pdf`,
          'Cover Letter'
        );
        coverLetterDoc.save(`${jobHistory.jobTitle}-cover-letter.pdf`);
        
        toast({
          title: 'All documents downloaded!',
          description: 'Your resume and cover letter have been downloaded as PDFs.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setDownloading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PDFs:', error);
      toast({
        title: 'Download failed',
        description: 'Failed to generate PDFs. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setDownloading(false);
    }
  };





  const downloadAsText = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const viewPDF = (content: string, title: string) => {
    // Check if content is a compiled PDF
    if (content.startsWith('PDF_COMPILED:')) {
      const base64Data = content.replace('PDF_COMPILED:', '');
      const pdfBlob = new Blob([Buffer.from(base64Data, 'base64')], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');
    } else {
      // For text content, open in a new window
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${title}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  max-width: 800px; 
                  margin: 0 auto; 
                  padding: 20px; 
                  line-height: 1.6;
                }
                pre { 
                  white-space: pre-wrap; 
                  word-wrap: break-word; 
                  background: #f5f5f5; 
                  padding: 20px; 
                  border-radius: 8px;
                  border: 1px solid #ddd;
                }
              </style>
            </head>
            <body>
              <h1>${title}</h1>
              <hr>
              <pre>${content}</pre>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  if (loading) {
    return (
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text fontSize="lg" color="gray.600">
            Loading your tailored documents...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!jobHistoryId) {
    return (
      <Alert status="warning" borderRadius="xl" bg="orange.50" border="1px" borderColor="orange.200">
        <AlertIcon color="orange.500" boxSize="16px" />
        <Box>
          <AlertTitle color="orange.800" fontSize="sm" fontWeight="semibold">
            No Job History Found
          </AlertTitle>
          <AlertDescription color="orange.700" fontSize="sm">
            Please go back to the dashboard and generate tailored documents first.
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  if (!jobHistory) {
    return (
      <Alert status="error" borderRadius="xl" bg="red.50" border="1px" borderColor="red.200">
        <AlertIcon color="red.500" boxSize="16px" />
        <Box>
          <AlertTitle color="red.800" fontSize="sm" fontWeight="semibold">
            Documents Not Found
          </AlertTitle>
          <AlertDescription color="red.700" fontSize="sm">
            The requested documents could not be found. Please try generating them again.
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  return (
    <VStack spacing={8} w="full">
      {/* Success Alert */}
      <Alert status="success" borderRadius="sm" bg="green.50" border="1px" borderColor="green.200">
        <AlertIcon color="green.500" boxSize="26px" />
        <Box>
          <AlertTitle color="green.800" fontSize="sm" fontWeight="semibold">
            Documents Ready!
          </AlertTitle>
          <AlertDescription color="green.700" fontSize="sm">
            Your tailored resume and cover letter for {jobHistory.jobTitle} at {jobHistory.company} are ready for download.
          </AlertDescription>
        </Box>
      </Alert>

      {/* Job Info */}
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        <VStack spacing={4} align="start">
          <HStack justify="space-between" w="full">
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                {jobHistory.jobTitle}
              </Text>
              <Text color="gray.600" fontSize="md">
                {jobHistory.company}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Generated on {new Date(jobHistory.createdAt).toLocaleDateString()}
              </Text>
            </VStack>
            <Box
              p={1}
              bg="green.100"
              borderRadius="full"
              color="green.600"
            >
              <FiCheckCircle size={8} />
            </Box>
          </HStack>
        </VStack>
      </Box>

      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
        <Box
          bg="white"
          p={6}
          borderRadius="xl"
          border="1px"
          borderColor="gray.200"
          textAlign="center"
        >
          <VStack spacing={3}>
            <Box
              p={3}
              bg="blue.100"
              borderRadius="xl"
              color="blue.600"
            >
              <FiFileText size={24} />
            </Box>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                2
              </Text>
              <Text fontSize="sm" color="gray.600">
                Documents Ready
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="xl"
          border="1px"
          borderColor="gray.200"
          textAlign="center"
        >
          <VStack spacing={3}>
            <Box
              p={3}
              bg="green.100"
              borderRadius="xl"
              color="green.600"
            >
              <FiStar size={24} />
            </Box>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                AI
              </Text>
              <Text fontSize="sm" color="gray.600">
                Tailored Content
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="xl"
          border="1px"
          borderColor="gray.200"
          textAlign="center"
        >
          <VStack spacing={3}>
            <Box
              p={3}
              bg="purple.100"
              borderRadius="xl"
              color="purple.600"
            >
              <FiDownload size={24} />
            </Box>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                PDF
              </Text>
              <Text fontSize="sm" color="gray.600">
                Professional Format
              </Text>
            </VStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Download Actions */}
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        <VStack spacing={6}>
          <HStack justify="space-between" w="full">
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold" color="gray.800" fontSize="lg">
                Download Options
              </Text>
              <Text fontSize="sm" color="gray.600">
                Choose your preferred format and download your documents
              </Text>
            </VStack>
          </HStack>

          <Divider />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            {/* Resume Download */}
            <Box
              p={6}
              bg="gray.50"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="start">
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg="blue.100"
                    borderRadius="lg"
                    color="blue.600"
                  >
                    <FiFileText size={20} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" color="gray.800">
                      Tailored Resume
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Customized for this position
                    </Text>
                  </VStack>
                </HStack>
                
                <VStack spacing={3} w="full">
                  <HStack spacing={2} w="full">
                    <Button
                      leftIcon={<FiEye />}
                      variant="outline"
                      size="sm"
                      onClick={() => viewPDF(jobHistory.tailoredResume, 'Tailored Resume')}
                      flex="1"
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<FiDownload />}
                      colorScheme="blue"
                      size="sm"
                      onClick={downloadResumePDF}
                      isLoading={downloading}
                      loadingText="Generating..."
                      flex="1"
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadAsText(jobHistory.tailoredResume, `${jobHistory.jobTitle}-resume.txt`)}
                      flex="1"
                    >
                      Download TXT
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Box>

            {/* Cover Letter Download */}
            <Box
              p={6}
              bg="gray.50"
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="start">
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg="green.100"
                    borderRadius="lg"
                    color="green.600"
                  >
                    <FiFileText size={20} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" color="gray.800">
                      Cover Letter
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Personalized for this role
                    </Text>
                  </VStack>
                </HStack>
                
                <VStack spacing={3} w="full">
                  <HStack spacing={2} w="full">
                    <Button
                      leftIcon={<FiEye />}
                      variant="outline"
                      size="sm"
                      onClick={() => viewPDF(jobHistory.coverLetter, 'Cover Letter')}
                      flex="1"
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<FiDownload />}
                      colorScheme="green"
                      size="sm"
                      onClick={downloadCoverLetterPDF}
                      isLoading={downloading}
                      loadingText="Generating..."
                      flex="1"
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadAsText(jobHistory.coverLetter, `${jobHistory.jobTitle}-cover-letter.txt`)}
                      flex="1"
                    >
                      Download TXT
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Download All Buttons */}
          <Box w="full" pt={4}>
            <VStack spacing={4}>
              <Button
                leftIcon={<FiDownload />}
                bg="linear(to-r, brand.400, brand.600)"
                color="white"
                size="lg"
                w="full"
                onClick={downloadAllPDFs}
                isLoading={downloading}
                loadingText="Generating PDFs..."
                _hover={{
                  bg: "linear(to-r, brand.500, brand.700)",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "translateY(0px)",
                }}
                transition="all 0.2s"
              >
                Download All Documents (PDF)
              </Button>
              
              
            </VStack>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
