/** Four-point brand sparkle — pair with .animate-twinkle and .glow-drop. */

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Sparkle({ className, style }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden>
      <path d="M12 1 C13.1 7 16.9 10.9 23 12 C16.9 13.1 13.1 17 12 23 C10.9 17 7.1 13.1 1 12 C7.1 10.9 10.9 7 12 1 Z" />
    </svg>
  );
}
