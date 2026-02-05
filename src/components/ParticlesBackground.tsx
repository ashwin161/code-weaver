import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      color: {
        value: "#760337ff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 4 },
      },
      // links: {
      //   enable: true,
      //   distance: 150,
      //   color: "#d7d7dcff",
      //   opacity: 0.4,
      //   width: 1,
      // },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        // onClick: {
        //   enable: true,
        //   mode: "push",
        // },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
          },
        },
        push: {
          quantity: 4,
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 pointer-events-auto"
    />
  );
};

export default ParticlesBackground;
