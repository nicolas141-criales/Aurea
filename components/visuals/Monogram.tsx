/**
 * The AUREA GLOW mark: an A and G interlaced inside a circle that opens at the
 * top-right, where the brand sparkle sits. Drawn to match the foil logo.
 */

type Props = {
  className?: string;
  strokeWidth?: number;
  sparkle?: boolean;
};

export default function Monogram({ className, strokeWidth = 3, sparkle = true }: Props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {/* circle, broken where the sparkle lives */}
      <path
        d="M 70 20 A 36 36 0 1 0 84 40"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* A — crossbar-less */}
      <path
        d="M 33 76 L 50 26 L 63 62"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* G bar and hook */}
      <path
        d="M 61 46 H 83 V 57 C 83 65 77 71 69 71"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {sparkle && (
        <path
          d="M 82 6 C 83.2 12.5 86.5 15.8 93 17 C 86.5 18.2 83.2 21.5 82 28 C 80.8 21.5 77.5 18.2 71 17 C 77.5 15.8 80.8 12.5 82 6 Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}
