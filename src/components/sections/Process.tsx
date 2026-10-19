"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  { num: "01", title: "DANIŞMANLIK", desc: "İhtiyaç analizi ve teknik görüşme." },
  { num: "02", title: "TASARIM", desc: "Özel ölçü ve yük analizi." },
  { num: "03", title: "ÜRETİM", desc: "Isıl işlem, montaj, kalite kontrol." },
  { num: "04", title: "TESLİMAT", desc: "Zamanında ve eksiksiz teslimat." },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Dev filigran, scroll ile ters yönde yüzer
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  // Grid üzerindeki electric ilerleme çizgisi
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  // Saha bandı, scroll ile ters yönde süzülür
  const bandY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="uretim"
      className="relative overflow-hidden bg-void py-32"
    >
      {/* Dev dış hatlı filigran */}
      <m.span
        aria-hidden
        style={reduce ? undefined : { y: watermarkY }}
        className="heading-display text-outline pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap text-[24vw] opacity-20"
      >
        SÜREÇ
      </m.span>

      <div className="container-industrial relative">
        <Reveal>
          <p className="label-tech">SÜREÇ — 01</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-display mt-4 max-w-3xl text-4xl md:text-6xl lg:text-7xl">
            FİKİRDEN TESLİMATA
          </h2>
        </Reveal>

        {/* 4 adımlı endüstriyel grid — gap-px kılcal çizgiler oluşturur */}
        <div className="relative mt-16 grid grid-cols-1 gap-px border border-pure/10 bg-pure/10 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {/* Scroll ile ilerleyen electric çizgi */}
          <m.span
            aria-hidden
            style={reduce ? undefined : { scaleX: lineScaleX }}
            className="absolute -top-px left-0 z-10 h-[2px] w-full origin-left bg-electric"
          />
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              direction="left"
              delay={i * 0.12}
              className="group relative min-h-[260px] bg-void p-8 md:p-10"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-electric md:text-3xl">
                  {step.num}
                </span>
                <span className="font-mono text-xs text-smoke">/ 04</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-electric md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-smoke">
                {step.desc}
              </p>
              {/* hover'da soldan büyüyen electric çizgi */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-electric transition-all duration-500 group-hover:w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Saha bandı — tam genişlik, paralaks fotoğraf */}
      <div className="relative mt-24 h-[46vh] min-h-[340px] overflow-hidden md:mt-32">
        <m.div
          aria-hidden
          style={reduce ? undefined : { y: bandY }}
          className="absolute inset-x-0 -inset-y-[15%]"
        >
          <Image
            src="/images/site/saha-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </m.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-void via-void/25 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
        />
        <div className="container-industrial absolute inset-0 flex flex-col justify-end pb-10">
          <p className="label-tech">SAHA — ISPM 15 ISIL İŞLEM</p>
          <p className="heading-display mt-3 text-2xl md:text-4xl">
            LİSANSLI ÜRETİM HATTI
          </p>
        </div>
      </div>
    </section>
  );
}
