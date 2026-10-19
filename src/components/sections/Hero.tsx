"use client";

import * as m from "motion/react-m";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { useIntroDone } from "@/components/layout/Intro";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";

const WORDS = ["HAMMADDEDEN", "GÜCE."];

const STATS = [
  { value: 20, suffix: "+", label: "YIL DENEYİM" },
  { value: 2, suffix: "", label: "ŞUBE — ANKARA" },
  { value: 100, prefix: "%", label: "ZAMANINDA TESLİM" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const [videoFailed, setVideoFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Paralaks: arka plan yavaş kayar, içerik yükselip söner
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // İmleci izleyen elektrik ışığı — yalnızca hassas işaretçilerde
  const [spotOn, setSpotOn] = useState(false);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotSpringX = useSpring(spotX, { stiffness: 50, damping: 20, mass: 0.5 });
  const spotSpringY = useSpring(spotY, { stiffness: 50, damping: 20, mass: 0.5 });

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch" || reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
    if (!spotOn) setSpotOn(true);
  };

  // Video yoksa fotoğraf, o da yoksa mesh gradient devreye girer
  const showVideo = !reduce && !videoFailed;

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* ── Arka plan katmanı ─────────────────────────── */}
      <m.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-0"
      >
        {/* 1. katman: mesh gradient fallback */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_20%,#FF3D0014_0%,#FF3D0000_60%),radial-gradient(50%_40%_at_15%_75%,#00E5FF0F_0%,#00E5FF00_55%),linear-gradient(180deg,#000000_0%,#1A1A1A_55%,#000000_100%)]" />
        {/* 2. katman: gorsel5 — intro bitince çapraz süpürmeyle yüklenir */}
        <m.div
          initial={
            reduce
              ? undefined
              : { clipPath: "inset(0% 0% 100% 100%)", scale: 1.18 }
          }
          animate={
            reduce
              ? undefined
              : introDone
                ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1.06 }
                : { clipPath: "inset(0% 0% 100% 100%)", scale: 1.18 }
          }
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 opacity-60"
        >
          <Image
            src="/images/site/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </m.div>
        {/* 3. katman: video (varsa) — fotoğrafın üstüne biner */}
        {showVideo && (
          <video
            src="/videos/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        {/* Alt karartma — içerikle bütünleşme */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void" />
      </m.div>

      {/* İmleç ışığı — elektrik turuncusu yumuşak spot */}
      {!reduce && (
        <m.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: spotOn ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ x: spotSpringX, y: spotSpringY }}
          className="pointer-events-none absolute left-0 top-0 z-[5] h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,61,0,0.09),transparent_70%)]"
        />
      )}

      {/* Dikey grid çizgileri — Flux tarzı teknik doku */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-y-0 left-1/4 w-px bg-pure/5" />
        <div className="absolute inset-y-0 left-2/4 w-px bg-pure/5" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-pure/5" />
      </div>

      {/* Köşe teknik etiketleri */}
      <div className="pointer-events-none absolute left-6 top-24 hidden md:block lg:left-12">
        <p className="label-tech">39.85° N — 32.64° E / ANKARA</p>
      </div>
      <div className="pointer-events-none absolute right-6 top-24 hidden md:block lg:right-12">
        <p className="label-tech">ISPM 15 SERTİFİKALI ÜRETİM</p>
      </div>

      {/* ── İçerik ────────────────────────────────────── */}
      <m.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-industrial relative z-10 flex flex-1 flex-col justify-center pb-28 pt-36"
      >
        <Reveal delay={0.1} direction="none" ready={introDone}>
          <p className="label-tech mb-6 flex flex-wrap items-center gap-3">
            <span aria-hidden className="inline-block h-px w-8 bg-electric" />
            TR PATRON — ENDÜSTRİYEL AHŞAP ÇÖZÜMLERİ · MMXXV
            {/* Canlı durum rozeti */}
            <span className="ml-2 inline-flex items-center gap-2 border border-electric/40 bg-void/60 px-3 py-1.5 normal-case tracking-[0.1em]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-glow"
              />
              STOKTA — ANINDA TESLİM
            </span>
          </p>
        </Reveal>

        {/* Kinetik başlık: her kelime ayrı span, maskeli yükseliş */}
        <h1
          className="heading-display text-[clamp(3rem,9vw,8rem)]"
          aria-label="HAMMADDEDEN GÜCE."
        >
          {WORDS.map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.1em]">
              <m.span
                className={`block ${i === 1 ? "text-electric" : ""}`}
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={
                  reduce
                    ? { opacity: introDone ? 1 : 0 }
                    : introDone
                      ? { y: 0 }
                      : { y: "110%" }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </m.span>
            </span>
          ))}
        </h1>

        <Reveal
          delay={0.5}
          direction="none"
          ready={introDone}
          className="mt-8 max-w-xl"
        >
          <p className="text-base leading-relaxed md:text-lg">
            <span className="text-pure">
              Sıfır ahşap palet üretimi, ikinci el palet alım satımı ve ihracat
              sandığı imalatı.
            </span>{" "}
            <span className="text-smoke">
              En uygun, en doğru ve en ekonomik çözümler için tek adres.
            </span>
          </p>
        </Reveal>

        <Reveal
          delay={0.65}
          direction="none"
          ready={introDone}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <a
              href="#urunler"
              className="block bg-electric px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-void transition-colors duration-300 hover:bg-pure"
            >
              ÜRÜNLERİ KEŞFET
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#uretim"
              className="block border border-pure/30 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-pure transition-colors duration-300 hover:border-electric hover:text-electric"
            >
              ÜRETİM HATTIMIZ
            </a>
          </Magnetic>
        </Reveal>

        {/* İstatistik şeridi */}
        <Reveal
          delay={0.8}
          direction="none"
          ready={introDone}
          className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-pure/10 pt-8"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold md:text-4xl">
                <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-smoke">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </m.div>

      {/* ── Scroll göstergesi — intro bitince belirir ─── */}
      <m.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label-tech">SCROLL</span>
        <m.span
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl leading-none text-electric"
        >
          ↓
        </m.span>
      </m.div>
    </section>
  );
}
