"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

/** Sayfa kaydırıldığında beliren, en üste döndüren sabit buton. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href="#top"
          aria-label="Başa dön"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center border border-tan/40 bg-ink/90 text-tan backdrop-blur-sm transition-colors duration-300 hover:border-tan hover:bg-tan hover:text-ink md:bottom-8 md:right-8"
        >
          <span
            aria-hidden
            className="text-lg leading-none transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            ↑
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
