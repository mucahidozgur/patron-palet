"use client";

import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";

/** Footer öncesi tam genişlik CTA bandı — electric zemin. */
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-electric text-void">
      <div className="container-industrial py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-void/70">
            TEKLİF — 24 SAAT İÇİNDE DÖNÜŞ
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-display mt-4 max-w-4xl text-5xl md:text-7xl lg:text-8xl">
            BİRLİKTE
            <br />
            ÇALIŞALIM
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-void/80 md:text-lg">
            İhtiyacınızı anlatın; ölçü, adet ve teslimat planını birlikte
            çıkaralım. Ankara&apos;dan tüm Türkiye&apos;ye.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic strength={0.3}>
            <a
              href="#iletisim"
              className="group block bg-void px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-pure transition-colors duration-300 hover:bg-pure hover:text-void"
            >
              TEKLİF AL
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Magnetic>
          <a
            href="tel:+905434329951"
            className="font-mono text-sm tracking-[0.15em] text-void underline-offset-4 transition-colors hover:underline"
          >
            +90 (543) 432 99 51
          </a>
        </Reveal>
      </div>

      {/* Dev dış hatlı filigran — bandın imzası */}
      <span
        aria-hidden
        className="heading-display pointer-events-none absolute -bottom-[4%] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] leading-none text-void/10"
      >
        PATRON PALET
      </span>
    </section>
  );
}
