"use client";

import * as m from "motion/react-m";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { EASE_EXPO } from "@/lib/motion";
import { CATEGORY_LABELS, type Product } from "@/types/palette";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

/**
 * Ürün detay penceresi — bronz çerçeveli panel.
 * ESC veya ✕ ile kapanır; açıkken sayfa kaydırması kilitlenir,
 * odak pencerede tutulur (odak tuzağı).
 */
export default function ProductModal({ product, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (
        event.shiftKey &&
        (active === first || !modalRef.current?.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || !modalRef.current?.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <m.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/95 backdrop-blur-sm"
    >
      <div className="container-editorial flex min-h-full items-center py-16">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE_EXPO }}
          className="w-full max-w-3xl overflow-hidden border border-tan/20 bg-surface shadow-[0_0_60px_-16px_rgba(212,163,115,0.3)]"
        >
          {/* Görsel banner */}
          {product.image && (
            <div className="group relative h-52 overflow-hidden md:h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="grain pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-ink/10" />
              <span className="frame-corners pointer-events-none absolute inset-0" />
              <span className="heading-display absolute bottom-5 left-6 text-2xl text-white md:text-3xl">
                {product.title}
              </span>
              <span className="absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                PP—TR
              </span>
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between">
              <p className="label-industrial">{CATEGORY_LABELS[product.category]}</p>
              <span className="font-mono text-xs text-white/40">
                {product.year}
              </span>
            </div>

            <p className="mt-4 font-mono text-sm text-white/70">
              {product.subtitle}
            </p>
            <p className="mt-5 font-light leading-relaxed text-white/70">
              {product.description}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="border border-white/10 bg-ink/60 px-4 py-3 text-sm text-white/90"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <dl className="mt-8 border border-white/10">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-white/10 px-4 py-3 last:border-b-0"
                >
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                    {spec.label}
                  </dt>
                  <dd className="font-mono text-xs font-medium text-tan">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#iletisim"
                onClick={onClose}
                className="btn-sheen bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-caramel hover:shadow-[0_0_32px_rgba(212,163,115,0.5)]"
              >
                Teklif Al →
              </a>
              <button
                type="button"
                onClick={onClose}
                className="text-sm font-semibold uppercase tracking-widest2 text-white/70 transition-colors duration-300 hover:text-tan"
              >
                Kapat
              </button>
            </div>
          </div>
        </m.div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute right-6 top-6 z-10 text-2xl text-white transition-colors duration-300 hover:text-tan"
      >
        ✕
      </button>
    </m.div>
  );
}
