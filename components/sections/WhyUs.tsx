"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { benefits } from "@/lib/data";
import { FadeUp } from "@/components/ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

/* one thin-line illustration per benefit — drawn in as each panel arrives */
function BenefitGlyph({ index }: { index: number }) {
  const paths = [
    // steady hand — a single confident stroke
    "M 20 80 C 60 20, 120 140, 160 60 S 240 40, 280 70",
    // droplet / product
    "M 150 20 C 150 20, 90 100, 90 140 A 60 60 0 0 0 210 140 C 210 100, 150 20, 150 20 Z",
    // face profile line
    "M 190 20 C 150 30, 140 60, 148 82 C 152 94, 140 100, 136 108 C 132 116, 146 118, 146 126 C 146 140, 130 148, 146 160 C 158 169, 180 162, 190 176",
    // infinity / lasting
    "M 60 100 C 60 60, 130 60, 150 100 C 170 140, 240 140, 240 100 C 240 60, 170 60, 150 100 C 130 140, 60 140, 60 100 Z",
    // miami sun over water
    "M 70 110 A 80 80 0 0 1 230 110 M 40 140 Q 70 128 100 140 T 160 140 T 220 140 T 280 140",
  ];
  return (
    <svg viewBox="0 0 300 200" fill="none" className="h-28 w-44 md:h-36 md:w-56" aria-hidden>
      <path
        pathLength={1}
        className="glyph-draw"
        d={paths[index % paths.length]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // each glyph draws itself as its panel enters the viewport
        gsap.utils.toArray<HTMLElement>(".why-panel", track).forEach((panel) => {
          gsap.fromTo(
            panel.querySelectorAll(".glyph-draw"),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 75%",
                once: true,
              },
            }
          );
          gsap.fromTo(
            panel.querySelectorAll(".why-reveal"),
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 70%",
                once: true,
              },
            }
          );
        });
      }
    );

    mm.add({ mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)" }, () => {
      gsap.utils.toArray<HTMLElement>(".why-panel", track).forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll(".glyph-draw"),
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: panel, start: "top 75%", once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ivory">
      <div ref={trackRef} className="flex flex-col lg:h-screen lg:w-max lg:flex-row lg:items-stretch">
        {/* leading panel */}
        <div className="flex flex-col justify-center px-6 pb-6 pt-28 md:px-12 lg:h-full lg:w-[42vw] lg:shrink-0 lg:py-0">
          <FadeUp>
            <p className="eyebrow mb-8 flex items-center gap-4 text-rose-deep">
              <span className="inline-block h-px w-12 bg-rosegold" />
              03 — The AUREA Standard
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="display text-[15vw] leading-[0.95] text-charcoal lg:text-[6.5vw]">
              Why women
              <br />
              <em>trust</em> us
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-10 hidden max-w-xs text-sm leading-relaxed text-charcoal/55 lg:block">
              Keep scrolling — five reasons, no icons, no clichés.
            </p>
          </FadeUp>
        </div>

        {/* benefit panels */}
        {benefits.map((benefit, i) => (
          <article
            key={benefit.index}
            className={`why-panel flex flex-col justify-center px-6 py-14 md:px-12 lg:h-full lg:w-[38vw] lg:shrink-0 lg:border-l lg:border-charcoal/8 lg:px-16 ${
              i % 2 === 1 ? "lg:bg-rose-mist/60" : ""
            }`}
          >
            <span className="why-reveal text-outline display block text-[20vw] leading-none lg:text-[9vw]">
              {benefit.index}
            </span>
            <div className="why-reveal mt-6 text-rose-deep">
              <BenefitGlyph index={i} />
            </div>
            <h3 className="why-reveal display mt-8 max-w-[14ch] text-4xl text-charcoal md:text-5xl">
              {benefit.title}
            </h3>
            <p className="why-reveal mt-6 max-w-sm text-[15px] leading-relaxed text-charcoal/60">
              {benefit.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
