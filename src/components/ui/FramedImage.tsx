"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { EASE_EXPO } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Tailwind object-position değeri, ör. "object-[60%_center]" */
  position?: string;
};

/**
 * Bronz köşe braketli, grenli ve alt yazılı görsel çerçevesi.
 * Ekrana girerken yumuşak oturma zoom'u, hover'da ek zoom (CSS).
 */
export default function FramedImage({
  src,
  alt,
  caption,
  className = "border-ivory/10",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <figure
      className={`group relative overflow-hidden border bg-panel ${className}`}
    >
      <m.div
        initial={reduce ? undefined : { scale: 1.1 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: EASE_EXPO }}
        className="absolute inset-0 overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${position ?? ""}`}
        />
      </m.div>

      <div className="grain pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />

      {/* Bronz köşe braketleri */}
      <span className="frame-corners pointer-events-none absolute inset-0" />

      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-5 md:p-6">
          <span className="label-industrial text-xs md:text-sm">{caption}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/50">
            PP—TR
          </span>
        </figcaption>
      )}
    </figure>
  );
}
