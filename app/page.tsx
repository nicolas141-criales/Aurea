import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import StickyBook from "@/components/StickyBook";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import BookingCTA from "@/components/sections/BookingCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Services />
        <WhyUs />
        <BeforeAfter />
        <Testimonials />
        <Gallery />
        <BookingCTA />
      </main>
      <Footer />
      <StickyBook />
    </>
  );
}
