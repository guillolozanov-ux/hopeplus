"use client";

/**
 * TiltedCard — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: recibe children en lugar de una imagen fija, sin aviso de móvil,
 * inclinación solo con puntero fino y etiqueta flotante opcional.
 */
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  caption?: string;
  className?: string;
  captionClassName?: string;
  amplitude?: number;
  scaleOnHover?: number;
};

const spring = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  children,
  caption,
  className,
  captionClassName,
  amplitude = 10,
  scaleOnHover = 1.04,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);
  const opacity = useSpring(0);
  const rotateCaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const lastY = useRef(0);

  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !fine()) return;
    const r = ref.current.getBoundingClientRect();
    const ox = e.clientX - r.left - r.width / 2;
    const oy = e.clientY - r.top - r.height / 2;
    rotateX.set((oy / (r.height / 2)) * -amplitude);
    rotateY.set((ox / (r.width / 2)) * amplitude);
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    rotateCaption.set(-(oy - lastY.current) * 0.6);
    lastY.current = oy;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 800, position: "relative" }}
      onMouseMove={onMove}
      onMouseEnter={() => {
        if (!fine()) return;
        scale.set(scaleOnHover);
        opacity.set(1);
      }}
      onMouseLeave={() => {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateCaption.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", height: "100%" }}>{children}</motion.div>
      {caption && (
        <motion.span
          aria-hidden
          className={captionClassName}
          style={{ x, y, opacity, rotate: rotateCaption, position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
        >
          {caption}
        </motion.span>
      )}
    </div>
  );
}
