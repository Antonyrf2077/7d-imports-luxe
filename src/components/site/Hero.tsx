import { motion } from "framer-motion";
import { useRef } from "react";

type Props = { onCTA?: () => void };

// Animação stagger para letras com brilho transitório
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "brightness(1)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: ["brightness(1)", "brightness(2) drop-shadow(0 0 8px rgba(255,255,255,0.8))", "brightness(1)"],
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  },
};

const goldLetterVariants = {
  hidden: { opacity: 0, y: 40, filter: "brightness(1)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: ["brightness(1)", "brightness(1.5) drop-shadow(0 0 8px rgba(206,170,113,0.8))", "brightness(1)"],
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  },
};

export function Hero({ onCTA }: Props) {
  const line1 = "EXCLUSIVIDADE ABSOLUTA,";
  const line2 = "Design Purista.";

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#021a10]">
      {/* 1. Background de Vídeo (Obrigatório e Crítico) */}
      <video 
        src="https://res.cloudinary.com/djr5ccokh/video/upload/v1782336977/video_home_nvmnjt.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover -z-20" 
      />
      
      {/* Overlay Escuro para Visibilidade */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Conteúdo Central com Z-Index Ajustado */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-montserrat text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-white mb-6"
        >
          ESTÉTICA DA EXCLUSIVIDADE
        </motion.p>

        {/* H1 Principal Animado Letra por Letra */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2"
        >
          {/* Linha 1: Branco puro */}
          <span className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white overflow-hidden flex flex-wrap justify-center pb-2">
            {line1.split("").map((char, index) => (
              <motion.span
                key={`l1-${index}`}
                variants={letterVariants}
                className="inline-block relative"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Linha 2: Dourado italic */}
          <span className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold italic text-[#CEAA71] overflow-hidden flex flex-wrap justify-center pb-2">
            {line2.split("").map((char, index) => (
              <motion.span
                key={`l2-${index}`}
                variants={goldLetterVariants}
                className="inline-block relative"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Botão de CTA e Assinatura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-col items-center"
        >
          <button
            onClick={onCTA}
            className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#111] px-10 py-5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0px_10px_20px_rgba(197,160,89,0.3)] bg-gradient-to-r from-[#e3c78e] to-[#CEAA71]"
          >
            QUERO MINHA PEÇA EXCLUSIVA
          </button>
          
          {/* Assinatura 7D */}
          <p className="mt-8 font-playfair text-xs md:text-sm text-white/40 tracking-[0.5em] select-none">
            7 D
          </p>
        </motion.div>
      </div>
    </section>
  );
}