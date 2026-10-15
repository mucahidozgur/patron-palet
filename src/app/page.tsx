import BackToTop from "@/components/ui/BackToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import CtaBand from "@/components/sections/CtaBand";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Process from "@/components/sections/Process";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <Marquee />
        <ProductShowcase />
        <About />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
