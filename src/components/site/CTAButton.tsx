import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
};

export function CTAButton({ children, onClick, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-15, Math.min(15, dx * 0.3)));
    y.set(Math.max(-10, Math.min(10, dy * 0.3)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y, borderRadius: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-white/70 px-8 py-4 text-[13px] font-normal uppercase tracking-normal text-white transform-gpu will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      {/* Hover fill — verde premium */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-[#0D3D2A] transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-rotate-45"
        strokeWidth={1.5}
      />
    </motion.button>
  );
}