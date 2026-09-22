"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { golfTour } from "@/content/golf";
import { BotonGolf } from "@/components/golf/golf-ui";
import { VideoGolf } from "@/components/golf/video-golf";
import s from "./golf-banner.module.css";

/**
 * Banner del Hope Golf Tour en el inicio. Editorial y callado: el video
 * a sangre, el logo en crema al centro, "Próximamente" y un solo botón.
 */
export function GolfBanner() {
  const ref = useRef<HTMLElement>(null);
  const { banner, logo, temporada } = golfTour;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // El marco se abre de tarjeta a pantalla completa mientras entra
        gsap.fromTo(
          "[data-marco]",
          { clipPath: "inset(7% 5% 7% 5% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 10%", scrub: true },
          },
        );
        // El video, más lento que la página y asentándose desde un zoom
        gsap.fromTo(
          "[data-video-golf]",
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.04,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 45%", once: true } });
        tl.from("[data-logo]", { autoAlpha: 0, y: 30, filter: "blur(12px)", duration: 2, ease: "expo.out" })
          .from("[data-ante]", { autoAlpha: 0, y: 16, duration: 1.2, ease: "expo.out" }, 0.2)
          .from("[data-filete]", { scaleX: 0, duration: 1.6, ease: "expo.inOut", stagger: 0.1 }, 0.4)
          .from("[data-fade]", { autoAlpha: 0, y: 20, duration: 1.2, stagger: 0.12, ease: "expo.out" }, 0.8)
          .from("[data-esquina]", { autoAlpha: 0, duration: 1.4, stagger: 0.1, ease: "power2.out" }, 1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.seccion} aria-labelledby="golf-banner-titulo">
      <div className={s.marco} data-marco>
        <VideoGolf className={s.video} />
        <div className={s.velo} aria-hidden />

        <div className={s.esquinas} aria-hidden>
          {banner.esquinas.map((e, i) => (
            <span key={e} className={s[`esquina${i}`]} data-esquina>
              {e}
            </span>
          ))}
        </div>

        <div className={s.centro}>
          <p className={s.ante} data-ante>
            {banner.antetitulo}
          </p>
          <h2 id="golf-banner-titulo" className={s.logoCaja} data-logo>
            <Image src={logo.negativo} alt={logo.alt} className={s.logo} width={1525} height={430} unoptimized />
          </h2>
          <div className={s.estado}>
            <span className={s.filete} data-filete />
            <span data-fade>{banner.estado}</span>
            <span className={s.filete} data-filete />
          </div>
          <p className={s.frase} data-fade>
            {banner.frase}
          </p>
          <p className={s.temporada} data-fade>
            {temporada}
          </p>
          <div data-fade>
            <BotonGolf href={banner.cta.href}>{banner.cta.label}</BotonGolf>
          </div>
        </div>
      </div>
    </section>
  );
}
