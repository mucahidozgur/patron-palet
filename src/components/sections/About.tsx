"use client";

import Reveal from "@/components/ui/Reveal";
import FramedImage from "@/components/ui/FramedImage";

const VALUES = [
  "Garantili — Kaliteli Hizmet",
  "Kaliteli Ürün — Müşteri Odaklı Çözümler",
  "Zamanında İş — Ürün Teslimi",
];

export default function About() {
  return (
    <section id="hakkimizda" className="bg-ink py-32 md:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="label-industrial mb-6">
              <span className="section-num mr-3">03</span>Hakkımızda
            </p>
            <h2 className="heading-display text-3xl text-forest md:text-5xl">
              Yılların Tecrübesi,
              <span className="logo-shimmer block bg-gradient-to-r from-tan to-moss bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(123,200,159,0.35)]">
                Aynı Kalite
              </span>
            </h2>
            <p className="mt-8 font-light leading-relaxed text-ivory/60">
              Alanında uzman, deneyimli kadromuz ile yılların vermiş olduğu
              tecrübe ve birikim sayesinde, müşterilerimize her zaman aynı
              kalitede hizmet vermek için çalışmaktayız.
            </p>
            <p className="mt-6 font-light leading-relaxed text-ivory/60">
              Müşteri beklentileri doğrultusunda özel ve standart palet üretimi
              yaparak tüm isteklerinizi karşılamaktayız. Tüm ahşap palet ürün ve
              hizmetlerimizde garanti ve kalite ile her zaman yanınızdayız.
            </p>
          </Reveal>

          {/* Görsel kolajı: gorsel1 + gorsel4 */}
          <Reveal delay={0.15} className="relative">
            <FramedImage
              src="/images/site/saha-1.jpg"
              alt="İstiflenmiş ahşap paletler"
              caption="Sıfır Palet Üretim Hattı"
              className="aspect-[4/3] w-full"
            />
            <FramedImage
              src="/images/site/saha-3.jpg"
              alt="Sevkiyata hazır palet yığını"
              caption="Sevkiyata Hazır"
              className="absolute -bottom-14 -left-4 hidden aspect-[16/10] w-1/2 border-4 border-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:block md:-left-10"
            />
          </Reveal>
        </div>

        {/* Değerler */}
        <Reveal delay={0.1} className="mt-28 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((value, index) => (
            <div
              key={value}
              className="group flex items-center gap-5 border border-ivory/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:shadow-[0_14px_44px_-12px_rgba(123,200,159,0.25)]"
            >
              <span className="font-mono text-xs text-moss/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 shrink-0 text-moss drop-shadow-[0_0_8px_rgba(123,200,159,0.5)] transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-base font-medium text-ivory">{value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
