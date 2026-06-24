import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/entregas")({
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#C9973F]">7D IMPORTS</div>
        <h1 className="font-cormorant text-4xl mb-12 uppercase font-bold text-[#111111] leading-tight">Política de Entregas</h1>
        <div className="text-[#444444] font-montserrat text-sm leading-loose space-y-6">
          <p>A exclusividade da sua compra reflete-se na segurança da nossa logística.</p>
          <h2 className="text-xl font-cormorant text-[#C9973F] uppercase mt-8 mb-4">Entrega Expressa Local</h2>
          <p>Para residentes da Serra Gaúcha (Caxias do Sul e região metropolitana), oferecemos serviço de Hand Delivery (entrega em mãos) em até 1h30 após a confirmação do pagamento, garantindo total segurança do seu investimento.</p>
          <h2 className="text-xl font-cormorant text-[#C9973F] uppercase mt-8 mb-4">Envios Nacionais</h2>
          <p>Enviamos para todo o Brasil através de transportadoras premium parceiras e Correios (Sedex). Todas as remessas contam com seguro contra extravio e código de rastreamento imediato.</p>
          <p>Prazos variam entre 2 a 7 dias úteis dependendo do seu CEP e modalidade escolhida no momento do checkout via Especialista.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
