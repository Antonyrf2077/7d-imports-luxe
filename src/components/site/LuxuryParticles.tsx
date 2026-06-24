import { useEffect, useState } from "react";

export function LuxuryParticles() {
  const [particles, setParticles] = useState<{ id: number; left: string; size: number; duration: number; delay: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate static dust particles
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -40, // random start time
      opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,8,31,0.4)_0%,_rgba(0,0,0,1)_70%)]" />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-float-up"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            bottom: "-10px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`,
          }}
        />
      ))}
    </div>
  );
}
