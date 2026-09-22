"use client";

/**
 * StaggeredMenu — adaptado de React Bits (reactbits.dev, MIT).
 * Cambios: controlado desde fuera (`open`/`onToggle`) y partido en dos piezas:
 * el botón vive en la barra del sitio y el panel se monta en un portal
 * (el encabezado tiene transform y confinaría a un hijo fixed). Textos en
 * español, colores y tipografía por tokens, enlaces con transición de página.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import "./StaggeredMenu.css";

export type ItemMenuEscalonado = { label: string; ariaLabel?: string; link: string };
export type RedMenuEscalonado = { label: string; link: string; icono?: ReactNode };

/* ---------------------------------------------------------------- */
/* Botón: texto que rueda "Menú" ⇄ "Cerrar" y "+" que gira a ✕      */
/* ---------------------------------------------------------------- */

export function StaggeredMenuToggle({
  open,
  onToggle,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [lineas, setLineas] = useState(["Menú", "Cerrar"]);
  const primera = useRef(true);

  useLayoutEffect(() => {
    gsap.set(plusHRef.current, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(plusVRef.current, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(iconRef.current, { rotate: 0, transformOrigin: "50% 50%" });
  }, []);

  // Ícono y texto reaccionan a `open` (también cuando se cierra desde fuera)
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    gsap.to(iconRef.current, open
      ? { rotate: 225, duration: 0.8, ease: "power4.out", overwrite: "auto" }
      : { rotate: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });

    const actual = open ? "Menú" : "Cerrar";
    const destino = open ? "Cerrar" : "Menú";
    const seq = [actual];
    let ultimo = actual;
    for (let i = 0; i < 3; i++) {
      ultimo = ultimo === "Menú" ? "Cerrar" : "Menú";
      seq.push(ultimo);
    }
    if (ultimo !== destino) seq.push(destino);
    seq.push(destino);
    setLineas(seq);
    const inner = textInnerRef.current;
    gsap.set(inner, { yPercent: 0 });
    gsap.to(inner, { yPercent: -((seq.length - 1) / seq.length) * 100, duration: 0.5 + seq.length * 0.07, ease: "power4.out" });
  }, [open]);

  return (
    <button
      className={`sm-toggle ${className ?? ""}`}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      aria-controls="staggered-menu-panel"
      onClick={onToggle}
      type="button"
    >
      <span className="sm-toggle-textWrap" aria-hidden="true">
        <span ref={textInnerRef} className="sm-toggle-textInner">
          {lineas.map((l, i) => (
            <span className="sm-toggle-line" key={i}>
              {l}
            </span>
          ))}
        </span>
      </span>
      <span ref={iconRef} className="sm-icon" aria-hidden="true">
        <span ref={plusHRef} className="sm-icon-line" />
        <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* Panel: capas escalonadas + panel con enlaces numerados y redes    */
/* ---------------------------------------------------------------- */

type PanelProps = {
  open: boolean;
  items: ItemMenuEscalonado[];
  socialItems?: RedMenuEscalonado[];
  /** Colores de las capas previas, de atrás hacia adelante (tokens CSS). */
  colors?: string[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  position?: "left" | "right";
  /** Render del enlace: el sitio usa su propio <Enlace> con transición. */
  renderLink: (item: ItemMenuEscalonado, children: ReactNode, className: string) => ReactNode;
  onClose: () => void;
};

export function StaggeredMenuPanel({
  open,
  items,
  socialItems = [],
  colors = ["var(--color-blush)", "var(--color-accent)"],
  displaySocials = true,
  displayItemNumbering = true,
  position = "right",
  renderLink,
  onClose,
}: PanelProps) {
  // true solo en el cliente (el portal necesita document.body)
  const montado = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  const capas = () => Array.from(preLayersRef.current?.querySelectorAll<HTMLElement>(".sm-prelayer") ?? []);
  const fuera = position === "left" ? -100 : 100;

  useLayoutEffect(() => {
    if (!montado || !panelRef.current) return;
    gsap.set([panelRef.current, ...capas()], { xPercent: fuera, opacity: 1 });
    gsap.set(preLayersRef.current, { xPercent: 0, opacity: 1 });
  }, [montado, fuera]);

  const abrir = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    const layers = capas();
    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline();
    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: fuera }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });
    const inicioPanel = (layers.length ? (layers.length - 1) * 0.07 : 0) + (layers.length ? 0.08 : 0);
    const durPanel = 0.65;
    tl.fromTo(panel, { xPercent: fuera }, { xPercent: 0, duration: durPanel, ease: "power4.out" }, inicioPanel);

    const inicioItems = inicioPanel + durPanel * 0.15;
    tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } }, inicioItems);
    tl.to(numberEls, { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08, from: "start" } }, inicioItems + 0.1);

    const inicioRedes = inicioPanel + durPanel * 0.4;
    if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, inicioRedes);
    tl.to(
      socialLinks,
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: { each: 0.08, from: "start" } },
      inicioRedes + 0.04,
    );
    openTlRef.current = tl;
  }, [fuera]);

  const cerrar = useCallback(() => {
    openTlRef.current?.kill();
    const panel = panelRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...capas(), panel], {
      xPercent: fuera,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
    });
  }, [fuera]);

  useEffect(() => {
    if (!montado) return;
    if (open) abrir();
    else cerrar();
  }, [open, montado, abrir, cerrar]);

  // Escape y clic fuera del panel cierran
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!montado) return null;

  return createPortal(
    <div className="staggered-menu-wrapper" data-position={position} data-open={open || undefined}>
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.slice(0, 3).map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                {renderLink(it, <span className="sm-panel-itemLabel">{it.label}</span>, "sm-panel-item")}
              </li>
            ))}
          </ul>
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Redes sociales">
              <h3 className="sm-socials-title">Redes</h3>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link" aria-label={s.label}>
                      {s.icono ?? s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
}
