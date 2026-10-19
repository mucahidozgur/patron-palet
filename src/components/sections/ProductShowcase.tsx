"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ProductModal from "@/components/ui/ProductModal";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { products } from "@/data/products";
import { CATEGORY_LABELS, type Product } from "@/types/palette";

export default function ProductShowcase() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="urunler" className="relative overflow-hidden bg-pure py-32 text-void">
      {/* Bölüm indeksi */}
      <span
        aria-hidden
        className="heading-display text-outline-dark pointer-events-none absolute right-6 top-10 select-none text-[18vw] leading-none opacity-25 lg:right-12"
      >
        02
      </span>

      <div className="container-industrial relative">
        <Reveal>
          <p className="label-tech-dark">ÜRÜN VİTRİNİ — 02</p>
        </Reveal>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.08}>
            <h2 className="heading-display text-4xl md:text-6xl lg:text-7xl">
              PALETLERİMİZ
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-mono text-xs tracking-[0.25em] text-smoke">
              07 — KOLEKSİYON / 2025
            </p>
          </Reveal>
        </div>

        {/* Bento grid: ilk ürün 2x2, diğerleri 1x1 + CTA karosu */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          {products.map((product, i) => {
            const isBig = i === 0;
            const isSelected = selected?.id === product.id;
            return (
              <Reveal
                key={product.id}
                delay={(i % 4) * 0.08}
                className={isBig ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                {isSelected ? (
                  /* Modal açıkken kartın yerini tutan statik alan —
                     layoutId çakışmasını önler, morph geri dönüşünü sağlar */
                  <div
                    aria-hidden
                    className="relative h-full min-h-[220px] w-full overflow-hidden lg:min-h-0"
                    style={{ background: product.gradient }}
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <TiltCard className="h-full">
                    <m.button
                      layoutId={`product-card-${product.id}`}
                      onClick={() => setSelected(product)}
                      transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
                      className="group relative block h-full min-h-[220px] w-full overflow-hidden text-left lg:min-h-0"
                      style={{ borderRadius: 4 }}
                      aria-haspopup="dialog"
                    >
                      {/* Fotoğraf — hover'da yakınlaşır */}
                      <div className="absolute inset-0" style={{ background: product.gradient }}>
                        {product.image && (
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        )}
                        {/* Okunabilirlik karartması */}
                        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-void/10 transition-colors duration-500 group-hover:from-void/95 group-hover:via-void/40" />
                      </div>

                      {/* Üst satır: numara + İNCELE */}
                      <span className="absolute left-5 top-5 font-mono text-xs text-ivory/60">
                        0{i + 1}
                      </span>
                      <span className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100">
                        İNCELE <span aria-hidden>→</span>
                      </span>

                      {/* Alt satır: başlık + kategori */}
                      <span className="absolute inset-x-5 bottom-5 block">
                        <span className="block font-display text-xl font-bold uppercase tracking-tight text-ivory transition-transform duration-500 group-hover:-translate-y-1 md:text-2xl">
                          {product.title}
                        </span>
                        <span
                          className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.25em]"
                          style={{ color: product.accent }}
                        >
                          {CATEGORY_LABELS[product.category]}
                        </span>
                      </span>
                    </m.button>
                  </TiltCard>
                )}
              </Reveal>
            );
          })}

          {/* CTA karosu — grid'i doldurur */}
          <Reveal delay={0.24} direction="up">
            <a
              href="#iletisim"
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden bg-electric p-6 text-void transition-colors duration-300 hover:bg-void hover:text-pure lg:min-h-0"
            >
              <span className="font-mono text-xs text-void/60 transition-colors duration-300 group-hover:text-pure/50">
                08
              </span>
              <div>
                <span className="block font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
                  Aradığınız ölçü yok mu?
                </span>
                <span className="mt-3 block font-mono text-xs uppercase tracking-[0.2em] text-void/70 transition-colors duration-300 group-hover:text-pure/60">
                  Özel üretim için bize yazın
                </span>
              </div>
              <span
                aria-hidden
                className="absolute bottom-6 right-6 text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* Saha levhası — çerçeveli, geniş fotoğraf */}
        <Reveal className="mt-16 md:mt-24">
          <figure className="group relative overflow-hidden border border-void/10">
            <div className="relative aspect-[16/7] md:aspect-[21/8]">
              <Image
                src="/images/site/saha-2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent"
              />
              <span className="absolute left-5 top-5 font-mono text-xs text-ivory/70">
                FIG. 01 — SAHA
              </span>
              <figcaption className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4">
                <span className="font-display text-lg font-bold uppercase tracking-tight text-pure md:text-2xl">
                  Stok Sahası — Ankara
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ivory/70">
                  39.85° N — 32.64° E
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
