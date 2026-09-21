"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenis } from "@/components/smooth-scroll";
import { CLASE_INTRO, CLAVE_SESION, EVENTO_REVELA, hayIntro } from "@/lib/intro";
import { piezasLogo, PLUS_CENTRO } from "./intro-logo";
import s from "./intro.module.css";

// Lienzo del logo en Illustrator: 1920 × 1080, centro (960, 540).
// Dos encuadres centrados en el lienzo: en horizontal el logo ocupa ~la mitad del
// ancho; en vertical, ~tres cuartos. CSS muestra uno u otro.
const ENCUADRES = [
  { viewBox: "220 207 1480 666", className: "horizontal" },
  { viewBox: "465 240 990 600", className: "vertical" },
] as const;
const VELO = "M-40000 -40000H42000V42000H-40000Z";
const plus = piezasLogo.find((p) => p.tipo === "plus")!;

/**
 * Intro: el logo hope+ se arma sobre un velo crema; luego el "+" se vuelve una
 * ventana recortada en el velo y crece hasta destapar la página.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = document.documentElement;
      if (!hayIntro()) return;

      lenis?.stop();
      window.scrollTo(0, 0);

      const q = gsap.utils.selector(ref);
      const letras = q("[data-tipo='letra']");
      const mano = q("[data-tipo='mano']");
      const fundation = q("[data-tipo='fundation']");
      const plusRelleno = q("[data-plus]");
      const escena = q("[data-escena]");
      const zoom = q("[data-zoom]");

      const terminar = () => {
        raiz.classList.remove(CLASE_INTRO);
        try {
          sessionStorage.setItem(CLAVE_SESION, "1");
        } catch {
          /* sin almacenamiento: la intro volverá a verse, no pasa nada */
        }
        lenis?.start();
      };

      gsap
        .timeline({ defaults: { ease: "expo.out" }, onComplete: terminar })
        // 1. el logo se arma
        .from(letras, { y: 90, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.2)
        .from(mano, { y: 40, rotate: -25, autoAlpha: 0, transformOrigin: "50% 100%", duration: 1, stagger: 0.05 }, 0.5)
        .from(fundation, { x: -24, autoAlpha: 0, duration: 0.8, stagger: 0.04 }, 0.7)
        .from(plusRelleno, { scale: 0, rotate: -180, svgOrigin: `${PLUS_CENTRO.x} ${PLUS_CENTRO.y}`, duration: 1.1, ease: "back.out(1.8)" }, 0.75)
        // 2. todo se va menos el "+", que viaja al centro; la página empieza a armarse detrás
        .to([...letras, ...mano, ...fundation], { autoAlpha: 0, y: -30, duration: 0.45, stagger: 0.015, ease: "power2.in" }, 1.7)
        .add(() => window.dispatchEvent(new Event(EVENTO_REVELA)), 1.8)
        .to(escena, { x: 960 - PLUS_CENTRO.x, y: 540 - PLUS_CENTRO.y, duration: 0.7, ease: "power3.inOut" }, 1.75)
        // 3. el "+" se abre: el relleno se apaga y la ventana crece hasta salir de la pantalla
        .to(plusRelleno, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, 2.4)
        // svgOrigin es global: el "+" ya está en el centro del lienzo (960, 540)
        .to(zoom, { scale: 90, svgOrigin: "960 540", duration: 1.2, ease: "power3.in" }, 2.3);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={s.intro} aria-hidden>
      {ENCUADRES.map((e) => (
        <svg key={e.className} className={`${s.svg} ${s[e.className]}`} viewBox={e.viewBox} preserveAspectRatio="xMidYMid meet">
          <g data-zoom>
            <g data-escena>
              {/* Velo crema con el "+" recortado (evenodd) */}
              <path className={s.velo} d={`${VELO} ${plus.d}`} fillRule="evenodd" />
              <path data-plus d={plus.d} fill={plus.fill} />
              {piezasLogo
                .filter((p) => p.tipo !== "plus")
                .map((p, i) => (
                  <path key={i} data-tipo={p.tipo} d={p.d} fill={p.fill} />
                ))}
            </g>
          </g>
        </svg>
      ))}
    </div>
  );
}
