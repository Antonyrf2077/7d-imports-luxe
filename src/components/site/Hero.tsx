import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero_flow.mp4.asset.json";

const EASE = [0.19, 1, 0.22, 1] as const;

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease: EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export const Hero = ({ onCTA }: { onCTA?: () => void }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#021a10]">
      {/* CAMADA 1 — VÍDEO (sem filtros artificiais, preenche 100%) */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        src={heroVideo.url}
        style={{ y: videoY, transform: "scale(1.08)", filter: "contrast(1.04) saturate(1.05)" }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      {/* CAMADA 2 — Sombreamento mínimo para legibilidade (sem haze) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,26,16,0.55) 0%, rgba(2,26,16,0.15) 35%, rgba(2,26,16,0.25) 65%, rgba(2,26,16,0.75) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(2,26,16,0.55) 0%, transparent 55%)",
        }}
      />

      {/* GRÃO SUTIL */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* CONTEÚDO */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-start justify-end h-full pb-20 md:pb-28 pt-32 md:pt-40 px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1600px] mx-auto will-change-transform"
      >
        {/* Título editorial */}
        <motion.h1
          animate={{ scale: [1, 1.012, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="origin-left font-cormorant font-semibold uppercase leading-[0.9] tracking-[-0.02em] text-[#F7F4EF]"
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
        >
          <RevealLine delay={0.25}>
            <span>Minha peça</span>
          </RevealLine>
          <RevealLine delay={0.4}>
            <em
              className="not-italic"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.2px #C9A86A",
              }}
            >
              exclusiva.
            </em>
          </RevealLine>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          className="font-montserrat mt-6 md:mt-8 max-w-md text-[11px] md:text-[12px] leading-relaxed tracking-[0.32em] uppercase text-white/80"
          style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)" }}
        >
          Design purista — uma única peça por estilo.
        </motion.p>

        {/* CTA premium */}
        <motion.button
          onClick={onCTA}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.015, 1] }}
          transition={{
            opacity: { duration: 1, ease: EASE, delay: 1.1 },
            y: { duration: 1, ease: EASE, delay: 1.1 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
          whileHover={{ y: -2 }}
          className="group relative mt-10 md:mt-12 inline-flex items-center gap-5 overflow-hidden border border-[#C9A86A]/80 bg-transparent px-9 py-4 md:px-10 md:py-5"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#021a10] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
          />
          <span className="relative z-10 font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.45em] text-[#C9A86A] transition-colors duration-300">
            Acessar o Acervo
          </span>
          <ArrowRight
            strokeWidth={1.5}
            className="relative z-10 h-4 w-4 text-[#C9A86A] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2"
          />
        </motion.button>

        {/* Selo da marca — 7D SIGNATURE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.03, 1] }}
          transition={{
            opacity: { duration: 1, ease: EASE, delay: 1.35 },
            y: { duration: 1, ease: EASE, delay: 1.35 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
          className="mt-10 flex items-center gap-3"
        >
          <span className="inline-flex items-center justify-center border border-[#C9A86A]/60 px-3 py-1.5">
            <span className="font-montserrat text-[9px] font-bold uppercase tracking-[0.5em] text-[#C9A86A]">
              7D Signature
            </span>
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 right-6 md:right-10 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-[#C9A86A] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
