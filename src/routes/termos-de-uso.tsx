import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/termos-de-uso")({
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#C9973F]">7D IMPORTS</div>
        <h1 className="font-cormorant text-4xl mb-12 uppercase font-bold text-[#111111] leading-tight">Termos de Serviço</h1>
        <div className="text-[#444444] font-montserrat text-sm leading-loose space-y-6">
          <p>O acesso e uso do catálogo digital da 7D Imports estão sujeitos à aceitação destes Termos de Serviço.</p>
          <p>Nosso modelo de negócios baseia-se na exclusividade de peças limitadas (sistema First Come, First Served). A adição de uma peça ao carrinho digital não assegura sua reserva; a venda é concretizada exclusivamente após a aprovação do pagamento junto aos nossos Especialistas.</p>
          <p>Todo o acervo passa por uma curadoria e verificação de autenticidade estrita (Legit Check). As condições de uso (Flawless, Excellent, Very Good, Deadstock) são atestadas e fotografadas, e qualquer mínimo detalhe estrutural da peça é previamente descrito ao cliente.</p>
          <p>Reservamo-nos o direito de alterar preços sem aviso prévio e de recusar atendimento ou cancelar compras que apresentem inconformidade nos dados de verificação financeira.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
