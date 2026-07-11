"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import Monogram from "@/components/visuals/Monogram";

const links = [
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "aurea:lock" : "aurea:unlock"));
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed inset-x-0 top-0 z-[110] transition-[background,box-shadow,backdrop-filter] duration-500 ${
          scrolled && !open
            ? "bg-cream/70 shadow-[0_1px_0_rgba(42,36,38,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" translate="no" className="flex items-center gap-3" aria-label="AUREA GLOW home">
            <Monogram className="h-10 w-10 text-rosegold" strokeWidth={4} />
            <span className="flex flex-col leading-none">
              <span className="display text-xl tracking-[0.14em] text-charcoal">AUREA</span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.5em] text-gold uppercase">
                Glow
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-line text-[13px] font-medium tracking-[0.08em] text-charcoal/80">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <a href="#book" className="btn-luxe btn-dark px-7 py-3">
                Book Appointment
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-[130] flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`h-px w-7 bg-charcoal transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-7 bg-charcoal transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[120] flex flex-col justify-between bg-ivory px-6 pb-10 pt-28"
          >
            <ul className="flex flex-col gap-2">
              {[...links, { label: "Book", href: "#book" }].map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: [0.19, 1, 0.22, 1] }}
                    className="display block text-[13vw] leading-[1.05] text-charcoal"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-end justify-between"
            >
              <p className="eyebrow text-charcoal/50">Brickell — Miami</p>
              <p className="serif-italic font-serif text-xl text-rose-deep">@aurea.miami</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
