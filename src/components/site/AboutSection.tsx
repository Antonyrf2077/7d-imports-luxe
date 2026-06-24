import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bg from "@/assets/about_bg.jpg.asset.json";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Left column: vem da esquerda, centraliza
  const leftX = useTransform(scrollYProgress, [0, 0.6, 1], ["10vw", "0vw", "0vw"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  // Right column: vem da direita, centraliza
  const rightX = useTransform(scrollYProgress, [0, 0.6, 1], ["-10vw", "0vw", "0vw"]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden border-t border-[#C9973F]/20 bg-white min-h-[130svh] flex items-center justify-center"
    >
      {/* Textura ou fundo limpo */}
      <div className="absolute inset-0 bg-white" />

      <motion.div
        className="relative mx-auto w-full max-w-[1600px] px-6 py-32 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center will-change-transform"
      >
        {/* Left Side: Manifesto */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="relative flex flex-col items-start justify-center text-left will-change-transform"
        >
          {/* Glow dourado sutil atrás do texto */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] pointer-events-none z-[-1]"
            aria-hidden
            style={{
              background: "radial-gradient(circle, rgba(201,151,63,0.06) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <div className="font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.45em] text-black/60">
            — Manifesto 7D
          </div>

          <h2
            id="about-heading"
            className="font-cormorant mt-6 text-[48px] leading-[0.95] text-[#111111] md:text-[80px] lg:text-[100px] uppercase font-bold tracking-tighter"
          >
            A Alma da
            <br />
            <motion.em
              className="not-italic inline-block cursor-default"
              style={{ 
                WebkitTextStroke: "1.5px rgba(15,77,54,0.55)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
              whileHover={{
                color: "#B99A5B",
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              Curadoria.
            </motion.em>
          </h2>

          <p className="font-montserrat mt-8 max-w-md text-[12px] md:text-[14px] leading-relaxed tracking-wider text-black/70 uppercase">
            A 7D Imports é curadoria cirúrgica. Importação direta, sem intermediários,
            sem reposição. Cada peça é original, etiquetada e restrita — escolhida uma a
            uma para quem entende que vestir é assinar uma postura.
          </p>
        </motion.div>

        {/* Right Side: Attribute Blocks */}
        <motion.div
          style={{ x: rightX, opacity: rightOpacity }}
          className="flex flex-col border-l border-black/10 will-change-transform"
        >
          {[
            { k: "100%", v: "Autêntico" },
            { k: "1/1", v: "Acervo" },
            { k: "0", v: "Reposição Global" },
          ].map((s) => (
            <div
              key={s.v}
              className="group relative flex flex-col justify-center px-10 py-12 md:py-16 border-b border-black/10 last:border-b-0 bg-white transition-colors duration-300 hover:bg-[#F8F5EF]"
            >
              <div className="font-cormorant text-[48px] md:text-[64px] font-bold leading-none text-[#0D3D2A] transition-colors duration-300 group-hover:text-[#C9973F]">
                {s.k}
              </div>
              <div className="font-montserrat mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-black/55 font-bold">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}