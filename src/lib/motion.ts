import type { Variants } from "motion/react";

/** serdar1-edişimsi editorial easing — sakin, ağır, sinematik */
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

/** Başlık kelimeleri: kademeli yükseliş */
export const wordContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.15 },
  },
};

export const wordFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
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
