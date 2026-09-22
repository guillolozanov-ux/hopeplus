import type { ElementType, ReactNode } from "react";
import { Enlace } from "@/components/enlace";
import s from "./golf-ui.module.css";

/**
 * Piezas de la sub-marca Hope Golf Tour: serif editorial, versalitas espaciadas
 * y botón píldora con borde fino. Nada de coral: verde bosque y crema.
 */

/** Titular serif; la parte `cursiva` se escribe en itálica. */
export function TituloSerif({
  children,
  cursiva,
  as: Tag = "h2",
  className,
}: {
  children: string;
  cursiva?: string;
  as?: ElementType;
  className?: string;
}) {
  const partes = cursiva && children.includes(cursiva) ? children.split(cursiva) : null;
  return (
    <Tag className={`${s.serif} ${className ?? ""}`}>
      {partes ? (
        <>
          {partes[0]}
          <em>{cursiva}</em>
          {partes[1]}
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

/** Versalitas espaciadas con un filete delante. */
export function Rotulo({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={`${s.rotulo} ${className ?? ""}`}>{children}</span>;
}

type BotonGolfProps = {
  href: string;
  children: ReactNode;
  tono?: "crema" | "bosque";
  lleno?: boolean;
  className?: string;
};

/** Píldora con borde fino y flecha en un círculo que se rellena al pasar el cursor. */
export function BotonGolf({ href, children, tono = "crema", lleno, className }: BotonGolfProps) {
  const cls = `${s.boton} ${s[tono]} ${lleno ? s.lleno : ""} ${className ?? ""}`;
  const contenido = (
    <>
      <span className={s.botonTexto}>
        <span className={s.rodillo}>
          <span>{children}</span>
          <span aria-hidden>{children}</span>
        </span>
      </span>
      <span className={s.botonFlecha} aria-hidden>
        <FlechaLarga />
      </span>
    </>
  );
  // mailto y anclas externas no pasan por la transición de página
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {contenido}
      </a>
    );
  }
  return (
    <Enlace href={href} className={cls}>
      {contenido}
    </Enlace>
  );
}

export function FlechaLarga({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 12" aria-hidden focusable="false">
      <path d="M0 6h26M21 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
