import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "projects" | "internships" | "workshops";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  category: Category;
  slug: string;
}

const projects: Project[] = [
  {
    title: "Cyber Finance",
    description: "Web3 Dashboard with real-time data visualization.",
    tags: ["React", "Three.js", "GSAP"],
    image: "",
    category: "projects",
    slug: "cyber-finance",
  },
  {
    title: "Neon VR",
    description: "Immersive virtual reality environment for brand storytelling.",
    tags: ["Unity", "C#", "WebGL"],
    image: "",
    category: "projects",
    slug: "neon-vr",
  },
  {
    title: "Agency Portfolio",
    description: "High-performance aesthetic website for a digital agency.",
    tags: ["HTML", "SCSS", "Lenis"],
    image: "",
    category: "projects",
    slug: "agency-portfolio",
  },
  {
    title: "Tech Corp Internship",
    description: "Full-stack development internship building enterprise solutions.",
    tags: ["Node.js", "React", "PostgreSQL"],
    image: "",
    category: "internships",
    slug: "tech-corp-internship",
  },
  {
    title: "AR Startup Internship",
    description: "Developed augmented reality features for mobile applications.",
    tags: ["ARKit", "Swift", "Unity"],
    image: "",
    category: "internships",
    slug: "ar-startup-internship",
  },
  {
    title: "WebGL Workshop",
    description: "Conducted hands-on workshop on 3D graphics for the web.",
    tags: ["WebGL", "Three.js", "Shaders"],
    image: "",
    category: "workshops",
    slug: "webgl-workshop",
  },
  {
    title: "Motion Design Workshop",
    description: "Led creative sessions on UI animation principles and GSAP.",
    tags: ["GSAP", "Framer Motion", "CSS"],
    image: "",
    category: "workshops",
    slug: "motion-design-workshop",
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "projects", label: "Projects" },
  { key: "internships", label: "Internships" },
  { key: "workshops", label: "Workshops" },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto"
    >
      <div className="mb-12 work-header">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                overflow-hidden group
                ${activeCategory === key 
                  ? "bg-foreground text-background shadow-lg" 
                  : "bg-secondary/50 text-foreground hover:bg-secondary border border-border/50"
                }
              `}
            >
              {/* Animated background on hover */}
              <span className={`
                absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 
                transition-opacity duration-300
                ${activeCategory !== key ? "group-hover:opacity-10" : ""}
              `} />
              <span className="relative z-10">{label}</span>
              
              {/* Count badge */}
              <span className={`
                ml-2 px-2 py-0.5 text-xs rounded-full transition-colors duration-300
                ${activeCategory === key 
                  ? "bg-background/20 text-background" 
                  : "bg-foreground/10 text-foreground"
                }
              `}>
                {key === "all" ? projects.length : projects.filter(p => p.category === key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.slug} 
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
