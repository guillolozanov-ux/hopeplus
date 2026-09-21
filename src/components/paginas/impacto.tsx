import Image from "next/image";
import { impacto } from "@/content/paginas";
import { Titular, Etiqueta, Boton, Plus } from "@/components/ui";
import CountUp from "@/components/reactbits/CountUp";
import { Aparece, Cabeza } from "./comun";
import { Barras } from "./barras";
import c from "./comun.module.css";
import s from "./impacto.module.css";

export function PaginaImpacto() {
  const { hero, cifras, uso } = impacto;
  return (
    <main>
      <Cabeza bajada={hero.bajada} centrada>
        <Titular as="h1" lineas={hero.titulo} marca={hero.marca} className={c.h1} immediate />
      </Cabeza>

      {/* Bento de cifras */}
      <Aparece className={`contenedor ${s.bento}`} inicial>
        <article className={`${s.celda} ${s.foto}`} data-sube>
          <Image src={cifras.atendidos.foto} alt={cifras.atendidos.alt} fill priority sizes="(min-width: 1200px) 320px, 100vw" className={s.img} />
          <div className={s.fotoTexto}>
            <p className={s.cifraMedia}>
              <CountUp to={cifras.atendidos.valor} />
              {cifras.atendidos.sufijo}
            </p>
            <h2 className={s.titulo}>{cifras.atendidos.titulo}</h2>
            <p className={s.texto}>{cifras.atendidos.texto}</p>
          </div>
        </article>

        <article className={`${s.celda} ${s.pct}`} data-sube>
          <p className={s.cifraGrande}>
            <CountUp to={cifras.programas.valor} />
            {cifras.programas.sufijo}
          </p>
          <p className={s.texto}>{cifras.programas.texto}</p>
        </article>

        <article className={`${s.celda} ${s.ancha}`} data-sube>
          <div className={s.caja}>
            <Plus className={s.cajaPlus} />
            <p className={s.cifraMedia}>
              <CountUp to={cifras.jornadas.valor} />
            </p>
            <p className={s.texto}>{cifras.jornadas.texto}</p>
          </div>
          <div>
            <h2 className={s.titulo}>{cifras.jornadas.titulo}</h2>
            <p className={s.texto}>{cifras.jornadas.detalle}</p>
          </div>
        </article>

        <article className={`${s.celda} ${s.degradado}`} data-sube>
          <h2 className={s.titulo}>{cifras.gestion.titulo}</h2>
          <p className={s.texto}>{cifras.gestion.texto}</p>
          <div className={s.items}>
            {cifras.gestion.items.map((it) => (
              <div key={it.titulo} className={s.item}>
                <span className={s.itemIcono}>
                  <Plus />
                </span>
                <span>
                  <strong>{it.titulo}</strong>
                  <small>{it.texto}</small>
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className={`${s.celda} ${s.seguimiento}`} data-sube>
          <span className={s.pulso} aria-hidden>
            <Plus />
          </span>
          <p className={s.cifraGrande}>
            <CountUp to={cifras.seguimiento.valor} />
            {cifras.seguimiento.sufijo}
          </p>
          <p className={s.texto}>{cifras.seguimiento.texto}</p>
        </article>
      </Aparece>

      {/* Uso de los recursos */}
      <Aparece className={`contenedor ${s.uso}`}>
        <div className={s.usoIntro} data-sube>
          <Etiqueta>{uso.etiqueta}</Etiqueta>
          <Titular lineas={uso.titulo} marca={uso.marca} className={c.h2} />
          <p className={s.nota}>{uso.nota}</p>
          <Boton href="/donar" magnet>
            Donar ahora
          </Boton>
        </div>
        <div data-sube>
          <Barras partidas={uso.partidas} titulo={uso.titulo} />
        </div>
      </Aparece>
    </main>
  );
}
