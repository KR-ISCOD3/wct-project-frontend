import React, { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Load a slim version for smaller bundle size

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      if (isMounted) setInit(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log("Particles Loaded:", container);
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "#245b61" } },
      fpsLimit: 120,
      interactivity: {
        events: {
          // onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
        move: { enable: true, speed: 3, outModes: { default: "bounce" } },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  return init ? (
    <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
  ) : null;
};

export default React.memo(ParticleBackground);
