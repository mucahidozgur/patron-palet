"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * Scroll'da devreye giren sayı sayacı.
 * Hareket azaltma tercihinde animasyonsuz, doğrudan son değeri gösterir.
 */
export default function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduce) {
      el.textContent = `${prefix}${to.toLocaleString("tr-TR")}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        el.textContent = `${prefix}${Math.round(value).toLocaleString("tr-TR")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
