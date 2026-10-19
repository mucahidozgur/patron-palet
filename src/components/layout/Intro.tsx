"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Açılış sahnesi — logo ekranın ortasında belirir, 3 saniye kalır,
 * ardından header'daki yerine (sol üst) uçarak oturur.
 * Hero ve Header, intro bitene kadar bekler (useIntroDone).
 */
const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

/** Logo ortada kalma süresi (ms) */
const HOLD_MS = 3000;
/** Merkez → sol üst uçuş süresi (ms) */
const FLIGHT_MS = 850;

interface FlyTarget {
  x: number;
  y: number;
  scale: number;
}

export default function IntroGate({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const [fly, setFly] = useState<FlyTarget | null>(null);
  const reduce = useReducedMotion();
  const flyRef = useRef<HTMLDivElement>(null);

  // Açılış boyunca sayfa kaydırmasını kilitle
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  // 3 sn sonra header logosunun konumunu ölçüp uçuşu başlat
  useEffect(() => {
    const flyTimer = setTimeout(() => {
      const target = document.getElementById("brand-anchor");
      const el = flyRef.current;
      if (!reduce && target && el) {
        const t = target.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        setFly({
          x: t.left - r.left,
          y: t.top - r.top,
          scale: t.width / r.width,
        });
      } else {
        // Hareket azaltma ya da hedef yoksa: yerinde çözünür (yalnızca fade)
        setFly({ x: 0, y: 0, scale: 1 });
      }
    }, HOLD_MS);
    const doneTimer = setTimeout(() => setDone(true), HOLD_MS + FLIGHT_MS + 160);
    return () => {
      clearTimeout(flyTimer);
      clearTimeout(doneTimer);
    };
  }, [reduce]);

  return (
    <IntroContext.Provider value={done}>
      {children}

      {!done && (
        <div
          aria-hidden
          className="fixed inset-0 z-[100] bg-ink"
          style={{ pointerEvents: fly ? "none" : "auto" }}
        >
          {/* Sahne dokusu — uçuş sırasında çözülür */}
          <m.div
            className="absolute inset-0"
            animate={{ opacity: fly ? 0 : 1 }}
            transition={{ duration: FLIGHT_MS / 1000, ease: "easeInOut" }}
          >
            <div className="tech-grid absolute inset-0 opacity-60" />
            <div className="grain absolute inset-0 opacity-[0.14]" />
            {/* Çift ışık nabzı: yosun + ahşap */}
            <div className="glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss/20 blur-[120px]" />
            <div
              className="glow-pulse pointer-events-none absolute left-[32%] top-[60%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tan/15 blur-[100px]"
              style={{ animationDelay: "1.5s" }}
            />
          </m.div>

          {/* Logo kilidi: header logosunun 2 katı (uçuşta ölçeklenir) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <m.div
              ref={flyRef}
              className="flex items-center gap-6"
              style={{ transformOrigin: fly ? "top left" : "center" }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                fly
                  ? { x: fly.x, y: fly.y, scale: fly.scale, opacity: 1 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                fly
                  ? { duration: FLIGHT_MS / 1000, ease: [0.65, 0, 0.35, 1] }
                  : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {/* Dairesel logo: dönen kesikli halka + ahşap parıltı */}
              <span className="relative block h-[88px] w-[88px] shrink-0">
                <span
                  aria-hidden
                  className="animate-spin-slow absolute -inset-2 rounded-full border border-dashed border-tan/70"
                />
                <span
                  aria-hidden
                  className="glow-pulse absolute inset-0 rounded-full bg-tan/20 blur-lg"
                />
                <Image
                  src="/logopatron.jpeg"
                  alt="TR Patron Palet"
                  width={88}
                  height={88}
                  priority
                  className="relative h-full w-full rounded-full object-cover ring-2 ring-tan/60 shadow-[0_0_44px_rgba(223,168,108,0.55)]"
                />
              </span>
              <div className="flex flex-col gap-6 text-[40px]">
                <div className="flex items-center gap-6">
                  <span className="tr-badge">TR</span>
                  <span className="logo-shimmer bg-gradient-to-r from-tan via-moss to-tan bg-clip-text font-display font-bold leading-none tracking-[0.2em] text-transparent drop-shadow-[0_0_24px_rgba(223,168,108,0.55)]">
                    PATRON PALET
                  </span>
                </div>
                <m.span
                  className="font-mono text-[22px] uppercase tracking-[0.3em] text-ivory/45"
                  animate={{ opacity: fly ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Ahşap Palet Üretimi — MMXXVI
                </m.span>
              </div>
            </m.div>
          </div>

          {/* 3 saniyelik dolum hattı */}
          <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center">
            <m.span
              className="h-px w-56 bg-gradient-to-r from-transparent via-moss to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, opacity: fly ? 0 : 1 }}
              transition={{
                scaleX: {
                  duration: (HOLD_MS - 200) / 1000,
                  delay: 0.2,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.3 },
              }}
            />
          </div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
