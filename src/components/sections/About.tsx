"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  {
    num: "01",
    title: "Garantili & Kaliteli",
    desc: "Her palet, teslimattan önce kalite kontrolünden geçer.",
  },
  {
    num: "02",
    title: "Zamanında Teslim",
    desc: "Söz verdiğimiz gün, söz verdiğimiz saatte kapınızda.",
  },
  {
    num: "03",
    title: "Müşteri Odaklı Üretim",
    desc: "Standart ya da özel ölçü; ihtiyacınıza göre üretiriz.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Fotoğraf, scroll ile ters yönde süzülür
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="hakkimizda" className="relative overflow-hidden bg-void py-32">
      {/* Bölüm indeksi */}
      <span
        aria-hidden
        className="heading-display text-outline pointer-events-none absolute right-6 top-10 select-none text-[18vw] leading-none opacity-15 lg:right-12"
      >
        03
      </span>

      <div className="container-industrial relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Sol: metin */}
          <div>
            <Reveal>
              <p className="label-tech">HAKKIMIZDA</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="heading-display mt-4 text-4xl md:text-6xl lg:text-7xl">
                PALET
                <br />
                BİZİM İŞİMİZ<span className="text-electric">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 max-w-xl space-y-5">
              <p className="text-sm leading-relaxed text-smoke md:text-base">
                Kuruluşumuzdan bu yana alanında deneyimli kadromuz, modern
                altyapımız ve kaliteli ürün üretim politikamızla hizmet
                veriyoruz. Türkiye&apos;nin birçok şehrindeki yerli ve yabancı
                müşterilerimize, dünya standartlarına uygun lisanslı ahşap
                palet üretimiyle, zamanında ve güvenli teslimat anlayışıyla
                çalışıyoruz.
              </p>
              <p className="text-sm leading-relaxed text-smoke md:text-base">
                İkinci el palet, sıfıra göre çok daha uygun maliyetlidir;
                garantimiz altında, kullanımda sorun yaşamazsınız.
              </p>
            </Reveal>

            {/* NEDEN BİZ — numaralı liste */}
            <div className="mt-12 border-t border-pure/10">
              {REASONS.map((reason, i) => (
                <Reveal
                  key={reason.num}
                  direction="left"
                  delay={i * 0.1}
                  className="group flex items-baseline gap-6 border-b border-pure/10 py-6 transition-colors duration-300 hover:bg-ash/40"
                >
                  <span className="font-mono text-sm text-electric">
                    {reason.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm text-smoke">{reason.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sağ: paralaks fotoğraf */}
          <Reveal direction="right" className="relative">
            <div className="relative overflow-hidden border border-pure/15">
              <m.div style={reduce ? undefined : { y: photoY }} className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/about.jpg"
                  alt="Palet üretim ve depolama alanı"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Karartma + çerçeve detayları */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/20" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white/70">
                  ÜRETİM SAHASI — ANKARA
                </span>
                <span className="absolute bottom-5 right-5 font-mono text-xs text-white/70">
                  39.85° N — 32.64° E
                </span>
              </m.div>
              {/* Electric köşe aksanı */}
              <span
                aria-hidden
                className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2 border-electric"
              />
              <span
                aria-hidden
                className="absolute -right-3 -top-3 h-16 w-16 border-r-2 border-t-2 border-electric"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
