"use client";

/**
 * CountUp — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: formato numérico es-CO (punto de miles), sin callbacks.
 */
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

type Props = { to: number; from?: number; duration?: number; delay?: number; className?: string };

const fmt = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

export default function CountUp({ to, from = 0, duration = 2, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useMotionValue(from);
  const spring = useSpring(value, { damping: 20 + 40 * (1 / duration), stiffness: 100 * (1 / duration) });
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ref.current) ref.current.textContent = fmt.format(to);
      return;
    }
    const id = setTimeout(() => value.set(to), delay * 1000);
    return () => clearTimeout(id);
  }, [inView, to, delay, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = fmt.format(Math.round(v));
      }),
    [spring],
  );

  return (
    <span className={className} ref={ref}>
      {fmt.format(from)}
    </span>
  );
}
