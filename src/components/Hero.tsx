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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto pt-24"
    >
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
          className="rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300"
        >
          View Projects
        </Button>
        <Button 
          variant="outline"
          onClick={() => onScrollTo("about")}
          className="rounded-full px-8 py-6 text-base border-border hover:border-primary transition-all duration-300"
        >
          Read More
        </Button>
      </div>
    </section>
  );
};

export default Hero;
