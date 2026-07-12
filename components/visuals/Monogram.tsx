/**
 * The AUREA GLOW mark, traced from the brand logo: a tall crossbar-less A
 * interlaced with a G whose bowl is a near-full circle open at the top-right.
 * The A's crossbar extends past the bowl to become the G's bar, hooking down
 * into the throat; a calligraphic spur flicks off the bowl at the lower left,
 * and the brand sparkle floats in the opening.
 */

type Props = {
  className?: string;
  strokeWidth?: number;
  sparkle?: boolean;
};

export default function Monogram({ className, strokeWidth = 2.6, sparkle = true }: Props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {/* G bowl — open only at the top right, where the sparkle floats */}
      <path
        d="M 63 20.5 A 35 35 0 1 0 82.7 47.6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* calligraphic entry spur, lower left */}
      <path
        d="M 36.5 84 C 35 87.5, 34.2 90.5, 33.8 94"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* A — tall, apex near the bowl's top */}
      <path
        d="M 30 81 L 50 18.5 L 67.5 80"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* crossbar extending into the G bar, hooking down into the throat */}
      <path
        d="M 40 49 L 86.5 49 C 86.5 58, 82 66, 71.5 71"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {sparkle && (
        <path
          d="M 77 1 C 78 8.2, 81.4 11.6, 88.5 12.6 C 81.4 13.6, 78 17, 77 24.2 C 76 17, 72.6 13.6, 65.5 12.6 C 72.6 11.6, 76 8.2, 77 1 Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}
