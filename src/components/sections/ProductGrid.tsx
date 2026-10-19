"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import ProductModal from "@/components/ui/ProductModal";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { CATEGORY_LABELS, type Product } from "@/types/palette";

export default function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="urunler" className="bg-ink py-32 md:py-40">
      <div className="container-editorial">
        <Reveal className="mb-16 max-w-2xl">
          <p className="label-industrial mb-6">
            <span className="section-num mr-3">01</span>Ürün Kataloğu
          </p>
          <h2 className="heading-display text-3xl text-white md:text-5xl">
            Ürünlerimiz
          </h2>
          <p className="mt-6 font-light leading-relaxed text-white/60">
            Stoklarımızdaki ürün çeşitliliği ile belirlenen zaman çizelgesi
            dahilinde, ekonomik ve garantili ürün hizmeti.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 0.08} className="h-full">
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
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty(
                    "--mx",
                    `${event.clientX - rect.left}px`
                  );
                  event.currentTarget.style.setProperty(
                    "--my",
                    `${event.clientY - rect.top}px`
                  );
                }}
                className="group relative flex h-full cursor-pointer flex-col border border-white/10 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-tan/40 hover:bg-panel hover:shadow-[0_14px_44px_-12px_rgba(212,163,115,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-tan/50"
              >
                {/* Fareyi takip eden bronz ışıma */}
                <span className="spot-card pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Köşe braketleri */}
                <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-tan/0 transition-all duration-300 group-hover:border-tan" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-tan/0 transition-all duration-300 group-hover:border-tan" />

                {/* Hover'da ışık süpürmesi */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ease-out group-hover:left-full" />
                </span>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-tan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="border border-tan/30 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-tan">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                  {product.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-white/70">
                  {product.subtitle}
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-white/60">
                  {product.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <span className="h-px w-4 bg-tan" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-8">
                  <span className="font-mono text-xs text-white/40">
                    {product.year}
                  </span>
                  <span className="text-sm font-semibold text-tan transition-transform duration-300 group-hover:translate-x-1">
                    Detay →
                  </span>
                </div>
              </m.article>
            </Reveal>
          ))}

          {/* CTA hücresi — grid'i dengeler */}
          <Reveal delay={0.16} className="h-full">
            <a
              href="#iletisim"
              className="group relative flex h-full flex-col justify-between overflow-hidden border border-tan/40 bg-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_-12px_rgba(212,163,115,0.35)]"
            >
              <div className="tech-grid absolute inset-0 opacity-60" aria-hidden />
              <span className="relative font-mono text-xs text-tan/70">08</span>
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
