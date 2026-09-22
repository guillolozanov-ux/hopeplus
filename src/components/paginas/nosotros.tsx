import Image from "next/image";
import { nosotros } from "@/content/paginas";
import { Titular, Etiqueta, Foto, Flecha, Plus } from "@/components/ui";
import { Aparece, Trazo, TagBorde } from "./comun";
import { PlusGiro } from "./plus-giro";
import { Equipo } from "@/components/secciones/equipo";
import { Cinta } from "@/components/secciones/cinta";
import c from "./comun.module.css";
import s from "./nosotros.module.css";

export function PaginaNosotros() {
  const { about, banner, pilares, proceso } = nosotros;
  return (
    <main>
      {/* 1. Tarjeta sobre foto a sangre, con el trazo de marca cruzando */}
      {/* data-hero-oscuro: el encabezado pasa a letras claras y logo en negativo */}
      <Aparece className={s.about} inicial data-hero-oscuro>
        <div className={s.aboutFoto} data-escala>
          <Image src={about.foto} alt={about.alt} fill priority sizes="100vw" className={s.aboutImg} />
        </div>
        <Trazo className={s.aboutTrazo} inicial />
        <div className={`contenedor ${s.aboutInterior}`}>
          <article className={s.aboutCard} data-sube>
            <Titular as="h1" lineas={about.titulo} className={s.aboutTitulo} immediate delay={0.2} />
            {about.parrafos.map((p) => (
              <p key={p.slice(0, 20)} className={s.aboutTexto}>
                {p}
              </p>
            ))}
            <span className={s.chip}>
              <Plus className={s.chipPlus} />
              {about.chip}
            </span>
          </article>
        </div>
      </Aparece>

      {/* 2. Banner de tres paneles: mensaje, marca y foto */}
      <Aparece className={`contenedor ${s.banner}`}>
        <div className={s.bannerTexto} data-sube>
          <Titular lineas={banner.titulo} marca={banner.marca} className={s.bannerTitulo} />
        </div>
        <div className={s.bannerMarca} data-sube>
          <PlusGiro className={s.bannerPlus} />
        </div>
        <div className={s.bannerFoto} data-sube>
          <Foto src={banner.foto} alt={banner.alt} sizes="(min-width: 1200px) 400px, 100vw" className={s.llenar} />
        </div>
      </Aparece>

      {/* 3. Misión, visión y valores en bento con etiqueta en el borde */}
      <Aparece className={`contenedor ${s.pilares}`}>
        <div className={s.cabezaSeccion} data-sube>
          <Etiqueta>{pilares.etiqueta}</Etiqueta>
          <Titular lineas={pilares.titulo} marca={pilares.marca} className={c.h2} />
        </div>
        <div className={s.bento}>
          {pilares.items.map((p) => (
            <article key={p.titulo} className={`${s.pilar} ${s[p.tono]}`} data-sube>
              <TagBorde oscuro={p.tono === "claro"}>{p.tag}</TagBorde>
              {p.tono === "foto" && "foto" in p && (
                <span className={s.pilarFondo}>
                  <Image src={p.foto!} alt="" fill sizes="(min-width: 1200px) 400px, 100vw" className={s.pilarImg} />
                </span>
              )}
              <h3 className={s.pilarTitulo}>{p.titulo}</h3>
              <p className={s.pilarTexto}>{p.texto}</p>
            </article>
          ))}
        </div>
      </Aparece>

      {/* 4. Proceso: lista con flechas */}
      <Aparece className={`contenedor ${s.proceso}`} id="proceso">
        <div className={s.procesoIntro} data-sube>
          <Etiqueta>{proceso.etiqueta}</Etiqueta>
          <Titular lineas={proceso.titulo} marca={proceso.marca} className={c.h2} />
          <p className={s.procesoTexto}>{proceso.texto}</p>
        </div>
        <ol className={s.pasos}>
          {proceso.pasos.map((p, i) => (
            <li key={p} className={s.paso} data-sube>
              <span className={s.pasoNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.pasoTexto}>{p}</span>
              <span className={s.pasoFlecha} aria-hidden>
                <Flecha />
              </span>
            </li>
          ))}
        </ol>
      </Aparece>

      <Equipo />
      <Cinta />
    </main>
  );
}
