import type { CSSProperties } from "react";

/**
 * Art-directed stand-ins for photography: layered gradient fields with film
 * grain, an optional arch silhouette (the brand motif) and thin line details.
 * Deterministic per variant so the page composes like an edited shoot.
 */

const recipes: string[] = [
  // 0 — blush dawn
  "radial-gradient(120% 90% at 20% 10%, #f6e9df 0%, transparent 55%), radial-gradient(110% 90% at 85% 85%, #b0755f 0%, transparent 60%), linear-gradient(155deg, #ebd2c4 0%, #ce9584 58%, #b87f6a 100%)",
  // 1 — ivory silk
  "radial-gradient(100% 80% at 75% 15%, #fbf5ee 0%, transparent 55%), radial-gradient(120% 100% at 15% 90%, #ce9584 0%, transparent 65%), linear-gradient(200deg, #f5eadf 0%, #ebd2c4 70%, #ddb49e 100%)",
  // 2 — toasted caramel
  "radial-gradient(90% 70% at 80% 20%, #e3bc9c 0%, transparent 55%), radial-gradient(130% 110% at 10% 80%, #96684f 0%, transparent 60%), linear-gradient(160deg, #c49076 0%, #b0755f 55%, #7d503c 100%)",
  // 3 — warm velvet
  "radial-gradient(80% 60% at 75% 25%, #b0755f 0%, transparent 60%), radial-gradient(120% 100% at 20% 90%, #4d3b2f 0%, transparent 60%), linear-gradient(165deg, #46372c 0%, #3b2e26 60%, #2b211b 100%)",
  // 4 — rose gold light
  "radial-gradient(110% 80% at 25% 20%, #f8ece1 0%, transparent 55%), radial-gradient(100% 90% at 85% 80%, #c98f72 0%, transparent 62%), linear-gradient(150deg, #f0dbc8 0%, #e3bc9c 60%, #cfa07e 100%)",
  // 5 — champagne powder
  "radial-gradient(100% 90% at 80% 10%, #fbf5ee 0%, transparent 50%), radial-gradient(120% 110% at 15% 85%, #c49076 0%, transparent 58%), linear-gradient(170deg, #f6e9df 0%, #ecd3bd 65%, #ddb49e 100%)",
  // 6 — terracotta bloom
  "radial-gradient(90% 80% at 20% 15%, #ce9584 0%, transparent 55%), radial-gradient(110% 90% at 85% 85%, #6b4634 0%, transparent 62%), linear-gradient(155deg, #b0755f 0%, #9c6650 55%, #855544 100%)",
  // 7 — gilded champagne
  "radial-gradient(120% 90% at 70% 20%, #faf1e6 0%, transparent 55%), radial-gradient(100% 90% at 10% 90%, #dcb587 0%, transparent 60%), linear-gradient(160deg, #f5eadf 0%, #eed9c2 60%, #ddc09b 100%)",
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
            stroke={dark ? "rgba(245,234,223,0.35)" : "rgba(59,46,38,0.28)"}
            strokeWidth="1"
          />
          <path
            d="M100 440 C100 260 155 170 200 170 C245 170 300 260 300 440"
            stroke={dark ? "rgba(245,234,223,0.22)" : "rgba(59,46,38,0.16)"}
            strokeWidth="1"
          />
        </svg>
      )}
      {letter && (
        <span className="display serif-italic absolute -bottom-[0.22em] right-[0.02em] select-none text-[42vmin] leading-none text-white/25 mix-blend-soft-light">
          {letter}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(59,46,38,0.12)]" />
      {children}
    </div>
  );
}
