"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { equipo } from "@/content/sitio";
import { Titular, Etiqueta, Plus } from "@/components/ui";
import s from "./equipo.module.css";

export function Equipo() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-persona]", {
          y: 80,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.3,
          scrollTrigger: { trigger: "[data-grilla]", start: "top 80%", once: true },
        });
        // El retrato se destapa de abajo hacia arriba
        gsap.from("[data-retrato]", {
          clipPath: "inset(100% 0 0 0)",
          stagger: 0.1,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: "[data-grilla]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="equipo" className={`contenedor ${s.seccion}`}>
      <div className={s.cabeza}>
        <Etiqueta>{equipo.etiqueta}</Etiqueta>
        <Titular lineas={equipo.titulo} marca={equipo.marca} className={s.titulo} />
        <p className={s.bajada}>{equipo.bajada}</p>
      </div>
      <ul className={s.grilla} data-grilla>
        {equipo.personas.map((p) => (
          <li key={p.cargo} data-persona>
            <TiltedCard caption={p.cargo} className={s.tilt} captionClassName={s.caption}>
              <div className={s.retrato} data-retrato>
                <Image src={p.foto} alt={`Retrato, ${p.cargo}`} fill sizes="(min-width: 1200px) 300px, 45vw" />
                <Plus className={s.plus} />
              </div>
            </TiltedCard>
            <p className={s.cargo}>{p.cargo}</p>
            <p className={s.nombre}>{p.nombre}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
