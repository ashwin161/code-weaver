import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    const element = document.getElementById(target);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
    }
  }, []);

  return (
    <>
      <ParticlesBackground />
      <div className="min-h-screen bg-transparent relative z-10">
        <CursorGlow />
        <Header onScrollTo={scrollTo} />
        
        <main>
          <Hero onScrollTo={scrollTo} />
          <AboutSection />
          <WorkSection />
          <SkillsMarquee />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
