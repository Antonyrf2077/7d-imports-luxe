import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";

type Props = { 
  onOpenBag?: () => void;
  onOpenSearch?: () => void;
};

const NAV = [
  { label: "NOVIDADES", href: "/#catalogo" },
  { label: "ACERVO", href: "/#catalogo" },
  { label: "CONCEITO", href: "/#manifesto" },
  { label: "CONTATO", href: "/#footer" },
];

function MagneticLink({ label, href, isScrolled }: { label: string; href: string; isScrolled: boolean }) {
  return (
    <a
      href={href}
      className={`group relative flex h-8 items-center overflow-hidden font-montserrat text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 ${isScrolled ? "text-[#021a10]" : "text-white"}`}
    >
      <motion.span
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
      >
        {label}
      </motion.span>
      <motion.span
        className="absolute left-0 top-full flex text-[#CEAA71] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
      >
        {label}
      </motion.span>
    </a>
  );
}

export function Header({ onOpenBag, onOpenSearch }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return () => unsub();
  }, [scrollY]);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 h-24 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
        
        {/* Esquerda: Sacola */}
        <div className="flex items-center">
          <button 
            onClick={onOpenBag}
            className={`transition-all duration-300 hover:scale-110 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
            aria-label="Sacola"
          >
            <ShoppingBag strokeWidth={1.5} className="h-7 w-7 md:h-8 md:w-8" />
          </button>
        </div>

        {/* Centro: Links de Navegação */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <MagneticLink key={n.label} label={n.label} href={n.href} isScrolled={scrolled} />
          ))}
        </nav>

        {/* Direita: Pesquisa */}
        <div className="flex items-center">
          <button 
            onClick={onOpenSearch} 
            className={`transition-all duration-300 hover:scale-110 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
            aria-label="Pesquisa"
          >
            <Search strokeWidth={1.5} className="h-7 w-7 md:h-8 md:w-8" />
          </button>
        </div>

      </div>
    </header>
  );
}