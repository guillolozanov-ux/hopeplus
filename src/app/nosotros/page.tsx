import type { Metadata } from "next";
import { nosotros } from "@/content/paginas";
import { PaginaNosotros } from "@/components/paginas/nosotros";

export const metadata: Metadata = { title: nosotros.meta.titulo, description: nosotros.meta.descripcion };

export default function Nosotros() {
  return <PaginaNosotros />;
}
