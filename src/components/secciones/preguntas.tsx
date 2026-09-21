"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { preguntas, sitio } from "@/content/sitio";
import { Titular, Plus } from "@/components/ui";
import s from "./preguntas.module.css";

export function Preguntas() {
  const ref = useRef<HTMLElement>(null);
  const [abierta, setAbierta] = useState(0);

  const { contextSafe } = useGSAP({ scope: ref });

  const alternar = contextSafe((i: number) => {
    const siguiente = abierta === i ? -1 : i;
    const paneles = gsap.utils.toArray<HTMLElement>("[data-resp]");
    paneles.forEach((p, j) => {
      gsap.to(p, {
        height: j === siguiente ? "auto" : 0,
        duration: 0.7,
        ease: "expo.inOut",
        overwrite: true,
      });
    });
    setAbierta(siguiente);
  });

  return (
    <section ref={ref} id="preguntas" className={s.seccion}>
      <div className={s.panel}>
        <div className={`contenedor ${s.interior}`}>
          <div className={s.cabeza}>
            <IconoPregunta />
            <Titular lineas={preguntas.titulo} className={s.titulo} />
            <p className={s.bajada}>
              {preguntas.bajada} <a href={`mailto:${sitio.correo}`}>{sitio.correo}</a>
            </p>
          </div>
          <ul className={s.lista}>
            {preguntas.items.map((it, i) => (
              <li key={it.q} className={s.item} data-abierta={abierta === i}>
                <h3>
                  <button
                    className={s.pregunta}
                    aria-expanded={abierta === i}
                    aria-controls={`resp-${i}`}
                    id={`preg-${i}`}
                    onClick={() => alternar(i)}
                  >
                    {it.q}
                    <span className={s.icono}>
                      <Plus />
                    </span>
                  </button>
                </h3>
                <div
                  id={`resp-${i}`}
                  role="region"
                  aria-labelledby={`preg-${i}`}
                  className={s.respuesta}
                  data-resp
                  style={{ height: i === 0 ? "auto" : 0 }}
                >
                  <p>{it.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function IconoPregunta() {
  return (
    <svg viewBox="0 0 64 64" className={s.burbuja} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="currentColor" />
      <path
        d="M24 25a8 8 0 1 1 11 7.4c-2 .8-3 2.4-3 4.6v2"
        fill="none"
        stroke="var(--color-on-accent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="47" r="2.6" fill="var(--color-on-accent)" />
    </svg>
  );
}
