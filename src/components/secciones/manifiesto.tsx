import Image from "next/image";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { manifiesto } from "@/content/sitio";
import { Etiqueta } from "@/components/ui";
import s from "./manifiesto.module.css";

export function Manifiesto() {
  return (
    <section className={`contenedor ${s.manifiesto}`} aria-label="Quiénes somos">
      <div className={s.lado}>
        <Image src="/marca/hope-monograma.png" alt="Monograma TSP Hope, fundación altruista sin ánimo de lucro" width={219} height={292} className={s.sello} />
        <Etiqueta>Quiénes somos</Etiqueta>
      </div>
      <ScrollReveal className={s.texto}>{manifiesto}</ScrollReveal>
    </section>
  );
}
