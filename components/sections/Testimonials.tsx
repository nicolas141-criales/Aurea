"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { CharsTitle, FadeUp } from "@/components/ui/AnimatedText";

/* scattered editorial placement — desktop only; stacks on mobile */
const placements = [
  "lg:absolute lg:left-[2%] lg:top-[6%] lg:w-[340px] lg:rotate-[-2deg]",
  "lg:absolute lg:right-[6%] lg:top-[0%] lg:w-[360px] lg:rotate-[1.5deg]",
  "lg:absolute lg:left-[30%] lg:top-[34%] lg:w-[380px] lg:rotate-[0.5deg]",
  "lg:absolute lg:left-[4%] lg:top-[64%] lg:w-[350px] lg:rotate-[1deg]",
  "lg:absolute lg:right-[3%] lg:top-[58%] lg:w-[340px] lg:rotate-[-1.5deg]",
];

const avatarTints = [
  "linear-gradient(135deg,#ce9584,#b0755f)",
  "linear-gradient(135deg,#e3bc9c,#c98f72)",
  "linear-gradient(135deg,#ebd2c4,#ce9584)",
  "linear-gradient(135deg,#c49076,#96684f)",
  "linear-gradient(135deg,#f0dbc8,#e3bc9c)",
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Star size={13} className="fill-rosegold text-rosegold" />
        </motion.span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-ivory py-28 md:py-40">
      {/* soft ambient blooms behind the glass */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-drift absolute left-[10%] top-[20%] h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,#ebd2c4_0%,transparent_65%)] opacity-80" />
        <div className="animate-drift-slow absolute bottom-[5%] right-[5%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,#e3bc9c_0%,transparent_60%)] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 text-center md:mb-24">
          <FadeUp>
            <p className="eyebrow mb-8 flex items-center justify-center gap-4 text-rose-deep">
              <span className="inline-block h-px w-12 bg-rosegold" />
              05 — In Their Words
              <span className="inline-block h-px w-12 bg-rosegold" />
            </p>
          </FadeUp>
          <CharsTitle
            as="h2"
            inView
            segments={[{ text: "Loved by " }, { text: "Miami", italic: true }]}
            className="display text-[13vw] text-charcoal md:text-[7vw]"
          />
        </div>

        <div
          ref={containerRef}
          className="relative flex flex-col gap-6 lg:block lg:h-[880px] xl:h-[820px]"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduced ? false : { opacity: 0, y: 70, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, delay: (i % 3) * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className={`glass mx-auto w-full max-w-[400px] rounded-[2rem] p-7 md:p-8 ${placements[i]}`}
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 6.5 + i * 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
              >
                <Stars />
                <blockquote className="mt-5 font-serif text-xl leading-snug text-charcoal/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <motion.span
                    className="relative flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold tracking-wider text-cream"
                    style={{ background: avatarTints[i] }}
                    whileInView={reduced ? undefined : { scale: [0.6, 1.08, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <span translate="no">{t.initials}</span>
                  </motion.span>
                  <span>
                    <span className="block text-sm font-semibold text-charcoal">{t.name}</span>
                    <span className="mt-0.5 block text-[11px] tracking-[0.18em] text-charcoal/45 uppercase">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </motion.div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
