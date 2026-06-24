import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VENDORS, getVendorStatus, setVendorStatus } from "@/lib/vendors";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "7D · Admin" }] }),
  component: Admin,
});

function Admin() {
  const [status, setStatus] = useState<Record<string, boolean>>({});
  useEffect(() => setStatus(getVendorStatus()), []);

  const toggle = (id: string) => {
    const next = !status[id];
    setVendorStatus(id, next);
    setStatus({ ...status, [id]: next });
  };

  return (
    <motion.main
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#020A07] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-[11px] uppercase text-white/50">Painel administrativo</div>
        <h1 className="mt-2 text-[32px] font-bold leading-[40px]">Especialistas 7D</h1>
        <p className="mt-3 text-[12px] leading-[24px] text-white/60">
          Vendedores offline são automaticamente ignorados pelo Round-Robin.
        </p>

        <div className="mt-10 divide-y divide-white/10 border border-white/10">
          {VENDORS.map((v) => {
            const on = status[v.id] !== false;
            return (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 px-5 py-5"
              >
                <div>
                  <div className="text-[16px] font-bold">{v.name}</div>
                  <div className="text-[11px] uppercase text-white/40">{v.phone}</div>
                </div>
                <button
                  onClick={() => toggle(v.id)}
                  className="relative h-9 w-20 border border-white/20"
                  style={{
                    backgroundColor: on ? "#0D3D2A" : "#020A07",
                    transition: "background-color 300ms ease",
                  }}
                  aria-label={on ? "Online" : "Offline"}
                >
                  <motion.span
                    animate={{ x: on ? 44 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute left-1 top-1 block h-7 w-8 bg-white"
                  />
                  <span
                    className="absolute inset-0 grid place-items-center text-[10px] font-bold uppercase"
                    style={{ color: on ? "#fff" : "rgba(255,255,255,0.5)" }}
                  >
                    {on ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-[11px] uppercase text-white/30">
          Estrutura mockada — pronta para Supabase + RLS.
        </p>
      </div>
    </motion.main>
  );
}