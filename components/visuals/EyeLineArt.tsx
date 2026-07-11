/**
 * Hand-computed line-art eye. Lashes are generated along the upper-lid bézier
 * so density and length can be tuned per look (the before/after comparison).
 * Paths carry pathLength={1} + class "lash-draw" so sections can draw them in.
 */

type Props = {
  lashCount?: number;
  lashLength?: number;
  curl?: number;
  stroke?: string;
  strokeWidth?: number;
  withBrow?: boolean;
  className?: string;
};

const P0 = { x: 50, y: 158 };
const C = { x: 200, y: 30 };
const P1 = { x: 350, y: 158 };

function lidPoint(t: number) {
  const mt = 1 - t;
  return {
    x: mt * mt * P0.x + 2 * mt * t * C.x + t * t * P1.x,
    y: mt * mt * P0.y + 2 * mt * t * C.y + t * t * P1.y,
  };
}

function lidNormal(t: number) {
  const dx = 2 * (1 - t) * (C.x - P0.x) + 2 * t * (P1.x - C.x);
  const dy = 2 * (1 - t) * (C.y - P0.y) + 2 * t * (P1.y - C.y);
  const len = Math.hypot(dx, dy);
  return { nx: dy / len, ny: -dx / len, tx: dx / len, ty: dy / len };
}

export default function EyeLineArt({
  lashCount = 9,
  lashLength = 26,
  curl = 0.25,
  stroke = "#2a2426",
  strokeWidth = 2,
  withBrow = true,
  className,
}: Props) {
  const lashes: string[] = [];
  for (let i = 0; i < lashCount; i++) {
    const t = 0.08 + (0.84 * i) / (lashCount - 1);
    const p = lidPoint(t);
    const { nx, ny, tx, ty } = lidNormal(t);
    // lashes lean outward toward the outer corner, longest near t≈0.75
    const lean = (t - 0.35) * lashLength * 0.9;
    const len = lashLength * (0.72 + 0.28 * Math.sin(Math.PI * Math.min(1, t * 1.15)));
    const cx = p.x + nx * len * 0.55 + tx * lean * 0.25;
    const cy = p.y + ny * len * 0.55 + ty * lean * 0.25;
    const ex = p.x + nx * len + tx * lean + curl * len * 0.6;
    const ey = p.y + ny * len + ty * lean - curl * len * 0.25;
    lashes.push(`M ${p.x.toFixed(1)} ${p.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
  }

  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      className={className}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id="eye-clip">
          <path d="M 50 158 Q 200 30 350 158 Q 200 232 50 158 Z" />
        </clipPath>
      </defs>

      {withBrow && (
        <path
          pathLength={1}
          className="lash-draw"
          d="M 38 92 C 110 18 260 8 372 66"
          stroke={stroke}
          strokeWidth={strokeWidth * 2.4}
          strokeLinecap="round"
          opacity={0.9}
        />
      )}

      <g clipPath="url(#eye-clip)">
        <circle
          pathLength={1}
          className="lash-draw"
          cx="200"
          cy="150"
          r="46"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        <circle cx="200" cy="150" r="17" fill={stroke} opacity={0.9} />
      </g>

      <path
        pathLength={1}
        className="lash-draw"
        d="M 50 158 Q 200 30 350 158"
        stroke={stroke}
        strokeWidth={strokeWidth * 1.25}
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        className="lash-draw"
        d="M 50 158 Q 200 232 350 158"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.75}
      />

      {lashes.map((d, i) => (
        <path
          key={i}
          pathLength={1}
          className="lash-draw"
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
