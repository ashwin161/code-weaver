import { useEffect, useRef } from "react";
import gsap from "gsap";

const MorphingBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob 1 animation
      gsap.to(blob1Ref.current, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.2)",
        borderRadius: "random(30%, 70%) random(30%, 70%) random(30%, 70%) random(30%, 70%)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Blob 2 animation
      gsap.to(blob2Ref.current, {
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        scale: "random(0.7, 1.3)",
        borderRadius: "random(40%, 60%) random(40%, 60%) random(40%, 60%) random(40%, 60%)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Blob 3 animation
      gsap.to(blob3Ref.current, {
        x: "random(-80, 80)",
        y: "random(-80, 80)",
        scale: "random(0.9, 1.1)",
        borderRadius: "random(35%, 65%) random(35%, 65%) random(35%, 65%) random(35%, 65%)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Morphing Blob 1 */}
      <div
        ref={blob1Ref}
        className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] opacity-30 dark:opacity-20"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.3))",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          filter: "blur(60px)",
        }}
      />

      {/* Morphing Blob 2 */}
      <div
        ref={blob2Ref}
        className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] opacity-25 dark:opacity-15"
        style={{
          background: "linear-gradient(225deg, hsl(var(--accent) / 0.4), hsl(280 85% 60% / 0.3))",
          borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          filter: "blur(60px)",
        }}
      />

      {/* Morphing Blob 3 */}
      <div
        ref={blob3Ref}
        className="absolute top-[50%] left-[50%] w-[25vw] h-[25vw] opacity-20 dark:opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "linear-gradient(180deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))",
          borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default MorphingBackground;
