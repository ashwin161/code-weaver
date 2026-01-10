const skills = ["JavaScript", "WebGL", "React Three Fiber", "GSAP", "Blender", "AR/VR", "UI/UX", "Node.js"];

const SkillsMarquee = () => (
  <section id="skills" className="py-12 border-y border-border bg-secondary/30 overflow-hidden">
    <div className="relative whitespace-nowrap">
      {[0, 1].map((i) => (
        <div key={i} className="inline-flex animate-marquee" aria-hidden={i === 1}>
          {skills.map((s, j) => (
            <span key={j} className="flex items-center">
              <span className="font-display text-5xl md:text-7xl font-bold text-foreground/10 mx-4 hover:text-primary transition-colors cursor-default">{s}</span>
              <span className="text-primary text-2xl mx-2">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default SkillsMarquee;
