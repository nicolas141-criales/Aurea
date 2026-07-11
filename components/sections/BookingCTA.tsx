"use client";

import { motion } from "framer-motion";
import { studio } from "@/lib/data";
import { CharsTitle, FadeUp } from "@/components/ui/AnimatedText";
import Magnetic from "@/components/ui/Magnetic";

const MARQUEE = "AUREA — MIAMI ✦ LASHES ✦ BROWS ✦ ";

export default function BookingCTA() {
  return (
    <section id="book" className="relative overflow-hidden bg-charcoal-deep text-ivory">
      {/* marquee ribbon */}
      <div aria-hidden translate="no" className="border-y border-ivory/10 bg-rose py-4 text-charcoal-deep">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((n) => (
            <span key={n} className="eyebrow px-2 tracking-[0.4em]">
              {MARQUEE.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <div className="grain relative flex min-h-[92svh] items-center justify-center overflow-hidden py-32">
        {/* animated gradient atmosphere */}
        <div aria-hidden className="absolute inset-0">
          <div className="animate-drift absolute -left-[20%] top-[10%] h-[75vmax] w-[75vmax] rounded-full bg-[radial-gradient(circle,rgba(207,165,181,0.45)_0%,transparent_60%)]" />
          <div className="animate-drift-slow absolute -bottom-[25%] right-[0%] h-[65vmax] w-[65vmax] rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.4)_0%,transparent_62%)]" />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 [background:conic-gradient(from_0deg,transparent_0deg,rgba(207,165,181,0.5)_80deg,transparent_160deg,rgba(220,169,160,0.4)_260deg,transparent_360deg)] blur-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <FadeUp>
            <p className="eyebrow mb-10 text-rose">Your chair is waiting</p>
          </FadeUp>

          <CharsTitle
            as="h2"
            inView
            stagger={0.03}
            segments={[
              { text: "Ready to " },
              { text: "elevate", italic: true },
              { text: " your look?" },
            ]}
            className="display text-[13vw] text-ivory md:text-[7.5vw]"
          />

          <FadeUp delay={0.35}>
            <p className="mx-auto mt-10 max-w-md text-[15px] leading-relaxed text-ivory/55">
              Appointments open two weeks in advance and hold a waitlist for a reason. Your first
              visit includes a full mapping consultation.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Magnetic strength={0.4}>
                <a href={`mailto:${studio.email}?subject=Appointment%20Request`} className="btn-luxe btn-light px-12 py-5 text-[13px]">
                  Book Your Appointment
                </a>
              </Magnetic>
              <a href={`tel:${studio.phone.replace(/[^\d]/g, "")}`} className="link-line text-sm text-ivory/70">
                or call {studio.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
