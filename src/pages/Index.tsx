import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import GamesSection from "@/components/GamesSection";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Principal: Noticias + Sidebar */}
      <div id="principal-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-10">
          <div className="lg:flex-1">
            <NewsSection />
          </div>
          <div className="lg:w-80 flex-shrink-0 py-16 md:py-24">
            <ProjectsSidebar />
          </div>
        </div>
      </div>

      <GamesSection />
      <EventsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
