import Image from "next/image";

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
 * Hover'da görsel yumuşakça yakınlaşır (CSS, JS gerektirmez).
 */
export default function FramedImage({
  src,
  alt,
  caption,
  className = "border-white/10",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  position,
}: Props) {
  return (
    <figure
      className={`group relative overflow-hidden border bg-panel ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${position ?? ""}`}
        />
      </div>

      <div className="grain pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />

      {/* Bronz köşe braketleri */}
      <span className="frame-corners pointer-events-none absolute inset-0" />

      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-5 md:p-6">
          <span className="label-industrial text-xs md:text-sm">{caption}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            PP—TR
          </span>
        </figcaption>
      )}
    </figure>
  );
}
