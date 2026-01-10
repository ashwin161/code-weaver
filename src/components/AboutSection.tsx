import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Awards Won" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-item", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="mb-12 about-item">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">About Me</h2>
        <div className="w-24 h-1 bg-primary rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 about-item">
          <p className="text-lg text-muted-foreground">I'm a creative developer passionate about building immersive digital experiences that blur the line between reality and imagination.</p>
          <p className="text-lg text-muted-foreground">With expertise in AR/VR, motion graphics, and interactive web development, I craft experiences that captivate users and bring brands to life.</p>
          <p className="text-lg text-muted-foreground">My work spans from cutting-edge WebGL experiments to polished production applications, always pushing the boundaries of what's possible on the web.</p>
        </div>

        <div className="about-item flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative glass-panel rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                {stats.map((s) => (
                  <div key={s.label} className="space-y-2">
                    <span className="text-4xl font-display font-bold gradient-text">{s.value}</span>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
