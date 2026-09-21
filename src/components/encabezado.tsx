"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Enlace } from "@/components/enlace";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { navegacion, hero } from "@/content/sitio";
import { Boton } from "@/components/ui";
import s from "./encabezado.module.css";

export function Encabezado() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();
  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta.startsWith(href));

  useGSAP(
    () => {
      const header = ref.current!;
      // Se oculta al bajar y reaparece al subir; gana fondo al salir del hero
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          header.dataset.solido = String(self.scroll() > 40);
          if (header.dataset.menu === "true") return;
          const ocultar = self.direction === 1 && self.scroll() > 400;
          gsap.to(header, { yPercent: ocultar ? -110 : 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const entrada = gsap.from(header.querySelectorAll("[data-entra]"), {
          y: -24,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1,
          delay: 0.2,
          paused: true,
        });
        return alRevelar(() => entrada.play());
      });

      tl.current = gsap
        .timeline({ paused: true })
        .set(menuRef.current, { display: "flex" })
        .fromTo(menuRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" })
        .from(menuRef.current!.querySelectorAll("[data-item]"), { yPercent: 120, stagger: 0.06, duration: 0.8 }, "-=0.35");
    },
    { scope: ref },
  );

  // Al cambiar de página el encabezado vuelve a verse aunque se hubiera ocultado
  useEffect(() => {
    if (ref.current) gsap.to(ref.current, { yPercent: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
  }, [ruta]);

  const alternar = () => {
    const next = !abierto;
    setAbierto(next);
    ref.current!.dataset.menu = String(next);
    if (next) tl.current?.timeScale(1).play();
    else tl.current?.timeScale(1.6).reverse();
  };

  const cerrar = () => abierto && alternar();

  return (
    <>
      <header ref={ref} className={s.header} data-solido="false">
        <div className={`contenedor ${s.barra}`}>
          <Enlace href="/" className={s.logo} data-entra aria-label="hope+ Fundation, inicio">
            <Image src="/marca/hope-logo.svg" alt="" width={740} height={266} priority unoptimized className={s.logoOscuro} />
            <Image src="/marca/hope-logo-claro.svg" alt="" width={740} height={266} unoptimized className={s.logoClaro} />
          </Enlace>

          <nav className={s.nav} aria-label="Principal">
            {navegacion.map((n) => (
              <Enlace key={n.href} href={n.href} className={s.link} data-entra aria-current={activo(n.href) ? "page" : undefined}>
                {n.label}
              </Enlace>
            ))}
          </nav>

          <div className={s.acciones} data-entra>
            <Boton href={hero.primario.href} variante="acento" className={s.donar} magnet>
              Donar
            </Boton>
            <button
              className={s.burger}
              onClick={alternar}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Fuera del <header>: si el header tiene transform, un hijo fixed quedaría
          confinado a su caja en lugar de ocupar la pantalla */}
      <div ref={menuRef} id="menu-movil" className={s.menu} aria-hidden={!abierto} inert={!abierto}>
        <nav className={`contenedor ${s.menuNav}`} aria-label="Menú">
          {[{ label: "Inicio", href: "/" }, ...navegacion, { label: "Donar", href: "/donar" }].map((n, i) => (
            <div key={n.href} className={s.menuFila}>
              <Enlace href={n.href} className={s.menuLink} data-item onClick={cerrar}>
                <span className={s.menuNum}>{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Enlace>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
