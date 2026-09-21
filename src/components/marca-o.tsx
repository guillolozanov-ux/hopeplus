"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { piezasLogo } from "@/components/intro-logo";

// La "o" del logo hope+: el anillo y la mano que lo sostiene
const anillo = piezasLogo.filter((p) => p.tipo === "letra" && p.d.startsWith("M859.4"));
const mano = piezasLogo.filter((p) => p.tipo === "mano");
const CENTRO = "818.5 536";

/**
 * Símbolo de marca: el anillo gira hasta su lugar y la mano sube a sostenerlo
 * al entrar en pantalla; después la mano se mece despacio.
 */
export function MarcaO({ className, titulo }: { className?: string; titulo?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
        tl.from("[data-anillo]", { rotate: -200, svgOrigin: CENTRO, autoAlpha: 0, duration: 1.6, ease: "expo.out" })
          .from("[data-mano]", { y: 40, rotate: -12, svgOrigin: "818 610", autoAlpha: 0, duration: 1.2, ease: "back.out(1.6)" }, 0.35)
          .to("[data-mano]", { rotate: 6, svgOrigin: "818 610", duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="738 455 161 161"
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <g data-anillo>
        {anillo.map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} />
        ))}
      </g>
      <g data-mano>
        {mano.map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} />
        ))}
      </g>
    </svg>
  );
}
