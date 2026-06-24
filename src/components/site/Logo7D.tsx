/**
 * Logo7D — Nova identidade visual Flat Design (Tipografia Pura)
 * 7D em Playfair Display, IMPORTS em Montserrat
 */

type Props = {
  className?: string;
  size?: number;
  variant?: "dark" | "light";
};

export function Logo7D({ className = "", size = 56, variant = "dark" }: Props) {
  // Branco sobre vídeo (dark), Dourado/Preto no header claro (light)
  const colorPrimary = variant === "dark" ? "#FFFFFF" : "#1A1A1A";
  const colorSecondary = variant === "dark" ? "#FFFFFF" : "#1A1A1A";

  return (
    <div className={`flex flex-col items-center justify-center leading-none select-none ${className}`}>
      <div 
        className="font-playfair italic font-bold" 
        style={{ fontSize: size, color: colorPrimary, lineHeight: 0.8 }}
        style={{ fontFamily: "'Playfair Display', serif" }} // Fallback in case class is missing
      >
        <span style={{ fontSize: size, color: colorPrimary, lineHeight: 0.85 }}>7D</span>
      </div>
      <div 
        className="font-montserrat font-bold uppercase tracking-[0.8em]" 
        style={{ 
          fontSize: Math.max(10, size * 0.16), 
          color: colorSecondary, 
          marginTop: size * 0.08,
          marginLeft: '0.8em' // Offset tracking to keep it visually centered
        }}
      >
        IMPORTS
      </div>
    </div>
  );
}