"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { golfTour } from "@/content/golf";

const clips = golfTour.videos;
// Un plano de arranque al azar por carga de página: cada sección suma su posición,
// así en una misma visita nunca se repite el mismo plano dos veces seguidas.
const inicio = Math.floor(Math.random() * clips.length);
const suscribir = () => () => {};

/**
 * Video del tour: corre solo mientras se ve (ahorra batería) y con
 * movimiento reducido se queda en el póster.
 */
export function VideoGolf({
  className,
  prioridad,
  posicion = 0,
}: {
  className?: string;
  prioridad?: boolean;
  /** Orden de la sección dentro de la página, para que cada una tome otro plano. */
  posicion?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // En el servidor y al hidratar se usa el orden fijo; ya en el cliente entra el azar
  const montado = useSyncExternalStore(suscribir, () => true, () => false);
  const clip = clips[((montado ? inicio : 0) + posicion) % clips.length];
  const base = `/video/${clip.nombre}`;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [clip.nombre]);

  return (
    <video
      key={clip.nombre}
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={prioridad ? "auto" : "metadata"}
      poster={`${base}.jpg`}
      aria-label={clip.alt}
      data-video-golf
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}
