"use client";

import { useEffect, useRef } from "react";
import { golfTour } from "@/content/golf";

/**
 * Video del tour: corre solo mientras se ve (ahorra batería) y con
 * movimiento reducido se queda en el póster.
 */
export function VideoGolf({ className, prioridad }: { className?: string; prioridad?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const base = `/video/${golfTour.video.nombre}`;

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
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={prioridad ? "auto" : "metadata"}
      poster={`${base}.jpg`}
      aria-label={golfTour.video.alt}
      data-video-golf
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}
