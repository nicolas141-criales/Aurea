"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
      tl.to(".pre-letter", {
        y: "0%",
        duration: 1,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.25,
      })
        .to(".pre-line", { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.55")
        .to(".pre-tag", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .to(".pre-letter", { y: "-115%", duration: 0.7, stagger: 0.045, ease: "power3.in" }, "+=0.45")
        .to(".pre-tag, .pre-line", { opacity: 0, duration: 0.35 }, "<")
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
      <div className="flex overflow-hidden" translate="no">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="pre-letter display translate-y-[115%] text-[16vw] leading-none text-charcoal md:text-[9vw]"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="pre-line mt-6 h-px w-40 origin-left scale-x-0 bg-rosegold md:w-56" />
      <p className="pre-tag eyebrow mt-5 translate-y-3 text-charcoal/60 opacity-0">
        Lash &amp; Brow Atelier — Miami
      </p>
    </div>
  );
}
