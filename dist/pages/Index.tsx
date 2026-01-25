import CRTOverlay from "@/components/CRTOverlay";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import KidcoreGrid from "@/components/KidcoreGrid";
import PacManTimeline from "@/components/PacManTimeline";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative bg-background min-h-screen">
      {/* CRT Scanline & Noise Effects */}
      <CRTOverlay />

      {/* Navigation */}
      <NavBar />

      {/* Hero with TV Zoom */}
      <HeroSection />

      {/* Kidcore Feature Grid */}
      <KidcoreGrid />

      {/* Pac-Man Timeline */}
      <PacManTimeline />

      {/* Retro Footer */}
      <Footer />
    </main>
  );
};

export default Index;
