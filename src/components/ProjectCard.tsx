import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

const ProjectCard = ({ title, description, tags, gradient }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.15,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group cursor-pointer"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -10}deg) rotateY(${(mousePos.x - 0.5) * 10}deg) translateY(-8px)` 
          : "perspective(1000px) rotateX(0) rotateY(0) translateY(0)",
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Masking spotlight effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.1), transparent 40%)`
            : "none",
        }}
      />
      
      {/* Border glow on hover */}
      <div 
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
          filter: "blur(8px)",
        }}
      />
      
      {/* Image container with mask reveal */}
      <div className="h-64 relative overflow-hidden">
        <div 
          ref={imageRef}
          className="absolute inset-0"
          style={{ background: gradient }}
        />
        
        {/* Reveal mask overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 opacity-0 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-white font-medium text-sm tracking-wide uppercase">View Project</span>
          </div>
        </div>
        
        {/* Animated lines on hover */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 delay-200"
          />
          <div 
            className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000 delay-100"
          />
          <div 
            className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-300"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground 
                         group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5 
                         transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
