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
  const initial = { opacity: 0, ...OFFSETS[direction] };
  const transition = { duration, delay, ease: EASE_EXPO };

  // Dış tetikleyici modu: intro gibi olaylar bitene kadar gizli kalır
  if (ready !== undefined) {
    return (
      <m.div
        className={className}
        initial={initial}
        animate={ready ? { opacity: 1, x: 0, y: 0 } : initial}
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
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={once ? VIEWPORT_ONCE : { margin: "-80px" }}
      transition={transition}
    >
      {children}
    </m.div>
  );
}
