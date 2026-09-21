import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { manifiesto } from "@/content/sitio";
import { Etiqueta } from "@/components/ui";
import { MarcaO } from "@/components/marca-o";
import s from "./manifiesto.module.css";

export function Manifiesto() {
  return (
    <section className={`contenedor ${s.manifiesto}`} aria-label="Quiénes somos">
      <div className={s.lado}>
        <MarcaO className={s.sello} titulo="Símbolo de hope+: una mano que sostiene" />
        <Etiqueta>Quiénes somos</Etiqueta>
      </div>
      <ScrollReveal className={s.texto}>{manifiesto}</ScrollReveal>
    </section>
  );
}
