import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

type Props = { onCTA?: () => void };

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

  const line1 = "PEÇAS EXCLUSIVAS";
  const eyebrow = "DESIGN PURISTA";
  const description = "Descubra a coleção limitada onde a exclusividade impera e cada detalhe é pensado para transcender o básico.";

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section ref={ref} className="relative min-h-[100svh] pt-24 pb-12 flex flex-col justify-center w-full overflow-hidden bg-transparent">
      {/* VÍDEO DE FUNDO - A camada mais profunda (-z-20) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
        src="https://res.cloudinary.com/djr5ccokh/video/upload/v1782391709/Flow_1080p_202606250941_1_j0wtb9.mp4"
      />

      {/* OVERLAY LEVE PARA CONTRASTE (-z-10) */}
      <div className="absolute inset-0 bg-white/20 -z-10 pointer-events-none"></div>

      {/* Conteúdo Central Responsivo ao Scroll */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 flex h-full w-full flex-col items-start text-left max-w-2xl px-4 max-[375px]:px-4 min-[414px]:px-6 md:pl-12 lg:pl-24"
      >
        {/* Eyebrow / Subtítulo */}
        <motion.p
          {...fadeUp}
          className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-[#CEAA71] mb-6"
        >
          {eyebrow}
        </motion.p>

        {/* H1 Principal Animado */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-playfair text-4xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-normal text-[#021a10] mb-6 tracking-tight"
        >
          {line1}
        </motion.h1>

        {/* Parágrafo Descritivo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-montserrat text-sm md:text-base text-gray-800 leading-relaxed mb-12 max-w-md"
        >
          {description}
        </motion.p>

        {/* Botão de CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col items-start"
        >
          <button
            onClick={onCTA || (() => navigate({ to: "/acervo" }))}
            aria-label="Ir para a loja e adquirir peça exclusiva"
            className="min-h-[44px] font-montserrat text-xs md:text-sm font-semibold tracking-widest uppercase text-[#021a10] bg-[#CEAA71] px-10 py-5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0px_10px_20px_rgba(206,170,113,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#021a10] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            QUERO MINHA PEÇA EXCLUSIVA
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}