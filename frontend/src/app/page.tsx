import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import { Box } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </Box>
  );
}
