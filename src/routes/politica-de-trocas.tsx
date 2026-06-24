import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/politica-de-trocas")({
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#C9973F]">7D IMPORTS</div>
        <h1 className="font-cormorant text-4xl mb-12 uppercase font-bold text-[#111111] leading-tight">Trocas e Devoluções</h1>
        <div className="text-[#444444] font-montserrat text-sm leading-loose space-y-6">
          <p>Nosso acervo é composto por peças únicas e de alto valor agregado. Para garantir a integridade do catálogo e a exclusividade de cada item, possuímos uma política de trocas rigorosa.</p>
          <p>1. Devoluções por arrependimento devem ser comunicadas em até 7 (sete) dias corridos após o recebimento, conforme o Art. 49 do Código de Defesa do Consumidor.</p>
          <p>2. A peça deve retornar intacta, com o lacre de segurança original (tag de autenticidade 7D) fixado, sem qualquer odor, marca de uso, lavagem ou alteração de costura.</p>
          <p>3. Após o recebimento, nossa curadoria fará uma vistoria técnica de até 3 dias úteis. Caso a integridade seja confirmada, o estorno será realizado no mesmo método de pagamento original.</p>
          <p>Peças da aba "Deadstock" (Novas na tag) não serão aceitas de volta caso as tags originais do fabricante tenham sido violadas.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
