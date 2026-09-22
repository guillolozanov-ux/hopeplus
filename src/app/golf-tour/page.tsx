import type { Metadata } from "next";
import { golfTour } from "@/content/golf";
import { PaginaGolfTour } from "@/components/golf/golf-tour";

export const metadata: Metadata = { title: golfTour.meta.titulo, description: golfTour.meta.descripcion };

export default function GolfTour() {
  return <PaginaGolfTour />;
}
