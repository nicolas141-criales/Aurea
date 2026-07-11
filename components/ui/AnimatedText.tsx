"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export type Segment = { text: string; italic?: boolean; foil?: boolean };

const charVariants: Variants = {
  hidden: { y: "115%", rotate: 6, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] },
  },
};

const wordVariants: Variants = {
  hidden: { y: "40%", opacity: 0, filter: "blur(10px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
  },
};

type CharsTitleProps = {
  segments: Segment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  play?: boolean;
  inView?: boolean;
  stagger?: number;
  delay?: number;
};

/**
 * Splits segments into words and characters at render time (SSR-safe, no layout
 * shift) and reveals each character from behind an overflow mask.
 */
export function CharsTitle({
  segments,
  className,
  as = "h2",
  play,
  inView = false,
  stagger = 0.022,
  delay = 0,
}: CharsTitleProps) {
  const reduced = useReducedMotion();
  const Tag = as;
  const label = segments.map((s) => s.text).join("");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };

  const viewProps = inView
    ? { whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } }
    : { animate: play || reduced ? ("visible" as const) : ("hidden" as const) };

  let charIndex = 0;
  return (
    // translate="no": machine translators garble per-character spans. The
    // semantic tag stays a plain element — motion components swallow the
    // `translate` attribute on SSR and cause hydration mismatches.
    <Tag className={className} aria-label={label} translate="no">
      <motion.span className="block" variants={container} initial="hidden" {...viewProps}>
      {segments.map((seg, si) =>
        seg.text.split(" ").map((word, wi) => {
          if (!word) return null;
          return (
            <span
              key={`${si}-${wi}`}
              aria-hidden
              className={`inline-block whitespace-nowrap ${seg.italic ? "serif-italic" : ""} ${
                seg.foil ? "glow-drop" : ""
              }`}
            >
              {word.split("").map((char) => (
                <span key={charIndex++} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    variants={reduced ? undefined : charVariants}
                    className={`inline-block will-change-transform ${seg.foil ? "text-foil" : ""}`}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          );
        })
      )}
      </motion.span>
    </Tag>
  );
}

type WordsRevealProps = {
  text: string;
  className?: string;
  as?: "p" | "h3" | "span";
  delay?: number;
  stagger?: number;
};

/** Word-by-word reveal with a soft blur slide, triggered when scrolled into view. */
export function WordsReveal({
  text,
  className,
  as = "p",
  delay = 0,
  stagger = 0.03,
}: WordsRevealProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };

  return (
    <Tag className={className} aria-label={text} translate="no">
      <motion.span
        className="block"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            aria-hidden
            variants={reduced ? undefined : wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Generic soft entrance: rise + blur out, for blocks and UI elements. */
export function FadeUp({ children, className, delay = 0, y = 48, once = true }: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
