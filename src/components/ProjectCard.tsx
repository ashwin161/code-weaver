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
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-card border border-border rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden"
    >
      {/* Interactive glow effect */}
      <div 
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
      />
      
      <div 
        className="h-64 rounded-2xl mb-6 relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
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
