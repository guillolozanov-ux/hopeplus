import type { Metadata } from "next";
import { impacto } from "@/content/paginas";
import { PaginaImpacto } from "@/components/paginas/impacto";

export const metadata: Metadata = { title: impacto.meta.titulo, description: impacto.meta.descripcion };

export default function Impacto() {
  return <PaginaImpacto />;
}
