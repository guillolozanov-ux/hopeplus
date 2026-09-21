"use client";

/**
 * ScrollVelocity — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: VelocityText fuera del componente padre (antes se re-montaba en cada
 * render), estilos por className y separador propio entre copias.
 */
import { useRef, useLayoutEffect, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

type RowProps = {
  children: ReactNode;
  baseVelocity: number;
  copies: number;
  rowClassName?: string;
  trackClassName?: string;
};

function useWidth(ref: React.RefObject<HTMLElement | null>) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const update = () => ref.current && setW(ref.current.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function VelocityRow({ children, baseVelocity, copies, rowClassName, trackClassName }: RowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useWidth(copyRef);
  const x = useTransform(baseX, (v) => (copyWidth ? `${wrap(-copyWidth, 0, v)}px` : "0px"));
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={rowClassName}>
      <motion.div className={trackClassName} style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} ref={i === 0 ? copyRef : undefined} aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

type Props = {
  texts: ReactNode[];
  velocity?: number;
  copies?: number;
  rowClassNames?: string[];
  trackClassName?: string;
};

export default function ScrollVelocity({ texts, velocity = 60, copies = 6, rowClassNames = [], trackClassName }: Props) {
  return (
    <>
      {texts.map((t, i) => (
        <VelocityRow
          key={i}
          baseVelocity={i % 2 ? -velocity : velocity}
          copies={copies}
          rowClassName={rowClassNames[i]}
          trackClassName={trackClassName}
        >
          {t}
        </VelocityRow>
      ))}
    </>
  );
}
