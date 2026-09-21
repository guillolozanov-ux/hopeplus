"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { navegacion, pie, sitio, type ItemMenu } from "@/content/sitio";
import { Enlace } from "@/components/enlace";
import { Flecha } from "@/components/ui";
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
  // Último grupo abierto: el panel lo sigue mostrando mientras se cierra
  const [mostrado, setMostrado] = useState<ItemMenu | null>(null);
  if (grupo && grupo !== mostrado) setMostrado(grupo);
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

  // Panel de escritorio: se despliega hacia abajo y los enlaces suben en cascada
  useEffect(() => {
    const panel = panelRef.current;
    const header = ref.current;
    if (!panel || !header) return;
    header.dataset.abierto = String(Boolean(grupo) || movil);
    if (!grupo) {
      gsap.to(panel, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.inOut", overwrite: true });
      return;
    }
    gsap.to(panel, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out", overwrite: true });
    gsap.fromTo(
      panel.querySelectorAll("[data-panel-item]"),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, stagger: 0.05, ease: "expo.out", delay: 0.1 },
    );
  }, [grupo, movil]);

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
        <div
          ref={panelRef}
          id="panel-menu"
          className={s.panel}
          aria-hidden={!grupo}
          inert={!grupo}
        >
          <div className={s.panelInterior}>
            <ul className={s.panelLista}>
              {mostrado?.grupo?.map((g) => (
                <li key={g.href + g.label} className={s.panelFila}>
                  <Enlace href={g.href} className={s.panelLink} data-panel-item onClick={cerrar}>
                    {g.label}
                    <Flecha className={s.panelFlecha} />
                  </Enlace>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.panelPie}>
            <p>{sitio.claim}.</p>
            <p className={s.panelDescripcion}>{sitio.descripcion}</p>
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
                <a href={r.href}>{r.label}</a>
              </li>
            ))}
          </ul>
          <p>{sitio.claim}.</p>
        </div>
      </div>
    </>
  );
}
