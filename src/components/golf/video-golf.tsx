"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { golfTour } from "@/content/golf";
import s from "./video-golf.module.css";

const clips = golfTour.videos;
const CLAVE = "hope-golf-plano"; // por dónde va la rotación en esta pestaña
const RELEVO = 14_000; // cada cuánto entra otro plano, en ms

/** Siguiente plano de la vuelta: nunca repite el de la carga anterior. */
function siguiente(desde: number) {
  return (desde + 1) % clips.length;
}

/** Punto de partida de esta carga: sigue la vuelta donde la dejó la anterior. */
function arranque(posicion: number) {
  let previo = -1;
  try {
    previo = Number(sessionStorage.getItem(CLAVE) ?? -1);
  } catch {
    /* sin almacenamiento: arranca donde caiga */
  }
  const i = Number.isInteger(previo) && previo >= 0 ? siguiente(previo) : Math.floor(Math.random() * clips.length);
  try {
    sessionStorage.setItem(CLAVE, String(i));
  } catch {
    /* da igual: solo se pierde la continuidad entre cargas */
  }
  return (i + posicion) % clips.length;
}

function cargar(v: HTMLVideoElement, i: number) {
  const base = `/video/${clips[i].nombre}`;
  v.poster = `${base}.jpg`;
  v.setAttribute("aria-label", clips[i].alt);
  v.src = `${base}.webm`;
  v.load();
}

/**
 * Planos del tour. Cada carga entra por un plano distinto y, mientras la
 * sección se ve, los planos se relevan con un fundido lento. Con movimiento
 * reducido se queda quieto en uno solo.
 */
export function VideoGolf({
  className,
  prioridad,
  posicion = 0,
}: {
  className?: string;
  prioridad?: boolean;
  /** Orden de la sección en la página: cada una entra por un plano distinto. */
  posicion?: number;
}) {
  const capaA = useRef<HTMLVideoElement>(null);
  const capaB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = capaA.current;
    const b = capaB.current;
    if (!a || !b) return;

    let indice = arranque(posicion);
    let frente = a;
    let fondo = b;
    cargar(frente, indice);

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) return;

    let visible = false;
    let reloj: ReturnType<typeof setInterval> | undefined;

    const relevar = () => {
      if (!visible) return;
      indice = siguiente(indice);
      cargar(fondo, indice);
      fondo.play().catch(() => {});
      // Fundido largo entre planos: nunca hay un corte seco
      gsap.to(fondo, { autoAlpha: 1, duration: 1.6, ease: "power2.inOut" });
      gsap.to(frente, {
        autoAlpha: 0,
        duration: 1.6,
        ease: "power2.inOut",
        onComplete: () => {
          frente.pause();
          [frente, fondo] = [fondo, frente];
        },
      });
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        frente.play().catch(() => {});
        reloj ??= setInterval(relevar, RELEVO);
      } else {
        frente.pause();
        fondo.pause();
      }
    });
    io.observe(a);

    return () => {
      io.disconnect();
      clearInterval(reloj);
    };
  }, [posicion]);

  const comun = {
    className: `${s.capa} ${className ?? ""}`,
    muted: true,
    loop: true,
    playsInline: true,
    preload: prioridad ? ("auto" as const) : ("metadata" as const),
    "data-video-golf": true,
  };

  return (
    <>
      <video ref={capaA} {...comun} />
      <video ref={capaB} {...comun} data-fondo />
    </>
  );
}
