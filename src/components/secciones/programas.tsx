"use client";

import { useRef, useState } from "react";
import { gsap, Draggable, useGSAP, MOTION_OK } from "@/lib/gsap";
import { programas } from "@/content/sitio";
import { Titular, Etiqueta, Foto, Flecha, pesos } from "@/components/ui";
import s from "./programas.module.css";

export function Programas() {
  const ref = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<Draggable>(null);
  const [limites, setLimites] = useState({ inicio: true, fin: false });

  const limitesCarril = () => {
    const vp = viewport.current!;
    const cs = getComputedStyle(vp);
    const ancho = vp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    return { minX: Math.min(0, ancho - track.current!.scrollWidth), maxX: 0 };
  };

  const actualizar = () => {
    const d = drag.current;
    if (!d) return;
    const x = gsap.getProperty(track.current, "x") as number;
    const inicio = x >= d.maxX - 1;
    const fin = x <= d.minX + 1;
    setLimites((prev) => (prev.inicio === inicio && prev.fin === fin ? prev : { inicio, fin }));
  };

  const redimensionar = () => {
    drag.current?.applyBounds(limitesCarril());
    actualizar();
  };

  const mover = (dir: 1 | -1) => {
    const d = drag.current;
    const card = track.current?.querySelector<HTMLElement>("[data-prog]");
    if (!d || !card) return;
    const paso = card.offsetWidth + parseFloat(getComputedStyle(track.current!).columnGap || "0");
    const actual = gsap.getProperty(track.current, "x") as number;
    const x = gsap.utils.clamp(d.minX, d.maxX, actual - dir * paso);
    gsap.to(track.current, { x, duration: 0.9, ease: "expo.out", onUpdate: actualizar, onComplete: () => d.update() });
  };

  useGSAP(
    () => {
      [drag.current] = Draggable.create(track.current!, {
        type: "x",
        bounds: limitesCarril(),
        inertia: true,
        edgeResistance: 0.85,
        dragClickables: true,
        minimumMovement: 6,
        onDrag: actualizar,
        onThrowUpdate: actualizar,
        onPress() {
          track.current!.dataset.arrastrando = "true";
        },
        onRelease() {
          track.current!.dataset.arrastrando = "false";
        },
      });
      redimensionar();
      window.addEventListener("resize", redimensionar);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-prog]", {
          x: 120,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.3,
          scrollTrigger: { trigger: viewport.current, start: "top 85%", once: true },
        });

        // Barras de progreso y montos se llenan al entrar en pantalla
        gsap.utils.toArray<HTMLElement>("[data-prog]").forEach((card) => {
          const barra = card.querySelector<HTMLElement>("[data-barra]")!;
          const monto = card.querySelector<HTMLElement>("[data-monto]")!;
          const valor = Number(monto.dataset.monto);
          const obj = { v: 0 };
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true } })
            .from(barra, { scaleX: 0, duration: 1.8, ease: "expo.inOut" }, 0.3)
            .to(
              obj,
              {
                v: valor,
                duration: 1.8,
                ease: "expo.inOut",
                onUpdate: () => {
                  monto.textContent = pesos(Math.round(obj.v / 1000) * 1000);
                },
              },
              0.3,
            );
        });
      });

      return () => {
        window.removeEventListener("resize", redimensionar);
        drag.current?.kill();
        mm.revert();
      };
    },
    { scope: ref },
  );

  // Con teclado: al enfocar una tarjeta fuera de vista, el carril se desplaza hasta ella
  const alEnfocar = (e: React.FocusEvent) => {
    const d = drag.current;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-prog]");
    if (!d || !card) return;
    const x = gsap.utils.clamp(d.minX, d.maxX, -card.offsetLeft);
    gsap.to(track.current, { x, duration: 0.6, onUpdate: actualizar, onComplete: () => d.update() });
  };

  return (
    <section ref={ref} id="programas" className={s.seccion}>
      <div className={`contenedor ${s.cabeza}`}>
        <div className={s.titulos}>
          <Etiqueta>{programas.etiqueta}</Etiqueta>
          <Titular lineas={programas.titulo} marca={programas.marca} className={s.titulo} />
        </div>
        <div className={s.flechas}>
          <button className={s.flecha} onClick={() => mover(-1)} disabled={limites.inicio} aria-label="Programa anterior">
            <Flecha className={s.izq} />
          </button>
          <button className={s.flecha} onClick={() => mover(1)} disabled={limites.fin} aria-label="Programa siguiente">
            <Flecha className={s.der} />
          </button>
        </div>
      </div>

      <div ref={viewport} className={`contenedor ${s.viewport}`} onFocus={alEnfocar}>
        <div ref={track} className={s.track}>
          {programas.items.map((p) => {
            const pct = Math.round((p.recaudado / p.meta) * 100);
            return (
              <article key={p.titulo} className={s.card} data-prog>
                <Foto src={p.foto} alt={p.alt} sizes="(min-width: 768px) 380px, 82vw" className={s.foto} />
                <div className={s.cuerpo}>
                  <h3 className={s.cardTitulo}>{p.titulo}</h3>
                  <p className={s.cardTexto}>{p.texto}</p>
                  <div
                    className={s.progreso}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${pct}% de la meta`}
                  >
                    <span className={s.barra} style={{ width: `${pct}%` }} data-barra />
                  </div>
                  <p className={s.montos}>
                    <strong data-monto={p.recaudado}>{pesos(p.recaudado)}</strong>
                    <span> recaudados de {pesos(p.meta)}</span>
                  </p>
                  <div className={s.pie}>
                    <span className={s.apoyos}>
                      <Corazon />
                      {p.apoyos.toLocaleString("es-CO")} donantes
                    </span>
                    <span className={s.categoria}>{p.categoria}</span>
                  </div>
                  <a href="#donar" className={s.donar}>
                    Apoyar este programa
                    <Flecha />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Corazon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={s.corazon}>
      <path d="M12 21s-9-5.3-9-11.3A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 9 2.7C21 15.7 12 21 12 21Z" fill="currentColor" />
    </svg>
  );
}
