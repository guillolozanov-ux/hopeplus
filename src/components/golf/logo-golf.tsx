"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { piezasGolf, PLUS_GOLF, VIEWBOX_GOLF } from "./logo-golf-piezas";
import s from "./logo-golf.module.css";

type Props = {
  className?: string;
  /** "revelar": arranca cuando se abre el velo de la página; "scroll": al entrar en pantalla. */
  disparo?: "revelar" | "scroll";
  retraso?: number;
  titulo?: string;
};

const de = (tipo: string) => piezasGolf.filter((p) => p.tipo === tipo);
const monograma = de("monograma")[0];

/**
 * Logo Hope Golf Tour que se arma solo, en el mismo espíritu que la intro de hope+:
 * 1. la "HG" del centro se traza y se rellena,
 * 2. el "+" pequeño aparece encendido en naranja y se apaga a crema,
 * 3. HOPE y GOLF salen desde el monograma hacia los lados,
 * 4. y al final aparece TOUR.
 * Con movimiento reducido se muestra quieto y completo.
 */
export function LogoGolf({ className, disparo = "revelar", retraso = 0, titulo = "Hope Golf Tour" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({
          paused: true,
          delay: retraso,
          defaults: { ease: "expo.out" },
          scrollTrigger: disparo === "scroll" ? { trigger: ref.current, start: "top 80%", once: true } : undefined,
        });

        // Estado inicial: solo existe el trazo del monograma, sin dibujar
        gsap.set(q("[data-relleno]"), { fillOpacity: 0 });
        gsap.set(q("[data-trazo]"), { drawSVG: "100% 100%", autoAlpha: 1 });
        gsap.set(q("[data-tipo='palo']"), { autoAlpha: 0, rotate: -35, svgOrigin: "900 160" });
        gsap.set(q("[data-tipo='plus']"), { scale: 0, svgOrigin: `${PLUS_GOLF.x} ${PLUS_GOLF.y}` });
        gsap.set(q("[data-plus-brillo]"), { autoAlpha: 0, scale: 0, svgOrigin: `${PLUS_GOLF.x} ${PLUS_GOLF.y}` });
        gsap.set(q("[data-tipo='hope']"), { autoAlpha: 0, x: 90 });
        gsap.set(q("[data-tipo='golf']"), { autoAlpha: 0, x: -90 });
        gsap.set(q("[data-tipo='tour']"), { autoAlpha: 0, y: 18 });

        tl
          // 1. el monograma se traza y se llena
          .to(q("[data-trazo]"), { drawSVG: "0% 100%", duration: 1.6, ease: "power2.inOut" }, 0)
          .to(q("[data-tipo='monograma']"), { fillOpacity: 1, duration: 0.9, ease: "power2.out" }, 1.1)
          .to(q("[data-trazo]"), { autoAlpha: 0, duration: 0.6 }, 1.5)
          .to(q("[data-tipo='palo']"), { autoAlpha: 1, rotate: 0, fillOpacity: 1, duration: 1, ease: "back.out(1.6)" }, 1.2)
          // 2. solo el "+" se ilumina en naranja y se apaga a crema
          .to(q("[data-plus-brillo]"), { autoAlpha: 1, scale: 1.25, duration: 0.5, ease: "back.out(2)" }, 1.9)
          .to(q("[data-tipo='plus']"), { scale: 1, fillOpacity: 1, duration: 0.7, ease: "back.out(2.2)" }, 1.9)
          .to(q("[data-plus-brillo]"), { autoAlpha: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 2.6)
          // 3. las palabras nacen del centro hacia los lados
          .to(q("[data-tipo='hope']"), { autoAlpha: 1, x: 0, fillOpacity: 1, duration: 1.3, stagger: { each: 0.08, from: "end" } }, 2.4)
          .to(q("[data-tipo='golf']"), { autoAlpha: 1, x: 0, fillOpacity: 1, duration: 1.3, stagger: { each: 0.08, from: "start" } }, 2.4)
          // 4. TOUR, de último
          .to(q("[data-tipo='tour']"), { autoAlpha: 1, y: 0, fillOpacity: 1, duration: 1, stagger: 0.1 }, 3.2);

        if (disparo === "revelar") return alRevelar(() => tl.play());
        if (!tl.scrollTrigger) tl.play();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} className={`${s.logo} ${className ?? ""}`} viewBox={VIEWBOX_GOLF} role="img" aria-label={titulo}>
      <defs>
        <filter id={`brillo${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {piezasGolf.map((p, i) => (
        <path key={i} d={p.d} className={s.pieza} data-tipo={p.tipo} data-relleno />
      ))}

      {/* Trazo crema que dibuja el monograma antes de rellenarse */}
      <path d={monograma.d} className={s.trazo} data-trazo />
      {/* Halo naranja del "+" al encenderse */}
      <g className={s.plusBrillo} filter={`url(#brillo${id})`} data-plus-brillo>
        {de("plus").map((p, i) => (
          <path key={i} d={p.d} />
        ))}
      </g>
    </svg>
  );
}
