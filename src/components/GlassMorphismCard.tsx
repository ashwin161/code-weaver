import { useState, useRef } from "react";

const GlassMorphismCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Glass Card */}
      <div 
        className={`relative w-80 md:w-96 p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700 ease-out
          bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80
          border-white/10 hover:border-white/20
          shadow-2xl hover:shadow-primary/20
          ${isHovered ? "translate-y-[-4px]" : ""}
        `}
      >
        {/* Radial glow on hover */}
        <div 
          className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%)"
          }}
        />

        {/* Top-right floating element - Holographic ring */}
        <div className="absolute -top-6 -right-6 z-20">
          <div className="relative w-16 h-16">
            {/* Spinning holographic ring */}
            <div 
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(250 100% 70%), hsl(var(--primary)))",
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full bg-gray-900" />
            </div>
            
            {/* Bouncing glass core with ping */}
            <div className="absolute inset-2 flex items-center justify-center animate-bounce-gentle">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                {/* Ping effect */}
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left floating element - Tilted data card */}
        <div className="absolute -bottom-4 -left-4 z-20">
          <div 
            className="relative w-20 h-14 rounded-xl backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-xl overflow-hidden"
            style={{ transform: "rotate(-12deg)" }}
          >
            {/* Scanning light sweep */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)",
                animation: "scan-sweep 2s linear infinite",
              }}
            />
            
            {/* Data bars */}
            <div className="absolute bottom-2 left-2 right-2 flex gap-1">
              <div className="flex-1 h-1 bg-primary/40 rounded-full" />
              <div className="flex-1 h-1 bg-accent/40 rounded-full" />
              <div className="flex-1 h-1 bg-primary/40 rounded-full" />
            </div>
            
            {/* Mini icon */}
            <div className="absolute top-2 left-2">
              <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>

          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
            Data Strategy &<br />Spatial Insights
          </h3>
          
          <p className="text-sm text-white/60 leading-relaxed">
            Transforming raw metrics into immersive narratives
          </p>
        </div>

        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  );
};

export default GlassMorphismCard;
