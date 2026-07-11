"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    return () => document.body.classList.remove("has-cursor");
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']"
      );
      const mode = target?.dataset.cursor ?? (target ? "hover" : null);
      if (mode === "drag" || mode === "view") {
        gsap.to(ring, {
          scale: 2.6,
          backgroundColor: "rgba(207,165,181,0.92)",
          borderColor: "transparent",
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
        if (label) {
          label.textContent = mode === "drag" ? "Drag" : "View";
          gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.1 });
        }
      } else if (mode === "hover") {
        gsap.to(ring, {
          scale: 1.7,
          backgroundColor: "rgba(207,165,181,0.18)",
          borderColor: "rgba(207,165,181,0.9)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(207,165,181,0)",
          borderColor: "rgba(42,36,38,0.35)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/35"
      >
        <span
          ref={labelRef}
          translate="no"
          className="text-[9px] font-semibold uppercase tracking-[0.18em] text-charcoal opacity-0"
        >
          Drag
        </span>
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-charcoal" />
    </div>
  );
}
