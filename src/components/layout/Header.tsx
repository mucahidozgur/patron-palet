"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

const NAV = [
  { label: "ÜRÜNLER", href: "#urunler" },
  { label: "ÜRETİM", href: "#uretim" },
  { label: "HAKKINDA", href: "#hakkimizda" },
  { label: "İLETİŞİM", href: "#iletisim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken sayfa kaydırmasını kilitle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Scroll ilerleme çubuğu */}
      <m.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-electric"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg transition-colors duration-500 ${
          scrolled
            ? "border-electric/30 bg-void/95"
            : "border-electric/20 bg-void/80"
        }`}
      >
        <div className="container-industrial flex h-20 items-center justify-between">
          {/* Logo — temaya uygun karolu kilit */}
          <a href="#top" id="brand-anchor" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-pure/15 bg-ash/50 p-1.5 transition-colors duration-300 group-hover:border-electric/60">
              <Image
                src="/logopatron-alpha.png"
                alt="TR Patron Palet"
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex items-center gap-2">
              <span className="border border-electric/70 bg-electric/10 px-1.5 py-0.5 font-display text-[0.7rem] font-bold tracking-[0.25em] text-electric">
                TR
              </span>
              <span className="hidden font-display text-sm font-bold tracking-[0.3em] text-pure sm:block">
                PATRON PALET
              </span>
            </span>
          </a>

          {/* Masaüstü menü — büyüyen alt çizgi */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Ana menü">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-tech group relative py-2 text-pure/70 transition-colors duration-300 hover:text-electric"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-electric transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Teklif CTA */}
            <Magnetic strength={0.2} className="hidden sm:block">
              <a
                href="#iletisim"
                className="block bg-electric px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-void transition-colors duration-300 hover:bg-pure"
              >
                TEKLİF AL
              </a>
            </Magnetic>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-6 bg-pure transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-pure transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-6" aria-label="Mobil menü">
              {NAV.map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="heading-display text-4xl text-pure"
                >
                  <span className="mr-4 font-mono text-sm text-electric">
                    0{i + 1}
                  </span>
                  {item.label}
                </m.a>
              ))}
            </nav>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16 flex items-center gap-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pure/50"
            >
              <span>ISPM 15 SERTİFİKALI</span>
              <span aria-hidden>·</span>
              <span>MMXXV</span>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
