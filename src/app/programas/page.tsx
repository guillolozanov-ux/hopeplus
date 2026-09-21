import type { Metadata } from "next";
import { PaginaProgramas } from "@/components/paginas/programas-lista";

export const metadata: Metadata = {
  title: "Programas",
  description: "Jornadas rurales, tamizaje escolar, adultos mayores, salud materna y nutrición infantil.",
};

export default function Programas() {
  return <PaginaProgramas />;
}
