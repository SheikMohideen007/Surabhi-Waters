import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhySurabhi } from "@/components/sections/WhySurabhi";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CustomersSection } from "@/components/sections/CustomersSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Sewage, Water & Wastewater Treatment Systems in Bangalore",
  description:
    "Surabhi Water Solutions designs, manufactures and maintains sewage treatment plants, water and effluent treatment plants, organic waste converters and swimming pool systems. Operating since 2005 from Bangalore.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <SolutionsShowcase />
      <TechnologySection />
      <ProcessTimeline />
      <WhySurabhi />
      <IndustriesSection />
      <ServicesSection />
      <CustomersSection />
      <CTASection />
    </>
  );
}
