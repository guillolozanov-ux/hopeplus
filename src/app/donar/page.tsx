import type { Metadata } from "next";
import { paginaDonar } from "@/content/paginas";
import { Donar } from "@/components/secciones/donar";
import { Preguntas } from "@/components/secciones/preguntas";
import { Cinta } from "@/components/secciones/cinta";

export const metadata: Metadata = { title: paginaDonar.meta.titulo, description: paginaDonar.meta.descripcion };

export default function PaginaDonar() {
  return (
    <main>
      <Donar principal />
      <Cinta />
      <Preguntas />
    </main>
  );
}
