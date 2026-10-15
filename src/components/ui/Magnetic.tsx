"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Mıknatıs gücü (0–1) */
  strength?: number;
}

/**
 * Butonları imlece doğru hafifçe çeken mıknatıs efekti.
 * React state kullanmaz — yalnızca spring tabanlı motion value
 * (performans). Dokunmatik cihazlarda ve hareket azaltmada kapalı.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useSpring(0, { stiffness: 180, damping: 15, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 15, mass: 0.2 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </m.div>
  );
}
