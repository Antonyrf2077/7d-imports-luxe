import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react";

type Props = { 
  onOpenBag?: () => void;
};

const NAV = [
  { label: "NOVIDADES", href: "/#catalogo" },
  { label: "ACERVO", href: "/#catalogo" },
  { label: "MANIFESTO", href: "/#manifesto" },
  { label: "CONTATO", href: "/#footer" },
];

function PremiumLink({ label, href, isScrolled }: { label: string; href: string; isScrolled: boolean }) {
  return (
    <a
      href={href}
      className={`group relative flex h-8 items-center justify-center overflow-hidden font-montserrat text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 ${isScrolled ? "text-[#021a10]" : "text-white"}`}
    >
      <div className="relative flex h-full items-center overflow-hidden">
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
      </div>
      
      {/* Linha dourada expansiva no hover */}
      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 bg-[#CEAA71] transition-all duration-300 ease-out group-hover:left-0 group-hover:w-full" />
    </a>
  );
}

export function Header({ onOpenBag }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return () => unsub();
  }, [scrollY]);

  // Foca no input quando a pesquisa for aberta
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 h-24 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-6 md:px-12 relative">
        
        {/* Esquerda: Sacola */}
        <div className="flex items-center z-20">
          <button 
            onClick={onOpenBag}
            className={`transition-all duration-300 hover:scale-110 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
            aria-label="Sacola"
          >
            <ShoppingBag strokeWidth={1.5} className="h-7 w-7 md:h-8 md:w-8" />
          </button>
        </div>

        {/* Centro: Links de Navegação */}
        <nav className="hidden md:flex items-center gap-10 z-10 absolute left-1/2 -translate-x-1/2">
          {NAV.map((n) => (
            <PremiumLink key={n.label} label={n.label} href={n.href} isScrolled={scrolled} />
          ))}
        </nav>

        {/* Direita: Pesquisa Expansiva */}
        <div className="flex items-center z-20 relative h-full">
          <AnimatePresence>
            {!isSearchOpen ? (
              <motion.button 
                key="search-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSearchOpen(true)} 
                className={`transition-all duration-300 hover:scale-110 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
                aria-label="Pesquisa"
              >
                <Search strokeWidth={1.5} className="h-7 w-7 md:h-8 md:w-8" />
              </motion.button>
            ) : (
              <motion.div
                key="search-input"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`flex items-center overflow-hidden border-b ${scrolled ? "border-[#021a10]/30" : "border-white/30"}`}
              >
                <button 
                  className={`p-2 transition-colors duration-300 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
                >
                  <Search strokeWidth={1.5} className="h-5 w-5" />
                </button>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque sua exclusividade..."
                  className={`h-10 w-full bg-transparent px-2 font-montserrat text-sm focus:outline-none ${scrolled ? "text-[#021a10] placeholder:text-[#021a10]/50" : "text-white placeholder:text-white/50"}`}
                />
                
                {/* Botão de Filtros Adicionado */}
                <button 
                  className={`p-2 transition-colors duration-300 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
                  aria-label="Filtros"
                >
                  <SlidersHorizontal strokeWidth={1.5} className="h-5 w-5" />
                </button>

                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }} 
                  className={`p-2 transition-colors duration-300 ${scrolled ? "text-[#021a10] hover:text-[#CEAA71]" : "text-white hover:text-[#CEAA71]"}`}
                  aria-label="Fechar Pesquisa"
                >
                  <X strokeWidth={1.5} className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}