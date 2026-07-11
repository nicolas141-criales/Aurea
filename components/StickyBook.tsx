"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Mobile-only booking pill that appears once the hero is scrolled past. */
export default function StickyBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const book = document.getElementById("book");
    if (!hero) return;

    let pastHero = false;
    let onBook = false;
    const update = () => setVisible(pastHero && !onBook);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );
    heroObserver.observe(hero);

    const bookObserver = book
      ? new IntersectionObserver(
          ([entry]) => {
            onBook = entry.isIntersecting;
            update();
          },
          { threshold: 0.2 }
        )
      : null;
    if (book && bookObserver) bookObserver.observe(book);

    return () => {
      heroObserver.disconnect();
      bookObserver?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-5 bottom-5 z-[105] md:hidden"
        >
          <a
            href="#book"
            className="glass flex w-full items-center justify-center gap-3 rounded-full py-4 text-[12px] font-semibold tracking-[0.2em] text-charcoal uppercase"
          >
            <span className="h-2 w-2 rounded-full bg-rose-deep" />
            Book Appointment
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
