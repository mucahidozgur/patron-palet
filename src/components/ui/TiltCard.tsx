"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maksimum dönüş açısı (derece) */
  max?: number;
}

/**
 * İmleci takip eden 3D kart eğimi — yalnızca hassas işaretçilerde,
 * spring tabanlı motion value ile (React state yok, GPU dostu).
 */
export default function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 150, damping: 18, mass: 0.3 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18, mass: 0.3 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 2 * max);
    rotateY.set(px * 2 * max);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 900 }}>
      <m.div
        ref={ref}
        className={className}
        style={{ rotateX, rotateY }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {children}
      </m.div>
    </div>
  );
}
