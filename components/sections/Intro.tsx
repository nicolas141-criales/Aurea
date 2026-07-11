"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharsTitle, WordsReveal, FadeUp } from "@/components/ui/AnimatedText";
import EditorialVisual from "@/components/visuals/EditorialVisual";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "7+", label: "Years of artistry" },
  { value: "3,000+", label: "Sets designed" },
  { value: "1", label: "Client at a time" },
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, () => {
      // image de-zooms inside its mask while scrolling — editorial reveal
      gsap.fromTo(
        ".intro-visual-inner",
        { scale: 1.28, yPercent: -6 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".intro-visual", start: "top 90%", end: "bottom 40%", scrub: 0.8 },
        }
      );
      gsap.fromTo(
        ".intro-visual",
        { clipPath: "inset(12% 8% 12% 8% round 240px 240px 0 0)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 240px 240px 0 0)",
          ease: "none",
          scrollTrigger: { trigger: ".intro-visual", start: "top 85%", end: "top 30%", scrub: 0.8 },
        }
      );
      // oversized watermark drifts against scroll
      gsap.to(".intro-watermark", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="studio" className="relative overflow-hidden bg-ivory py-28 md:py-44">
      <span
        aria-hidden
        className="intro-watermark display pointer-events-none absolute -top-[0.14em] left-[38%] select-none whitespace-nowrap text-[24vw] leading-none text-rose/20"
      >
        The Studio
      </span>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-12 lg:gap-10">
        {/* visual */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="intro-visual relative aspect-[3/4] max-w-[520px] overflow-hidden">
            <div className="intro-visual-inner h-full w-full will-change-transform">
              <EditorialVisual variant={2} letter="a" arcs className="h-full w-full" />
            </div>
          </div>
          <FadeUp delay={0.2} className="mt-6 max-w-[520px]">
            <p className="flex items-baseline justify-between text-[11px] tracking-[0.2em] text-charcoal/50 uppercase">
              <span>The atelier, Brickell</span>
              <span className="serif-italic font-serif text-sm normal-case tracking-normal text-rose-deep">
                fig. 01
              </span>
            </p>
          </FadeUp>
        </div>

        {/* copy */}
        <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-6 lg:col-start-7">
          <FadeUp>
            <p className="eyebrow mb-8 flex items-center gap-4 text-rose-deep">
              <span className="inline-block h-px w-12 bg-rosegold" />
              01 — The Studio
            </p>
          </FadeUp>

          <CharsTitle
            as="h2"
            inView
            segments={[
              { text: "Beauty, " },
              { text: "considered", italic: true },
              { text: "." },
            ]}
            className="display text-[13vw] text-charcoal md:text-[6.5vw] lg:text-[5.2vw]"
          />

          <WordsReveal
            delay={0.3}
            text="AUREA is a private lash and brow atelier where precision meets softness. Every set is mapped to the architecture of your face — nothing extra, everything considered."
            className="mt-10 max-w-xl font-serif text-2xl leading-snug text-charcoal/80 md:text-[1.7rem]"
          />

          <FadeUp delay={0.45}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-charcoal/60">
              No rush, no noise, no fluorescent lights. One suite, one artist, one look designed
              entirely around you — the way luxury was always meant to feel.
            </p>
          </FadeUp>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.15 * i}>
                <p className="display text-4xl text-charcoal md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-[11px] tracking-[0.16em] text-charcoal/50 uppercase">
                  {stat.label}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
