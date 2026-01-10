import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 about-content">About Me</h2>
        <div className="w-24 h-1 bg-primary rounded-full about-content" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground about-content">
            I'm a creative developer passionate about building immersive digital experiences 
            that blur the line between reality and imagination.
          </p>
          <p className="text-lg text-muted-foreground about-content">
            With expertise in AR/VR, motion graphics, and interactive web development, 
            I craft experiences that captivate users and bring brands to life.
          </p>
          <p className="text-lg text-muted-foreground about-content">
            My work spans from cutting-edge WebGL experiments to polished production 
            applications, always pushing the boundaries of what's possible on the web.
          </p>
        </div>

        <div className="about-content flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative glass-panel rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="space-y-2">
                  <span className="text-4xl font-display font-bold gradient-text">5+</span>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-display font-bold gradient-text">50+</span>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-display font-bold gradient-text">30+</span>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-display font-bold gradient-text">10+</span>
                  <p className="text-sm text-muted-foreground">Awards Won</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
