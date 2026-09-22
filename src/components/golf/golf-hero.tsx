"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { golfTour } from "@/content/golf";
import { VideoGolf } from "./video-golf";
import s from "./golf-tour.module.css";

/** Primer pantallazo de /golf-tour: video a sangre y el logo en crema. */
export function GolfHero() {
  const ref = useRef<HTMLElement>(null);
  const { hero, logo, temporada, banner } = golfTour;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true });
        tl.from("[data-video-golf]", { scale: 1.25, duration: 2.6, ease: "expo.out" }, 0)
          .from("[data-logo]", { autoAlpha: 0, y: 40, filter: "blur(14px)", duration: 2, ease: "expo.out" }, 0.3)
          .from("[data-ante]", { autoAlpha: 0, y: 16, duration: 1.2, ease: "expo.out" }, 0.4)
          .from("[data-filete]", { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.6)
          .from("[data-fade]", { autoAlpha: 0, y: 20, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.9);

        // Al bajar, el contenido se aleja y el video se oscurece
        gsap.to("[data-hero-contenido]", {
          yPercent: -18,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-video-golf]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        return alRevelar(() => tl.play());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.hero} data-hero-oscuro>
      <VideoGolf className={s.heroVideo} prioridad />
      <div className={s.heroVelo} aria-hidden />
      <div className={s.heroContenido} data-hero-contenido>
        <p className={s.heroAnte} data-ante>
          {hero.antetitulo}
        </p>
        <h1 className={s.heroLogo} data-logo>
          <Image src={logo.negativo} alt={logo.alt} width={1525} height={430} priority unoptimized />
        </h1>
        <div className={s.heroEstado}>
          <span className={s.heroFilete} data-filete />
          <span data-fade>
            {banner.estado} · {temporada}
          </span>
          <span className={s.heroFilete} data-filete />
        </div>
        <p className={s.heroBajada} data-fade>
          {hero.bajada}
        </p>
      </div>
      <span className={s.heroDesliza} aria-hidden data-fade>
        Desliza
        <span className={s.heroLinea} />
      </span>
    </section>
  );
}
