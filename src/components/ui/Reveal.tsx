"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { EASE_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** Dış tetikleyici (örn. açılış intro'su) — verildiğinde whileInView yerine animate kullanılır */
  ready?: boolean;
}

/**
 * Tekrar kullanılabilir scroll-reveal sarmalayıcı.
 * Hafif ölçek büyümesiyle (0.97 → 1) derinlikli geçiş verir.
 * Yalnızca transform + opacity canlandırır (GPU dostu).
 * MotionConfig reducedMotion="user" sayesinde hareket azaltma
 * tercihinde otomatik olarak yalnızca fade'e düşer.
 */
export default function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  ready,
}: RevealProps) {
  const initial = { opacity: 0, scale: 0.97, ...OFFSETS[direction] };
  const target = { opacity: 1, x: 0, y: 0, scale: 1 };
  const transition = { duration, delay, ease: EASE_EXPO };

  // Dış tetikleyici modu: intro gibi olaylar bitene kadar gizli kalır
  if (ready !== undefined) {
    return (
      <m.div
        className={className}
        initial={initial}
        animate={ready ? target : initial}
        transition={transition}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      className={className}
      initial={initial}
      whileInView={target}
      viewport={once ? VIEWPORT_ONCE : { margin: "-80px" }}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
