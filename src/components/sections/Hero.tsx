"use client";

import * as m from "motion/react-m";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useIntroDone } from "@/components/layout/Intro";
import { EASE_EXPO, wordContainer, wordFadeUp } from "@/lib/motion";

const CHIPS = [
  "Sıfır Palet Üretimi",
  "2. El Alım Satım",
  "İhracat Sandığı",
  "Ankara'dan Dünyaya",
];

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_EXPO, delay },
  },
});

export default function Hero() {
  const introDone = useIntroDone();
  const reduce = useReducedMotion();

  // Fareyi takip eden bronz ışık
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(520px circle at ${x}px ${y}px, rgba(123,200,159,0.13), transparent 70%)`
  );

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
      onMouseMove={(event) => {
        if (!reduce) {
          mx.set(event.clientX);
          my.set(event.clientY);
        }
      }}
    >
      {/* Görsel katmanı: gorsel5 — yumuşak oturma zoom'u + sinematik drift */}
      <m.div
        initial={reduce ? undefined : { scale: 1.1 }}
        animate={reduce ? undefined : introDone ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 2.2, ease: EASE_EXPO }}
        className="absolute inset-0"
      >
        <m.div
          animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/site/hero-bg.jpg"
            alt="Ahşap palet yığını"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </m.div>
      </m.div>

      {/* Okunabilirlik katmanları */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
      <div className="tech-grid absolute inset-0 opacity-40" />
      <div className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* İkinci ışık nabzı — sağ altta yosun parıltısı */}
      <div
        aria-hidden
        className="glow-pulse pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full bg-forest/20 blur-[110px]"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Fare spot ışığı */}
      {!reduce && (
        <m.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      )}

      {/* Kenar HUD yazısı */}
      <m.span
        variants={fade(1.2)}
        initial="hidden"
        animate={introDone ? "visible" : "hidden"}
        className="absolute right-10 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.45em] text-ivory/35 [writing-mode:vertical-rl] lg:block"
        aria-hidden="true"
      >
        Ankara — TR · Est. MMXXVI
      </m.span>

      <div className="container-editorial relative z-10 pb-28 pt-40">
        <m.div
          variants={fade(0.15)}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="mb-8 flex items-center gap-4"
        >
          <span className="tr-badge text-sm">TR</span>
          <p className="label-industrial">Ahşap Palet Üretimi — MMXXVI</p>
          {/* Canlı durum rozeti */}
          <span className="ml-2 inline-flex items-center gap-2 border border-moss/40 bg-ink/60 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-moss backdrop-blur-sm">
            <span
              aria-hidden
              className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-moss"
            />
            Stokta — Anında Teslim
          </span>
        </m.div>

        <m.h1
          variants={wordContainer}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="heading-display text-4xl leading-[1.1] text-forest md:text-6xl lg:text-7xl"
        >
          <m.span variants={wordFadeUp} className="inline-block">
            Patron
          </m.span>{" "}
          <m.span
            variants={wordFadeUp}
            className="logo-shimmer inline-block bg-gradient-to-r from-tan to-moss bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(123,200,159,0.4)]"
          >
            Palet
          </m.span>
        </m.h1>

        <m.p
          variants={fade(0.45)}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-ivory/85 md:text-xl"
        >
          Sıfır ahşap palet üretimi, ikinci el palet alım satımı ve ihracat
          sandığı imalatı. En uygun, en doğru ve en ekonomik çözümler için tek
          adres.
        </m.p>

        <m.div
          variants={fade(0.6)}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="#iletisim"
            className="btn-sheen bg-ivory px-8 py-4 text-sm font-bold uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-moss hover:shadow-[0_0_32px_rgba(123,200,159,0.5)]"
          >
            Teklif Al <span className="ml-1">→</span>
          </a>
          <a
            href="#urunler"
            className="link-sweep text-sm font-semibold uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:text-moss"
          >
            Ürünleri İncele
          </a>
        </m.div>

        {/* Hizmet çipleri */}
        <m.div
          variants={fade(0.8)}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="mt-16 flex flex-wrap gap-3"
        >
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="border border-ivory/15 bg-ink/55 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-ivory/80 backdrop-blur-sm transition-colors duration-300 hover:border-moss hover:text-moss"
            >
              {chip}
            </span>
          ))}
        </m.div>
      </div>

      {/* Aşağı kaydır göstergesi */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <m.div
          variants={fade(1.1)}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-ivory/40">
            Kaydır
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-moss/40 p-1.5">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-moss" />
          </span>
        </m.div>
      </div>
    </section>
  );
}
