"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { curva, resorte } from "@/styles/tokens";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, DrawSVGPlugin, Flip, CustomEase, useGSAP);

// Curvas de marca disponibles por nombre en cualquier tween: ease: "inOutFuerte"
Object.entries(curva).forEach(([nombre, valores]) => CustomEase.create(nombre, valores));

/**
 * Curva de resorte amortiguado (masa-resorte subamortiguado), muestreada como
 * trazado SVG para CustomEase. x(t) = 1 − e^(−ζωt)·(cos ωd·t + ζω/ωd · sin ωd·t)
 */
function trazadoResorte(zeta: number, muestras = 120) {
  const omega = 1;
  const omegaD = omega * Math.sqrt(1 - zeta * zeta);
  // Duración normalizada: hasta que la envolvente cae por debajo de 0,2 %
  const tFin = -Math.log(0.002) / (zeta * omega);
  const puntos: string[] = [];
  for (let i = 0; i <= muestras; i++) {
    const t = (i / muestras) * tFin;
    const env = Math.exp(-zeta * omega * t);
    const x = 1 - env * (Math.cos(omegaD * t) + ((zeta * omega) / omegaD) * Math.sin(omegaD * t));
    puntos.push(`${(i / muestras).toFixed(4)},${x.toFixed(4)}`);
  }
  return `M${puntos[0]} L${puntos.slice(1).join(" ")}`;
}

CustomEase.create("resorte", trazadoResorte(resorte.amortiguacion));

gsap.defaults({ ease: "expo.out", duration: 1.1 });

/** Media query compartida para respetar `prefers-reduced-motion`. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, Draggable, Flip, useGSAP };
