"use client";

import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  {
    value: 81,
    prefix: "",
    suffix: "",
    label: "İl'e Teslimat",
    note: "Türkiye'nin her noktasına",
  },
  {
    value: 15,
    prefix: "ISPM ",
    suffix: "",
    label: "Uyumlu Üretim",
    note: "Isıl işlem sertifikalı ihracat",
  },
  {
    value: 3,
    prefix: "",
    suffix: "",
    label: "Uzmanlık Alanı",
    note: "Üretim · 2. el alım satım · İhracat",
  },
  {
    value: 100,
    prefix: "%",
    suffix: "",
    label: "Garantili Kalite",
    note: "Kontrol edilmiş, garantili ürün",
  },
];

/** Hero altı istatistik bandı — bronz ışıltılı sayaçlar. */
export default function StatsBand() {
  return (
    <section
      aria-label="Öne çıkan rakamlar"
      className="relative border-y border-ivory/5 bg-surface/40 py-16 md:py-20"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className={
                index > 0
                  ? "group lg:border-l lg:border-ivory/10 lg:pl-10"
                  : "group"
              }
            >
              <p className="font-display text-4xl font-extrabold text-forest drop-shadow-[0_0_24px_rgba(99,217,156,0.45)] transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="label-industrial mt-3 text-sm">{stat.label}</p>
              <p className="mt-2 text-sm font-light text-ivory/50">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
