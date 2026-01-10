import { useRef, useEffect } from "react";
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

  return (
    <article 
      ref={cardRef}
      className="glass-panel rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-3 group"
    >
      <div 
        className="h-64 rounded-2xl mb-6 relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      <div>
        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground"
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
