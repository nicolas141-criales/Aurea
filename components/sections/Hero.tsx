"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { CharsTitle } from "@/components/ui/AnimatedText";
import EditorialVisual from "@/components/visuals/EditorialVisual";

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = [
  { left: "8%", top: "22%", size: 5, depth: 3, delay: 0 },
  { left: "16%", top: "68%", size: 3, depth: 5, delay: 1.2 },
  { left: "28%", top: "34%", size: 4, depth: 2, delay: 2.1 },
  { left: "42%", top: "80%", size: 6, depth: 4, delay: 0.6 },
  { left: "55%", top: "18%", size: 3, depth: 6, delay: 1.8 },
  { left: "66%", top: "62%", size: 5, depth: 3, delay: 0.3 },
  { left: "78%", top: "30%", size: 4, depth: 5, delay: 2.6 },
  { left: "88%", top: "74%", size: 3, depth: 2, delay: 1.5 },
  { left: "72%", top: "88%", size: 4, depth: 4, delay: 0.9 },
  { left: "35%", top: "12%", size: 3, depth: 6, delay: 2.2 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener("aurea:ready", onReady);
    const fallback = setTimeout(onReady, 5000);
    return () => {
      window.removeEventListener("aurea:ready", onReady);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      { fine: "(pointer: fine) and (prefers-reduced-motion: no-preference)" },
      () => {
        // one quickTo pair per depth layer — mouse parallax
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", section);
        const movers = layers.map((el) => {
          const depth = parseFloat(el.dataset.depth ?? "1");
          return {
            x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
            depth,
          };
        });
        const light = section.querySelector<HTMLElement>(".hero-light");
        const lightX = light && gsap.quickTo(light, "x", { duration: 1.6, ease: "power3.out" });
        const lightY = light && gsap.quickTo(light, "y", { duration: 1.6, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.depth * 14);
            m.y(ny * m.depth * 14);
          });
          lightX?.(e.clientX - window.innerWidth / 2);
          lightY?.(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    );

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, () => {
      // scroll parallax: content drifts up, arch scales, ambience fades
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-arch-wrap", {
        yPercent: 12,
        scale: 1.07,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream"
      aria-label="AUREA — luxury lash and brow atelier in Miami"
    >
      {/* ambient gradient field */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-drift absolute -left-[15%] -top-[25%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,#e7d0da_0%,transparent_65%)]" />
        <div className="animate-drift-slow absolute -bottom-[30%] -right-[10%] h-[65vmax] w-[65vmax] rounded-full bg-[radial-gradient(circle,#dca9a0_0%,transparent_62%)] opacity-70" />
        <div className="hero-light absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,transparent_60%)] mix-blend-soft-light" />
      </div>

      {/* floating particles */}
      <div aria-hidden className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            data-depth={p.depth}
            className="absolute rounded-full bg-rosegold/50"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `float-y ${6 + p.depth}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* arch composition — the brand motif */}
      <div
        aria-hidden
        className="hero-arch-wrap pointer-events-none absolute bottom-0 right-[4%] hidden h-[78vh] w-[30vw] max-w-[460px] lg:block"
      >
        <div
          data-depth="2.5"
          className="absolute -left-10 top-10 h-full w-full rounded-t-full border border-rose/50"
        />
        <div data-depth="1.5" className="absolute inset-0">
          <EditorialVisual variant={0} arch arcs className="h-full w-full shadow-luxe" />
        </div>
        <div
          data-depth="4"
          translate="no"
          className="glass absolute -left-16 bottom-[18%] flex items-center gap-3 rounded-full py-3 pl-3 pr-6"
        >
          <span className="pulse-ring relative flex h-9 w-9 items-center justify-center rounded-full bg-rose text-[10px] font-bold tracking-widest text-cream">
            MIA
          </span>
          <span className="text-[11px] font-medium tracking-[0.14em] text-charcoal/70 uppercase">
            Brickell · By appointment
          </span>
        </div>
      </div>

      {/* copy */}
      <div className="hero-copy relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 pt-36 md:px-12 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="eyebrow mb-8 flex items-center gap-4 text-charcoal/60"
        >
          <span className="inline-block h-px w-12 bg-rosegold" />
          Lash &amp; Brow Atelier — Miami
        </motion.p>

        <div data-depth="0.6">
          <CharsTitle
            as="h1"
            play={ready}
            delay={0.25}
            segments={[
              { text: "Lashes that " },
              { text: "speak", italic: true },
              { text: " before you do." },
            ]}
            className="display max-w-[12ch] text-[13vw] text-charcoal md:text-[8.5vw]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 1.15, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 max-w-md text-[15px] leading-relaxed text-charcoal/65 md:text-base"
        >
          A private atelier in Brickell. Bespoke artistry, one client at a time — and the quiet
          luxury of waking up ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.35, ease: [0.19, 1, 0.22, 1] }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <a href="#book" className="btn-luxe btn-dark px-9 py-4">
              Book Appointment
            </a>
          </Magnetic>
          <a href="#studio" className="link-line text-[13px] font-medium tracking-[0.08em] text-charcoal/70">
            Discover the studio
          </a>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#studio"
        aria-label="Scroll to the studio section"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-6 z-10 flex items-center gap-3 text-charcoal/50 md:left-12"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20">
          <ArrowDown size={14} className="animate-bounce" />
        </span>
        <span translate="no" className="eyebrow hidden sm:block">Scroll</span>
      </motion.a>
    </section>
  );
}
