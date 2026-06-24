type Props = { text?: string; size?: number; className?: string };

export function RotatingSeal({
  text = "• PEÇA ÚNICA • SEM REPOSIÇÃO • IMPORTAÇÃO DIRETA ",
  size = 180,
  className = "",
}: Props) {
  const r = size / 2 - 12;
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="animate-[spin_25s_linear_infinite]"
      >
        <defs>
          <path
            id="seal-circle"
            d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill="#C9973F"
          style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700 }}
        >
          <textPath href="#seal-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
    </div>
  );
}