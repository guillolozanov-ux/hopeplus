"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { programas } from "@/content/sitio";
import { Titular, Plus, pesos } from "@/components/ui";
import { Enlace } from "@/components/enlace";
import { BarraMeta } from "@/components/barra-meta";
import s from "./programas.module.css";

/** Máximo de causas que muestra el módulo de la portada. */
const MAXIMO = 10;

/**
 * Módulo de causas: todas a la vista en una grilla de tarjetas verticales
 * (foto a sangre, flecha arriba, título y cifra abajo). Sin carrusel.
 */
export function Programas() {
  const ref = useRef<HTMLElement>(null);
  const causas = programas.items.slice(0, MAXIMO);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-grilla]", start: "top 80%", once: true } });
        tl.fromTo(
          "[data-causa]",
          { clipPath: "inset(100% 0 0 0 round 20px)", y: 60 },
          { clipPath: "inset(0% 0 0 0 round 20px)", y: 0, duration: 1.1, stagger: 0.08, ease: "inOutFuerte" },
        )
          .from("[data-causa-img]", { scale: 1.3, duration: 1.4, stagger: 0.08, ease: "resorte" }, "<")
          .from("[data-causa-texto]", { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "resorte" }, "<0.4")
          .from("[data-causa-flecha]", { scale: 0, rotate: -90, duration: 0.7, stagger: 0.08, ease: "resorte" }, "<0.1");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="programas" className={`contenedor ${s.seccion}`}>
      <div className={s.cabeza}>
        <div className={s.titulos}>
          <span className={s.chip}>
            <Plus className={s.chipPlus} />
            {programas.etiqueta}
          </span>
          <Titular lineas={programas.titulo} marca={programas.marca} className={s.titulo} />
        </div>
        <div className={s.acciones}>
          <Enlace href="/programas" className={s.verTodos}>
            Ver todos los programas
          </Enlace>
          <Enlace href="/programas" className={s.circulo} aria-label="Ver todos los programas">
            <FlechaDiagonal />
          </Enlace>
        </div>
      </div>

      <ul className={s.grilla} data-grilla>
        {causas.map((p) => {
          const pct = Math.round((p.recaudado / p.meta) * 100);
          return (
            <li key={p.slug} className={s.item}>
              <Enlace href={`/programas/${p.slug}`} className={s.causa} data-causa>
                {/* GSAP anima el contenedor; el zoom del cursor va en la imagen (CSS) */}
                <span className={s.media} data-causa-img>
                  <Image
                    src={p.foto}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1200px) 250px, (min-width: 768px) 33vw, 50vw"
                    className={s.img}
                  />
                </span>
                {/* Capa exterior: la anima GSAP; interior: el giro del hover (CSS) */}
                <span className={s.flechaCapa} data-causa-flecha aria-hidden>
                  <span className={s.flecha}>
                    <FlechaDiagonal />
                  </span>
                </span>
                <span className={s.texto} data-causa-texto>
                  <span className={s.categoria}>{p.categoria}</span>
                  <span className={s.nombre}>{p.corto}</span>
                  <span className={s.cifra}>
                    <strong>{pesos(p.recaudado)}</strong> · {pct}% de la meta
                  </span>
                  <BarraMeta pct={pct} fondo="oscuro" />
                </span>
              </Enlace>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FlechaDiagonal() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
