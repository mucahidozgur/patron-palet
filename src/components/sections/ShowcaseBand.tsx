"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

/**
 * Tam genişlik görsel bandı: kaydırmayla hafif paralaks,
 * üzerinde marka cümlesi. Görsel: gorsel2.
 */
export default function ShowcaseBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[62vh] min-h-[420px] overflow-hidden">
      <m.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 -top-[16%] -bottom-[16%]"
      >
        <Image
          src="/images/site/saha-2.jpg"
          alt="Üretim hattında istiflenmiş ahşap paletler"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </m.div>

      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="grain absolute inset-0 opacity-10" />

      <div className="container-editorial relative flex h-full flex-col items-center justify-center text-center">
        <m.figure
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-8">
            <span className="tr-badge text-sm">TR</span>
          </div>
          <blockquote className="heading-display text-2xl leading-snug text-white md:text-4xl">
            Ahşabın gücü,{" "}
            <span className="logo-shimmer bg-gradient-to-r from-tan to-caramel bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(212,163,115,0.4)]">
              teknolojinin hassasiyetiyle.
            </span>
          </blockquote>
          <figcaption className="label-industrial mt-8">
            Patron Palet — Ankara
          </figcaption>
        </m.figure>
      </div>
    </section>
  );
}
