"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar, hayIntro } from "@/lib/intro";
import { hero, mosaico, comunidad } from "@/content/sitio";
import { Titular, Boton, Foto, Plus, Flecha } from "@/components/ui";
import { Enlace } from "@/components/enlace";
import s from "./hero.module.css";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cols = gsap.utils.toArray<HTMLElement>("[data-col]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

        // Entrada: arranca cuando la intro abre el "+" (o al cargar, si no hay intro).
        // Con intro, el hero se asienta desde un leve zoom mientras el velo crece.
        const conIntro = hayIntro();
        const entrada = gsap
          .timeline({ paused: true, delay: conIntro ? 0 : 0.5 })
          .from(ref.current, { scale: conIntro ? 1.15 : 1, transformOrigin: "50% 40%", duration: 2.4, ease: "expo.out", clearProps: "scale" }, 0)
          .from("[data-fade]", { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.35)
          .from(
            cards,
            {
              yPercent: 60,
              rotate: (i) => (i % 2 ? 6 : -6),
              autoAlpha: 0,
              duration: 1.4,
              stagger: { each: 0.07, from: "center" },
            },
            0.45,
          );
        const soltar = alRevelar(() => entrada.play());

        // Parallax por columna al hacer scroll
        cols.forEach((col) => {
          gsap.to(col, {
            yPercent: Number(col.dataset.speed) * -1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
          });
        });

        // Sigue al cursor muy suavemente (solo puntero fino)
        if (window.matchMedia("(hover: hover)").matches) {
          const qx = cols.map((c) => gsap.quickTo(c, "x", { duration: 1.2, ease: "power3.out" }));
          const onMove = (e: MouseEvent) => {
            const dx = e.clientX / window.innerWidth - 0.5;
            qx.forEach((q, i) => q(dx * (i - 2) * -10));
          };
          window.addEventListener("mousemove", onMove);
          return () => {
            soltar();
            window.removeEventListener("mousemove", onMove);
          };
        }
        return soltar;
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="inicio" className={s.hero}>
      <div className={`contenedor ${s.cabeza}`}>
        <Titular as="h1" lineas={hero.titulo} marca={hero.marca} className={s.titulo} immediate delay={0.3} />
        <p className={s.bajada} data-fade>
          {hero.bajada}
        </p>
        <div className={s.botones} data-fade>
          <Boton href={hero.primario.href} magnet>
            {hero.primario.label}
          </Boton>
          <Boton href={hero.secundario.href} variante="secundario">
            {hero.secundario.label}
          </Boton>
        </div>
      </div>

      <div className={`contenedor ${s.mosaico}`}>
        <div className={`${s.col} ${s.colA}`} data-col data-speed="18">
          <Entra>
            <article className={`${s.card} ${s.cifra}`}>
              <Plus className={s.esquina} />
              <p className={s.cifraValor}>{mosaico.cifra.valor}</p>
              <p className={s.cifraTexto}>{mosaico.cifra.texto}</p>
              <Enlace href={mosaico.cifra.cta.href} className={s.pieCard}>
                {mosaico.cifra.cta.label}
                <span className={s.circulo}>
                  <Flecha />
                </span>
              </Enlace>
            </article>
          </Entra>
          <Entra>
            <Enlace href={mosaico.voz.href} className={`${s.card} ${s.voz}`}>
              <IconoVoz />
              <span className={s.vozTitulo}>{mosaico.voz.titulo}</span>
            </Enlace>
          </Entra>
        </div>

        <div className={`${s.col} ${s.colB}`} data-col data-speed="8">
          <Entra>
            <Enlace href="/programas/tamizaje-escolar" className={`${s.card} ${s.foto}`}>
              <Foto src={mosaico.causaA.foto} alt={mosaico.causaA.alt} sizes="(min-width: 1200px) 240px, 45vw" priority />
              <span className={s.chip}>{mosaico.causaA.etiqueta}</span>
              <span className={s.fotoTitulo}>{mosaico.causaA.titulo}</span>
            </Enlace>
          </Entra>
        </div>

        <div className={`${s.col} ${s.colC}`} data-col data-speed="0">
          <Entra>
            <article className={`${s.card} ${s.comunidad}`}>
              <div className={s.avatares} aria-hidden>
                {comunidad.fotos.slice(0, 3).map((f) => (
                  <Image key={f.src} src={f.src} alt="" width={64} height={64} />
                ))}
              </div>
              <p className={s.comunidadTitulo}>{mosaico.comunidad.titulo}</p>
              <Enlace href={mosaico.comunidad.cta.href} className={`${s.pieCard} ${s.pieOscuro}`}>
                {mosaico.comunidad.cta.label}
                <span className={s.circulo}>
                  <Flecha />
                </span>
              </Enlace>
            </article>
          </Entra>
        </div>

        <div className={`${s.col} ${s.colD}`} data-col data-speed="8">
          <Entra>
            <Enlace href="/programas/adultos-mayores" className={`${s.card} ${s.foto}`}>
              <Foto src={mosaico.causaB.foto} alt={mosaico.causaB.alt} sizes="(min-width: 1200px) 240px, 45vw" priority />
              <span className={s.chip}>{mosaico.causaB.etiqueta}</span>
              <span className={s.fotoTitulo}>{mosaico.causaB.titulo}</span>
            </Enlace>
          </Entra>
        </div>

        <div className={`${s.col} ${s.colE}`} data-col data-speed="18">
          <Entra>
            <Enlace href={mosaico.explorar.href} className={`${s.card} ${s.explorar}`}>
              <Foto src={mosaico.explorar.foto} alt={mosaico.explorar.alt} sizes="(min-width: 1200px) 240px, 45vw" className={s.explorarFoto} />
              <span className={`${s.pieCard} ${s.pieOscuro}`}>
                {mosaico.explorar.titulo}
                <span className={s.circulo}>
                  <Flecha />
                </span>
              </span>
            </Enlace>
          </Entra>
          <Entra>
            <Enlace href={mosaico.confianza.href} className={`${s.card} ${s.confianza}`}>
              <IconoCorazon />
              <span className={s.confianzaTitulo}>{mosaico.confianza.titulo}</span>
            </Enlace>
          </Entra>
        </div>
      </div>
    </section>
  );
}

/** Envoltura sin transiciones CSS: GSAP anima esta capa y la tarjeta conserva su hover. */
function Entra({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.entra} data-card>
      {children}
    </div>
  );
}

function IconoVoz() {
  return (
    <svg className={s.icono} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M8 10h32a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H22l-9 7v-7H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M15 22h.01M24 22h.01M33 22h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function IconoCorazon() {
  return (
    <svg className={s.icono} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M24 40S6 29.5 6 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 18 4.5C42 29.5 24 40 24 40Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M21 17h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="currentColor" transform="translate(0 -1) scale(1)" />
    </svg>
  );
}
