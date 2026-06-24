export type Category = "CAMISETAS" | "POLOS" | "JAQUETAS";

export type Product = {
  id: string;
  category: Category;
  brand: string;
  size: string;
  price: number;
  tone: string; // background tone for placeholder tile
  image: string;
  imageHover?: string; // ← ADD: imagem de hover para efeito Prada
  color?: string;
  pricePix?: number;
  priceCard?: number;
  description: string; // Descrição editorial da peça
  condition: string;   // Estado de conservação
};

const T_MIN = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80";
const T_LAC = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80";
const T_GREY = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80";
const T_STUDIO = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80";
const POLO_NAVY = "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=80";
const JAQUETA_TNF = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80";

// Imagens hover (modelo usando a peça) para efeito Prada
const T_MIN_HOVER = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80";
const T_LAC_HOVER = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80";
const T_GREY_HOVER = "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80";
const T_STUDIO_HOVER = "https://images.unsplash.com/photo-1536992266094-82847e1fd431?auto=format&fit=crop&w=900&q=80";
const POLO_HOVER = "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=900&q=80";
const JAQUETA_HOVER = "https://images.unsplash.com/photo-1544966278-36a9b6c11e5a?auto=format&fit=crop&w=900&q=80";

export const products: Product[] = [
  { id: "cam-gucci-m",    category: "CAMISETAS", brand: "Gucci",               size: "M",  price: 105, tone: "#0d0d0d", image: T_MIN, imageHover: T_MIN_HOVER, description: "Peça de malha premium encorpada com caimento impecável. Assinatura clássica minimalista.", condition: "Deadstock (Nova na tag)" },
  { id: "cam-lacoste-xl", category: "CAMISETAS", brand: "Lacoste",             size: "XL", price: 105, tone: "#0d1f17", image: T_LAC, imageHover: T_LAC_HOVER, description: "Essencial do dia a dia. Algodão pima com toque macio e acabamento de alfaiataria esportiva.", condition: "Flawless (10/10)" },
  { id: "cam-lacoste-gg", category: "CAMISETAS", brand: "Lacoste",             size: "GG", price: 105, tone: "#0d1f17", image: T_LAC, imageHover: T_LAC_HOVER, description: "Essencial do dia a dia. Algodão pima com toque macio e acabamento de alfaiataria esportiva.", condition: "Excellent (9.5/10)" },
  { id: "cam-armani-g",   category: "CAMISETAS", brand: "Emporio Armani",      size: "G",  price: 105, tone: "#16181b", image: T_STUDIO, imageHover: T_STUDIO_HOVER, description: "Corte milanês autêntico. Modelagem ajustada que valoriza o porte físico sem perder a elegância.", condition: "Deadstock (Nova na tag)" },
  { id: "cam-armani-m",   category: "CAMISETAS", brand: "Emporio Armani",      size: "M",  price: 105, tone: "#16181b", image: T_STUDIO, imageHover: T_STUDIO_HOVER, description: "Corte milanês autêntico. Modelagem ajustada que valoriza o porte físico sem perder a elegância.", condition: "Flawless (10/10)" },
  { id: "cam-boss-m",     category: "CAMISETAS", brand: "Boss",                size: "M",  price: 105, tone: "#101418", image: T_GREY, imageHover: T_GREY_HOVER, description: "Versatilidade e sobriedade. A base perfeita para sobreposições de luxo e uso urbano.", condition: "Deadstock (Nova na tag)" },
  { id: "cam-boss-g",     category: "CAMISETAS", brand: "Boss",                size: "G",  price: 105, tone: "#101418", image: T_GREY, imageHover: T_GREY_HOVER, description: "Versatilidade e sobriedade. A base perfeita para sobreposições de luxo e uso urbano.", condition: "Excellent (9/10)" },
  { id: "polo-tommy-m",   category: "POLOS",     brand: "Polo Tommy Hilfiger", size: "M",  price: 145, tone: "#0b1426", image: POLO_NAVY, imageHover: POLO_HOVER, description: "A icônica polo americana reinventada. Gola estruturada e piquet texturizado de altíssima gramatura.", condition: "Flawless (10/10)" },
  { id: "polo-tommy-g",   category: "POLOS",     brand: "Polo Tommy Hilfiger", size: "G",  price: 145, tone: "#0b1426", image: POLO_NAVY, imageHover: POLO_HOVER, description: "A icônica polo americana reinventada. Gola estruturada e piquet texturizado de altíssima gramatura.", condition: "Deadstock (Nova na tag)" },
  { id: "jaq-tnf-g",      category: "JAQUETAS",  brand: "The North Face",      size: "G",  price: 399, tone: "#0a1a14", image: JAQUETA_TNF, imageHover: JAQUETA_HOVER, description: "Proteção máxima contra o frio com design Gorpcore de ponta. Tecnologia térmica de isolamento leve.", condition: "Very Good (8.5/10)" },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });