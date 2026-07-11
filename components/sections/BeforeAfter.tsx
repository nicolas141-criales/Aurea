"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveHorizontal } from "lucide-react";
import { CharsTitle, FadeUp } from "@/components/ui/AnimatedText";
import EyeLineArt from "@/components/visuals/EyeLineArt";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const xTo = gsap.quickTo(stage, "--x", { duration: reduced ? 0 : 0.6, ease: "power3.out" });

    let dragging = false;
    const setFromClient = (clientX: number) => {
      const rect = stage.getBoundingClientRect();
      xTo(gsap.utils.clamp(4, 96, ((clientX - rect.left) / rect.width) * 100));
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      setFromClient(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) setFromClient(e.clientX);
    };
    const onUp = () => {
      dragging = false;
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    // keyboard access on the handle
    const handle = stage.querySelector<HTMLElement>(".ba-handle");
    const onKey = (e: KeyboardEvent) => {
      const current = parseFloat(getComputedStyle(stage).getPropertyValue("--x")) || 50;
      if (e.key === "ArrowLeft") xTo(Math.max(4, current - 6));
      if (e.key === "ArrowRight") xTo(Math.min(96, current + 6));
    };
    handle?.addEventListener("keydown", onKey);

    const ctx = gsap.context(() => {
      if (reduced) return;
      // reveal sweep: full "after", then settle at center
      gsap.fromTo(
        stage,
        { "--x": 96 },
        {
          "--x": 50,
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: stage, start: "top 70%", once: true },
        }
      );
      // lashes draw themselves in
      gsap.fromTo(
        stage.querySelectorAll(".lash-draw"),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          stagger: 0.02,
          ease: "power2.inOut",
          scrollTrigger: { trigger: stage, start: "top 75%", once: true },
        }
      );
    }, stage);

    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      handle?.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, []);

  return (
    <section id="results" className="relative overflow-hidden bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 max-w-3xl md:mb-24">
          <FadeUp>
            <p className="eyebrow mb-8 flex items-center gap-4 text-rose-deep">
              <span className="inline-block h-px w-12 bg-rosegold" />
              04 — Results
            </p>
          </FadeUp>
          <CharsTitle
            as="h2"
            inView
            segments={[
              { text: "Same eyes. " },
              { text: "Different story", italic: true },
              { text: "." },
            ]}
            className="display text-[11vw] text-charcoal md:text-[6vw]"
          />
        </div>

        <FadeUp y={80}>
          <div
            ref={stageRef}
            data-cursor="drag"
            role="slider"
            aria-label="Before and after comparison — drag to reveal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            className="relative mx-auto aspect-[16/10] max-w-5xl touch-pan-y overflow-hidden rounded-[2rem] shadow-luxe select-none md:aspect-[16/8]"
            style={{ "--x": 50 } as React.CSSProperties}
          >
            {/* before */}
            <div className="grain absolute inset-0 bg-[linear-gradient(165deg,#f8f5f3_0%,#efe6e1_100%)]">
              <div className="flex h-full items-center justify-center p-10 md:p-16">
                <EyeLineArt lashCount={9} lashLength={22} curl={0.12} strokeWidth={1.7} className="h-full max-h-[340px] w-auto opacity-80" />
              </div>
              <span className="eyebrow absolute left-6 top-6 text-charcoal/45 md:left-10 md:top-10">
                Before
              </span>
            </div>

            {/* after — clipped by the handle position */}
            <div
              className="grain absolute inset-0 bg-[linear-gradient(160deg,#e7d0da_0%,#cfa5b5_60%,#b98ca6_100%)]"
              style={{ clipPath: "inset(0 0 0 calc(var(--x) * 1%))" }}
            >
              <div className="flex h-full items-center justify-center p-10 md:p-16">
                <EyeLineArt lashCount={17} lashLength={46} curl={0.42} strokeWidth={2.1} className="h-full max-h-[340px] w-auto" />
              </div>
              <span className="eyebrow absolute right-6 top-6 text-charcoal/70 md:right-10 md:top-10">
                After — Volume Set
              </span>
            </div>

            {/* handle */}
            <div
              className="absolute inset-y-0 z-10"
              style={{ left: "calc(var(--x) * 1%)" }}
              aria-hidden
            >
              <div className="absolute inset-y-0 -translate-x-1/2 border-l border-dashed border-charcoal/40" />
              <button
                type="button"
                tabIndex={0}
                aria-label="Drag to compare before and after"
                className="ba-handle absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-cream/80 text-charcoal shadow-luxe backdrop-blur-md"
              >
                <MoveHorizontal size={18} />
              </button>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-center text-[13px] leading-relaxed text-charcoal/50">
            Illustrative rendering of a volume transformation. Drag the handle — your results are
            designed in person, never from a chart.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
