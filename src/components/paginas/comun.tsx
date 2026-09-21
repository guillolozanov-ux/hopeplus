"use client";

import { useId, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import s from "./comun.module.css";

type ApareceProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Primera pantalla: espera a que el velo se abra en lugar de al scroll. */
  inicial?: boolean;
};

/**
 * Anima los descendientes marcados con `data-sube` (suben y aparecen) y los
 * `data-escala` (la foto se asienta desde un leve zoom) cuando la sección entra.
 */
export function Aparece({ children, as: Tag = "section", className, id, inicial }: ApareceProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          paused: inicial,
          scrollTrigger: inicial ? undefined : { trigger: ref.current, start: "top 78%", once: true },
        });
        const sube = ref.current!.querySelectorAll("[data-sube]");
        const escala = ref.current!.querySelectorAll("[data-escala]");
        if (escala.length) tl.from(escala, { scale: 1.18, duration: 1.8, ease: "expo.out" }, 0);
        if (sube.length) tl.from(sube, { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.09, ease: "expo.out" }, 0.1);
        if (inicial) return alRevelar(() => tl.play());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

/**
 * Trazo de marca: una cinta coral que da una vuelta y se dibuja al entrar.
 * Recurso propio de hope+ (evoca el giro de la mano del logo).
 */
export function Trazo({ className, inicial }: { className?: string; inicial?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          paused: inicial,
          scrollTrigger: inicial ? undefined : { trigger: ref.current, start: "top 85%", once: true },
        });
        tl.from(ref.current!.querySelector("path"), { drawSVG: "0% 0%", duration: 2.2, ease: "power3.inOut" }, 0.2);
        if (inicial) return alRevelar(() => tl.play());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} className={`${s.trazo} ${className ?? ""}`} viewBox="0 0 1200 460" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" className={s.paradaA} />
          <stop offset="0.55" className={s.paradaB} />
          <stop offset="1" className={s.paradaC} />
        </linearGradient>
      </defs>
      <path
        d="M-40 330 C 160 340, 300 250, 430 190 C 560 130, 700 150, 690 260 C 680 360, 540 380, 500 300 C 460 220, 600 120, 760 130 C 920 140, 1030 230, 1240 150"
        stroke={`url(#t${id})`}
        strokeWidth="38"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Etiqueta pequeña montada sobre el borde superior de una tarjeta. */
export function TagBorde({ children, oscuro }: { children: ReactNode; oscuro?: boolean }) {
  return <span className={`${s.tagBorde} ${oscuro ? s.tagOscuro : ""}`}>{children}</span>;
}

/** Cabecera estándar de página interna. */
export function Cabeza({
  etiqueta,
  children,
  bajada,
  centrada,
}: {
  etiqueta?: ReactNode;
  children: ReactNode;
  bajada?: string;
  centrada?: boolean;
}) {
  return (
    <Aparece as="header" className={`contenedor ${s.cabeza} ${centrada ? s.centrada : ""}`} inicial>
      {etiqueta && <div data-sube>{etiqueta}</div>}
      {children}
      {bajada && (
        <p className={s.bajada} data-sube>
          {bajada}
        </p>
      )}
    </Aparece>
  );
}
