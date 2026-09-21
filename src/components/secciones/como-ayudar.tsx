"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { comoAyudar } from "@/content/sitio";
import { Titular, Etiqueta } from "@/components/ui";
import s from "./como-ayudar.module.css";

export function ComoAyudar() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // El panel se abre a sangre mientras entra
        gsap.fromTo(
          "[data-panel]",
          { scale: 0.92, borderRadius: 80 },
          {
            scale: 1,
            borderRadius: 40,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 25%", scrub: true },
          },
        );

        // Cada ilustración se dibuja trazo a trazo y luego flota
        gsap.utils.toArray<HTMLElement>("[data-paso]").forEach((paso, i) => {
          const trazos = paso.querySelectorAll("[data-trazo]");
          const rellenos = paso.querySelectorAll("[data-relleno]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: paso, start: "top 80%", once: true } });
          tl.from(trazos, { drawSVG: 0, duration: 1.6, stagger: 0.12, ease: "power2.inOut" }, i * 0.15)
            .from(rellenos, { scale: 0, transformOrigin: "50% 50%", duration: 0.8, ease: "back.out(2)" }, "-=0.6")
            .from(paso.querySelectorAll("[data-texto]"), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, "-=1");
          gsap.to(paso.querySelector("svg"), { y: -8, duration: 2.4 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="como-ayudar" className={s.seccion}>
      <div className={s.panel} data-panel>
        <div className="contenedor">
          <div className={s.cabeza}>
            <Etiqueta>{comoAyudar.etiqueta}</Etiqueta>
            <Titular lineas={comoAyudar.titulo} marca={comoAyudar.marca} className={s.titulo} />
          </div>
          <ol className={s.pasos}>
            {comoAyudar.pasos.map((p, i) => (
              <li key={p.titulo} className={s.paso} data-paso>
                <Ilustracion tipo={p.icono} />
                <span className={s.numero} data-texto>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={s.pasoTitulo} data-texto>
                  {p.titulo}
                </h3>
                <p className={s.pasoTexto} data-texto>
                  {p.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Ilustraciones de línea propias: mano, personas y apretón. Trazo marino, detalle coral. */
function Ilustracion({ tipo }: { tipo: string }) {
  const comun = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 160 120" className={s.ilustracion} aria-hidden>
      <circle cx="80" cy="60" r="52" className={s.halo} data-relleno />
      {tipo === "donar" && (
        <>
          {/* mano abierta que sostiene un corazón */}
          <path data-trazo {...comun} d="M30 92c14-2 26-2 38 4l22 8c6 2 12 0 14-5l24-26c4-4 0-11-6-8l-22 14" />
          <path data-trazo {...comun} d="M100 79H78c-6 0-8-8-2-10l14-4" />
          <path data-trazo {...comun} d="M30 80v24" />
          <path data-relleno className={s.acento} d="M80 52s-16-9-16-20a8.5 8.5 0 0 1 16-4 8.5 8.5 0 0 1 16 4c0 11-16 20-16 20Z" />
        </>
      )}
      {tipo === "voluntario" && (
        <>
          {/* dos personas, una con el "+" en el pecho */}
          <circle data-trazo {...comun} cx="60" cy="36" r="11" />
          <path data-trazo {...comun} d="M38 100V78c0-12 10-20 22-20s22 8 22 20v22" />
          <circle data-trazo {...comun} cx="104" cy="42" r="9" />
          <path data-trazo {...comun} d="M88 100V82c0-10 7-17 16-17s17 7 17 17v18" />
          <path data-relleno className={s.acento} d="M56 70h8v6h6v8h-6v6h-8v-6h-6v-8h6z" />
        </>
      )}
      {tipo === "aliado" && (
        <>
          {/* apretón de manos */}
          <path data-trazo {...comun} d="M18 58l20-14 22 6 12-6" />
          <path data-trazo {...comun} d="M142 58l-20-14-26 4-24 18c-4 4 2 10 8 7l16-9" />
          <path data-trazo {...comun} d="M38 44l-4 32 30 22c4 3 9 1 10-3" />
          <path data-trazo {...comun} d="M122 44l4 32-28 20c-4 3-9 1-10-3" />
          <path data-trazo {...comun} d="M62 86l12 8M72 78l14 10" />
          <circle data-relleno className={s.acento} cx="80" cy="26" r="7" />
        </>
      )}
    </svg>
  );
}
