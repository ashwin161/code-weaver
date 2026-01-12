import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

interface HeroProps {
  onScrollTo: (target: string) => void;
}

const Hero = ({ onScrollTo }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(actionsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(photoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "back.out(1.7)",
      });

      // Floating animation for photo
      gsap.to(photoRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-12 max-w-6xl mx-auto pt-24"
    >
      <div className="flex-1">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8"
        >
          Designing the <br />
          <span className="gradient-text">Immersive Future</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          AR and VR motion graphics integrate animation into immersive environments,
          enhancing user interaction and realism. I combine motion with virtual spaces
          to guide attention, tell stories, and create dynamic experiences.
        </p>

        <div ref={actionsRef} className="flex flex-wrap gap-4">
          <Button 
            onClick={() => onScrollTo("work")}
            className="rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 hover:translate-y-[-2px] hover:shadow-xl transition-all duration-300"
          >
            View Projects
          </Button>
          <Button 
            variant="outline"
            onClick={() => onScrollTo("about")}
            className="rounded-full px-8 py-6 text-base border-2 border-foreground/20 hover:border-foreground hover:bg-foreground/10 transition-all duration-300"
          >
            Read More
          </Button>
        </div>
      </div>

      {/* Photo Frame with Rotating Border */}
      <div ref={photoRef} className="relative group">
        {/* Rotating gradient border */}
        <div 
          className="absolute -inset-2 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from 0deg, hsl(var(--foreground) / 0.1), hsl(var(--foreground) / 0.3), hsl(var(--foreground) / 0.1), hsl(var(--foreground) / 0.3), hsl(var(--foreground) / 0.1))",
            animation: "spin 8s linear infinite",
          }}
        />
        
        {/* Pulsing outer ring */}
        <div 
          className="absolute -inset-6 rounded-full border border-foreground/10 group-hover:border-foreground/20 transition-colors duration-500"
          style={{ animation: "pulse 3s ease-in-out infinite" }}
        />
        <div 
          className="absolute -inset-10 rounded-full border border-dashed border-foreground/5 group-hover:border-foreground/10 transition-colors duration-500"
          style={{ animation: "spin 20s linear infinite reverse" }}
        />
        
        {/* Photo container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl group-hover:shadow-foreground/20 transition-all duration-500 border-4 border-background">
          {/* Inner glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-foreground/10 group-hover:border-foreground/20 transition-colors duration-500 z-10 pointer-events-none" />
          
          {/* Placeholder profile image */}
          <div className="w-full h-full bg-gradient-to-br from-muted via-secondary to-muted flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-foreground/10 flex items-center justify-center border border-foreground/10">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Your Photo</p>
            </div>
          </div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shadow-lg shadow-foreground/20 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-foreground/80 flex items-center justify-center shadow-lg shadow-foreground/20 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
