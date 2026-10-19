"use client";

import Reveal from "@/components/ui/Reveal";
import FramedImage from "@/components/ui/FramedImage";

const SERVICES = [
  {
    title: "Sıfır Palet Üretimi",
    description:
      "İstenilen ölçü ve kapasitede, ısıl işlemli sıfır ahşap palet üretimi.",
    icon: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />,
  },
  {
    title: "İkinci El Palet Alım Satım",
    description:
      "Stoklarımızdaki 2. el palet çeşitliliği ile ekonomik ve hızlı çözümler.",
    icon: <path d="M17 3h4v4M21 3l-8 8M7 21H3v-4M3 21l8-8M8 8l2-2M16 16l2-2" />,
  },
  {
    title: "İhracat Sandığı",
    description:
      "ISPM 15 uyumlu, gümrük standartlarında ahşap ihracat sandığı imalatı.",
    icon: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
  },
  {
    title: "Kafes Sandık",
    description:
      "Kırılgan ve hacimli yükler için sağlam ahşap kafes sandık üretimi.",
    icon: (
      <path d="M4 21V7h16v14M4 7l4-4M20 7l-4-4M4 7h16M8 3v4M16 3v4M8 11h8M8 15h8M8 19h8" />
    ),
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="bg-surface py-32 md:py-40">
      <div className="container-editorial">
        <Reveal className="mb-16 max-w-2xl">
          <p className="label-industrial mb-6">
            <span className="section-num mr-3">02</span>Hizmetlerimiz
          </p>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Tek Çatı Altında
          </h2>
          <p className="mt-6 font-light leading-relaxed text-white/60">
            Üretimden alım satıma, ihracattan özel ölçüye — tüm ahşap palet
            ihtiyaçlarınız için tek adres.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="group h-full border border-white/10 bg-ink p-8 transition-all duration-300 hover:-translate-y-1 hover:border-tan/40 hover:shadow-[0_14px_44px_-12px_rgba(212,163,115,0.3)]">
                <div className="flex items-start justify-between">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-tan drop-shadow-[0_0_10px_rgba(212,163,115,0.5)] transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                  <span className="font-mono text-xs text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-lg font-bold uppercase tracking-wide text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/60">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Üretim bandı: gorsel3 */}
        <Reveal className="mt-16">
          <FramedImage
            src="/images/site/detay-1.jpg"
            alt="Üretim alanında istiflenmiş ahşap paletler"
            caption="Ankara Üretim Hattı — ISPM 15 Sertifikalı"
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            sizes="100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
