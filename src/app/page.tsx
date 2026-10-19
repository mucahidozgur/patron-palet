import BackToTop from "@/components/ui/BackToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import ProductGrid from "@/components/sections/ProductGrid";
import ShowcaseBand from "@/components/sections/ShowcaseBand";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <ProductGrid />
        <ShowcaseBand />
        <Services />
        <About />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
