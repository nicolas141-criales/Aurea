"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

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
      tl.to(".pre-logo", {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: "power3.out",
        delay: 0.25,
      })
        .to(".pre-logo", { opacity: 0, scale: 1.04, duration: 0.5, ease: "power2.in" }, "+=0.9")
        .to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power4.inOut",
        }, "-=0.1");
    }, overlay);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <Image
        src="/brand/aurea-glow-logo.png"
        alt=""
        width={687}
        height={800}
        priority
        sizes="(max-width: 768px) 62vw, 380px"
        className="pre-logo glow-drop w-[62vw] max-w-[320px] scale-[0.92] opacity-0 md:max-w-[380px]"
      />
    </div>
  );
}
