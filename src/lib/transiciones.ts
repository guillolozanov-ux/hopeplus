/**
 * Cada página tiene su transición de entrada. La elige la ruta de destino.
 */
export type Variante = "inicio" | "cortina" | "columnas" | "circulo" | "plus" | "persianas" | "cinta";

export function varianteDe(ruta: string): { variante: Variante; titulo: string } {
  if (ruta === "/") return { variante: "inicio", titulo: "Inicio" };
  if (ruta.startsWith("/nosotros")) return { variante: "cortina", titulo: "Nosotros" };
  if (ruta.startsWith("/programas/")) return { variante: "circulo", titulo: "Programa" };
  if (ruta.startsWith("/programas")) return { variante: "columnas", titulo: "Programas" };
  if (ruta.startsWith("/participa")) return { variante: "plus", titulo: "Participa" };
  if (ruta.startsWith("/impacto")) return { variante: "persianas", titulo: "Impacto" };
  if (ruta.startsWith("/donar")) return { variante: "cinta", titulo: "Donar" };
  return { variante: "cortina", titulo: "" };
}

type Navegar = (href: string) => void;

/** Registro del navegador animado (lo publica <Transicion/> al montarse). */
let navegarRegistrado: Navegar | null = null;
export const registrarNavegar = (fn: Navegar | null) => {
  navegarRegistrado = fn;
};
export const navegar = (href: string) => navegarRegistrado?.(href);
export const hayNavegador = () => navegarRegistrado !== null;
