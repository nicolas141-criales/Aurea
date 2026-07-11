"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { studio } from "@/lib/data";
import { FadeUp } from "@/components/ui/AnimatedText";

/* minimal hand-drawn brand marks — lucide dropped its brand icons */
const InstagramMark = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookMark = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M14.5 21v-7h2.8l0.5-3.4h-3.3V8.4c0-1 0.5-1.9 2-1.9h1.5V3.5c0 0-1.3-0.2-2.6-0.2-2.7 0-4.4 1.6-4.4 4.6v2.7H8v3.4h3v7" />
  </svg>
);

const TikTokMark = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v10.5a3.75 3.75 0 1 1-3.75-3.75" />
    <path d="M14 4c0.4 2.6 2.3 4.6 5 5" />
  </svg>
);

const socials = [
  { icon: InstagramMark, label: "Instagram", href: "https://instagram.com" },
  { icon: FacebookMark, label: "Facebook", href: "https://facebook.com" },
  { icon: TikTokMark, label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-charcoal-deep pt-24 text-ivory">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 border-b border-ivory/10 pb-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeUp>
              <p className="display max-w-[16ch] text-3xl leading-snug text-ivory/90 md:text-4xl">
                A private atelier for lashes &amp; brows in the heart of <em>Miami</em>.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-10 flex gap-4">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-500 hover:border-rose hover:bg-rose hover:text-charcoal-deep"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <FadeUp delay={0.1}>
              <h3 className="eyebrow mb-7 text-rose">Visit</h3>
              <p className="flex items-start gap-3 text-sm leading-relaxed text-ivory/60">
                <MapPin size={15} className="mt-0.5 shrink-0 text-rosegold" />
                <span>
                  {studio.address}
                  <br />
                  {studio.addressLine2}
                </span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-ivory/60">
                <a href={`tel:${studio.phone.replace(/[^\d]/g, "")}`} className="link-line">
                  {studio.phone}
                </a>
                <br />
                <a href={`mailto:${studio.email}`} className="link-line">
                  {studio.email}
                </a>
              </p>
            </FadeUp>
          </div>

          <div className="md:col-span-3">
            <FadeUp delay={0.2}>
              <h3 className="eyebrow mb-7 text-rose">Hours</h3>
              <ul className="space-y-3 text-sm text-ivory/60">
                {studio.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6 border-b border-ivory/8 pb-3">
                    <span>{h.days}</span>
                    <span className={h.time === "Closed" ? "text-ivory/35" : "text-ivory/80"}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* giant wordmark, clipped at the fold */}
        <div className="relative overflow-hidden pt-10">
          <motion.p
            aria-hidden
            translate="no"
            initial={{ y: "42%" }}
            whileInView={{ y: "12%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="display select-none text-center text-[24vw] leading-[0.8] tracking-[0.04em] text-ivory/12 md:text-[21vw]"
          >
            AUREA
          </motion.p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-8 text-[11px] tracking-[0.14em] text-ivory/35 uppercase md:flex-row">
          <p>© {new Date().getFullYear()} AUREA Atelier — Miami</p>
          <p>
            Lashes that speak <span className="serif-italic font-serif normal-case">before you do</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
