import Image from "next/image";
import { participa } from "@/content/paginas";
import { sitio } from "@/content/sitio";
import { Titular, Etiqueta, Boton, Flecha, Plus } from "@/components/ui";
import { Enlace } from "@/components/enlace";
import { Aparece, Cabeza, Trazo, TagBorde } from "./comun";
import { Cinta } from "@/components/secciones/cinta";
import c from "./comun.module.css";
import s from "./participa.module.css";

export function PaginaParticipa() {
  const { hero, formas, voluntariado, aliados, contacto } = participa;
  return (
    <main>
      <Cabeza etiqueta={<Etiqueta>{hero.etiqueta}</Etiqueta>} bajada={hero.bajada}>
        <Titular as="h1" lineas={hero.titulo} marca={hero.marca} className={c.h1} immediate />
      </Cabeza>

      {/* 1. Tres formas de participar: tarjetas con la esquina recortada */}
      <Aparece className={`contenedor ${s.formas}`} inicial>
        {formas.map((f) => (
          <Enlace key={f.titulo} href={f.href} className={`${s.forma} ${s[f.tono]}`} data-sube>
            <span className={s.muesca} aria-hidden>
              <Flecha />
            </span>
            <h2 className={s.formaTitulo}>{f.titulo}</h2>
            <ul className={s.puntos}>
              {f.puntos.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Enlace>
        ))}
      </Aparece>

      {/* 2. Voluntariado: foto con lista esmerilada encima */}
      <Aparece className={`contenedor ${s.voluntariado}`} id="voluntariado">
        <div className={s.volFoto} data-sube>
          <TagBorde oscuro>En campo</TagBorde>
          <div className={s.volFotoMarco} data-escala>
            <Image src={voluntariado.foto} alt={voluntariado.alt} fill sizes="(min-width: 1200px) 560px, 100vw" className={s.volImg} />
          </div>
          <ul className={s.vidrio}>
            {voluntariado.roles.map((r) => (
              <li key={r.titulo} className={s.vidrioFila}>
                <span className={s.vidrioIcono}>
                  <Plus />
                </span>
                <span>
                  <strong>{r.titulo}</strong>
                  <small>{r.texto}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.volTexto}>
          <div data-sube>
            <Etiqueta>{voluntariado.etiqueta}</Etiqueta>
          </div>
          <Titular lineas={voluntariado.titulo} marca={voluntariado.marca} className={c.h2} />
          <p className={s.parrafo} data-sube>
            {voluntariado.texto}
          </p>
          <div data-sube>
            <Boton href="#contacto" magnet>
              Quiero ser voluntario
            </Boton>
          </div>
        </div>
      </Aparece>

      {/* 3. Aliados: bento con etiqueta en el borde */}
      <Aparece className={`contenedor ${s.aliados}`} id="aliados">
        <div className={s.aliadosIntro} data-sube>
          <Etiqueta>{aliados.etiqueta}</Etiqueta>
          <Titular lineas={aliados.titulo} marca={aliados.marca} className={c.h2} />
          <p className={s.parrafo}>{aliados.texto}</p>
        </div>
        <div className={s.beneficios}>
          {aliados.beneficios.map((b, i) => (
            <article key={b.titulo} className={`${s.beneficio} ${i === 1 ? s.beneficioAcento : ""}`} data-sube>
              <TagBorde oscuro={i !== 1}>{b.tag}</TagBorde>
              <h3 className={s.beneficioTitulo}>{b.titulo}</h3>
              <p className={s.beneficioTexto}>{b.texto}</p>
            </article>
          ))}
        </div>
      </Aparece>

      <Cinta />

      {/* 4. Contacto */}
      <Aparece className={`contenedor ${s.contacto}`} id="contacto">
        <div className={s.contactoPanel} data-sube>
          <Trazo className={s.contactoTrazo} />
          <Titular lineas={contacto.titulo} className={s.contactoTitulo} />
          <p className={s.contactoTexto}>{contacto.texto}</p>
          <Boton href={`mailto:${sitio.correo}?subject=Quiero sumarme a hope+`} variante="acento" magnet>
            {sitio.correo}
          </Boton>
        </div>
      </Aparece>
    </main>
  );
}
