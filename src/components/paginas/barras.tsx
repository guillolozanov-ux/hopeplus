"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./barras.module.css";

type Partida = { concepto: string; pct: number };

/**
 * Barras horizontales de una sola serie (parte de un todo). Un solo tono,
 * valor en la punta con color de texto, tabla accesible como respaldo.
 */
export function Barras({ partidas, titulo }: { partidas: Partida[]; titulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ordenadas = [...partidas].sort((a, b) => b.pct - a.pct);
  const max = ordenadas[0].pct;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-barra]", {
          scaleX: 0,
          transformOrigin: "0% 50%",
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
        gsap.from("[data-valor]", {
          autoAlpha: 0,
          x: -12,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.6,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <ul className={s.lista} aria-hidden>
        {ordenadas.map((p) => (
          <li key={p.concepto} className={s.fila} title={`${p.concepto}: ${p.pct}%`}>
            <span className={s.concepto}>{p.concepto}</span>
            <span className={s.pista}>
              {/* ancho relativo a la partida mayor, para que las diferencias se lean */}
              <span className={s.barra} style={{ width: `${(p.pct / max) * 88}%` }} data-barra />
              <span className={s.valor} data-valor>
                {p.pct}%
              </span>
            </span>
          </li>
        ))}
      </ul>
      <table className="sr-only">
        <caption>{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {ordenadas.map((p) => (
            <tr key={p.concepto}>
              <th scope="row">{p.concepto}</th>
              <td>{p.pct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
