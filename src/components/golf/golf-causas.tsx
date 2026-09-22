"use client";

import { useState } from "react";
import Image from "next/image";
import { golfTour } from "@/content/golf";
import s from "./golf-tour.module.css";

const millones = (n: number) => `$${Math.round(n / 1_000_000)}M`;

/**
 * Índice de causas: en escritorio la foto de la izquierda cambia con la causa
 * que se señala; en móvil cada causa lleva su foto encima.
 */
export function GolfCausas() {
  const { items } = golfTour.causas;
  const [activa, setActiva] = useState(0);

  return (
    <div className={s.causas}>
      <div className={s.causasFotos} aria-hidden>
        {items.map((c, i) => (
          <div key={c.slug} className={s.causaFoto} data-activa={i === activa || undefined}>
            <Image src={c.foto} alt="" fill sizes="(min-width: 1200px) 520px, 45vw" />
          </div>
        ))}
        <span className={s.causaFotoNumero}>{items[activa].numero}</span>
      </div>

      <ol className={s.causasLista}>
        {items.map((c, i) => (
          <li
            key={c.slug}
            id={c.slug}
            className={s.causa}
            data-activa={i === activa || undefined}
            onMouseEnter={() => setActiva(i)}
            onFocus={() => setActiva(i)}
            tabIndex={0}
            data-sube
          >
            <div className={s.causaFotoMovil}>
              <Image src={c.foto} alt={c.alt} fill sizes="100vw" />
            </div>
            <span className={s.causaNumero}>{c.numero}</span>
            <div className={s.causaCuerpo}>
              <p className={s.causaLugar}>{c.lugar}</p>
              <h3 className={s.causaTitulo}>{c.titulo}</h3>
              <p className={s.causaTexto}>{c.texto}</p>
            </div>
            <p className={s.causaMeta}>
              <small>Meta</small>
              {millones(c.meta)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
