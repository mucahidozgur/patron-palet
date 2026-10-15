"use client";

import Reveal from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "İhracat firmamızda kullandığımız paletler için verdikleri destekten dolayı teşekkür ederiz.",
    name: "Murathan G.",
    company: "İhracat Sektörü",
  },
  {
    quote:
      "Sizinle çalışmaktan dolayı mutluluk duyduk, elinize sağlık.",
    name: "Hasan T.",
    company: "Üretim Tesisi",
  },
  {
    quote:
      "Kalite ve hizmet konusunda hızlı teslimat ve güler yüzlü çalışanlarıyla güzel firma, herkese tavsiye ederim.",
    name: "Murat S.",
    company: "Lojistik Şirketi",
  },
  {
    quote:
      "Taşımacılık için aldığımız özel paletler çok sağlamdı. Teşekkür ederim.",
    name: "Aslan U.",
    company: "Taşımacılık",
  },
];

export default function Testimonials() {
  return (
    <section id="referanslar" className="relative overflow-hidden bg-void py-32">
      {/* Bölüm indeksi */}
      <span
        aria-hidden
        className="heading-display text-outline pointer-events-none absolute right-6 top-10 select-none text-[18vw] leading-none opacity-15 lg:right-12"
      >
        04
      </span>

      <div className="container-industrial relative">
        <Reveal>
          <p className="label-tech">REFERANSLAR — 04</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="heading-display mt-4 text-4xl md:text-6xl lg:text-7xl">
            MÜŞTERİLERİMİZ
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed text-smoke md:text-base">
            Ankara&apos;dan tüm Türkiye&apos;ye; gıdadan kimyaya, otomotivden
            lojistiğe uzanan sektörlerden güven mektupları.
          </p>
        </Reveal>

        {/* 2x2 referans grid'i */}
        <div className="mt-16 grid gap-px border border-pure/10 bg-pure/10 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              direction="up"
              delay={(i % 2) * 0.12}
              className="group flex flex-col bg-void p-10 transition-colors duration-300 hover:bg-ash/60 md:p-12"
            >
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-electric md:text-7xl"
              >
                ”
              </span>
              <blockquote className="mt-4 flex-1 text-base italic leading-relaxed text-pure/85 md:text-lg">
                {t.quote}
              </blockquote>
              <footer className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-[0.15em]">
                    {t.name}
                  </p>
                  <p className="label-tech mt-2 text-smoke">{t.company}</p>
                </div>
                <span
                  aria-hidden
                  className="font-mono text-xs text-smoke transition-colors duration-300 group-hover:text-electric"
                >
                  0{i + 1}
                </span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
