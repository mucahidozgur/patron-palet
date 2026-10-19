"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/** İletişim bölümü — gorsel6 zemini üzerinde bronz çerçeveli panel. */
export default function CtaBand() {
  return (
    <section id="iletisim" className="relative overflow-hidden py-32 md:py-40">
      {/* Görsel katmanı: gorsel6 */}
      <Image
        src="/images/site/saha-4.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/88" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      <div className="grain absolute inset-0 opacity-10" />

      <div className="container-editorial relative">
        <Reveal>
          <div className="tech-grid relative overflow-hidden border border-tan/25 bg-ink/55 p-10 text-center backdrop-blur-sm md:p-20">
            <div className="glow-pulse pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-tan/10 blur-[100px]" />

            <p className="label-industrial relative mb-6">
              <span className="section-num mr-3">05</span>İletişim
            </p>
            <h2 className="heading-display relative text-3xl text-white md:text-5xl">
              Projeniz İçin Teklif Alın
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl font-light leading-relaxed text-white/65">
              En uygun, en doğru ve en ekonomik çözümler için bizimle iletişime
              geçin. Ankara&apos;dan Türkiye&apos;ye ve tüm dünyaya hizmet
              veriyoruz.
            </p>

            <div className="relative mt-12 flex flex-wrap items-center justify-center gap-6">
              <a
                href="tel:+905434329951"
                className="btn-sheen bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-caramel hover:shadow-[0_0_32px_rgba(212,163,115,0.5)]"
              >
                +90 (543) 432 99 51
              </a>
              <a
                href="mailto:info@patronpalet.com"
                className="btn-sheen border border-tan/40 px-8 py-4 text-sm font-bold uppercase tracking-widest2 text-tan transition-all duration-300 hover:bg-tan hover:text-ink hover:shadow-[0_0_24px_rgba(212,163,115,0.4)]"
              >
                E-posta Gönder
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
