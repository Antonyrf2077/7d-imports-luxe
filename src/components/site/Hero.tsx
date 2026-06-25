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

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-[#021a10]">
      {/* CAMADA 1 — VÍDEO */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        src={heroVideo.url}
        style={{ scale: videoScale, y: videoY, filter: "brightness(0.85) contrast(1.05) saturate(1.1)" }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* CAMADA 2 — OVERLAY ELEGANTE (off-white gradient) */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,244,239,0.15) 0%, rgba(247,244,239,0.35) 50%, rgba(2,26,16,0.55) 100%)",
          }}
        />
        {/* Verde profundo nas bordas para fundir com o tema */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(2,26,16,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* GRÃO SUTIL */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* CONTEÚDO */}
      <motion.div
        style={{ scale: titleScale, y: titleY }}
        className="relative z-10 flex flex-col items-start justify-center h-full px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1600px] mx-auto will-change-transform"
      >
        {/* Assinatura da marca */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="flex items-center gap-3 mb-8 md:mb-12"
        >
          <span className="block h-px w-10 bg-[#CEAA71]" />
          <span className="font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#CEAA71]">
            7D Imports — Est. Caxias do Sul
          </span>
        </motion.div>

        {/* Kicker */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="font-montserrat text-[11px] md:text-xs font-bold uppercase tracking-[0.55em] text-white/85 mb-6"
        >
          Curadoria Exclusiva
        </motion.h3>

        {/* Título editorial */}
        <h1 className="font-cormorant font-bold uppercase leading-[0.88] tracking-tighter text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw] text-white">
          <RevealLine delay={0.45}>
            <span className="text-[#F7F4EF]">Exclusividade</span>
          </RevealLine>
          <RevealLine delay={0.6}>
            <em
              className="not-italic"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #CEAA71",
              }}
            >
              Atemporal
            </em>
          </RevealLine>
        </h1>

        {/* Subtítulo */}
        <motion.p
          style={{ opacity: subOpacity }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
          className="font-montserrat mt-10 max-w-md text-[11px] md:text-[13px] leading-relaxed tracking-[0.18em] uppercase text-white/75"
        >
          Importação direta. Peças únicas, sem reposição.
          <br className="hidden md:block" />
          Cada item é 1 de 1 no acervo brasileiro.
        </motion.p>

        {/* CTA premium — borda dourada, hover verde, micro-movimento */}
        <motion.button
          onClick={onCTA}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
          whileHover={{ y: -2 }}
          className="group relative mt-12 inline-flex items-center gap-5 overflow-hidden border border-[#CEAA71] bg-transparent px-10 py-5 transition-colors duration-500 hover:border-[#CEAA71]"
        >
          {/* Cortina verde no hover */}
          <span
            aria-hidden
            className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#021a10] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
          />
          {/* Brilho dourado sutil */}
          <span
            aria-hidden
            className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "inset 0 0 30px rgba(206,170,113,0.25), 0 0 25px rgba(206,170,113,0.15)",
            }}
          />
          <span className="relative z-10 font-montserrat text-[11px] md:text-xs font-bold uppercase tracking-[0.45em] text-[#CEAA71] transition-colors duration-500 group-hover:text-[#CEAA71]">
            Acessar o Acervo
          </span>
          <ArrowRight
            strokeWidth={1.5}
            className="relative z-10 h-4 w-4 text-[#CEAA71] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2"
          />
        </motion.button>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-white/60">
          Role
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-[#CEAA71] to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
