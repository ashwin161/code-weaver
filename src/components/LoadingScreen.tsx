import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    // Phase transitions: enter (0-0.5s) -> visible (0.5-2.5s) -> exit (2.5-3s)
    const enterTimer = setTimeout(() => setPhase("visible"), 500);
    const exitTimer = setTimeout(() => setPhase("exit"), 2500);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Wave SVG Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-[40%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.08)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.06)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.08)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.05)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.04)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 - Slower, larger */}
          <path
            fill="url(#waveGradient1)"
            className="animate-wave-slow"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
          
          {/* Wave 2 - Faster, smaller */}
          <path
            fill="url(#waveGradient2)"
            className="animate-wave-fast"
          >
            <animate
              attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values="
                M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,234.7C96,245,192,267,288,261.3C384,256,480,224,576,208C672,192,768,192,864,202.7C960,213,1056,235,1152,240C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Glass Morphism Floating Elements */}
      <div
        className={`absolute top-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-3xl backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl transition-all duration-700 ease-out ${
          phase === "enter" ? "opacity-0 translate-y-8 scale-90" : phase === "visible" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 blur-sm"
        }`}
        style={{ 
          animationDelay: "100ms",
          animation: phase === "visible" ? "gentle-float 4s ease-in-out infinite" : "none"
        }}
      />
      
      <div
        className={`absolute top-[25%] right-[25%] w-20 h-20 md:w-28 md:h-28 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-indigo-100/50 to-purple-100/50 border border-white/50 shadow-lg transition-all duration-700 ease-out delay-100 ${
          phase === "enter" ? "opacity-0 translate-y-8 scale-90" : phase === "visible" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 blur-sm"
        }`}
        style={{
          animation: phase === "visible" ? "gentle-float 5s ease-in-out infinite reverse" : "none"
        }}
      />
      
      <div
        className={`absolute bottom-[20%] right-[15%] w-24 h-24 md:w-36 md:h-36 rounded-full backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg transition-all duration-700 ease-out delay-200 ${
          phase === "enter" ? "opacity-0 translate-y-8 scale-90" : phase === "visible" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 blur-sm"
        }`}
        style={{
          animation: phase === "visible" ? "gentle-float 6s ease-in-out infinite" : "none"
        }}
      />
      
      <div
        className={`absolute top-[40%] right-[5%] w-16 h-16 md:w-24 md:h-24 rounded-xl backdrop-blur-lg bg-gradient-to-tr from-purple-100/40 to-indigo-100/40 border border-white/50 shadow-md transition-all duration-700 ease-out delay-300 rotate-12 ${
          phase === "enter" ? "opacity-0 translate-y-8 scale-90" : phase === "visible" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 blur-sm"
        }`}
        style={{
          animation: phase === "visible" ? "gentle-float 4.5s ease-in-out infinite" : "none"
        }}
      />

      {/* Left-aligned Text Content */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-10">
        <h1
          className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight transition-all duration-700 ease-out ${
            phase === "enter" ? "opacity-0 scale-90 translate-y-4" : phase === "visible" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 blur-sm"
          }`}
          style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
        >
          Bonjour
        </h1>
        <p
          className={`mt-4 text-lg md:text-xl lg:text-2xl text-gray-500 italic font-light tracking-wide transition-all duration-700 ease-out delay-300 ${
            phase === "enter" ? "opacity-0 translate-y-4" : phase === "visible" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 blur-sm"
          }`}
          style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
        >
          pro bono et vero
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className={`absolute bottom-6 right-6 px-4 py-2 text-xs text-gray-400 hover:text-gray-600 transition-all duration-300 ${
          phase === "visible" ? "opacity-100" : "opacity-0"
        }`}
      >
        Skip →
      </button>
    </div>
  );
};

export default LoadingScreen;
