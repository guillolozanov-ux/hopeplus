import Image from "next/image";
import { golfTour } from "@/content/golf";
import { sitio } from "@/content/sitio";
import { Aparece } from "@/components/paginas/comun";
import { Enlace } from "@/components/enlace";
import { BotonGolf, FlechaLarga, Rotulo, TituloSerif } from "./golf-ui";
import { GolfHero } from "./golf-hero";
import { GolfCausas } from "./golf-causas";
import { GolfInscripcion } from "./golf-inscripcion";
import { GolfPreguntas } from "./golf-preguntas";
import { VideoGolf } from "./video-golf";
import s from "./golf-tour.module.css";

const unir = (...l: string[]) => l.join(" ");

export function PaginaGolfTour() {
  const { manifiesto, causas, calendario, formato, inscripcion, sponsors, frase, preguntas, cierre, logo } = golfTour;
  const correoSponsor = `mailto:${sitio.correo}?subject=${encodeURIComponent(sponsors.cta.asunto)}`;

  return (
    <main className={s.pagina}>
      <GolfHero />

      {/* 1. Manifiesto: serif grande y cuatro cifras separadas por filetes */}
      <Aparece className={unir("contenedor", s.manifiesto)}>
        <div className={s.manifiestoCabeza}>
          <div data-sube>
            <Rotulo>{manifiesto.etiqueta}</Rotulo>
          </div>
          <div data-sube>
            <TituloSerif cursiva={manifiesto.cursiva} className={s.tituloGrande}>
              {manifiesto.titulo.join(" ")}
            </TituloSerif>
          </div>
        </div>
        <div className={s.manifiestoTexto}>
          {manifiesto.parrafos.map((p) => (
            <p key={p} data-sube>
              {p}
            </p>
          ))}
        </div>
        <dl className={s.cifras}>
          {manifiesto.cifras.map((c) => (
            <div key={c.texto} className={s.cifra} data-sube>
              <dt>{c.valor}</dt>
              <dd>{c.texto}</dd>
            </div>
          ))}
        </dl>
      </Aparece>

      {/* 2. Causas: índice con foto que cambia */}
      <Aparece className={s.causasSeccion} id="causas">
        <div className={unir("contenedor", s.causasInterior)}>
          <header className={s.cabezaSeccion}>
            <div data-sube>
              <Rotulo>{causas.etiqueta}</Rotulo>
            </div>
            <div data-sube>
              <TituloSerif cursiva={causas.cursiva} className={s.titulo}>
                {causas.titulo}
              </TituloSerif>
            </div>
            <p className={s.bajada} data-sube>
              {causas.bajada}
            </p>
          </header>
          <GolfCausas />
        </div>
      </Aparece>

      {/* 3. Calendario: filas con filete, como una tarjeta de puntuación */}
      <Aparece className={unir("contenedor", s.calendario)} id="calendario">
        <header className={s.cabezaSeccion}>
          <div data-sube>
            <Rotulo>{calendario.etiqueta}</Rotulo>
          </div>
          <div data-sube>
            <TituloSerif cursiva={calendario.cursiva} className={s.titulo}>
              {calendario.titulo}
            </TituloSerif>
          </div>
        </header>
        <ol className={s.paradas}>
          {calendario.paradas.map((p) => (
            <li key={p.numero} data-sube>
              <Enlace href="#inscripcion" className={s.parada}>
                <span className={s.paradaNumero}>{p.numero}</span>
                <span className={s.paradaFecha}>{p.fecha}</span>
                <span className={s.paradaLugar}>
                  <strong>{p.ciudad}</strong>
                  <small>{p.sede}</small>
                </span>
                <span className={s.paradaCausa}>{p.causa}</span>
                <span className={s.paradaIr}>
                  Inscribirme
                  <FlechaLarga />
                </span>
              </Enlace>
            </li>
          ))}
        </ol>
        <p className={s.nota} data-sube>
          {calendario.nota}
        </p>
      </Aparece>

      {/* 4. Formato: foto a la izquierda, el día hora por hora */}
      <Aparece className={s.formato} id="formato">
        <div className={s.formatoFoto} data-sube>
          <div className={s.formatoMarco} data-escala>
            <Image src={formato.foto} alt={formato.alt} fill sizes="(min-width: 1200px) 50vw, 100vw" />
          </div>
          <ul className={s.reglas}>
            {formato.reglas.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className={s.formatoTexto}>
          <div data-sube>
            <Rotulo>{formato.etiqueta}</Rotulo>
          </div>
          <div data-sube>
            <TituloSerif cursiva={formato.cursiva} className={s.titulo}>
              {formato.titulo}
            </TituloSerif>
          </div>
          <ol className={s.momentos}>
            {formato.momentos.map((m) => (
              <li key={m.hora} className={s.momento} data-sube>
                <span className={s.momentoHora}>{m.hora}</span>
                <div>
                  <h3 className={s.momentoTitulo}>{m.titulo}</h3>
                  <p className={s.momentoTexto}>{m.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Aparece>

      {/* 5. Inscripción: fondo bosque, modalidades y formulario */}
      <Aparece className={s.inscripcion} id="inscripcion">
        <div className={unir("contenedor", s.inscripcionInterior)}>
          <div className={s.inscripcionIntro}>
            <div data-sube>
              <Rotulo>{inscripcion.etiqueta}</Rotulo>
            </div>
            <div data-sube>
              <TituloSerif cursiva={inscripcion.cursiva} className={s.titulo}>
                {inscripcion.titulo}
              </TituloSerif>
            </div>
            <p className={s.bajada} data-sube>
              {inscripcion.bajada}
            </p>
            <div className={s.inscripcionFoto} data-sube>
              <Image src={inscripcion.foto} alt={inscripcion.alt} fill sizes="(min-width: 1200px) 400px, 100vw" />
            </div>
          </div>
          <div data-sube>
            <GolfInscripcion />
          </div>
        </div>
      </Aparece>

      {/* 6. Patrocinio: cuatro niveles en columnas con filete */}
      <Aparece className={unir("contenedor", s.sponsors)} id="patrocinio">
        <header className={unir(s.cabezaSeccion, s.cabezaCentrada)}>
          <div data-sube>
            <Rotulo>{sponsors.etiqueta}</Rotulo>
          </div>
          <div data-sube>
            <TituloSerif cursiva={sponsors.cursiva} className={s.titulo}>
              {sponsors.titulo}
            </TituloSerif>
          </div>
          <p className={s.bajada} data-sube>
            {sponsors.bajada}
          </p>
        </header>
        <div className={s.niveles}>
          {sponsors.niveles.map((n) => (
            <article key={n.nombre} className={s.nivel} data-destacado={n.destacado || undefined} data-sube>
              <p className={s.nivelCupos}>{n.cupos}</p>
              <h3 className={s.nivelNombre}>{n.nombre}</h3>
              <p className={s.nivelPrecio}>{n.precio}</p>
              <ul className={s.nivelBeneficios}>
                {n.beneficios.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <BotonGolf
                href={`${correoSponsor}${encodeURIComponent(` · ${n.nombre}`)}`}
                tono={n.destacado ? "crema" : "bosque"}
                className={s.nivelBoton}
              >
                {sponsors.cta.label}
              </BotonGolf>
            </article>
          ))}
        </div>
      </Aparece>

      {/* 7. Frase sobre foto a sangre */}
      <Aparece className={s.frase}>
        <div className={s.fraseFoto} data-escala>
          <Image src={frase.foto} alt={frase.alt} fill sizes="100vw" />
        </div>
        <blockquote className={s.fraseTexto} data-sube>
          <p>{frase.texto}</p>
          <footer>{frase.firma}</footer>
        </blockquote>
      </Aparece>

      {/* 8. Preguntas */}
      <Aparece className={unir("contenedor", s.preguntasSeccion)} id="preguntas-tour">
        <header className={s.cabezaSeccion}>
          <div data-sube>
            <Rotulo>Preguntas</Rotulo>
          </div>
          <div data-sube>
            <TituloSerif className={s.titulo}>{preguntas.titulo}</TituloSerif>
          </div>
          <p className={s.bajada} data-sube>
            ¿Otra duda? Escríbenos a <a href={`mailto:${sitio.correo}`}>{sitio.correo}</a>
          </p>
        </header>
        <GolfPreguntas />
      </Aparece>

      {/* 9. Cierre: video de nuevo, logo y dos caminos */}
      <Aparece className={s.cierre}>
        <VideoGolf className={s.cierreVideo} posicion={1} />
        <div className={s.cierreVelo} aria-hidden />
        <div className={s.cierreContenido}>
          <div className={s.cierreLogo} data-sube>
            <Image src={logo.negativo} alt={logo.alt} width={1525} height={430} unoptimized />
          </div>
          <div data-sube>
            <TituloSerif cursiva="primer tee" className={s.cierreTitulo}>
              {cierre.titulo}
            </TituloSerif>
          </div>
          <p className={s.cierreTexto} data-sube>
            {cierre.texto}
          </p>
          <div className={s.cierreBotones} data-sube>
            <BotonGolf href="#inscripcion" lleno>
              Inscribirme
            </BotonGolf>
            <BotonGolf href="#patrocinio">Ser sponsor</BotonGolf>
          </div>
        </div>
      </Aparece>
    </main>
  );
}
