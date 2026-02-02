import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { CoreIdeaSection } from "@/components/CoreIdeaSection";
import { MythsSection } from "@/components/MythsSection";
import { ScienceSection } from "@/components/ScienceSection";
import { AuthorsSection } from "@/components/AuthorsSection";
import { ParticipateSection } from "@/components/ParticipateSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <CoreIdeaSection />
        <MythsSection />
        <ScienceSection />
        <AuthorsSection />
        <ParticipateSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
