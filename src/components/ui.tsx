import Image from "next/image";
import { Fragment, type ElementType, type ReactNode } from "react";
import SplitText from "@/components/reactbits/SplitText";
import Magnet from "@/components/reactbits/Magnet";
import { Enlace } from "@/components/enlace";
import s from "./ui.module.css";

/** Resalta la palabra clave del titular (una sola por titular, al final). */
function marcar(linea: string, marca?: string) {
  if (!marca || !linea.includes(marca)) return linea;
  const [antes, despues] = linea.split(marca);
  return (
    <>
      {antes}
      <em className={s.marca}>{marca}</em>
      {despues}
    </>
  );
}

type TitularProps = {
  lineas: string | readonly string[];
  marca?: string;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
};

export function Titular({ lineas, marca, as = "h2", className, immediate, delay }: TitularProps) {
  const arr = typeof lineas === "string" ? [lineas] : lineas;
  return (
    <SplitText as={as} className={className} immediate={immediate} delay={delay}>
      {/* Sin <br>: SplitText los respeta aunque CSS los oculte; el corte lo decide text-wrap */}
      {arr.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {marcar(l, marca)}
        </Fragment>
      ))}
    </SplitText>
  );
}

export function Etiqueta({ children, claro }: { children: ReactNode; claro?: boolean }) {
  return (
    <span className={`${s.etiqueta} ${claro ? s.etiquetaClara : ""}`}>
      <Plus className={s.etiquetaPlus} />
      {children}
    </span>
  );
}

type BotonProps = {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario" | "claro" | "acento";
  flecha?: boolean;
  magnet?: boolean;
  className?: string;
  as?: ElementType;
};

export function Boton({ href, children, variante = "primario", flecha = true, magnet, className }: BotonProps) {
  const btn = (
    <Enlace href={href} className={`${s.boton} ${s[variante]} ${className ?? ""}`}>
      {/* Ventana fija que recorta; adentro rueda el texto y entra su copia desde abajo */}
      <span className={s.botonTexto}>
        <span className={s.rodillo}>
          <span>{children}</span>
          <span aria-hidden>{children}</span>
        </span>
      </span>
      {flecha && (
        <span className={s.botonFlecha} aria-hidden>
          <Flecha />
        </span>
      )}
    </Enlace>
  );
  return magnet ? <Magnet>{btn}</Magnet> : btn;
}

/** El "+" de la marca TSP. Sustituye a cualquier asterisco o pestaña decorativa. */
export function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M9 0h6v9h9v6h-9v9H9v-9H0V9h9z" fill="currentColor" />
    </svg>
  );
}

export function Flecha({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const pesos = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

type FotoProps = { src: string; alt: string; sizes: string; className?: string; priority?: boolean };

/** Foto con duotono marino; recupera el color al pasar el cursor por su tarjeta. */
export function Foto({ src, alt, sizes, className, priority }: FotoProps) {
  return (
    <div className={`${s.foto} ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={s.fotoImg} />
    </div>
  );
}
