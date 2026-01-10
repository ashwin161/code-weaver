import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}

const ProjectCard = ({ title, description, tags, gradient }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { scrollTrigger: { trigger: ref.current, start: "top 85%" }, y: 100, opacity: 0, duration: 1, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      onMouseMove={(e) => { const r = ref.current?.getBoundingClientRect(); if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      className="relative bg-card border border-border rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 group overflow-hidden"
    >
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ left: pos.x - 128, top: pos.y - 128 }} />
      <div className="h-64 rounded-2xl mb-6 relative overflow-hidden" style={{ background: gradient }}>
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">{tag}</span>)}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
