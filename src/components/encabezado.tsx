"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { navegacion, pie, sitio, type ItemMenu } from "@/content/sitio";
import { Enlace } from "@/components/enlace";
import { Flecha } from "@/components/ui";
import { IconoRed } from "@/components/redes";
import s from "./encabezado.module.css";

// Rutas cuyo primer pantallazo es una foto oscura: la barra arranca en claro.
// Hoy ninguna (la foto de /nosotros es clara arriba), pero el tono queda listo.
const RUTAS_OSCURAS: string[] = [];

const redes = pie.columnas.find((c) => c.titulo === "Redes")?.links ?? [];

/**
 * Encabezado: barra delgada fija, navegación a la derecha con grupos que abren
 * un panel a todo el ancho, y botón de donación compacto. En móvil, un panel
 * lateral con acordeones.
 */
export function Encabezado() {
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const movilRef = useRef<HTMLDivElement>(null);
  const [grupo, setGrupo] = useState<ItemMenu | null>(null);
  const [movil, setMovil] = useState(false);
  const [acordeon, setAcordeon] = useState<string | null>(null);
  // Grupo que el panel está mostrando. Va un paso detrás de `grupo`: al cambiar
  // o cerrar, primero sale el contenido actual y después se actualiza.
  const [mostrado, setMostrado] = useState<ItemMenu | null>(null);
  if (grupo && !mostrado) setMostrado(grupo);
  const panelAbierto = useRef(false);
  const alturaPrevia = useRef(0);
  const ruta = usePathname();

  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta.startsWith(href));
  const oscura = RUTAS_OSCURAS.some((r) => ruta.startsWith(r));

  useGSAP(
    () => {
      const header = ref.current!;
      // Se oculta al bajar y reaparece al subir; gana fondo al salir del primer pantallazo
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          header.dataset.solido = String(self.scroll() > 40);
          if (header.dataset.abierto === "true") return;
          const ocultar = self.direction === 1 && self.scroll() > 300;
          gsap.to(header, { yPercent: ocultar ? -110 : 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const entrada = gsap.from(header.querySelectorAll("[data-entra]"), {
          y: -20,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 0.9,
          delay: 0.15,
          paused: true,
        });
        return alRevelar(() => entrada.play());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // Panel de escritorio, en dos tiempos (curvas inOutFuerte / inOutSuave de los tokens):
  // 1) cuando cambia `grupo`: sale lo que se ve (cambio de grupo) o se cierra el panel
  useEffect(() => {
    const panel = panelRef.current;
    const header = ref.current;
    if (!panel || !header) return;
    header.dataset.abierto = String(Boolean(grupo) || movil);
    const q = (sel: string) => panel.querySelectorAll<HTMLElement>(sel);

    if (grupo && mostrado && grupo !== mostrado) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Se congela el alto actual para que el contenido nuevo no lo haga saltar;
          // luego se interpola hacia el alto del grupo nuevo
          alturaPrevia.current = panel.offsetHeight;
          panel.style.height = `${alturaPrevia.current}px`;
          setMostrado(grupo);
        },
      });
      tl.to(q("[data-panel-media]"), { clipPath: "inset(0 0 100% 0)", duration: 0.25, ease: "inOutFuerte" }).to(
        q("[data-panel-item]"),
        { yPercent: -110, autoAlpha: 0, duration: 0.25, stagger: 0.05, ease: "inOutFuerte" },
        "<",
      );
      return () => {
        tl.kill();
      };
    }

    if (!grupo && mostrado) {
      const tl = gsap.timeline({
        onComplete: () => {
          panelAbierto.current = false;
          setMostrado(null);
        },
      });
      tl.to(panel, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "inOutSuave" });
      return () => {
        tl.kill();
      };
    }
  }, [grupo, mostrado, movil]);

  // 2) cuando cambia `mostrado`: entra el contenido nuevo (y el panel, si estaba cerrado)
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !mostrado) return;
    const q = (sel: string) => panel.querySelectorAll<HTMLElement>(sel);
    const items = q("[data-panel-item]");
    const tl = gsap.timeline();

    const cambio = panelAbierto.current;
    if (!cambio) {
      tl.fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "inOutFuerte" });
      panelAbierto.current = true;
    } else if (alturaPrevia.current) {
      // El panel se estira o se recoge suavemente al alto del grupo nuevo
      panel.style.height = "auto";
      const nueva = panel.offsetHeight;
      tl.fromTo(
        panel,
        { height: alturaPrevia.current },
        { height: nueva, duration: 0.8, ease: "inOutSuave", clearProps: "height" },
        0,
      );
      alturaPrevia.current = 0;
    }
    // La foto se destapa de abajo hacia arriba mientras se asienta con resorte
    tl.fromTo(
      q("[data-panel-media]"),
      { clipPath: cambio ? "inset(100% 0 0 0)" : "inset(0 0 0% 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.65, ease: "inOutFuerte" },
      cambio ? 0.15 : 0,
    )
      .fromTo(q("[data-panel-img]"), { scale: 1.25 }, { scale: 1, duration: 1.3, ease: "resorte" }, "<")
      .fromTo(items, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.09, ease: "resorte" }, "<");

    if (!cambio) {
      const t = Math.min(0.25 + 0.03 * items.length, 0.6);
      tl.fromTo(q("[data-panel-red]"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "resorte" }, t).fromTo(
        q("[data-panel-frase]"),
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "inOutFuerte" },
        t + 0.25,
      );
    }
    return () => {
      tl.kill();
    };
  }, [mostrado]);

  // Panel móvil: entra desde la derecha
  useEffect(() => {
    const panel = movilRef.current;
    if (!panel) return;
    if (ref.current) ref.current.dataset.abierto = String(movil || Boolean(grupo));
    // El CSS lo deja fuera con translateX(100%); GSAP lo leería como px en `x`,
    // así que se pone x en 0 y todo el desplazamiento va por xPercent
    gsap.set(panel, { x: 0, xPercent: gsap.getProperty(panel, "xPercent") || 100 });
    gsap.to(panel, { xPercent: movil ? 0 : 100, duration: movil ? 0.7 : 0.5, ease: "expo.inOut", overwrite: true });
    if (movil) {
      gsap.fromTo(
        panel.querySelectorAll("[data-movil-item]"),
        { x: 40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05, ease: "expo.out", delay: 0.2 },
      );
    }
  }, [movil, grupo]);

  // Al cambiar de página: todo cerrado (ajuste de estado durante el render, patrón de React)
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setGrupo(null);
    setMovil(false);
    setAcordeon(null);
  }

  // …y la barra vuelve a verse aunque se hubiera ocultado con el scroll
  useEffect(() => {
    if (ref.current) gsap.to(ref.current, { yPercent: 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
  }, [ruta]);

  // Escape cierra cualquier panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setGrupo(null);
      setMovil(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cerrar = () => {
    setGrupo(null);
    setMovil(false);
  };

  const abierto = Boolean(grupo) || movil;

  return (
    <>
      <header
        ref={ref}
        className={s.header}
        data-solido="false"
        data-tono={oscura && !abierto ? "claro" : "oscuro"}
        data-panel={abierto ? "true" : "false"}
      >
        <div className={s.barra}>
          <Enlace href="/" className={s.logo} data-entra aria-label="hope+ Fundation, inicio" onClick={cerrar}>
            <Image src="/marca/hope-logo.svg" alt="" width={740} height={266} priority unoptimized className={s.logoOscuro} />
            <Image src="/marca/hope-logo-claro.svg" alt="" width={740} height={266} unoptimized className={s.logoClaro} />
          </Enlace>

          <div className={s.derecha}>
            <nav className={s.nav} aria-label="Principal">
              <ul className={s.lista}>
                {navegacion.map((n) => (
                  <li key={n.href} data-entra>
                    {n.grupo ? (
                      <button
                        className={s.link}
                        aria-expanded={grupo?.label === n.label}
                        aria-controls="panel-menu"
                        data-actual={activo(n.href) || undefined}
                        onClick={() => setGrupo((g) => (g?.label === n.label ? null : n))}
                      >
                        {n.label}
                        <span className={s.caret} aria-hidden />
                      </button>
                    ) : (
                      <Enlace href={n.href} className={s.link} aria-current={activo(n.href) ? "page" : undefined} onClick={cerrar}>
                        {n.label}
                      </Enlace>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Enlace href="/donar" className={s.cta} data-entra onClick={cerrar}>
              <span className={`${s.ctaFlecha} ${s.ctaIzq}`} aria-hidden>
                <Flecha />
              </span>
              Donar
              <span className={`${s.ctaFlecha} ${s.ctaDer}`} aria-hidden>
                <Flecha />
              </span>
            </Enlace>

            <button
              className={s.burger}
              data-entra
              onClick={() => {
                setGrupo(null);
                setMovil((m) => !m);
              }}
              aria-expanded={movil}
              aria-controls="menu-movil"
              aria-label={movil ? "Cerrar menú" : "Abrir menú"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Panel desplegable de escritorio (a todo el ancho, bajo la barra) */}
        <div ref={panelRef} id="panel-menu" className={s.panel} aria-hidden={!grupo} inert={!grupo}>
          <div className={s.panelInterior}>
            <div className={s.panelMedia} data-panel-media>
              {mostrado?.imagen && (
                <Image
                  key={mostrado.imagen.src}
                  src={mostrado.imagen.src}
                  alt={mostrado.imagen.alt}
                  fill
                  sizes="240px"
                  className={s.panelImg}
                  style={{ objectPosition: mostrado.imagen.posicion }}
                  data-panel-img
                />
              )}
            </div>
            <ul className={s.panelLista}>
              {mostrado?.grupo?.map((g) => (
                <li key={g.href + g.label} className={s.panelFila}>
                  <Enlace href={g.href} className={s.panelLink} data-panel-item onClick={cerrar}>
                    {g.label}
                    <FlechaPanel />
                  </Enlace>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.panelPie}>
            <ul className={s.panelRedes} aria-label="Redes sociales">
              {redes.map((r) => (
                <li key={r.label} data-panel-red>
                  <a href={r.href} aria-label={r.label} className={s.red}>
                    <IconoRed red={r.label} />
                  </a>
                </li>
              ))}
            </ul>
            <p className={s.panelFrase} data-panel-frase>
              {sitio.descripcion}
            </p>
          </div>
        </div>
      </header>

      {/* Velo que oscurece la página mientras hay un panel abierto */}
      <button
        className={s.velo}
        data-visible={abierto}
        onClick={cerrar}
        aria-label="Cerrar menú"
        tabIndex={abierto ? 0 : -1}
      />

      {/* Panel lateral móvil. Fuera del <header>: su transform confinaría a un hijo fixed */}
      <div ref={movilRef} id="menu-movil" className={s.movil} aria-hidden={!movil} inert={!movil}>
        <nav aria-label="Menú">
          <ul className={s.movilLista}>
            <li data-movil-item>
              <Enlace href="/" className={s.movilLink} onClick={cerrar}>
                Inicio
              </Enlace>
            </li>
            {navegacion.map((n) => (
              <li key={n.href} data-movil-item>
                {n.grupo ? (
                  <>
                    <button
                      className={s.movilLink}
                      aria-expanded={acordeon === n.label}
                      onClick={() => setAcordeon((a) => (a === n.label ? null : n.label))}
                    >
                      {n.label}
                      <span className={s.caret} aria-hidden />
                    </button>
                    {/* Una sola fila de grid que se anima de 0fr a 1fr */}
                    <div className={s.sublista} data-abierta={acordeon === n.label}>
                      <ul className={s.subInterior}>
                        {n.grupo.map((g) => (
                          <li key={g.href + g.label}>
                            <Enlace href={g.href} className={s.subLink} onClick={cerrar} tabIndex={acordeon === n.label ? 0 : -1}>
                              {g.label}
                            </Enlace>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Enlace href={n.href} className={s.movilLink} onClick={cerrar}>
                    {n.label}
                  </Enlace>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.movilPie} data-movil-item>
          <ul className={s.redes}>
            {redes.map((r) => (
              <li key={r.label}>
                <a href={r.href} aria-label={r.label} className={s.red}>
                  <IconoRed red={r.label} />
                </a>
              </li>
            ))}
          </ul>
          <p>{sitio.claim}.</p>
        </div>
      </div>
    </>
  );
}

/** Flecha del panel: ocupa todo su lienzo para medir lo mismo que la letra. */
function FlechaPanel() {
  return (
    <svg className={s.panelFlecha} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        d="M3.5 20.5 20.5 3.5M6.5 3.5h14v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
