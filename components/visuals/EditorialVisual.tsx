import type { CSSProperties } from "react";

/**
 * Art-directed stand-ins for photography: layered gradient fields with film
 * grain, an optional arch silhouette (the brand motif) and thin line details.
 * Deterministic per variant so the page composes like an edited shoot.
 */

const recipes: string[] = [
  // 0 — dawn rose
  "radial-gradient(120% 90% at 20% 10%, #f3e7ec 0%, transparent 55%), radial-gradient(110% 90% at 85% 85%, #a87890 0%, transparent 60%), linear-gradient(155deg, #e7d0da 0%, #cfa5b5 58%, #b98ca6 100%)",
  // 1 — ivory silk
  "radial-gradient(100% 80% at 75% 15%, #fdfbfa 0%, transparent 55%), radial-gradient(120% 100% at 15% 90%, #cfa5b5 0%, transparent 65%), linear-gradient(200deg, #f8f5f3 0%, #e7d0da 70%, #d8b4c3 100%)",
  // 2 — dusk mauve
  "radial-gradient(90% 70% at 80% 20%, #dca9a0 0%, transparent 55%), radial-gradient(130% 110% at 10% 80%, #8f6377 0%, transparent 60%), linear-gradient(160deg, #b98ca6 0%, #a87890 55%, #6e4a5c 100%)",
  // 3 — charcoal velvet
  "radial-gradient(80% 60% at 75% 25%, #a87890 0%, transparent 60%), radial-gradient(120% 100% at 20% 90%, #4a3a42 0%, transparent 60%), linear-gradient(165deg, #3a3036 0%, #2a2426 60%, #1d181a 100%)",
  // 4 — rose gold light
  "radial-gradient(110% 80% at 25% 20%, #f6e8e2 0%, transparent 55%), radial-gradient(100% 90% at 85% 80%, #b76e79 0%, transparent 62%), linear-gradient(150deg, #eed3cd 0%, #dca9a0 60%, #c48d92 100%)",
  // 5 — powder
  "radial-gradient(100% 90% at 80% 10%, #fdfbfa 0%, transparent 50%), radial-gradient(120% 110% at 15% 85%, #b98ca6 0%, transparent 58%), linear-gradient(170deg, #f3e7ec 0%, #dfc2cf 65%, #cfa5b5 100%)",
  // 6 — deep bloom
  "radial-gradient(90% 80% at 20% 15%, #cfa5b5 0%, transparent 55%), radial-gradient(110% 90% at 85% 85%, #5c3f4e 0%, transparent 62%), linear-gradient(155deg, #a87890 0%, #8f6377 55%, #745061 100%)",
  // 7 — champagne
  "radial-gradient(120% 90% at 70% 20%, #faf3ef 0%, transparent 55%), radial-gradient(100% 90% at 10% 90%, #dca9a0 0%, transparent 60%), linear-gradient(160deg, #f8f5f3 0%, #ecd9d4 60%, #ddb8b4 100%)",
];

type Props = {
  variant?: number;
  className?: string;
  arch?: boolean;
  arcs?: boolean;
  letter?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export default function EditorialVisual({
  variant = 0,
  className,
  arch = false,
  arcs = false,
  letter,
  style,
  children,
}: Props) {
  const background = recipes[variant % recipes.length];
  const dark = variant % recipes.length === 3;

  return (
    <div
      aria-hidden
      className={`grain relative overflow-hidden ${arch ? "rounded-t-full" : ""} ${className ?? ""}`}
      style={{ background, ...style }}
    >
      <div className="absolute inset-0 animate-drift-slow opacity-60 [background:radial-gradient(60%_50%_at_60%_40%,rgba(255,255,255,0.35),transparent_70%)]" />
      {arcs && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 500"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M60 420 C60 220 140 120 200 120 C260 120 340 220 340 420"
            stroke={dark ? "rgba(248,245,243,0.35)" : "rgba(42,36,38,0.28)"}
            strokeWidth="1"
          />
          <path
            d="M100 440 C100 260 155 170 200 170 C245 170 300 260 300 440"
            stroke={dark ? "rgba(248,245,243,0.22)" : "rgba(42,36,38,0.16)"}
            strokeWidth="1"
          />
        </svg>
      )}
      {letter && (
        <span className="display serif-italic absolute -bottom-[0.22em] right-[0.02em] select-none text-[42vmin] leading-none text-white/25 mix-blend-soft-light">
          {letter}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(42,36,38,0.12)]" />
      {children}
    </div>
  );
}
