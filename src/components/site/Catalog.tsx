import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useMemo, useRef, useState, type MouseEvent, useEffect } from "react";
import { Shirt, LayoutGrid } from "lucide-react";
import { products, formatBRL, type Category, type Product } from "@/lib/products";

type Props = { onBuy: (productId: string) => void; searchQuery?: string };
type Filter = "TODOS" | Category;
const FILTERS: Filter[] = ["TODOS", "CAMISETAS", "POLOS", "JAQUETAS"];

export function Catalog({ onBuy, searchQuery = "" }: Props) {
  const [filter, setFilter] = useState<Filter>("TODOS");
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  // Fundo sutil interativo com brilho dourado fraco
  const radialBg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(800px circle at ${x}% ${y}%, rgba(201,151,63,0.06), transparent 50%)`
  );

  const list = useMemo<Product[]>(() => {
    let result = [...products]; // spread para forçar nova referência
    
    if (filter !== "TODOS") {
      result = result.filter((p) => {
        const pCat = p.category.toUpperCase().trim();
        const fCat = filter.toUpperCase().trim();
        return pCat === fCat;
      });
    }
    
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      result = result.filter((p) => {
        const brand = p.brand.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const category = p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const desc = p.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return brand.includes(q) || category.includes(q) || desc.includes(q);
      });
    }
    
    return result;
  }, [filter, searchQuery]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current && trackRef.current) {
        const sW = trackRef.current.scrollWidth;
        const oW = carouselRef.current.offsetWidth;
        setWidth(Math.max(0, sW - oW));
      }
    };
    // Delay para aguardar render dos cards filtrados
    const t = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateWidth);
    };
  }, [list, filter]); // ← adicionar filter aqui

  // Scroll automático ao pesquisar
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchQuery]);

  return (
    <section
      id="catalogo"
      className="relative isolate overflow-hidden py-24 bg-[#092B1D]"
      style={{ background: "linear-gradient(180deg, #0D3D2A 0%, #103E2C 45%, #092B1D 100%)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        aria-hidden
        style={{
          opacity: 0.08,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <motion.div className="absolute inset-0 -z-10" style={{ background: radialBg }} />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#C9973F]/70">
              Acervo Privado · 7D
            </div>
            <h2
              className="mt-3 font-cormorant text-[36px] font-bold uppercase leading-[1.05] text-white md:text-[64px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Coleção Restrita.<br />
              <LapisColorido text="Exclusividade absoluta." />
            </h2>
          </div>
        </motion.div>

        {/* Search & List Results Feedback */}
        <div className="mb-6 font-montserrat text-[11px] font-bold tracking-widest text-white/40 uppercase">
          {searchQuery.trim() !== "" ? (
            list.length === 0
              ? `0 PEÇAS PARA "${searchQuery.toUpperCase()}"`
              : `${list.length} PEÇA${list.length !== 1 ? "S" : ""} PARA "${searchQuery.toUpperCase()}"`
          ) : (
            `${list.length} PEÇA${list.length !== 1 ? "S" : ""} DISPONÍVEI${list.length !== 1 ? "S" : ""}`
          )}
        </div>

        {/* Categories — Minimalist Editorial */}
        <div
          role="tablist"
          aria-label="Filtrar por categoria"
          className="mb-10 flex overflow-x-auto gap-4 pb-2"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                role="tab"
                aria-selected={active}
                aria-label={`Filtrar por ${f}`}
                className={`group relative flex flex-col items-center justify-start px-5 pt-4 h-[84px] transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#092B1D] ${
                  active ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span className="text-[11px] font-montserrat font-bold uppercase tracking-[0.28em] relative z-10 transition-colors duration-200">
                  {f}
                </span>
                
                {/* Ícone no hover */}
                <div className="absolute top-[42px] opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 ease-out text-white/40">
                  {f === "TODOS" ? <LayoutGrid strokeWidth={1} className="h-4 w-4" /> : <Shirt strokeWidth={1} className="h-4 w-4" />}
                </div>

                {/* Sublinhado dourado do filtro ativo */}
                {active && (
                  <motion.div
                    layoutId="filterUnderline"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#C9973F]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden px-4 sm:px-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-white/40">
            <p className="font-montserrat text-xs uppercase tracking-widest">Nenhuma peça encontrada.</p>
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.08}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="flex gap-5 md:gap-6 w-max cursor-grab active:cursor-grabbing"
          >
            {list.map((p, i) => (
              <TiltCard key={p.id} product={p} index={i} onBuy={onBuy} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function LapisColorido({ text }: { text: string }) {
  // Onda dourada contínua: um highlight dourado percorre o texto da esquerda para a direita em loop.
  // Implementado com CSS animation via keyframes inline.
  return (
    <span
      className="inline-block cursor-default"
      style={{
        backgroundImage: "linear-gradient(90deg, #FFFFFF 20%, #C9973F 40%, #E8C068 50%, #C9973F 60%, #FFFFFF 80%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "goldWave 3.5s linear infinite",
      }}
    >
      {text}
    </span>
  );
}

function TiltCard({
  product: p,
  index,
  onBuy,
}: {
  product: Product;
  index: number;
  onBuy: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 6 });
  }, []);

  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTap={() => onBuy(p.id)}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      style={{
        transformPerspective: 1000,
        width: "min(320px, 80vw)",
      }}
      aria-label={`${p.brand} — ${p.category}, Tamanho ${p.size}, ${formatBRL(p.price)}`}
      className="group relative shrink-0 select-none border border-white/5 bg-[#04150E] transition-all duration-500 hover:border-[#C9973F]/30 will-change-transform transform-gpu rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] shadow-none hover:shadow-[0_4px_24px_rgba(201,151,63,0.12)]"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onBuy(p.id)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#020A07] rounded-none pointer-events-none">
        {/* Imagem Principal */}
        <img
          src={p.image}
          alt={`${p.brand} — ${p.category}`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[800ms] ease-out group-hover:opacity-0 will-change-transform"
          style={{ opacity: 0.95 }}
        />
        {/* Imagem Hover — crossfade */}
        {p.imageHover && (
          <img
            src={p.imageHover}
            alt=""
            loading="lazy"
            draggable={false}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:opacity-100 group-hover:scale-105 will-change-transform"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)` }}
        />

        <div className="absolute left-4 top-4 z-10 border border-white/10 bg-black/50 px-3 py-1 text-[9px] font-montserrat font-bold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md rounded-none">
          Acervo
        </div>
      </div>

      <div className="flex flex-col gap-2 p-5 bg-[#04150E] border-t border-[#C9973F]/10">
        <div className="flex items-end justify-between gap-4">
          <div className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-[#C9973F]/80">
            {p.brand}
          </div>
          <span className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-white/40">
            Tam {p.size}
          </span>
        </div>
        <div className="text-[15px] font-cormorant font-bold text-white">{formatBRL(p.price)}</div>
      </div>
    </motion.article>
  );
}