"use client";

import { useEffect, useRef } from "react";
import s from "./barra-meta.module.css";

type Props = {
  /** Porcentaje de la meta (0–100). */
  pct: number;
  /** "claro" sobre fondos claros; "oscuro" sobre fotos o fondos marinos. */
  fondo?: "claro" | "oscuro";
  grosor?: "md" | "lg";
  className?: string;
};

/**
 * Barra de avance de una meta de recaudo: gruesa, con degradado coral, se llena
 * al entrar en pantalla y un destello la recorre cada pocos segundos.
 */
export function BarraMeta({ pct, fondo = "claro", grosor = "md", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.visible = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const valor = Math.max(0, Math.min(100, Math.round(pct)));

  return (
    <div
      ref={ref}
      className={`${s.barra} ${s[fondo]} ${s[grosor]} ${className ?? ""}`}
      role="progressbar"
      aria-valuenow={valor}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${valor}% de la meta`}
    >
      <span className={s.relleno} style={{ width: `${valor}%` }}>
        <span className={s.brillo} />
      </span>
    </div>
  );
}
