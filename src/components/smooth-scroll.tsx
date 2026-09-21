"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Instancia compartida para que la intro pueda pausar el scroll. */
export let lenis: Lenis | null = null;

/** Scroll suave con Lenis, sincronizado con el reloj de GSAP y ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instancia = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    lenis = instancia;
    if (document.documentElement.classList.contains("con-intro")) instancia.stop();
    instancia.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instancia.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instancia.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
