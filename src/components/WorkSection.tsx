import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Cyber Finance",
    description: "Web3 Dashboard with real-time data visualization.",
    tags: ["React", "Three.js", "GSAP"],
    gradient: "linear-gradient(45deg, #1a1a2e, #16213e)",
  },
  {
    title: "Neon VR",
    description: "Immersive virtual reality environment for brand storytelling.",
    tags: ["Unity", "C#", "WebGL"],
    gradient: "linear-gradient(45deg, #2a2a72, #009ffd)",
  },
  {
    title: "Agency Portfolio",
    description: "High-performance aesthetic website for a digital agency.",
    tags: ["HTML", "SCSS", "Lenis"],
    gradient: "linear-gradient(45deg, #434343, #000000)",
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
        <div className="w-24 h-1 bg-primary rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
