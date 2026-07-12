"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Monogram from "@/components/visuals/Monogram";

const LETTERS = ["A", "U", "R", "E", "A"];

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const finish = () => {
      window.dispatchEvent(new Event("aurea:ready"));
      window.dispatchEvent(new Event("aurea:unlock"));
      setDone(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    window.dispatchEvent(new Event("aurea:lock"));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(".pre-mono", {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      })
        .to(".pre-letter", {
          y: "0%",
          duration: 1,
          stagger: 0.07,
          ease: "power4.out",
        }, "-=0.7")
        .to(".pre-tag", { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.5")
        .to(".pre-letter", { y: "-115%", duration: 0.7, stagger: 0.045, ease: "power3.in" }, "+=0.5")
        .to(".pre-tag, .pre-mono", { opacity: 0, duration: 0.35 }, "<")
        .to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power4.inOut",
        }, "-=0.15");
    }, overlay);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <Monogram className="pre-mono glow-drop mb-6 h-28 w-28 scale-90 text-rosegold opacity-0 md:h-36 md:w-36" />
      <div className="flex overflow-hidden" translate="no">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="pre-letter display text-foil glow-drop translate-y-[115%] text-[13vw] leading-none tracking-[0.06em] md:text-[7vw]"
          >
            {letter}
          </span>
        ))}
      </div>
      <p
        className="pre-tag mt-4 translate-y-3 font-serif text-[5vw] tracking-[0.55em] text-foil opacity-0 md:text-[2.6vw]"
        translate="no"
      >
        GLOW
      </p>
      <p
        className="pre-tag mt-6 flex translate-y-3 items-center gap-4 text-[11px] font-medium tracking-[0.5em] text-rosegold uppercase opacity-0"
        translate="no"
      >
        <span className="inline-block h-px w-8 bg-rosegold/70" />
        Beauty Studio
        <span className="inline-block h-px w-8 bg-rosegold/70" />
      </p>
    </div>
  );
}
