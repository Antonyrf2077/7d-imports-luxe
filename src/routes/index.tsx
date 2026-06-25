import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Catalog } from "@/components/site/Catalog";
import { AboutSection } from "@/components/site/AboutSection";
import { Footer } from "@/components/site/Footer";
import { CheckoutDrawer } from "@/components/site/CheckoutDrawer";
import { Spotlight } from "@/components/site/Spotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "7D IMPORTS — Cada peça é única" },
      {
        name: "description",
        content:
          "Importação direta e curadoria de peças únicas. Estoque limitado, estilo ilimitado.",
      },
      { property: "og:title", content: "7D IMPORTS" },
      {
        property: "og:description",
        content: "Cada peça é única. Quando vende, não volta a ter igual.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [pid, setPid] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const openBag = (productId?: string) => {
    setPid(productId || null);
    setOpen(true);
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden bg-transparent">
      <Spotlight />
      <Header onOpenBag={() => openBag()} />
      
      {/* Hero — Normal flow, parallax gerenciado internamente */}
      <div className="relative w-full">
        <Hero onCTA={() => openBag()} />
      </div>

      {/* Solid Content Overlay */}
      <div className="relative z-10">
        <Catalog onBuy={(id) => openBag(id)} />
        <AboutSection />
        <Footer />
      </div>
      
      <CheckoutDrawer open={open} onClose={() => setOpen(false)} initialProductId={pid} />
    </main>
  );
}
