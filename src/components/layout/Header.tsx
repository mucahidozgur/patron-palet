"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useIntroDone } from "@/components/layout/Intro";

const NAV = [
  { label: "Ürünler", href: "#urunler" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "SSS", href: "#sss" },
];

export default function Header() {
  const introDone = useIntroDone();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  // Aşağı kaydırınca gizlenir, yukarı kaydırınca geri gelir
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 140);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken sayfa kaydırmasını kilitle
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={
          introDone
            ? { y: hidden && !open ? "-100%" : 0, opacity: 1 }
            : { y: -80, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-moss/25 bg-ink/90 backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-editorial flex items-center justify-between py-5">
          {/* Logo — intro uçuşunun iniş hedefi (#brand-anchor) */}
          <a href="#top" id="brand-anchor" className="group flex items-center gap-3">
            <Image
              src="/logopatron.jpeg"
              alt="TR Patron Palet"
              width={44}
              height={44}
              className="rounded-full ring-1 ring-tan/60 transition-all duration-500 group-hover:scale-110 group-hover:ring-tan"
            />
            <span className="flex items-center gap-3 text-lg md:text-xl">
              <span className="tr-badge shrink-0 transition-all duration-500 group-hover:bg-moss group-hover:text-ink">
                TR
              </span>
              <span className="logo-shimmer bg-gradient-to-r from-tan via-moss to-tan bg-clip-text font-display font-bold tracking-[0.2em] text-transparent drop-shadow-[0_0_16px_rgba(223,168,108,0.55)] transition-all duration-500 group-hover:tracking-[0.28em]">
                PATRON PALET
              </span>
            </span>
          </a>

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Ana menü">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-sweep text-sm uppercase tracking-widest text-ivory/80 transition-colors duration-300 hover:text-moss"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Teklif CTA */}
            <a
              href="#iletisim"
              className="btn-sheen hidden border border-moss/40 px-6 py-2.5 text-xs font-bold uppercase tracking-widest2 text-moss transition-all duration-300 hover:bg-moss hover:text-ink hover:shadow-[0_0_24px_rgba(99,217,156,0.4)] md:inline-flex"
            >
              Teklif Al
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-6 bg-ivory transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-ivory transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bronz ilerleme çizgisi */}
        <m.span
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-forest via-moss to-forest"
        />
      </m.header>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="tech-grid absolute inset-0 opacity-50" aria-hidden />
            <nav className="relative flex flex-col gap-6" aria-label="Mobil menü">
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
                  className="heading-display text-4xl text-ivory"
                >
                  <span className="mr-4 font-mono text-sm text-moss">
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
              className="relative mt-16 flex flex-col gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50"
            >
              <a href="tel:+905434329951" className="text-moss">
                +90 (543) 432 99 51
              </a>
              <span>ISPM 15 SERTİFİKALI</span>
              <span>ANKARA — MMXXVI</span>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
