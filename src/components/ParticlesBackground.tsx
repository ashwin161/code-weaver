import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    particles: {
      number: { value: 80, density: { enable: true, width: 800, height: 800 } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 5 } },
      links: {
        enable: true,
        distance: 150,
        color: "#6366f1",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        outModes: { default: "out" },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 150, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 -z-10 pointer-events-auto"
    />
  );
};

export default ParticlesBackground;
