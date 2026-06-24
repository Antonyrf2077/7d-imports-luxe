import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { onCTA?: () => void };

// Variantes de Animação do Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, backgroundPosition: "0% 0%" },
  visible: { 
    opacity: 1, 
    y: 0, 
    backgroundPosition: "0% 100%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  },
};

export function Hero({ onCTA }: Props) {
  const ref = useRef<HTMLElement>(null);
  
  // Interatividade de Scroll (Parallax e FadeOut)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const line1 = "EXCLUSIVIDADE ABSOLUTA,";
  const line2 = "Design Purista.";

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-[#021a10]"
    >
      {/* Background Cinematográfico de Vídeo */}
      <video
        src="https://res.cloudinary.com/djr5ccokh/video/upload/v1782336977/video_home_nvmnjt.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      
      {/* Overlay Escuro para Legibilidade */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Conteúdo Central Responsivo ao Scroll */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-montserrat text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-white mb-6"
        >
          ESTÉTICA DA EXCLUSIVIDADE
        </motion.p>

        {/* H1 Principal Animado Letra por Letra com Degradê Iluminado */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2"
        >
          {/* Linha 1 */}
          <span className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold overflow-hidden flex flex-wrap justify-center">
            {line1.split("").map((char, index) => (
              <motion.span
                key={`l1-${index}`}
                variants={letterVariants}
                className="inline-block relative pb-2"
                style={{
                  backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #CEAA71 40%, #9A7B4F 100%)",
                  backgroundSize: "100% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Linha 2 */}
          <span className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold italic overflow-hidden flex flex-wrap justify-center mt-2">
            {line2.split("").map((char, index) => (
              <motion.span
                key={`l2-${index}`}
                variants={letterVariants}
                className="inline-block relative pb-2"
                style={{
                  backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #CEAA71 40%, #9A7B4F 100%)",
                  backgroundSize: "100% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Botão Flat e Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12"
        >
          <button
            onClick={onCTA}
            className="font-montserrat text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[#111] bg-gradient-to-r from-[#e3c78e] to-[#CEAA71] px-10 py-4 transition-transform hover:scale-105 active:scale-95"
          >
            QUERO MINHA PEÇA EXCLUSIVA
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}