import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUREA — Luxury Lash & Brow Atelier in Miami",
  description:
    "A private lash and brow atelier in Brickell, Miami. Bespoke lash extensions, lifts and brow artistry — the quiet luxury of waking up ready.",
  keywords: [
    "lash extensions Miami",
    "brow lamination Miami",
    "luxury lash studio",
    "volume lashes Brickell",
    "lash lift Miami",
  ],
  openGraph: {
    title: "AUREA — Luxury Lash & Brow Atelier in Miami",
    description:
      "Bespoke lash and brow artistry in a private Brickell atelier. Lashes that speak before you do.",
    type: "website",
    locale: "en_US",
    siteName: "AUREA",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "AUREA Lash & Brow Atelier",
  description:
    "Private luxury lash and brow studio in Brickell, Miami offering bespoke lash extensions, lash lifts and brow artistry.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2110 Brickell Avenue, Suite 3",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33129",
    addressCountry: "US",
  },
  telephone: "+1-305-555-0134",
  email: "hello@aurea.miami",
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="page-grain" aria-hidden />
      </body>
    </html>
  );
}
