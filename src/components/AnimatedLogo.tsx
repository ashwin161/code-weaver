import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const letterYRef = useRef<HTMLSpanElement>(null);
  const letterNRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      const tl = gsap.timeline();
      
      tl.from(letterYRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
      .from(letterNRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.4")
      .from(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.2");

      // Continuous dot pulse
      gsap.to(dotRef.current, {
        scale: 1.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(letterYRef.current, {
      y: -3,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(letterNRef.current, {
      y: -3,
      duration: 0.2,
      delay: 0.05,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      scale: 1.5,
      rotate: 180,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([letterYRef.current, letterNRef.current], {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div 
      ref={logoRef}
      className={`text-2xl font-bold font-display tracking-tight cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={letterYRef} className="inline-block">S</span>
      <span ref={letterNRef} className="inline-block">A</span>
      <span 
        ref={dotRef} 
        className="inline-block text-primary origin-center"
        style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
      >
        .
      </span>
    </div>
  );
};

export default AnimatedLogo;
