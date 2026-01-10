import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

interface HeroProps {
  onScrollTo: (target: string) => void;
}

const Hero = ({ onScrollTo }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from(".hero-subtitle", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-btn", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-photo", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=1");
      
      gsap.to(".hero-photo", { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-12 max-w-6xl mx-auto pt-24">
      <div className="flex-1">
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
          Designing the <br /><span className="gradient-text">Immersive Future</span>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          AR and VR motion graphics integrate animation into immersive environments, enhancing user interaction and realism. I combine motion with virtual spaces to guide attention, tell stories, and create dynamic experiences.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => onScrollTo("work")} className="hero-btn rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 hover:translate-y-[-2px] hover:shadow-xl transition-all">
            View Projects
          </Button>
          <Button variant="outline" onClick={() => onScrollTo("about")} className="hero-btn rounded-full px-8 py-6 text-base border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all">
            Read More
          </Button>
        </div>
      </div>

      <div className="hero-photo relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-75 animate-spin-slow" />
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">Your Photo Here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
