"use client";

/**
 * Magnet — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: se desactiva en pantallas táctiles y con prefers-reduced-motion;
 * transform directo al DOM (sin re-render por cada mousemove).
 */
import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; padding?: number; strength?: number; className?: string };

export default function Magnet({ children, padding = 60, strength = 3, className }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const active = Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding;
      inner.style.transition = active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out";
      inner.style.transform = active
        ? `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`
        : "translate3d(0,0,0)";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <span ref={wrapRef} className={className} style={{ display: "inline-block" }}>
      <span ref={innerRef} style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </span>
    </span>
  );
}
