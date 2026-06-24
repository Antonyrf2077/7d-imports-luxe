import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import video from "@/assets/fundo_hero.mp4.asset.json";

type Props = { onCTA?: () => void };

const TITLE = ["EXCLUSIVIDADE ABSOLUTA,", "Design Purista."];
const SUB = "CURADORIA INTERNACIONAL.".split(" ");

function RevealWord({ word, delay }: { word: string; delay: number }) {
  // Aplicamos a animação de ouro vivo contínuo no título.
  return (
    <span className="inline-block mr-3 md:mr-4 pb-4" style={{ overflow: "visible" }}>
      <motion.span
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 1.2, ease: "easeOut" }}
        className="inline-block cursor-default will-change-[background-position,opacity,transform] pb-2"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "goldWave 4s infinite linear",
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function Hero({ onCTA }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Inward Parallax: começa EXPANDIDO (1.15) e ENCOLHE para 1.0 ao rolar
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  // Overlay escurece sutilmente ao rolar
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.32, 0.82]);

  // Hero Dynamic Scale (Scroll Effect)
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const heroLetterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.03em", "0.15em"]);

  return (
    <section
      ref={ref}
      aria-label="7D Imports — Curadoria de Exclusividade"
      className="relative h-[100svh] w-full overflow-hidden bg-[#050505] will-change-transform"
    >
      
      {/* Z-0: Background & Overlays */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 origin-center will-change-transform transform-gpu">
        <video
          src={video.url}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="h-full w-full object-cover relative z-[-1]"
          style={{ filter: "contrast(1.12) saturate(1.05) brightness(0.82)" }}
        />

        {/* Vignette Radial — bordas mais escuras, cinematic */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.88)_100%)] z-0" />

        {/* Grão fotográfico premium — sensação de película */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none z-0"
          style={{
            opacity: 0.22,
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Luz direcional dourada — canto superior direito, muito sutil */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{ background: "radial-gradient(ellipse at 85% 10%, rgba(201,151,63,0.06), transparent 50%)" }}
        />

        {/* Darkening overlay bound to scroll */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#050505]" />
      </motion.div>
      
      {/* Linha grossa editorial dourada separadora */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9973F]/50 to-transparent z-[6]" />

      {/* Z-20: Central Hero Content */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center gap-6 pb-10 pt-[10vh]"
      >
        <h1
          className="w-full mx-auto font-cormorant text-white max-w-[90vw] md:max-w-[700px] lg:max-w-[900px] pt-[140px] md:pt-[160px] lg:pt-[180px] text-5xl md:text-6xl lg:text-7xl xl:text-8xl flex flex-col items-center"
          style={{ lineHeight: 1.15, letterSpacing: heroLetterSpacing, fontWeight: 800, overflow: "visible" }}
        >
          {TITLE.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-visible pb-2">
              {line.split(" ").map((w, i) => (
                <RevealWord key={`${lineIndex}-${i}`} word={w} delay={0.2 + (lineIndex * 2 + i) * 0.15} />
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/50 mt-4 mb-4"
        >
          CURADORIA DE PEÇAS AUTÊNTICAS
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 1.0 } },
          }}
          className="max-w-xl text-[14px] md:text-[16px] font-cormorant font-bold uppercase tracking-widest leading-relaxed text-gray-400"
        >
          {SUB.map((w, i) => (
            <span key={i} className="overflow-hidden inline-block mr-2">
              <motion.span
                variants={{ hidden: { y: "100%", opacity: 0 }, show: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 md:mt-12 z-30"
        >
          <motion.button
            onClick={onCTA}
            whileHover={{ opacity: 0.9 }}
            className="inline-flex items-center gap-4 bg-[#CEAA71] px-10 py-5 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-[#111111] transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Quero garantir minha peça
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}