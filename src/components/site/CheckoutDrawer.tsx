import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { products, formatBRL, type Product } from "@/lib/products";
import { getNextVendor, type Vendor } from "@/lib/vendors";

type Props = {
  open: boolean;
  onClose: () => void;
  initialProductId?: string | null;
};

type Logistics = "expressa" | "retirada";
type Payment = "pix" | "cartao" | "dinheiro";

type CartItem = {
  product: Product;
  quantity: number;
};

export function CheckoutDrawer({ open, onClose, initialProductId }: Props) {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [logistics, setLogistics] = useState<Logistics>("expressa");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [payment, setPayment] = useState<Payment>("pix");
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      if (initialProductId) {
        const prod = products.find((p) => p.id === initialProductId);
        if (prod) {
          setCart((prev) => {
            const exists = prev.find((item) => item.product.id === prod.id);
            if (exists) {
              return prev.map((item) =>
                item.product.id === prod.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            }
            return [...prev, { product: prod, quantity: 1 }];
          });
        }
      }
    }
  }, [open, initialProductId]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  const next = () => {
    if (cart.length === 0) return alert("Sua sacola está vazia.");
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const confirm = () => {
    const v = getNextVendor();
    if (!v) {
      alert("Nenhum especialista disponível no momento. Tente novamente em breve.");
      return;
    }
    setVendor(v);
    setStep(4);
    setTimeout(() => {
      const itemsList = cart
        .map(
          (item) =>
            `- ${item.quantity}x ${item.product.brand} ${item.product.size} (${item.product.category})`
        )
        .join("\n");
      const lines = [
        "*Novo pedido — 7D IMPORTS*",
        "",
        itemsList,
        "",
        `Subtotal: ${formatBRL(totalPrice)}`,
        `Pagamento: ${payment.toUpperCase()}`,
        "",
        logistics === "expressa"
          ? `Entrega Expressa (1h30 - Caxias do Sul/RS)\nCEP: ${cep}\nEndereço: ${rua}, ${numero} - ${bairro}`
          : "Retirada Física",
        "",
        `Atendente: ${v.name}`,
      ].join("\n");
      const url = `https://wa.me/${v.phone}?text=${encodeURIComponent(lines)}`;
      window.open(url, "_blank");
      onClose();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[99998] bg-black/65 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            aria-modal="true"
            aria-label="Sacola de compras"
            className="fixed right-0 top-0 z-[99999] flex h-[100dvh] w-full max-w-md flex-col border-l border-white/8 bg-[#090909] overflow-hidden"
          >
            <header className="flex items-center justify-between border-b border-white/8 px-6 py-5 sm:px-8 sm:py-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/35">
                  Sua sacola
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-px w-6 transition-colors duration-300 ${
                        i <= Math.min(step, 2) ? "bg-[#C9973F]" : "bg-white/15"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white/50">
                    0{Math.max(1, Math.min(step, 3))} / 03
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar sacola"
                className="text-white/60 transition-all duration-200 ease-out hover:text-white hover:rotate-90 flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
              >
                <X strokeWidth={1.25} className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 overscroll-contain">
              {step > 0 && step < 4 && (
                <div className="mb-10 border-b border-white/8 pb-6">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.4em] text-white/35">
                    Resumo da Sacola
                  </div>
                  <div className="text-[12px] uppercase tracking-wide text-white/50">
                    {cart.reduce((a, c) => a + c.quantity, 0)} peça(s) no carrinho
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                      Subtotal
                    </span>
                    <span className="text-[28px] font-bold text-white">
                      {formatBRL(totalPrice)}
                    </span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepWrap key="s0">
                    <div className="flex flex-col gap-6 pb-8">
                      {cart.length === 0 ? (
                        <div className="text-center py-12 text-white/35 text-[12px] uppercase tracking-widest font-montserrat">
                          Sua sacola está vazia.
                        </div>
                      ) : (
                        cart.map((item, i) => (
                          <div key={i} className="flex gap-4 border-b border-white/8 pb-6 mb-2">
                            <div className="w-24 shrink-0 bg-[#050505] relative overflow-hidden aspect-[3/4]">
                              <img
                                src={item.product.image}
                                alt={`${item.product.brand} — ${item.product.category}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="text-[10px] text-white/35 uppercase tracking-widest mb-1">
                                  {item.product.category}
                                </div>
                                <h3 className="text-[16px] font-cormorant font-bold uppercase leading-tight text-white">
                                  {item.product.brand}
                                </h3>
                                <div className="text-[12px] text-white/55 mt-1 uppercase tracking-wider">
                                  {formatBRL(item.product.price)}
                                </div>

                                {/* Tamanhos */}
                                <div className="mt-4 flex items-center gap-2">
                                  {["P", "M", "G", "GG"].map((size) => (
                                    <span
                                      key={size}
                                      className={`flex h-6 w-6 items-center justify-center border text-[9px] font-bold uppercase transition-all ${
                                        item.product.size === size
                                          ? "border-[#C9973F]/60 text-[#C9973F] bg-[#C9973F]/10"
                                          : "border-white/10 text-white/25"
                                      }`}
                                    >
                                      {size}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                                {/* Quantidade */}
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() =>
                                      setCart((c) =>
                                        c.map((x) =>
                                          x.product.id === item.product.id
                                            ? { ...x, quantity: Math.max(1, x.quantity - 1) }
                                            : x
                                        )
                                      )
                                    }
                                    aria-label="Diminuir quantidade"
                                    className="text-white/35 hover:text-white w-11 h-11 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                                  >
                                    −
                                  </button>
                                  <span className="text-[11px] font-bold text-white w-4 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setCart((c) =>
                                        c.map((x) =>
                                          x.product.id === item.product.id
                                            ? { ...x, quantity: x.quantity + 1 }
                                            : x
                                        )
                                      )
                                    }
                                    aria-label="Aumentar quantidade"
                                    className="text-white/35 hover:text-white w-11 h-11 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() =>
                                    setCart((c) =>
                                      c.filter((x) => x.product.id !== item.product.id)
                                    )
                                  }
                                  aria-label={`Remover ${item.product.brand} da sacola`}
                                  className="group relative flex flex-col items-center justify-start h-[48px] pt-1 transition-all duration-300"
                                >
                                  <span className="text-[9px] uppercase tracking-widest text-white/35 group-hover:text-white transition-colors duration-300 relative z-10">
                                    Remover
                                  </span>
                                  <div className="absolute top-[24px] opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 text-white/50">
                                    <Trash2 strokeWidth={1} className="h-3 w-3" />
                                  </div>
                                  <div className="absolute bottom-0 left-1 right-1 h-[1px] bg-[#C9973F]/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}

                      {cart.length > 0 && (
                        <div className="flex items-baseline justify-between mt-4">
                          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                            Subtotal
                          </span>
                          <span className="text-[24px] font-bold text-white">
                            {formatBRL(totalPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </StepWrap>
                )}

                {step === 1 && (
                  <StepWrap key="s1">
                    <StepTitle index="01" title="Logística" />
                    <div className="divide-y divide-white/8 border-y border-white/8">
                      <Row
                        active={logistics === "expressa"}
                        onClick={() => setLogistics("expressa")}
                        title="Entrega Expressa"
                        sub="Até 1h30 — Caxias do Sul/RS"
                      />
                      <Row
                        active={logistics === "retirada"}
                        onClick={() => setLogistics("retirada")}
                        title="Retirada Física"
                        sub="Combinar local"
                      />
                    </div>
                    {logistics === "expressa" && (
                      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                        <Field label="CEP" value={cep} onChange={setCep} id="checkout-cep" />
                        <Field label="Número" value={numero} onChange={setNumero} id="checkout-numero" />
                        <Field label="Rua" value={rua} onChange={setRua} id="checkout-rua" full />
                        <Field label="Bairro" value={bairro} onChange={setBairro} id="checkout-bairro" full />
                      </div>
                    )}
                  </StepWrap>
                )}

                {step === 2 && (
                  <StepWrap key="s2">
                    <StepTitle index="02" title="Pagamento" />
                    <div className="divide-y divide-white/8 border-y border-white/8">
                      <Row
                        active={payment === "pix"}
                        onClick={() => setPayment("pix")}
                        title="Pix"
                        sub="Desconto aplicado"
                      />
                      <Row
                        active={payment === "cartao"}
                        onClick={() => setPayment("cartao")}
                        title="Cartão de Crédito"
                        sub="Em até 3x"
                      />
                      <Row
                        active={payment === "dinheiro"}
                        onClick={() => setPayment("dinheiro")}
                        title="Dinheiro na entrega"
                        sub="Pague ao receber"
                      />
                    </div>
                  </StepWrap>
                )}

                {step === 3 && (
                  <StepWrap key="s3">
                    <StepTitle index="03" title="Revisar pedido" />
                    <Summary
                      product={`${cart.reduce((a, c) => a + c.quantity, 0)} Itens`}
                      price={formatBRL(totalPrice)}
                      payment={payment}
                      logistics={logistics}
                      addr={
                        logistics === "expressa"
                          ? `${rua}, ${numero} — ${bairro} (${cep})`
                          : "Retirada combinada"
                      }
                    />
                  </StepWrap>
                )}

                {step === 4 && (
                  <StepWrap key="s4">
                    <div className="grid place-items-center py-16 text-center">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="text-[20px] font-bold uppercase text-white tracking-wide"
                      >
                        Conectando ao Especialista...
                      </motion.div>
                      {vendor && (
                        <div className="mt-4 text-[12px] uppercase tracking-[0.3em] text-[#C9973F]">
                          {vendor.name}
                        </div>
                      )}
                    </div>
                  </StepWrap>
                )}
              </AnimatePresence>
            </div>

            {step < 4 && (
              <footer className="flex items-stretch border-t border-white/8 shrink-0 mt-auto">
                {step > 0 && (
                  <button
                    onClick={back}
                    className="flex-1 border-r border-white/8 px-6 py-6 text-[11px] uppercase tracking-[0.3em] text-white/50 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-inset"
                  >
                    ← Voltar
                  </button>
                )}
                <BrutalButton onClick={step < 3 ? next : confirm}>
                  {step === 0 ? "Comprar Peça →" : step < 3 ? "Continuar →" : "Fechar pedido →"}
                </BrutalButton>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StepTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] uppercase tracking-[0.45em] text-[#C9973F]">
        Passo {index}
      </div>
      <h3
        className="mt-2 text-[28px] font-bold uppercase leading-tight text-white"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h3>
    </div>
  );
}

function Row({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 py-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-inset"
    >
      <span>
        <span
          className={`block text-[14px] font-bold uppercase tracking-wide transition ${
            active ? "text-white" : "text-white/60 group-hover:text-white"
          }`}
        >
          {title}
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-white/35">
          {sub}
        </span>
      </span>
      <span
        className={`flex h-4 w-4 items-center justify-center border transition-colors duration-200 ${
          active ? "border-[#C9973F]" : "border-white/25"
        }`}
      >
        {active && <span className="h-2 w-2 bg-[#C9973F]" />}
      </span>
    </button>
  );
}

function BrutalButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex-[2] overflow-hidden bg-white px-6 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9973F] focus-visible:ring-inset"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[#0D3D2A] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10 transition group-hover:text-white">
        {children}
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  full,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
  id: string;
}) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`} htmlFor={id}>
      <span className="block text-[10px] uppercase tracking-[0.4em] text-white/35">
        {label}
      </span>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[14px] text-white outline-none transition-all duration-200 ease-out focus:border-[#C9973F]"
        style={{ borderRadius: 0, WebkitAppearance: "none", appearance: "none" }}
      />
    </label>
  );
}

function Summary({
  product,
  price,
  payment,
  logistics,
  addr,
}: {
  product: string;
  price: string;
  payment: string;
  logistics: string;
  addr: string;
}) {
  const row = (k: string, v: string) => (
    <div className="flex items-start justify-between gap-4 border-b border-white/8 py-4">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">{k}</span>
      <span className="text-right text-[13px] uppercase tracking-wide text-white">{v}</span>
    </div>
  );
  return (
    <div className="border-t border-white/8">
      {row("Produto", product)}
      {row("Logística", logistics === "expressa" ? "Entrega Expressa" : "Retirada")}
      {row("Endereço", addr)}
      {row("Pagamento", payment.toUpperCase())}
      {row("Total", price)}
    </div>
  );
}