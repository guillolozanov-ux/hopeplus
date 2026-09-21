"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { donar, sitio } from "@/content/sitio";
import { Titular, Etiqueta, Boton, Plus, pesos } from "@/components/ui";
import s from "./donar.module.css";

export function Donar() {
  const ref = useRef<HTMLElement>(null);
  const [monto, setMonto] = useState(donar.montos[1]);
  const [copiado, setCopiado] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-bloque]", {
          y: 60,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.3,
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const elegir = contextSafe((m: number) => {
    setMonto(m);
    gsap.fromTo("[data-equivale]", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 });
  });

  const copiar = async () => {
    const numero = donar.cuenta.find((c) => c.k === "Número")?.v ?? "";
    try {
      await navigator.clipboard.writeText(numero);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin permiso de portapapeles: no hacemos nada */
    }
  };

  return (
    <section ref={ref} id="donar" className={`contenedor ${s.seccion}`}>
      <div className={s.intro} data-bloque>
        <Etiqueta>{donar.etiqueta}</Etiqueta>
        <Titular lineas={donar.titulo} marca={donar.marca} className={s.titulo} />
        <p className={s.bajada}>{donar.bajada}</p>
      </div>

      <div className={s.tarjeta} data-bloque>
        <p className={s.rotulo}>Elige un monto</p>
        <div className={s.montos} role="radiogroup" aria-label="Monto de la donación">
          {donar.montos.map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={monto === m}
              className={s.monto}
              onClick={() => elegir(m)}
            >
              {pesos(m)}
            </button>
          ))}
        </div>
        <p className={s.equivale} data-equivale aria-live="polite">
          <Plus className={s.plus} />
          {donar.equivalencias[monto]}
        </p>

        <dl className={s.cuenta}>
          {donar.cuenta.map((c) => (
            <div key={c.k} className={s.fila}>
              <dt>{c.k}</dt>
              <dd>{c.v}</dd>
            </div>
          ))}
        </dl>

        <div className={s.acciones}>
          <button className={s.copiar} onClick={copiar}>
            {copiado ? "Número copiado" : "Copiar número de cuenta"}
          </button>
          <Boton href={`mailto:${sitio.correo}?subject=Soporte de donación ${pesos(monto)}`} variante="acento" magnet>
            Enviar soporte
          </Boton>
        </div>
      </div>
    </section>
  );
}
