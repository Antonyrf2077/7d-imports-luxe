import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = { onCTA?: () => void };

// Animação stagger para a primeira linha
const line1ContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const line1LetterVariants = {
  hidden: { opacity: 0, y: 40, filter: "brightness(1)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: ["brightness(1)", "brightness(2) drop-shadow(0 0 8px rgba(255,255,255,0.8))", "brightness(1)"],
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  },
};

// Animação contínua "Onda de Ouro" para a segunda linha
const goldWaveContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 1.0 },
  },
};

const goldWaveLetterVariants = {
  hidden: { opacity: 0, y: 40, color: "#B58D3F" },
  visible: { 
    opacity: 1, 
    y: [0, -5, 0],
    color: ["#B58D3F", "#E6C875", "#B58D3F"],
    transition: { 
      opacity: { duration: 0.8 },
      y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      color: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    }
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
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[#021a10]">
      {/* 1. Background de Vídeo Importado Localmente (Vite Public) */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover -z-20" 
        src="/video_home.mp4"
      ></video>
      
      {/* Overlay Escuro para Visibilidade - Não suja a qualidade do vídeo */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Conteúdo Central Responsivo ao Scroll */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-montserrat text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-white mb-6 pointer-events-auto"
        >
          ESTÉTICA DA EXCLUSIVIDADE
        </motion.p>

        {/* H1 Principal Animado */}
        <h1 className="flex flex-col items-center gap-2 pointer-events-auto">
          {/* Linha 1: Branco puro com brilho inicial */}
          <motion.span
            variants={line1ContainerVariants}
            initial="hidden"
            animate="visible"
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white overflow-hidden flex flex-wrap justify-center pb-2"
          >
            {line1.split("").map((char, index) => (
              <motion.span
                key={`l1-${index}`}
                variants={line1LetterVariants}
                className="inline-block relative"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>

          {/* Linha 2: Dourado italic com onda de ouro infinita */}
          <motion.span
            variants={goldWaveContainerVariants}
            initial="hidden"
            animate="visible"
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold italic overflow-hidden flex flex-wrap justify-center pb-2 mt-2"
          >
            {line2.split("").map((char, index) => (
              <motion.span
                key={`l2-${index}`}
                variants={goldWaveLetterVariants}
                className="inline-block relative"
                style={{ textShadow: "0 0 15px rgba(206,170,113,0.3)" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Botão de CTA e Assinatura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-col items-center pointer-events-auto"
        >
          <button
            onClick={onCTA}
            className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#111] px-10 py-5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0px_10px_20px_rgba(197,160,89,0.3)] bg-gradient-to-r from-[#e3c78e] to-[#CEAA71]"
          >
            QUERO MINHA PEÇA EXCLUSIVA
          </button>
          
          {/* Assinatura 7D - Ajustada e dourada */}
          <p className="mt-8 font-playfair text-xs md:text-sm text-[#CEAA71] tracking-widest select-none drop-shadow-[0_0_8px_rgba(206,170,113,0.5)]">
            7D
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}