import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { cinta } from "@/content/sitio";
import { Plus } from "@/components/ui";
import s from "./cinta.module.css";

/** Dos franjas cruzadas en bucle; el separador es el "+" de la marca. */
export function Cinta() {
  const items = cinta.map((t) => (
    <span key={t} className={s.item}>
      {t}
      <Plus className={s.plus} />
    </span>
  ));
  return (
    <section className={s.seccion} aria-label={cinta.join(". ")}>
      <ScrollVelocity
        texts={items}
        velocity={50}
        copies={6}
        rowClassNames={[s.filaA, s.filaB]}
        trackClassName={s.track}
      />
    </section>
  );
}
