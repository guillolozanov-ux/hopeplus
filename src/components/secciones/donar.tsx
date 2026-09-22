"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { alRevelar } from "@/lib/intro";
import { donar, programas, sitio } from "@/content/sitio";
import { BarraMeta } from "@/components/barra-meta";
import { Titular, Etiqueta, Boton, Plus, pesos } from "@/components/ui";
import s from "./donar.module.css";

/** `principal`: es la primera sección de la página (/donar), entra al abrirse el velo. */
export function Donar({ principal = false }: { principal?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  // Destino: ?programa=slug preselecciona (llega desde "Apoyar este programa")
  const programaUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("programa"),
    () => null,
  );
  const [destinoElegido, setDestinoElegido] = useState<string | null>(null);
  const destino = destinoElegido ?? (programas.items.some((p) => p.slug === programaUrl) ? programaUrl! : "general");
  const programa = programas.items.find((p) => p.slug === destino);
  const nombreDestino = programa ? programa.corto : "Donde más se necesite";

  const [monto, setMonto] = useState(donar.montos[1]);
  // "Otro monto": solo dígitos; vacío = se usa el monto fijo elegido
  const [otro, setOtro] = useState("");
  const otroValor = otro ? Number(otro) : 0;
  const usandoOtro = otro !== "";
  const otroValido = otroValor >= donar.minimo;
  const montoFinal = usandoOtro ? otroValor : monto;
  const puedeEnviar = !usandoOtro || otroValido;
  const [copiado, setCopiado] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tween = gsap.from("[data-bloque]", {
          y: 60,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.3,
          paused: principal,
          scrollTrigger: principal ? undefined : { trigger: ref.current, start: "top 75%", once: true },
        });
        if (principal) return alRevelar(() => tween.play());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const elegir = contextSafe((m: number) => {
    setMonto(m);
    setOtro("");
    gsap.fromTo("[data-equivale]", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 });
  });

  const escribirOtro = (valor: string) => {
    // Solo dígitos, sin ceros a la izquierda y con un tope razonable (12 dígitos)
    setOtro(valor.replace(/\D/g, "").replace(/^0+/, "").slice(0, 12));
  };

  const asunto = encodeURIComponent(`Soporte de donación ${pesos(montoFinal)} · ${nombreDestino}`);
  const cuerpo = encodeURIComponent(
    `Hola, adjunto el soporte de mi donación a ${sitio.nombreLegal} por ${pesos(montoFinal)}.\nDestino: ${nombreDestino}.\n\nNombre:\nDocumento:\n`,
  );

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
    <section ref={ref} id="donar" className={`contenedor ${s.seccion} ${principal ? s.principal : ""}`}>
      <div className={s.intro} data-bloque>
        <Etiqueta>{donar.etiqueta}</Etiqueta>
        <Titular as={principal ? "h1" : "h2"} lineas={donar.titulo} marca={donar.marca} className={s.titulo} immediate={principal} />
        <p className={s.bajada}>{donar.bajada}</p>
      </div>

      <div className={s.tarjeta} data-bloque>
        {/* 1. Destino de la donación */}
        <p className={s.rotulo}>¿A qué quieres donar?</p>
        <div className={s.destinos} role="radiogroup" aria-label="Destino de la donación">
          {[{ slug: "general", corto: "Donde más se necesite" }, ...programas.items].map((d) => (
            <button
              key={d.slug}
              role="radio"
              aria-checked={destino === d.slug}
              className={s.destino}
              onClick={() => setDestinoElegido(d.slug)}
            >
              {d.corto}
            </button>
          ))}
        </div>
        <div className={s.resumen} aria-live="polite">
          {programa ? (
            <>
              <p className={s.resumenTexto}>
                <strong>{pesos(programa.recaudado)}</strong> recaudados de {pesos(programa.meta)}
              </p>
              <BarraMeta key={programa.slug} pct={(programa.recaudado / programa.meta) * 100} fondo="oscuro" />
            </>
          ) : (
            <p className={s.resumenTexto}>Tu aporte se asigna al programa con la necesidad más urgente del mes.</p>
          )}
        </div>

        {/* 2. Monto */}
        <p className={`${s.rotulo} ${s.rotuloMonto}`}>Elige un monto</p>
        <div className={s.montos} role="radiogroup" aria-label="Monto de la donación">
          {donar.montos.map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={!usandoOtro && monto === m}
              className={s.monto}
              onClick={() => elegir(m)}
            >
              {pesos(m)}
            </button>
          ))}
        </div>
        {/* Otro monto: cualquier cifra desde el mínimo */}
        <div className={s.otro} data-activo={usandoOtro || undefined} data-error={(usandoOtro && !otroValido) || undefined}>
          <label htmlFor="otro-monto" className={s.otroEtiqueta}>
            Otro monto <span>(mínimo {pesos(donar.minimo)})</span>
          </label>
          <div className={s.otroCampo}>
            <span className={s.otroSigno} aria-hidden>
              $
            </span>
            <input
              id="otro-monto"
              className={s.otroInput}
              inputMode="numeric"
              autoComplete="off"
              placeholder="Escribe tu monto"
              value={otro ? new Intl.NumberFormat("es-CO").format(otroValor) : ""}
              onChange={(e) => escribirOtro(e.target.value)}
              aria-invalid={usandoOtro && !otroValido}
              aria-describedby="otro-ayuda"
            />
            <span className={s.otroMoneda} aria-hidden>
              COP
            </span>
          </div>
          <p id="otro-ayuda" className={s.otroAyuda} aria-live="polite">
            {usandoOtro && !otroValido ? `El monto mínimo es ${pesos(donar.minimo)}.` : ""}
          </p>
        </div>

        <p className={s.equivale} data-equivale aria-live="polite">
          <Plus className={s.plus} />
          {equivalencia(montoFinal, usandoOtro && !otroValido, programa)}
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
          <span className={s.enviar} data-bloqueado={!puedeEnviar || undefined} aria-disabled={!puedeEnviar}>
            <Boton href={`mailto:${sitio.correo}?subject=${asunto}&body=${cuerpo}`} variante="acento" magnet>
              Enviar soporte
            </Boton>
          </span>
        </div>
      </div>
    </section>
  );
}

const porcentaje = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 });

/**
 * Qué hace un monto. Con un programa elegido: qué parte de lo que le falta cubre.
 * Sin programa: el tramo más alto que alcanza; desde 500.000, días de brigada.
 */
function equivalencia(monto: number, invalido: boolean, programa?: (typeof programas.items)[number]) {
  if (invalido) return `Escribe un monto desde ${pesos(donar.minimo)}.`;
  if (programa) {
    const falta = programa.meta - programa.recaudado;
    if (monto >= falta) return `Completa la meta de ${programa.corto}.`;
    return `Cubre el ${porcentaje.format((monto / falta) * 100)} % de lo que le falta a ${programa.corto}.`;
  }
  const tramos = Object.keys(donar.equivalencias)
    .map(Number)
    .sort((a, b) => a - b);
  const mayor = tramos[tramos.length - 1];
  if (monto >= mayor * 2) {
    const dias = Math.floor(monto / mayor);
    return `Sostiene ${dias} días completos de brigada.`;
  }
  const tramo = [...tramos].reverse().find((t) => monto >= t) ?? tramos[0];
  return donar.equivalencias[tramo];
}
