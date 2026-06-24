import { useEffect, useState } from "react";

export function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 30 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 transition-[background] duration-300"
        style={{
          // Dourado muito sutil — presença cinematográfica, não neon
          background: `radial-gradient(700px circle at ${pos.x}% ${pos.y}%, rgba(201,151,63,0.06), transparent 55%)`,
        }}
      />
      <div aria-hidden className="noise-overlay" />
    </>
  );
}