import { useEffect, useRef, useState } from "react";
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

      {/* Photo Frame with Prism Effect */}
      <div ref={photoRef} className="relative group">
        {/* Orbiting rings */}
        <div className="absolute -inset-10 flex items-center justify-center pointer-events-none">
          <div 
            className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-primary/20"
            style={{ animation: "spin 30s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
          </div>
          <div 
            className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-accent/15"
            style={{ animation: "spin 20s linear infinite reverse" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50" />
          </div>
        </div>

        {/* Prism background effect */}
        <div className="absolute -inset-4 opacity-70 group-hover:opacity-100 transition-all duration-700">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 180deg at 50% 50%, hsl(var(--primary) / 0.3) 0deg, hsl(var(--accent) / 0.2) 120deg, hsl(200 100% 50% / 0.2) 240deg, hsl(var(--primary) / 0.3) 360deg)",
              filter: "blur(30px)",
              animation: "spin 8s linear infinite",
            }}
          />
        </div>
        
        {/* Photo container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl group-hover:shadow-primary/30 transition-all duration-500 border-4 border-background">
          {/* Inner glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-500 z-10 pointer-events-none" />
          
          {uploadedImage ? (
            <img 
              src={uploadedImage} 
              alt="Profile" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <label className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center cursor-pointer hover:from-secondary/80 hover:to-secondary/80 transition-all duration-300">
              <div className="text-center p-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/5 flex items-center justify-center backdrop-blur-sm border border-foreground/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                  <svg className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                  Click to Upload Photo
                </p>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Floating accent elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: "0.2s" }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
