type Props = { opacity?: number; text?: string };

const DEFAULT_TEXT = "CURADORIA DE ELITE · ACESSO RESTRITO · EXCLUSIVIDADE ABSOLUTA · ";

export function MarqueeStrip({ opacity = 0.07, text = DEFAULT_TEXT }: Props) {
  const content = text.repeat(8);
  return (
    <div
      className="pointer-events-none w-full overflow-hidden whitespace-nowrap"
      aria-hidden
      style={{ opacity }}
    >
      <div className="marquee-track inline-block whitespace-nowrap font-bold uppercase leading-[0.85] tracking-tight text-white text-[12vw]">
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
