export type Service = {
  index: string;
  name: string;
  category: "Lashes" | "Brows";
  description: string;
  price: string;
  duration: string;
  palette: number;
};

export const services: Service[] = [
  {
    index: "01",
    name: "Classic Lashes",
    category: "Lashes",
    description: "One extension per natural lash. Quiet definition, drawn to the shape of your eye.",
    price: "from $120",
    duration: "120 min",
    palette: 0,
  },
  {
    index: "02",
    name: "Hybrid Lashes",
    category: "Lashes",
    description: "Classic precision meets soft volume. Texture that reads effortless, never done.",
    price: "from $150",
    duration: "135 min",
    palette: 1,
  },
  {
    index: "03",
    name: "Volume Lashes",
    category: "Lashes",
    description: "Hand-crafted fans for depth and dimension. Full, feathered, weightless.",
    price: "from $180",
    duration: "150 min",
    palette: 2,
  },
  {
    index: "04",
    name: "Mega Volume",
    category: "Lashes",
    description: "Our most dramatic set. Dense, dark, couture — for those who never whisper.",
    price: "from $220",
    duration: "170 min",
    palette: 3,
  },
  {
    index: "05",
    name: "Lash Lift",
    category: "Lashes",
    description: "Your own lashes, elevated. A sculpted curl that holds for weeks.",
    price: "from $95",
    duration: "60 min",
    palette: 4,
  },
  {
    index: "06",
    name: "Brow Lamination",
    category: "Brows",
    description: "Brushed-up, editorial brows set in place. The Miami answer to gravity.",
    price: "from $90",
    duration: "60 min",
    palette: 5,
  },
  {
    index: "07",
    name: "Brow Shaping",
    category: "Brows",
    description: "Architecture for the face. Mapped, measured and shaped to your bone structure.",
    price: "from $45",
    duration: "30 min",
    palette: 6,
  },
  {
    index: "08",
    name: "Brow Tint",
    category: "Brows",
    description: "Custom-blended color for depth and presence — even before coffee.",
    price: "from $35",
    duration: "25 min",
    palette: 7,
  },
];

export type Benefit = {
  index: string;
  title: string;
  body: string;
};

export const benefits: Benefit[] = [
  {
    index: "01",
    title: "Experienced Artists",
    body: "Every artist trains for hundreds of hours before touching a single lash. Precision is not a promise here — it is a prerequisite.",
  },
  {
    index: "02",
    title: "Premium Products",
    body: "Silk and cashmere fibers, medical-grade adhesives, formulas we would use on ourselves. Because we do.",
  },
  {
    index: "03",
    title: "Customized Look",
    body: "No menus of one-size-fits-all. We map your eye shape, bone structure and lifestyle before we design a single set.",
  },
  {
    index: "04",
    title: "Long Lasting Results",
    body: "Retention is our obsession. Sets engineered to outlast your vacation, your deadlines and your 6am workouts.",
  },
  {
    index: "05",
    title: "Miami Luxury Experience",
    body: "A private suite in Brickell. Cold brew or champagne. One client at a time. This is self-care as it should feel.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "I walked out and cancelled my mascara subscription. This is not a lash appointment, it's a ritual.",
    name: "Valentina R.",
    role: "Brickell",
    initials: "VR",
  },
  {
    quote: "Three weeks in and they still look like day one. Nobody believes these aren't mine.",
    name: "Camila S.",
    role: "Coral Gables",
    initials: "CS",
  },
  {
    quote: "The studio feels like a fashion editorial you get to live inside. I've never felt more taken care of.",
    name: "Isabelle M.",
    role: "Miami Beach",
    initials: "IM",
  },
  {
    quote: "My brows have never had this much architecture. Strangers ask. I gatekeep, then I tell them.",
    name: "Daniela P.",
    role: "Wynwood",
    initials: "DP",
  },
  {
    quote: "Flew back from New York just for my refill. That should tell you everything.",
    name: "Ava L.",
    role: "Edgewater",
    initials: "AL",
  },
];

export const studio = {
  name: "AUREA GLOW",
  tagline: "Beauty Studio",
  city: "Miami",
  address: "2110 Brickell Avenue, Suite 3",
  addressLine2: "Miami, FL 33129",
  phone: "(305) 555-0134",
  email: "hello@aurea.miami",
  instagram: "@aurea.miami",
  hours: [
    { days: "Tue — Fri", time: "9:00 — 19:00" },
    { days: "Saturday", time: "9:00 — 17:00" },
    { days: "Sunday", time: "10:00 — 15:00" },
    { days: "Monday", time: "Closed" },
  ],
};
