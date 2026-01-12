import { useEffect, useRef } from "react";
import gsap from "gsap";

const LineDrawingBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");
    
    const ctx = gsap.context(() => {
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3 + index * 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Geometric circuit lines */}
        <path
          d="M0 200 L200 200 L300 100 L500 100 L600 200 L900 200 L1000 300 L1200 300"
          className="stroke-primary/20 dark:stroke-primary/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M1920 300 L1700 300 L1600 400 L1400 400 L1300 300 L1100 300 L1000 400 L800 400"
          className="stroke-accent/20 dark:stroke-accent/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M0 500 L150 500 L250 600 L450 600 L550 500 L750 500 L850 600 L1050 600 L1150 500 L1350 500"
          className="stroke-primary/15 dark:stroke-primary/8"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M1920 700 L1750 700 L1650 800 L1450 800 L1350 700 L1150 700 L1050 800 L850 800 L750 700 L550 700"
          className="stroke-accent/15 dark:stroke-accent/8"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* VR/AR headset outline */}
        <path
          d="M960 400 Q800 400 750 450 L750 550 Q750 600 800 600 L900 600 Q920 600 940 580 L960 560 L980 580 Q1000 600 1020 600 L1120 600 Q1170 600 1170 550 L1170 450 Q1120 400 960 400 Z"
          className="stroke-primary/25 dark:stroke-primary/15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Code brackets */}
        <path
          d="M200 700 L100 750 L200 800"
          className="stroke-accent/30 dark:stroke-accent/20"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1720 700 L1820 750 L1720 800"
          className="stroke-accent/30 dark:stroke-accent/20"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connecting nodes */}
        <path
          d="M400 300 L400 350 L500 350 L500 400"
          className="stroke-primary/20 dark:stroke-primary/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M1500 250 L1500 300 L1400 300 L1400 350"
          className="stroke-accent/20 dark:stroke-accent/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Hexagonal patterns */}
        <path
          d="M150 900 L200 870 L250 900 L250 960 L200 990 L150 960 Z"
          className="stroke-primary/20 dark:stroke-primary/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M1700 150 L1750 120 L1800 150 L1800 210 L1750 240 L1700 210 Z"
          className="stroke-accent/20 dark:stroke-accent/10"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Floating circles with orbits */}
        <circle cx="300" cy="150" r="30" className="stroke-primary/15 dark:stroke-primary/8" strokeWidth="1" />
        <circle cx="300" cy="150" r="50" className="stroke-primary/10 dark:stroke-primary/5" strokeWidth="0.5" />
        <circle cx="1600" cy="900" r="40" className="stroke-accent/15 dark:stroke-accent/8" strokeWidth="1" />
        <circle cx="1600" cy="900" r="60" className="stroke-accent/10 dark:stroke-accent/5" strokeWidth="0.5" />
        
        {/* Wave patterns */}
        <path
          d="M0 1000 Q100 950 200 1000 Q300 1050 400 1000 Q500 950 600 1000 Q700 1050 800 1000"
          className="stroke-primary/10 dark:stroke-primary/5"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M1920 80 Q1820 30 1720 80 Q1620 130 1520 80 Q1420 30 1320 80 Q1220 130 1120 80"
          className="stroke-accent/10 dark:stroke-accent/5"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* Corner decorations */}
        <path
          d="M50 50 L150 50 L150 100"
          className="stroke-primary/30 dark:stroke-primary/20"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1870 50 L1770 50 L1770 100"
          className="stroke-accent/30 dark:stroke-accent/20"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 1030 L150 1030 L150 980"
          className="stroke-accent/30 dark:stroke-accent/20"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1870 1030 L1770 1030 L1770 980"
          className="stroke-primary/30 dark:stroke-primary/20"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Animated gradient dots */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
      <div className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[30%] left-[20%] w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-[20%] right-[25%] w-2 h-2 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: "1.5s" }} />
    </div>
  );
};

export default LineDrawingBackground;
