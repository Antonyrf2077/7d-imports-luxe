import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import { Logo7D } from "./Logo7D";

const reveal = {
  initial: { opacity: 0, y: 50, rotateX: 10 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  style: { transformPerspective: 1000 },
};

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        // Gradiente verde profundo — premium, não bloco chapado
        background: "linear-gradient(180deg, #0D3D2A 0%, #092B1D 100%)",
        borderTop: "1px solid rgba(201,151,63,0.40)",
      }}
    >
      {/* Textura sutil tipo linho — quase invisível */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Luz dourada sutil no topo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
        style={{
          width: "80%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,151,63,0.70), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-24 md:py-32">
        <motion.div {...reveal} className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8">
          
          {/* Column 1: Brand — tipografia editorial no lugar da logo */}
          <div className="flex flex-col items-start gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#092B1D]"
              aria-label="Voltar ao topo"
            >
              {/* Wordmark tipográfico */}
              <div
                className="font-cormorant text-[48px] font-bold leading-none text-white transition-colors duration-300 group-hover:text-[#C9973F]"
                style={{ letterSpacing: "-0.02em" }}
              >
                7D
              </div>
              <div
                className="font-montserrat text-[10px] font-bold uppercase tracking-[0.55em] text-[#C9973F]/60 mt-1 transition-colors duration-300 group-hover:text-[#C9973F]"
              >
                IMPORTS
              </div>
            </button>

            <p className="font-cormorant text-[15px] italic text-white/35 leading-snug max-w-[160px]">
              Curadoria internacional.<br />
              Estoque limitado.<br />
              Entrega imediata.
            </p>
          </div>

          {/* Column 2: Curadoria */}
          <div className="flex flex-col items-start gap-4 max-w-[200px]">
            <span className="font-montserrat text-[11px] font-bold tracking-[0.35em] uppercase text-[#C9973F]/70">
              Curadoria de Elite
            </span>
            <span className="font-cormorant text-[17px] italic text-white/50 leading-snug">
              Curadoria que transforma exclusividade em experiência.
            </span>
          </div>

          {/* Column 3: Navigation */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.45em] text-[#C9973F]/50">
              Navegação
            </h3>
            <nav
              aria-label="Links de navegação do footer"
              className="flex flex-col gap-3 font-cormorant text-[18px] text-white/50"
            >
              {[
                { l: "Acervo Privado", href: "/#catalogo" },
                { l: "Trocas e Devoluções", href: "/politica-de-trocas" },
                { l: "Política de Privacidade", href: "/politica-de-privacidade" },
                { l: "Termos de Serviço", href: "/termos-de-uso" },
                { l: "Entregas", href: "/entregas" },
              ].map((n) => (
                <motion.a
                  key={n.l}
                  href={n.href}
                  whileHover={{ x: 4, color: "#FFFFFF" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="transition-colors duration-200 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3D2A]"
                >
                  {n.l}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.45em] text-[#C9973F]/50">
              Contato Direto
            </h3>
            <div className="flex flex-col items-start gap-3 md:items-end font-cormorant text-[18px] text-white/50">
              <motion.a
                href="https://wa.me/5554981310049"
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4, color: "#FFFFFF" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center gap-3 transition-colors duration-200 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3D2A]"
                aria-label="WhatsApp VIP — Atendimento direto"
              >
                <span>WhatsApp VIP</span>
                <MessageCircle strokeWidth={1} className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/7dimports_/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4, color: "#FFFFFF" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center gap-3 transition-colors duration-200 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3D2A]"
                aria-label="Instagram @7dimports_"
              >
                <span>@7dimports_</span>
                <Instagram strokeWidth={1} className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

        </motion.div>

        {/* Divider dourado */}
        <div
          className="mt-24 w-full pt-6 text-center text-[9px] font-light uppercase tracking-[0.5em] text-white/25"
          style={{ borderTop: "1px solid rgba(201,151,63,0.15)" }}
        >
          © 2026 7D Imports · Curadoria de Elite
        </div>
      </div>
    </footer>
  );
}