"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Motion altyapısı — tek sarmalayıcı, tüm uygulama genelinde:
 * - LazyMotion + domMax: ilk render ~5kB, geri kalanı tembel yüklenir.
 * - strict: tüm bileşenler "motion/react-m" (m.*) kullanmalı.
 * - reducedMotion="user": sistem tercihinde transform animasyonları
 *   otomatik devre dışı kalır, yalnızca opaklık kalır (WCAG 2.3.3).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
