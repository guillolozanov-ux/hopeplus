"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { PLUS_CENTRADO } from "@/components/intro-logo";

/** El "+" del logo que gira y late con el scroll. */
export function PlusGiro({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { rotate: -90, scale: 0.6 },
          { rotate: 90, scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <svg ref={ref} viewBox="-64 -64 128 128" className={className} aria-hidden>
      <path d={PLUS_CENTRADO} fill="currentColor" />
    </svg>
  );
}
