"use client";

import { useRef, useState } from "react";
import { gsap, Flip, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { programas } from "@/content/sitio";
import { Titular, Etiqueta, Foto, Flecha, Boton, pesos } from "@/components/ui";
import { Enlace } from "@/components/enlace";
import { BarraMeta } from "@/components/barra-meta";
import { Aparece, Cabeza, TagBorde } from "./comun";
import c from "./comun.module.css";
import s from "./programas-lista.module.css";

const categorias = ["Todos", ...new Set(programas.items.map((p) => p.categoria))];

export function PaginaProgramas() {
  const grilla = useRef<HTMLDivElement>(null);
  const [filtro, setFiltro] = useState("Todos");
  useGSAP(
    () => {
      // Entrada: las tarjetas suben cuando se abre el velo
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true }).from("[data-card]", { y: 100, autoAlpha: 0, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.3 });
        return alRevelar(() => tl.play());
      });
      return () => mm.revert();
    },
    { scope: grilla },
  );

  // Flip: las tarjetas se reacomodan desde su posición anterior (solo se llama desde clics)
  function filtrar(cat: string) {
    const estado = Flip.getState(grilla.current!.querySelectorAll("[data-card]"));
    setFiltro(cat);
    requestAnimationFrame(() => {
      Flip.from(estado, {
        duration: 0.8,
        ease: "expo.inOut",
        absolute: true,
        stagger: 0.04,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
      });
    });
  }

  const visibles = programas.items.filter((p) => filtro === "Todos" || p.categoria === filtro);

  return (
    <main>
      <Cabeza
        etiqueta={<Etiqueta>{programas.etiqueta}</Etiqueta>}
        bajada="Cada programa responde a una necesidad concreta de salud. Elige uno para ver qué incluye, dónde trabaja y cuánto falta para su meta."
      >
        <Titular as="h1" lineas="Programas que llevan salud a tu comunidad" marca="comunidad" className={c.h1} immediate />
      </Cabeza>

      <div className="contenedor">
        <div className={s.filtros} role="group" aria-label="Filtrar por categoría">
          {categorias.map((cat) => (
            <button key={cat} className={s.filtro} aria-pressed={filtro === cat} onClick={() => filtrar(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div ref={grilla} className={s.grilla}>
          {visibles.map((p, i) => {
            const pct = Math.round((p.recaudado / p.meta) * 100);
            const destacado = i === 0 && filtro === "Todos";
            return (
              <Enlace
                key={p.slug}
                href={`/programas/${p.slug}`}
                className={`${s.card} ${destacado ? s.destacado : ""}`}
                data-card
                data-flip-id={p.slug}
              >
                <TagBorde oscuro={destacado}>{p.categoria}</TagBorde>
                <Foto src={p.foto} alt={p.alt} sizes={destacado ? "(min-width: 1200px) 800px, 100vw" : "(min-width: 1200px) 400px, 100vw"} className={s.foto} />
                <div className={s.cuerpo}>
                  <h2 className={s.titulo}>{p.titulo}</h2>
                  <p className={s.texto}>{p.texto}</p>
                  <BarraMeta pct={pct} fondo={destacado ? "oscuro" : "claro"} className={s.barra} />
                  <p className={s.montos}>
                    <strong>{pesos(p.recaudado)}</strong> de {pesos(p.meta)}
                  </p>
                </div>
                <span className={s.flecha} aria-hidden>
                  <Flecha />
                </span>
              </Enlace>
            );
          })}
          {filtro === "Todos" && (
            <Enlace href="/participa#aliados" className={`${s.card} ${s.patrocinio}`} data-card data-flip-id="patrocinio">
              <div>
                <h2 className={s.titulo}>Patrocina un programa completo</h2>
                <p className={s.texto}>Tu empresa puede financiar un programa y recibir el informe de impacto con sus cifras.</p>
              </div>
              <span className={s.flecha} aria-hidden>
                <Flecha />
              </span>
            </Enlace>
          )}
        </div>
      </div>

      <Aparece className={`contenedor ${s.cta}`}>
        <div className={s.ctaPanel} data-sube>
          <Titular lineas="¿Tu comunidad necesita una jornada?" marca="jornada" className={s.ctaTitulo} />
          <p className={s.ctaTexto}>Cuéntanos dónde estás y qué necesitan. Evaluamos cada solicitud con los líderes de la comunidad.</p>
          <Boton href="/participa#contacto" variante="acento" magnet>
            Solicitar una jornada
          </Boton>
        </div>
      </Aparece>
    </main>
  );
}
