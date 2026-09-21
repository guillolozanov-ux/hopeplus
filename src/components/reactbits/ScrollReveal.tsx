"use client";

/**
 * ScrollReveal — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: la limpieza solo mata sus propios ScrollTriggers (el original mataba
 * todos los de la página), marcado válido (antes <p> dentro de <h2>) y
 * respeto a prefers-reduced-motion.
 */
import { useMemo, useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
};

export default function ScrollReveal({
  children,
  as: Tag = "p",
  className,
  wordClassName,
  baseOpacity = 0.12,
  baseRotation = 2,
  blurStrength = 4,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((w, i) =>
        /^\s+$/.test(w) ? (
          w
        ) : (
          <span className={wordClassName} data-word key={i} style={{ display: "inline-block" }}>
            {w}
          </span>
        ),
      ),
    [children, wordClassName],
  );

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = el.querySelectorAll("[data-word]");
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          { rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 60%", scrub: true } },
        );
        gsap.fromTo(
          targets,
          { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {words}
    </Tag>
  );
}
