import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Search, ShoppingBag, SlidersHorizontal, X, Menu } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type Props = { 
  onOpenBag?: () => void;
};

const NAV = [
  { label: "NOVIDADES", href: "/#catalogo" },
  { label: "ACERVO", href: "/#catalogo" },
  { label: "MANIFESTO", href: "/#manifesto" },
  { label: "CONTATO", href: "/#footer" },
];

function PremiumLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className={`group relative flex h-8 items-center justify-center overflow-hidden font-montserrat text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 text-[#021a10]`}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  // Trava o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById("catalogo");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsSearchOpen(false);
    }
  };

  const handleFilterClick = () => {
    const el = document.getElementById("catalogo");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        id="top"
        className={`fixed inset-x-0 top-0 z-50 h-24 w-full transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-6 md:px-12 relative">
          
          {/* Esquerda: Menu Mobile e Logo */}
          <div className="flex items-center gap-4 z-20">
            <button 
              className={`md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors duration-300 text-[#021a10] hover:text-[#CEAA71]`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu strokeWidth={1.5} className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="transition-transform duration-300 hover:scale-105 flex items-center"
              aria-label="Início"
            >
              <span className="font-serif text-4xl md:text-5xl font-normal text-[#021a10] tracking-tight">7D</span>
            </button>
          </div>

          {/* Centro: Links de Navegação */}
          <nav className="hidden md:flex items-center gap-10 z-10 absolute left-1/2 -translate-x-1/2">
            {NAV.map((n) => (
              <PremiumLink key={n.label} label={n.label} href={n.href} />
            ))}
          </nav>

          {/* Direita: Pesquisa e Sacola */}
          <div className="flex items-center gap-4 z-20 relative h-full" style={{ maxWidth: "100%" }}>
            <AnimatePresence>
              {!isSearchOpen ? (
                <motion.button 
                  key="search-icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsSearchOpen(true)} 
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 text-[#021a10] hover:text-[#CEAA71]`}
                  aria-label="Pesquisa"
                >
                  <Search strokeWidth={1.5} className="h-6 w-6 md:h-7 md:w-7" />
                </motion.button>
              ) : (
                <motion.form
                  onSubmit={handleSearch}
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "min(320px, 80vw)", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`flex items-center overflow-hidden border-b border-[#021a10]/30`}
                  style={{ maxWidth: "100%" }}
                >
                  <button 
                    type="submit"
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors duration-300 text-[#021a10] hover:text-[#CEAA71]`}
                    aria-label="Buscar"
                  >
                    <Search strokeWidth={1.5} className="h-5 w-5" />
                  </button>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busque exclusividade..."
                    className={`h-10 w-full bg-transparent px-2 font-montserrat text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CEAA71] focus-visible:border-transparent transition-all text-[#021a10] placeholder:text-[#021a10]/50`}
                  />
                  
                  {/* Botão de Filtros */}
                  <button 
                    type="button"
                    onClick={handleFilterClick}
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors duration-300 text-[#021a10] hover:text-[#CEAA71]`}
                    aria-label="Filtros"
                  >
                    <SlidersHorizontal strokeWidth={1.5} className="h-5 w-5" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }} 
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors duration-300 text-[#021a10] hover:text-[#CEAA71]`}
                    aria-label="Fechar Pesquisa"
                  >
                    <X strokeWidth={1.5} className="h-5 w-5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Sacola agora na direita junto com a pesquisa */}
            {!isSearchOpen && (
              <button 
                onClick={onOpenBag}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ml-2 text-[#021a10] hover:text-[#CEAA71]`}
                aria-label="Sacola"
              >
                <ShoppingBag strokeWidth={1.5} className="h-6 w-6 md:h-7 md:w-7" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Menu Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#021a10] text-white overflow-hidden h-[100svh]"
          >
            <div className="flex h-24 items-center justify-between px-6">
              <span className="font-serif text-4xl md:text-5xl font-normal text-white tracking-tight">7D</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors text-white hover:text-[#CEAA71]"
                aria-label="Fechar menu"
              >
                <X className="h-8 w-8" strokeWidth={1.5} />
              </button>
            </div>
            
            <nav className="flex flex-1 flex-col items-center justify-center gap-10">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-playfair text-3xl md:text-4xl font-medium tracking-wider text-white hover:text-[#CEAA71] transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            
            <div className="pb-12 flex justify-center">
              <p className="font-montserrat text-xs tracking-[0.4em] text-[#CEAA71] opacity-70">
                EXCLUSIVIDADE ABSOLUTA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}