"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenis } from "@/components/smooth-scroll";
import { CLASE_TRANSICION, EVENTO_REVELA } from "@/lib/intro";
import { registrarNavegar, varianteDe, type Variante } from "@/lib/transiciones";
import { piezasLogo, PLUS_CENTRADO } from "@/components/intro-logo";
import s from "./transicion.module.css";

const plus = piezasLogo.find((p) => p.tipo === "plus")!;
// Velo gigante con el "+" recortado, para la salida de la variante "plus"
const VELO_GIGANTE = "M-4000000 -4000000H4000000V4000000H-4000000Z";
const ORIGEN_PLUS = "0 0";

type Pendiente = { variante: Variante; hash: string };

/** Timeline que tapa la pantalla con la variante indicada. */
function cubrir(raiz: HTMLElement, v: Variante, origen: { x: number; y: number }) {
  const q = (sel: string) => raiz.querySelectorAll<HTMLElement | SVGElement>(sel);
  const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
  const capa = q(`[data-variante="${v}"]`);
  tl.set(capa, { autoAlpha: 1 });

  switch (v) {
    case "cortina":
      tl.fromTo(q("[data-cortina]"), { yPercent: 100 }, { yPercent: 0, duration: 0.9, stagger: 0.08 });
      break;
    case "columnas":
      tl.fromTo(q("[data-columna]"), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.7, stagger: 0.06 });
      break;
    case "circulo": {
      const { x, y } = origen;
      tl.fromTo(
        q("[data-circulo]"),
        { clipPath: `circle(0% at ${x * 100}% ${y * 100}%)` },
        { clipPath: `circle(150% at ${x * 100}% ${y * 100}%)`, duration: 0.9, ease: "power3.in" },
      );
      break;
    }
    case "plus":
      tl.set(q("[data-plus-velo]"), { autoAlpha: 0 })
        .set(q("[data-plus-lleno]"), { autoAlpha: 1 })
        .fromTo(q("[data-plus-lleno]"), { scale: 0, rotate: -90, svgOrigin: ORIGEN_PLUS }, { scale: 90, rotate: 0, svgOrigin: ORIGEN_PLUS, duration: 1, ease: "power3.in" });
      break;
    case "persianas":
      tl.fromTo(q("[data-persiana]"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, stagger: 0.05 });
      break;
    case "cinta":
      tl.fromTo(q("[data-cinta]"), { xPercent: -110 }, { xPercent: 0, duration: 0.9, stagger: 0.07, ease: "power3.inOut" });
      break;
    case "golf":
      // Paño verde que sube como un telón; el logo del tour asoma desde su máscara
      // y un filete crema traza el horizonte bajo él (sin título de texto)
      tl.fromTo(q("[data-golf]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" })
        .fromTo(q("[data-golf-logo]"), { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "expo.out" }, 0.4)
        .fromTo(q("[data-golf-horizonte]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.inOut" }, 0.45);
      break;
    case "inicio":
      tl.fromTo(q("[data-inicio]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }).fromTo(
        q("[data-inicio-plus]"),
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(1.7)" },
        0.1,
      );
      break;
  }
  tl.fromTo(q("[data-titulo]"), { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.35");
  return tl;
}

/** Timeline que destapa la página nueva. */
function descubrir(raiz: HTMLElement, v: Variante) {
  const q = (sel: string) => raiz.querySelectorAll<HTMLElement | SVGElement>(sel);
  const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
  tl.to(q("[data-titulo]"), { yPercent: -110, duration: 0.45, ease: "expo.in" });

  switch (v) {
    case "cortina":
      tl.to(q("[data-cortina]"), { yPercent: -100, duration: 0.9, stagger: { each: 0.08, from: "end" } }, "-=0.1");
      break;
    case "columnas":
      tl.set(q("[data-columna]"), { transformOrigin: "50% 100%" }).to(q("[data-columna]"), { scaleY: 0, duration: 0.7, stagger: 0.06 }, "-=0.1");
      break;
    case "circulo":
      tl.to(q("[data-circulo]"), { clipPath: "circle(0% at 50% 50%)", duration: 0.9, ease: "power3.inOut" }, "-=0.1");
      break;
    case "plus":
      // El "+" lleno se convierte en ventana: la página aparece a través de él
      tl.set(q("[data-plus-lleno]"), { autoAlpha: 0 })
        .set(q("[data-plus-velo]"), { autoAlpha: 1 })
        .fromTo(q("[data-plus-velo]"), { scale: 0.002, svgOrigin: ORIGEN_PLUS }, { scale: 90, svgOrigin: ORIGEN_PLUS, duration: 1.2, ease: "power4.in" });
      break;
    case "persianas":
      tl.set(q("[data-persiana]"), { transformOrigin: "100% 50%" }).to(q("[data-persiana]"), { scaleX: 0, duration: 0.7, stagger: 0.05 }, "-=0.1");
      break;
    case "cinta":
      tl.to(q("[data-cinta]"), { xPercent: 110, duration: 0.9, stagger: 0.07, ease: "power3.inOut" }, "-=0.1");
      break;
    case "golf":
      tl.to(q("[data-golf-logo]"), { yPercent: -105, duration: 0.6, ease: "expo.in" }, 0)
        .to(q("[data-golf-horizonte]"), { scaleX: 0, transformOrigin: "100% 50%", duration: 0.6, ease: "expo.in" }, 0)
        .to(q("[data-golf]"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2");
      break;
    case "inicio":
      tl.to(q("[data-inicio]"), { yPercent: -100, duration: 0.8 }, "-=0.1");
      break;
  }
  tl.set(q(`[data-variante="${v}"]`), { autoAlpha: 0 }).set(q("[data-reset]"), { clearProps: "all" });
  return tl;
}

/**
 * Velo de transición entre páginas. Cada variante sabe cubrir la pantalla
 * y descubrirla; la ruta de destino decide cuál se usa.
 */
export function Transicion() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const ruta = usePathname();
  const pendiente = useRef<Pendiente | null>(null);
  const ocupado = useRef(false);
  const origen = useRef({ x: 0.5, y: 0.5 });
  const rutaPrevia = useRef(ruta);
  const [titulo, setTitulo] = useState("");

  // Recordamos dónde fue el último clic para la variante "circulo"
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      origen.current = { x: e.clientX / innerWidth, y: e.clientY / innerHeight };
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  // Publicamos el navegador animado
  useEffect(() => {
    registrarNavegar((href) => {
      if (ocupado.current) return;
      const url = new URL(href, location.href);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      ocupado.current = true;
      const { variante, titulo: t } = varianteDe(url.pathname);
      setTitulo(t);
      ref.current!.dataset.activa = variante;
      document.documentElement.classList.add(CLASE_TRANSICION);
      lenis?.stop();
      pendiente.current = { variante, hash: url.hash };
      cubrir(ref.current!, variante, origen.current).then(() => {
        router.push(url.pathname + url.search, { scroll: false });
        // Red de seguridad: si la ruta no cambia (misma URL), destapamos igual
        setTimeout(() => {
          if (pendiente.current) {
            const v = pendiente.current.variante;
            pendiente.current = null;
            document.documentElement.classList.remove(CLASE_TRANSICION);
            window.dispatchEvent(new Event(EVENTO_REVELA));
            descubrir(ref.current!, v).then(() => {
              ocupado.current = false;
              lenis?.start();
            });
          }
        }, 4000);
      });
    });
    return () => registrarNavegar(null);
  }, [router]);

  // La ruta nueva ya se montó debajo del velo: arriba del todo y destapamos
  useEffect(() => {
    // Solo actúa cuando la ruta cambia de verdad
    if (ruta === rutaPrevia.current) return;
    rutaPrevia.current = ruta;
    const p = pendiente.current;
    if (!p) return;
    pendiente.current = null;

    // Lenis guarda su propia posición: hay que moverla mientras está activo,
    // si no, al reanudarse vuelve al scroll de la página anterior
    if (lenis) {
      lenis.start();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.stop();
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const raiz = document.documentElement;
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event(EVENTO_REVELA));
      raiz.classList.remove(CLASE_TRANSICION);
      descubrir(ref.current!, p.variante).then(() => {
        ocupado.current = false;
        lenis?.start();
        if (p.hash) {
          const destino = document.querySelector<HTMLElement>(p.hash);
          if (destino && lenis) lenis.scrollTo(destino, { offset: -80 });
          else destino?.scrollIntoView();
        }
      });
    });
  }, [ruta]);

  return (
    <div ref={ref} className={s.raiz} aria-hidden>
      <div className={s.capa} data-variante="cortina">
        <div className={`${s.panel} ${s.acento}`} data-cortina data-reset />
        <div className={`${s.panel} ${s.marino}`} data-cortina data-reset />
      </div>

      <div className={`${s.capa} ${s.filas}`} data-variante="columnas">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={s.marino} data-columna data-reset />
        ))}
      </div>

      <div className={s.capa} data-variante="circulo">
        <div className={`${s.panel} ${s.acento}`} data-circulo data-reset />
      </div>

      <div className={s.capa} data-variante="plus">
        {/* Lienzo centrado en (0, 0): el "+" queda en el centro de la pantalla */}
        <svg className={s.svg} viewBox="-740 -333 1480 666" preserveAspectRatio="xMidYMid slice">
          <path className={s.marinoSvg} d={PLUS_CENTRADO} data-plus-lleno data-reset />
          <path className={s.marinoSvg} d={`${VELO_GIGANTE} ${PLUS_CENTRADO}`} fillRule="evenodd" data-plus-velo data-reset />
        </svg>
      </div>

      <div className={`${s.capa} ${s.bandas}`} data-variante="persianas">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className={i % 2 ? s.marino : s.rubor} data-persiana data-reset />
        ))}
      </div>

      <div className={s.capa} data-variante="cinta">
        <div className={s.giro}>
          <div className={`${s.cinta} ${s.rubor}`} data-cinta data-reset />
          <div className={`${s.cinta} ${s.acento}`} data-cinta data-reset />
        </div>
      </div>

      <div className={s.capa} data-variante="golf">
        <div className={`${s.panel} ${s.bosque}`} data-golf data-reset>
          <div className={s.golfMarca}>
            <span className={s.golfMascara}>
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG del logo, sin optimizar */}
              <img src="/marca/golf-logo-claro.svg" alt="" className={s.golfLogo} data-golf-logo data-reset />
            </span>
            <span className={s.horizonte} data-golf-horizonte data-reset />
          </div>
        </div>
      </div>

      <div className={s.capa} data-variante="inicio">
        <div className={`${s.panel} ${s.crema}`} data-inicio data-reset>
          <svg viewBox="1190 404 144 146" className={s.plusInicio} data-inicio-plus data-reset>
            <path d={plus.d} fill={plus.fill} />
          </svg>
        </div>
      </div>

      <div className={s.tituloCaja}>
        {/* La máscara tiene el tamaño del título: al subir o bajar, desaparece */}
        <span className={s.mascara}>
          <span className={s.titulo} data-titulo>
            {titulo}
          </span>
        </span>
      </div>
    </div>
  );
}
