import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

type Props = { onCTA?: () => void };

// Animação stagger para a primeira linha
const line1ContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const line1LetterVariants: any = {
  hidden: { opacity: 0, y: 40, filter: "brightness(1)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: ["brightness(1)", "brightness(2) drop-shadow(0 0 8px rgba(255,255,255,0.8))", "brightness(1)"],
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  },
};

export function Hero({ onCTA }: Props) {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  
  // Interatividade de Scroll (Parallax e FadeOut)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const line1 = "EXCLUSIVIDADE ABSOLUTA,";
  const line2 = "Design Purista.";

  return (
    <section ref={ref} className="relative min-h-[100svh] pt-24 pb-12 flex flex-col justify-center w-full overflow-hidden bg-transparent">
      {/* Container do Vídeo */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#021a10]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/logo_7d_nova.png"
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/djr5ccokh/video/upload/v1782336977/video_home_nvmnjt.mp4"
        />
        {/* Película de contraste para destacar o texto */}
        <div className="absolute inset-0 bg-[#021a10]/50" />
      </div>


      {/* Conteúdo Central Responsivo ao Scroll */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 max-[375px]:px-4 min-[414px]:px-6 md:px-8 lg:px-12 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-montserrat text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-white mb-6"
        >
          ESTÉTICA DA EXCLUSIVIDADE
        </motion.p>

        {/* H1 Principal Animado */}
        <h1 className="flex flex-col items-center gap-2">
          {/* Linha 1: Branco puro com brilho inicial */}
          <motion.span
            variants={line1ContainerVariants}
            initial="hidden"
            animate="visible"
            className="font-playfair text-[clamp(2.4rem,8vw,5.5rem)] leading-tight font-bold text-white overflow-hidden flex flex-wrap justify-center pb-2"
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

          {/* Linha 2: Dourado italic com animação limpa */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-playfair text-[clamp(2.4rem,8vw,5.5rem)] leading-tight font-bold italic text-[#B58D3F] pb-2 mt-2"
            style={{ textShadow: "0 0 15px rgba(206,170,113,0.3)" }}
          >
            {line2}
          </motion.span>
        </h1>

        {/* Botão de CTA e Assinatura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12 flex flex-col items-center"
        >
          <button
            onClick={onCTA || (() => navigate({ to: "/acervo" }))}
            aria-label="Ir para a loja e adquirir peça exclusiva"
            className="min-h-[44px] font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#111] px-10 py-5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0px_10px_20px_rgba(197,160,89,0.3)] bg-gradient-to-r from-[#e3c78e] to-[#CEAA71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CEAA71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#021a10]"
          >
            QUERO MINHA PEÇA EXCLUSIVA
          </button>
          
          {/* Assinatura 7D */}
          <motion.p 
            animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="mt-8 font-playfair text-3xl md:text-4xl font-bold text-[#CEAA71] tracking-widest select-none drop-shadow-[0_0_8px_rgba(206,170,113,0.5)]"
          >
            7D
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}