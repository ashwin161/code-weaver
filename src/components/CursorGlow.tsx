import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
          },
          { duration: 500, fill: "forwards" }
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="ambient-light" />
      <div className="ambient-light-2" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
};

export default CursorGlow;
