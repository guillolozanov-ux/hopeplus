import Image from "next/image";
import { programas, type Programa } from "@/content/sitio";
import { Titular, Etiqueta, Boton, Foto, Flecha, Plus, pesos } from "@/components/ui";
import CountUp from "@/components/reactbits/CountUp";
import { Enlace } from "@/components/enlace";
import { BarraMeta } from "@/components/barra-meta";
import { Aparece, Trazo, TagBorde } from "./comun";
import c from "./comun.module.css";
import s from "./programa-detalle.module.css";

export function PaginaPrograma({ p }: { p: Programa }) {
  const pct = Math.round((p.recaudado / p.meta) * 100);
  const otros = programas.items.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <main>
      {/* 1. Split: texto y foto */}
      <Aparece className={`contenedor ${s.hero}`} inicial>
        <div className={s.heroTexto}>
          <Enlace href="/programas" className={s.volver} data-sube>
            <Flecha className={s.volverFlecha} /> Todos los programas
          </Enlace>
          <div data-sube>
            <Etiqueta>{p.categoria}</Etiqueta>
          </div>
          <Titular as="h1" lineas={p.titulo} className={c.h1} immediate delay={0.15} />
          <p className={s.descripcion} data-sube>
            {p.descripcion}
          </p>
          <div className={s.progreso} data-sube>
            <BarraMeta pct={pct} grosor="lg" className={s.barra} />
            <p>
              <strong>{pesos(p.recaudado)}</strong> recaudados de {pesos(p.meta)}
            </p>
          </div>
          <div className={s.botones} data-sube>
            <Boton href="/donar" magnet>
              Apoyar este programa
            </Boton>
            <Boton href="/participa" variante="secundario">
              Ser voluntario
            </Boton>
          </div>
        </div>
        <div className={s.heroFoto} data-sube>
          <TagBorde oscuro>En curso</TagBorde>
          <div className={s.heroFotoMarco} data-escala>
            <Image src={p.foto} alt={p.alt} fill priority sizes="(min-width: 1200px) 560px, 100vw" className={s.heroImg} />
          </div>
          <Trazo className={s.heroTrazo} inicial />
        </div>
      </Aparece>

      {/* 2. Cifras en bento */}
      <Aparece className={`contenedor ${s.bento}`}>
        <article className={`${s.celda} ${s.celdaFoto}`} data-sube>
          <Image src={p.fotoDetalle} alt={p.altDetalle} fill sizes="(min-width: 1200px) 320px, 100vw" className={s.celdaImg} />
          <div className={s.celdaFotoTexto}>
            <p className={s.cifraMedia}>
              <CountUp to={p.beneficiarios} />+
            </p>
            <p>personas beneficiadas desde que inició el programa.</p>
          </div>
        </article>
        <article className={`${s.celda} ${s.celdaPct}`} data-sube>
          <p className={s.cifraGrande}>
            <CountUp to={pct} />%
          </p>
          <p className={s.celdaTexto}>de la meta ya está financiado.</p>
        </article>
        <article className={`${s.celda} ${s.celdaAncha}`} data-sube>
          <div className={s.icono}>
            <Plus />
          </div>
          <div>
            <h2 className={s.celdaTitulo}>Dónde y cuándo</h2>
            <p className={s.celdaTexto}>{p.lugares}</p>
            <p className={s.celdaTexto}>{p.frecuencia}</p>
          </div>
        </article>
        <article className={`${s.celda} ${s.celdaDegradado}`} data-sube>
          <h2 className={s.celdaTitulo}>Cómo se usa tu aporte</h2>
          <p className={s.celdaTexto}>Cada peso se destina a medicamentos, transporte e insumos de este programa. Publicamos el informe al cerrarlo.</p>
          <Enlace href="/impacto" className={s.leerMas}>
            Ver cifras de impacto <Flecha />
          </Enlace>
        </article>
        <article className={`${s.celda} ${s.celdaDonantes}`} data-sube>
          <p className={s.cifraGrande}>
            <CountUp to={p.apoyos} />
          </p>
          <p className={s.celdaTexto}>donantes ya apoyan este programa.</p>
        </article>
      </Aparece>

      {/* 3. Qué incluye */}
      <Aparece className={`contenedor ${s.incluye}`}>
        <div data-sube>
          <Etiqueta>Qué incluye</Etiqueta>
          <Titular lineas="Lo que recibe cada familia" marca="familia" className={`${c.h2} ${s.incluyeTitulo}`} />
          <ul className={s.lista}>
            {p.incluye.map((item) => (
              <li key={item} className={s.item}>
                <span>{item}</span>
                <span className={s.itemFlecha} aria-hidden>
                  <Flecha />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.formas} data-sube>
          <div className={s.formaA}>
            <Foto src={p.foto} alt="" sizes="300px" className={s.llenar} />
          </div>
          <div className={s.formaB}>
            <Foto src={p.fotoDetalle} alt="" sizes="300px" className={s.llenar} />
          </div>
        </div>
      </Aparece>

      {/* 4. Otros programas */}
      <Aparece className={`contenedor ${s.otros}`}>
        <h2 className={`${c.h2} ${s.otrosTitulo}`} data-sube>
          Otros programas
        </h2>
        <div className={s.otrosGrilla}>
          {otros.map((o) => (
            <Enlace key={o.slug} href={`/programas/${o.slug}`} className={s.otro} data-sube>
              <Foto src={o.foto} alt={o.alt} sizes="(min-width: 1200px) 400px, 100vw" className={s.otroFoto} />
              <span className={s.otroCat}>{o.categoria}</span>
              <span className={s.otroTitulo}>{o.titulo}</span>
            </Enlace>
          ))}
        </div>
      </Aparece>
    </main>
  );
}
