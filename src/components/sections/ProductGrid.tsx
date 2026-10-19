"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ProductModal from "@/components/ui/ProductModal";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { CATEGORY_LABELS, type Product } from "@/types/palette";

export default function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="urunler" className="relative overflow-hidden bg-ink py-32 md:py-40">
      {/* Dev bronz filigran — vitrinin imzası */}
      <span
        aria-hidden
        className="heading-display text-outline-tan pointer-events-none absolute -top-6 right-0 select-none whitespace-nowrap text-[17vw] leading-none"
      >
        PALET
      </span>

      <div className="container-editorial relative">
        <Reveal className="mb-16 max-w-2xl">
          <p className="label-industrial mb-6">
            <span className="section-num mr-3">01</span>Ürün Kataloğu
          </p>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Ürünlerimiz
          </h2>
          <p className="mt-6 font-light leading-relaxed text-white/60">
            Depodan limana her sevkiyat, altında sağlam bir zemin ister.
            Standart ve özel ölçülerde, stoktan teslim, garantili kalite.
          </p>
        </Reveal>

        {/* Görsel mozaik: ilk ürün vitrin kartı, diğerleri fotoğraf kartı */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const isBig = index === 0;
            return (
              <Reveal
                key={product.id}
                delay={(index % 3) * 0.08}
                className={
                  isBig ? "h-full md:col-span-2 lg:row-span-2" : "h-full"
                }
              >
                <m.article
                  role="button"
                  tabIndex={0}
                  aria-label={`${product.title} detaylarını aç`}
                  onClick={() => setSelected(product)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(product);
                    }
                  }}
                  className="group relative flex h-full min-h-[260px] cursor-pointer flex-col justify-end overflow-hidden border border-white/10 bg-panel transition-all duration-500 hover:border-tan/50 hover:shadow-[0_18px_60px_-18px_rgba(212,163,115,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-tan/50 lg:min-h-[320px]"
                >
                  {/* Fotoğraf — kartın yıldızı */}
                  {product.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes={
                          isBig
                            ? "(max-width: 1024px) 100vw, 66vw"
                            : "(max-width: 1024px) 50vw, 33vw"
                        }
                        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                      />
                      <div className="grain pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5 transition-colors duration-500 group-hover:via-ink/55" />
                    </div>
                  )}

                  {/* Köşe braketleri — hover'da belirir */}
                  <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-tan/0 transition-all duration-500 group-hover:border-tan" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-tan/0 transition-all duration-500 group-hover:border-tan" />

                  {/* Işık süpürmesi */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
                  </span>

                  {/* Üst bilgi satırı */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="font-mono text-xs text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="border border-tan/40 bg-ink/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-tan backdrop-blur-sm">
                      {CATEGORY_LABELS[product.category]}
                    </span>
                  </div>

                  {/* Alt içerik */}
                  <div className="relative p-6 md:p-7">
                    <h3
                      className={`heading-display text-white ${
                        isBig ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {product.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-white/70">
                      {product.subtitle}
                    </p>
                    {isBig && (
                      <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/75">
                        {product.description}
                      </p>
                    )}
                    {isBig && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {product.features.map((feature) => (
                          <li
                            key={feature}
                            className="border border-white/15 bg-ink/50 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/85 backdrop-blur-sm"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-tan transition-transform duration-300 group-hover:translate-x-1">
                      Detay <span aria-hidden>→</span>
                    </span>
                  </div>
                </m.article>
              </Reveal>
            );
          })}

          {/* ISPM 15 güven hücresi */}
          <Reveal delay={0.16} className="h-full">
            <div className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden border border-white/10 bg-surface p-7 lg:min-h-[320px]">
              <div className="tech-grid absolute inset-0 opacity-70" aria-hidden />
              <div className="glow-pulse pointer-events-none absolute -top-10 left-1/2 h-[200px] w-[300px] -translate-x-1/2 rounded-full bg-tan/10 blur-[80px]" />
              <span className="relative font-mono text-xs text-tan/60">09</span>
              <div className="relative">
                <p className="heading-display text-4xl text-tan drop-shadow-[0_0_24px_rgba(212,163,115,0.35)] md:text-5xl">
                  ISPM 15
                </p>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/60">
                  Isıl işlem sertifikalı
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/60">
                  Uluslararası sevkiyata hazır, gümrük standartlarında üretim.
                </p>
              </div>
            </div>
          </Reveal>

          {/* CTA hücresi — mozaiği tamamlar */}
          <Reveal delay={0.24} className="h-full">
            <a
              href="#iletisim"
              className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden border border-tan/40 bg-panel p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_60px_-18px_rgba(212,163,115,0.4)] lg:min-h-[320px]"
            >
              <div className="tech-grid absolute inset-0 opacity-60" aria-hidden />
              <span className="relative font-mono text-xs text-tan/70">10</span>
              <div className="relative">
                <span className="heading-display block text-2xl text-white md:text-3xl">
                  Aradığınız ölçü yok mu?
                </span>
                <span className="mt-3 block font-mono text-xs uppercase tracking-widest2 text-white/60">
                  Özel üretim için bize yazın
                </span>
              </div>
              <span
                aria-hidden
                className="absolute bottom-6 right-6 text-2xl text-tan transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
