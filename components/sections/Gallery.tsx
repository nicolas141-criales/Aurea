"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtSign } from "lucide-react";
import { studio } from "@/lib/data";
import { CharsTitle, FadeUp } from "@/components/ui/AnimatedText";
import EditorialVisual, { PHOTO_POOL } from "@/components/visuals/EditorialVisual";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  variant: number;
  ratio: string;
  arch?: boolean;
  letter?: string;
  caption: string;
};

/* hand-distributed columns — masonry that stays deliberate, not random */
const columns: Item[][] = [
  [
    { variant: 1, ratio: "aspect-[3/4]", caption: "Soft volume, set 214" },
    { variant: 4, ratio: "aspect-square", arch: true, caption: "Rose gold hour" },
    { variant: 6, ratio: "aspect-[3/4.4]", caption: "Brow architecture" },
  ],
  [
    { variant: 2, ratio: "aspect-[3/4.6]", letter: "a", caption: "Mauve studies" },
    { variant: 7, ratio: "aspect-square", caption: "Signature volume, in studio" },
    { variant: 0, ratio: "aspect-[3/4]", arch: true, caption: "The studio arch" },
  ],
  [
    { variant: 5, ratio: "aspect-square", caption: "Powder & silk" },
    { variant: 3, ratio: "aspect-[3/4.5]", caption: "After dark, Brickell" },
    { variant: 4, ratio: "aspect-[4/3.2]", caption: "Detail, lash map" },
  ],
];

/** Deterministic photo per grid position — same on server and client render.
 * `ci * 3` would cancel out under mod 3 (always divisible), so every row would
 * repeat one photo across all columns; `ci + ii` staggers it diagonally instead. */
const photoFor = (ci: number, ii: number) => PHOTO_POOL[(ci + ii) % PHOTO_POOL.length];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)" }, () => {
      // columns scroll at different speeds — the editorial drift
      const speeds = [-6, -16, -10];
      gsap.utils.toArray<HTMLElement>(".gallery-col", section).forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: -speeds[i] },
          {
            yPercent: speeds[i],
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journal" className="relative overflow-hidden bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <div>
            <FadeUp>
              <p className="eyebrow mb-8 flex items-center gap-4 text-rose-deep">
                <span className="inline-block h-px w-12 bg-rosegold" />
                06 — The Journal
              </p>
            </FadeUp>
            <CharsTitle
              as="h2"
              inView
              segments={[{ text: "Studio " }, { text: "diaries", italic: true }]}
              className="display text-[13vw] text-charcoal md:text-[7vw]"
            />
          </div>
          <FadeUp delay={0.2} className="pb-3">
            <Magnetic strength={0.25}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxe btn-ghost px-7 py-3.5"
              >
                <AtSign size={14} />
                {studio.instagram}
              </a>
            </Magnetic>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {columns.map((column, ci) => (
            <div key={ci} className={`gallery-col flex flex-col gap-4 md:gap-6 ${ci === 1 ? "md:pt-16" : ""} ${ci === 2 ? "hidden md:flex md:pt-8" : ""}`}>
              {column.map((item, ii) => (
                <FadeUp key={ii} delay={ii * 0.08} y={60}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    aria-label={`${item.caption} — view on Instagram`}
                    className="group block"
                  >
                    <div className={`overflow-hidden ${item.arch ? "rounded-t-full" : "rounded-xl"}`}>
                      <div className="relative transition-transform duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]">
                        <EditorialVisual
                          variant={item.variant}
                          arch={item.arch}
                          letter={item.letter}
                          photo={photoFor(ci, ii)}
                          photoAlt={item.caption}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className={`w-full ${item.ratio}`}
                        />
                        <span className="absolute inset-0 z-10 flex items-end bg-charcoal-deep/0 p-5 transition-colors duration-500 group-hover:bg-charcoal-deep/25">
                          <span className="translate-y-3 text-[11px] font-medium tracking-[0.2em] text-cream uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            {item.caption}
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
