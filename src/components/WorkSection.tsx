import { useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Cyber Finance", description: "Web3 Dashboard with real-time data visualization.", tags: ["React", "Three.js", "GSAP"], gradient: "linear-gradient(135deg, hsl(250, 89%, 62%) 0%, hsl(280, 85%, 60%) 100%)" },
  { title: "Neon VR", description: "Immersive virtual reality environment for brand storytelling.", tags: ["Unity", "C#", "WebGL"], gradient: "linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(250, 89%, 62%) 100%)" },
  { title: "Agency Portfolio", description: "High-performance aesthetic website for a digital agency.", tags: ["HTML", "SCSS", "Lenis"], gradient: "linear-gradient(135deg, hsl(280, 85%, 60%) 0%, hsl(320, 70%, 50%) 100%)" },
];

const WorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, y: 60, opacity: 0, duration: 1, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="mb-16 work-header">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
};

export default WorkSection;
