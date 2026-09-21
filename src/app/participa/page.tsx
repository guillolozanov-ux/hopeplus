import type { Metadata } from "next";
import { participa } from "@/content/paginas";
import { PaginaParticipa } from "@/components/paginas/participa";

export const metadata: Metadata = { title: participa.meta.titulo, description: participa.meta.descripcion };

export default function Participa() {
  return <PaginaParticipa />;
}
