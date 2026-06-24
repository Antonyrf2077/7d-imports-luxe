import { AnimatePresence, motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";

type Props = { 
  onOpenBag?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
};

const NAV = [
  { label: "NOVIDADES", href: "/#catalogo" },
  { label: "ACERVO", href: "/#catalogo" },
  { label: "CONCEITO", href: "/#manifesto" },
  { label: "CONTATO", href: "/#footer" },
];

export function Header({ onOpenBag, searchQuery = "", onSearchChange }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const fullText = "Busque sua exclusividade...";

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return () => unsub();
  }, [scrollY]);

  // Efeito de digitação (typing animation)
  useEffect(() => {
    if (isSearchOpen) {
      let i = 0;
      setPlaceholderText("");
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setPlaceholderText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isSearchOpen]);

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const bgColor = useMotionTemplate`rgba(2, 26, 16, ${bgOpacity})`; // Verde/preto profundo #021a10

  return (
    <motion.header
      id="top"
      className="fixed inset-x-0 top-0 z-50 h-20 transition-all duration-500"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1600px] items-center px-6">
        
        {/* NAVEGAÇÃO CENTRAL */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 hover:text-[#CEAA71] transition-colors duration-300 font-montserrat"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* ÍCONES À DIREITA (Apenas ícones, sem texto) */}
        <div className="ml-auto flex items-center gap-6 text-white">
          <div className="relative flex items-center">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="hover:text-[#CEAA71] transition-colors"
              aria-label="Search"
            >
              <Search strokeWidth={1.5} className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-8 flex items-center overflow-hidden border-b border-white/30 bg-transparent"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder={placeholderText}
                    autoFocus
                    className="h-8 w-full bg-transparent px-2 text-xs font-montserrat text-white focus:outline-none placeholder:text-white/50"
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="p-1 hover:text-[#CEAA71] transition-colors"
                  >
                    <X strokeWidth={1.5} className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => onOpenBag?.()} 
            className="hover:text-[#CEAA71] transition-colors"
            aria-label="Bag"
          >
            <ShoppingBag strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}