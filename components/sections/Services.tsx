"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { CharsTitle, FadeUp } from "@/components/ui/AnimatedText";
import EditorialVisual, { PHOTO_POOL } from "@/components/visuals/EditorialVisual";

const photoFor = (i: number) => PHOTO_POOL[i % PHOTO_POOL.length];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;

    const mm = gsap.matchMedia();
    mm.add(
      { fine: "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      () => {
        const xTo = gsap.quickTo(preview, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3.out" });
        const rTo = gsap.quickTo(preview, "rotate", { duration: 1, ease: "power3.out" });

        let lastX = 0;
        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
          rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.35));
          lastX = e.clientX;
        };
        section.addEventListener("mousemove", onMove, { passive: true });
        return () => section.removeEventListener("mousemove", onMove);
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-charcoal-deep py-28 text-ivory md:py-40"
    >
      {/* hovering preview card (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 z-20 hidden h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-t-full transition-opacity duration-500 lg:block ${
          active !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        {services.map((service, i) => (
          <div
            key={service.index}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <EditorialVisual
              variant={service.palette}
              photo={photoFor(i)}
              photoAlt={service.name}
              sizes="260px"
              className="h-full w-full"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-8 md:mb-28">
          <div>
            <FadeUp>
              <p className="eyebrow mb-8 flex items-center gap-4 text-rose">
                <span className="inline-block h-px w-12 bg-rosegold" />
                02 — Signature Services
              </p>
            </FadeUp>
            <CharsTitle
              as="h2"
              inView
              segments={[{ text: "The " }, { text: "menu", italic: true }]}
              className="display text-[16vw] text-ivory md:text-[9vw]"
            />
          </div>
          <FadeUp delay={0.2} className="max-w-xs pb-4">
            <p className="text-sm leading-relaxed text-ivory/50">
              Eight signatures, infinitely personal. Every appointment begins with a mapping
              consultation — the menu is only the starting point.
            </p>
          </FadeUp>
        </div>

        {/* editorial list — desktop */}
        <ul className="hidden lg:block" onMouseLeave={() => setActive(null)}>
          {services.map((service, i) => (
            <motion.li
              key={service.index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
              className="group relative border-t border-ivory/10 last:border-b"
              onMouseEnter={() => setActive(i)}
            >
              <a href="#book" className="relative z-10 grid grid-cols-12 items-center gap-6 py-9">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-rose/10 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100"
                />
                <span className="col-span-1 font-serif text-lg text-rose/70 transition-colors duration-500 group-hover:text-rose">
                  {service.index}
                </span>
                <span className="col-span-5">
                  <span className="display block text-5xl text-ivory transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-6 xl:text-6xl">
                    {service.name}
                  </span>
                </span>
                <span className="col-span-4 max-w-sm text-sm leading-relaxed text-ivory/0 transition-all duration-500 group-hover:text-ivory/60">
                  {service.description}
                </span>
                <span className="col-span-2 flex items-center justify-end gap-6 text-right">
                  <span>
                    <span className="block text-sm text-ivory/80">{service.price}</span>
                    <span className="mt-1 block text-[11px] tracking-[0.16em] text-ivory/40 uppercase">
                      {service.duration}
                    </span>
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-rose group-hover:bg-rose group-hover:text-charcoal-deep">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* horizontal snap cards — mobile / tablet */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((service, i) => (
            <motion.a
              key={service.index}
              href="#book"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="w-[76vw] max-w-[340px] shrink-0 snap-center"
            >
              <EditorialVisual
                variant={service.palette}
                photo={photoFor(i)}
                photoAlt={service.name}
                sizes="340px"
                className="aspect-[4/5] w-full rounded-t-full"
              >
                <span className="absolute left-5 top-8 z-10 font-serif text-base text-charcoal/60">
                  {service.index}
                </span>
              </EditorialVisual>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="display text-3xl text-ivory">{service.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory/50">{service.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm text-ivory/80">{service.price}</p>
                  <p className="mt-1 text-[10px] tracking-[0.16em] text-ivory/40 uppercase">
                    {service.duration}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
