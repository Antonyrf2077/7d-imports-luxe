import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#C9973F]">7D IMPORTS</div>
        <h1 className="font-cormorant text-4xl mb-12 uppercase font-bold text-[#111111] leading-tight">Política de Privacidade</h1>
        <div className="text-[#444444] font-montserrat text-sm leading-loose space-y-6">
          <p>A 7D Imports atua no mercado de curadoria de luxo, prezando pela segurança absoluta dos dados dos nossos clientes.</p>
          <p>Nenhuma informação transacionada em nossa plataforma é revendida ou compartilhada com terceiros não autorizados. Seus dados de contato, tamanho e histórico de compras são mantidos em estrito sigilo e utilizados exclusivamente para personalizar seu atendimento VIP e otimizar nosso catálogo para as suas necessidades de estilo.</p>
          <p>Todas as transações financeiras são processadas através de gateways homologados pelo Banco Central do Brasil, garantindo a criptografia e proteção de seus dados bancários.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
