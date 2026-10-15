import type { Variants } from "motion/react";

/** Flux-edişimsi editorial easing — sakin, ağır, sinematik */
export const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reveal'lar için ortak viewport ayarı:
 *  -80px marj, eleman ekrana girmeden hemen önce tetikler */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_EXPO } },
};

/** Üst bileşen: çocukları toplu, kademeli oynatır */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Alt bileşen: yalnızca varyant tanımlar, zamanlamayı üst bileşen verir */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
};
