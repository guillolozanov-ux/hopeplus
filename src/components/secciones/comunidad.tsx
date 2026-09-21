"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import CountUp from "@/components/reactbits/CountUp";
import { comunidad } from "@/content/sitio";
import { Boton } from "@/components/ui";
import s from "./comunidad.module.css";

export function Comunidad() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const fotos = gsap.utils.toArray<HTMLElement>("[data-flota]");
        // Las fotos entran girando y luego flotan a distinta velocidad con el scroll
        gsap.from(fotos, {
          scale: 0,
          rotate: (i) => (i % 2 ? 25 : -25),
          duration: 1.4,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
        fotos.forEach((f, i) => {
          gsap.to(f, {
            yPercent: (i % 2 ? -1 : 1) * 60,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
        gsap.from("[data-sube]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="comunidad" className={s.seccion}>
      {comunidad.fotos.map((f, i) => (
        <div key={f.src} className={`${s.flota} ${s[`f${i}`]}`} data-flota>
          <Image src={f.src} alt={f.alt} fill sizes="140px" />
        </div>
      ))}
      <div className={`contenedor ${s.centro}`}>
        <p className={s.frase} data-sube>
          {comunidad.frase}
        </p>
        <p className={s.cifra} data-sube>
          <CountUp to={comunidad.cifra} duration={2.5} />
          <span className={s.sufijo}>{comunidad.sufijo}</span>
        </p>
        <p className={s.texto} data-sube>
          {comunidad.texto}
        </p>
        <div data-sube>
          <Boton href={comunidad.cta.href} magnet>
            {comunidad.cta.label}
          </Boton>
        </div>
      </div>
    </section>
  );
}
