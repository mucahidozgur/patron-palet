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
 * Açılış animasyonu — logo ekranın ortasında belirir, 3 saniye kalır,
 * ardından header'daki yerine (sol üst) uçarak oturur.
 * Hero içeriği intro bitene kadar bekler (useIntroDone).
 */
const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);

/** Logo ortada kalma süresi (ms) */
const HOLD_MS = 3000;
/** Merkez → sol üst uçuş süresi (ms) */
const FLY_MS = 800;

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
    const doneTimer = setTimeout(() => setDone(true), HOLD_MS + FLY_MS + 200);
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
          className="fixed inset-0 z-[100]"
          style={{ pointerEvents: fly ? "none" : "auto" }}
        >
          {/* Zemin + elektrik parıltısı — uçuş sırasında çözülür */}
          <m.div
            className="absolute inset-0"
            animate={fly ? { opacity: 0 } : { opacity: 1 }}
            transition={
              fly
                ? { duration: 0.45, delay: 0.35, ease: "easeInOut" }
                : { duration: 0 }
            }
          >
            <div className="absolute inset-0 bg-void" />
            <div className="absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_50%,#FF3D0018_0%,transparent_70%)]" />
          </m.div>

          {/* Logo — merkezde doğar, header logosunun üstüne konar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="scale-[1.35] sm:scale-[1.7]">
              <m.div
                ref={flyRef}
                className="flex items-center gap-3"
                style={{ transformOrigin: fly ? "top left" : "center" }}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={
                  fly
                    ? { x: fly.x, y: fly.y, scale: fly.scale, opacity: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={
                  fly
                    ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {/* Header logosu ile birebir aynı yapı — kusursuz morph */}
                <span className="flex h-10 w-10 items-center justify-center border border-pure/15 bg-ash/50 p-1.5">
                  <Image
                    src="/logopatron-alpha.png"
                    alt="TR Patron Palet"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="flex items-center gap-2">
                  <span className="border border-electric/70 bg-electric/10 px-1.5 py-0.5 font-display text-[0.7rem] font-bold tracking-[0.25em] text-electric">
                    TR
                  </span>
                  <span className="hidden font-display text-sm font-bold tracking-[0.3em] text-pure sm:block">
                    PATRON PALET
                  </span>
                </span>
              </m.div>
            </div>
          </div>

          {/* Alt satır: ilerleme çizgisi + konum — zeminle birlikte kaybolur */}
          <m.div
            className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={fly ? { opacity: 0 } : { opacity: 1 }}
            transition={
              fly
                ? { duration: 0.3, ease: "easeInOut" }
                : { duration: 0.5, delay: 0.5 }
            }
          >
            <m.span
              className="h-px w-44 origin-left bg-electric/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, delay: 0.2, ease: "linear" }}
            />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-smoke">
              ANKARA — TÜRKİYE GENELİ
            </span>
          </m.div>
        </div>
      )}
    </IntroContext.Provider>
  );
}
