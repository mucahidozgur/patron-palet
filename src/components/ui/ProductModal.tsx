"use client";

import * as m from "motion/react-m";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CATEGORY_LABELS, type Product } from "@/types/palette";

interface ProductModalProps {
  product: Product;
  index: number;
  onClose: () => void;
}

/**
 * Tam ekran ürün modalı — karttan morph ile açılır (layoutId).
 * ESC veya ✕ ile kapanır; açıkken sayfa kaydırması kilitlenir.
 */
export default function ProductModal({ product, index, onClose }: ProductModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <m.div
      layoutRoot
      className="fixed inset-0 z-[70] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Karartma */}
      <div
        aria-hidden
        className="fixed inset-0 bg-void/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
        <m.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${product.id}`}
          layoutId={`product-card-${product.id}`}
          layoutScroll
          transition={{ type: "spring", bounce: 0.18, duration: 0.6 }}
          className="relative grid w-full max-w-5xl overflow-hidden bg-pure text-void md:grid-cols-2"
          style={{ borderRadius: 8 }}
        >
          {/* Sol: görsel panel */}
          <div
            className="relative min-h-[240px] overflow-hidden md:min-h-[520px]"
            style={{ background: product.gradient }}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent" />
            <span className="absolute left-6 top-6 font-mono text-xs text-white/60">
              NO. {String(index + 1).padStart(2, "0")}
            </span>
            <m.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="heading-display absolute inset-x-6 bottom-6 block text-3xl font-bold text-pure md:text-5xl"
            >
              {product.title}
            </m.span>
          </div>

          {/* Sağ: içerik */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col p-8 md:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <p className="label-tech-dark">{CATEGORY_LABELS[product.category]}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="-mt-2 flex h-10 w-10 shrink-0 items-center justify-center border border-void/15 transition-colors duration-300 hover:border-electric hover:text-electric"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <h3
              id={`modal-title-${product.id}`}
              className="mt-4 font-display text-xl font-semibold tracking-tight"
            >
              {product.subtitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-smoke">
              {product.description}
            </p>

            <ul className="mt-8 space-y-3 border-t border-void/10 pt-8">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]"
                >
                  <span aria-hidden className="text-electric">
                    ▸
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <dl className="mt-8 border-t border-void/10">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-void/10 py-3"
                >
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-smoke">
                    {spec.label}
                  </dt>
                  <dd className="font-mono text-xs font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#iletisim"
              onClick={onClose}
              className="mt-10 block bg-electric px-8 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-pure transition-colors duration-300 hover:bg-void"
            >
              TEKLİF AL
            </a>
          </m.div>
        </m.div>
      </div>
    </m.div>
  );
}
