"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { golfTour } from "@/content/golf";
import s from "./golf-tour.module.css";

/** Acordeón de preguntas del tour: una abierta a la vez. */
export function GolfPreguntas() {
  const ref = useRef<HTMLUListElement>(null);
  const [abierta, setAbierta] = useState(-1);
  const { contextSafe } = useGSAP({ scope: ref });

  const alternar = contextSafe((i: number) => {
    const siguiente = abierta === i ? -1 : i;
    gsap.utils.toArray<HTMLElement>("[data-resp]").forEach((p, j) => {
      gsap.to(p, { height: j === siguiente ? "auto" : 0, duration: 0.8, ease: "expo.inOut", overwrite: true });
    });
    setAbierta(siguiente);
  });

  return (
    <ul ref={ref} className={s.preguntas}>
      {golfTour.preguntas.items.map((it, i) => (
        <li key={it.q} className={s.pregunta} data-abierta={abierta === i || undefined} data-sube>
          <h3>
            <button
              type="button"
              className={s.preguntaBoton}
              aria-expanded={abierta === i}
              aria-controls={`golf-resp-${i}`}
              id={`golf-preg-${i}`}
              onClick={() => alternar(i)}
            >
              <span className={s.preguntaNumero}>{String(i + 1).padStart(2, "0")}</span>
              {it.q}
              <span className={s.preguntaIcono} aria-hidden />
            </button>
          </h3>
          <div id={`golf-resp-${i}`} role="region" aria-labelledby={`golf-preg-${i}`} className={s.respuesta} data-resp>
            <p>{it.a}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
