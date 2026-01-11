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
            className="rounded-full px-8 py-6 text-base border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            Read More
          </Button>
        </div>
      </div>

      {/* Photo Frame with Geometric Effect */}
      <div ref={photoRef} className="relative group">
        {/* Animated geometric shapes */}
        <div className="absolute -inset-8 flex items-center justify-center">
          <div 
            className="absolute w-72 h-72 md:w-96 md:h-96 border-2 border-primary/20 rounded-3xl animate-[spin_20s_linear_infinite]"
            style={{ transform: "rotate(45deg)" }}
          />
          <div 
            className="absolute w-64 h-64 md:w-80 md:h-80 border-2 border-accent/20 rounded-3xl animate-[spin_15s_linear_infinite_reverse]"
            style={{ transform: "rotate(30deg)" }}
          />
          <div 
            className="absolute w-56 h-56 md:w-72 md:h-72 border border-primary/10 rounded-full animate-[spin_25s_linear_infinite]"
          />
        </div>

        {/* Floating particles around photo */}
        <div className="absolute -inset-6">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s", animationDuration: "2s" }} />
          <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
          <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "2.2s" }} />
          <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "2.8s" }} />
        </div>
        
        {/* Hexagonal frame effect */}
        <div 
          className="absolute -inset-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.3))",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: "spin 12s linear infinite",
          }}
        />
        
        {/* Photo container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-2xl group-hover:shadow-primary/20 transition-shadow duration-500"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <div className="absolute inset-1 bg-background"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/5 flex items-center justify-center backdrop-blur-sm border border-foreground/10 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Your Photo Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
