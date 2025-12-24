import { useEffect, useRef } from "react";

export const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = ""; // Clean up

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="bg-animation">
      <div className="particles" ref={containerRef}></div>
    </div>
  );
};
