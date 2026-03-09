import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import DivisionsSection from "@/components/home/DivisionsSection";
import EventsSection from "@/components/home/EventsSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DivisionsSection />
      <ProgramsSection />
      <EventsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
