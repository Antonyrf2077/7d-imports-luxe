import { AnimatePresence, motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, X, Menu } from "lucide-react";
import { Logo7D } from "./Logo7D";

type Props = { 
  onOpenBag?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
};

const NAV = [
  { label: "NOVIDADES", href: "/#catalogo" },
  { label: "ACERVO", href: "/#catalogo" },
  { label: "MANIFESTO", href: "/#manifesto" },
  { label: "CONTATO", href: "/#footer" },
];

export function Header({ onOpenBag, searchQuery = "", onSearchChange }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagClicked, setIsBagClicked] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 80));
    return () => unsub();
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 140], [0, 1]);
  const bgColor = useMotionTemplate`rgba(5,5,5,${bgOpacity})`;
  const logoVariant = "light";
  const textColor = "text-white";

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      id="top"
      className={`fixed inset-x-0 top-0 z-[9990] h-16 md:h-20 transition-all duration-500 border-b ${
        scrolled ? "border-[#C9973F]/20" : "border-white/10"
      }`}
      style={{
        backgroundColor: bgColor,
        backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
      }}
    >
      <motion.div layout className="relative mx-auto flex h-full w-full max-w-[1600px] items-center px-4 lg:px-6">
        
        {/* Hambúrguer Mobile (< 900px) */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`lg:hidden flex items-center justify-center transition-opacity hover:opacity-70 absolute left-4 z-[9999] ${textColor}`}
          aria-label="Abrir Menu"
        >
          <Menu strokeWidth={1} className="h-7 w-7" />
        </button>

        {/* ESQUERDA: Ícones Desktop (Search & Bag) */}
        <motion.div 
          layout 
          className={`hidden lg:flex items-center gap-6 ${textColor} z-[9999] ${scrolled ? 'order-2 ml-10' : 'absolute left-6'}`}
        >
          <button 
            onClick={() => {
              setIsBagClicked(!isBagClicked);
              onOpenBag?.();
            }} 
            aria-label="Sacola" 
            className="hover:text-[#C9973F] transition-colors flex items-center gap-2"
          >
            <ShoppingBag strokeWidth={1} className="h-6 w-6" />
            {isBagClicked && <span className="text-[10px] uppercase font-bold tracking-widest">SACOLA</span>}
          </button>

          <div className="relative flex items-center">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              aria-label="Buscar" 
              className="hover:text-[#C9973F] transition-colors"
            >
              <Search strokeWidth={1} className="h-6 w-6" />
            </button>

            {/* Expandable Input */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-8 flex items-center overflow-hidden border-b border-current"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Buscar..."
                    autoFocus
                    className="h-8 w-full bg-transparent px-2 text-xs font-montserrat tracking-widest focus:outline-none uppercase placeholder:text-current opacity-80"
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="p-1 hover:text-[#C9973F] transition-colors"
                  >
                    <X strokeWidth={1} className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CENTRO -> ESQUERDA: Logo Tipográfica */}
        <motion.div 
          layout 
          className={`flex items-center pointer-events-auto z-[9998] ${scrolled ? 'order-1 justify-start' : 'w-full justify-center'}`}
        >
          <a href="/#top" aria-label="Página Inicial" className="transition-transform duration-300 hover:scale-105">
            <Logo7D size={scrolled ? 80 : 110} variant={logoVariant} className="lg:scale-110" />
          </a>
        </motion.div>

        {/* DIREITA / CENTRO: Desktop Nav */}
        <motion.nav 
          layout 
          className={`hidden lg:flex items-center gap-8 z-[9999] ${scrolled ? 'order-3 ml-auto' : 'absolute right-6'}`}
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`text-[11px] font-bold uppercase tracking-[0.28em] transition-colors duration-300 font-montserrat relative group ${textColor}`}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2 block">
                {n.label}
              </span>
              <span className="absolute left-0 top-full text-[#C9973F] transition-transform duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:-mt-4">
                {n.label}
              </span>
            </a>
          ))}
        </motion.nav>
        
        {/* Sacola Mobile (< 900px) */}
        <button 
          onClick={() => {
            setIsBagClicked(!isBagClicked);
            onOpenBag?.();
          }} 
          className={`lg:hidden hover:opacity-70 transition-opacity absolute right-4 z-[9999] ${textColor} flex items-center gap-2`}
          aria-label="Sacola"
        >
          {isBagClicked && <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:block">SACOLA</span>}
          <ShoppingBag strokeWidth={1.25} className="h-6 w-6" />
        </button>

      </motion.div>

      {/* Side Drawer Menu Overlay (Mobile Only) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[9999] flex w-full h-[100svh] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
              className="relative flex w-[80vw] max-w-sm flex-col bg-[#050505] shadow-2xl h-full border-r border-white/10 pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Logo7D size={90} variant="light" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white/60 transition-transform duration-300 hover:rotate-90 hover:text-[#C9973F] p-2"
                >
                  <X strokeWidth={1.5} className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex flex-1 flex-col py-8 px-6 overflow-y-auto">
                <nav aria-label="Menu mobile" className="flex flex-col gap-0">
                  {NAV.map((n, i) => (
                    <motion.div
                      key={n.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/10"
                    >
                      <a
                        href={n.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex min-h-[64px] items-center py-4 font-cormorant text-2xl font-bold uppercase tracking-wide text-white transition-all duration-300 hover:text-[#C9973F]"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-3">
                          {n.label}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}