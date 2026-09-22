"use client";

import { useState, type FormEvent } from "react";
import { golfTour } from "@/content/golf";
import { sitio } from "@/content/sitio";
import { pesos } from "@/components/ui";
import { FlechaLarga } from "./golf-ui";
import s from "./golf-tour.module.css";

/**
 * Formulario de inscripción. No hay pasarela todavía: arma un correo con
 * los datos para que la fundación confirme cupo y envíe los datos de pago.
 */
export function GolfInscripcion() {
  const { modalidades } = golfTour.inscripcion;
  const { paradas } = golfTour.calendario;
  const [modalidad, setModalidad] = useState(modalidades.find((m) => m.destacada)?.id ?? modalidades[0].id);
  const elegida = modalidades.find((m) => m.id === modalidad)!;

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const parada = paradas.find((p) => p.numero === datos.get("parada"));
    const asunto = `Inscripción Hope Golf Tour · Parada ${parada?.numero} ${parada?.ciudad}`;
    const cuerpo = [
      `Nombre: ${datos.get("nombre")}`,
      `Correo: ${datos.get("correo")}`,
      `Teléfono: ${datos.get("telefono")}`,
      `Hándicap: ${datos.get("handicap") || "Sin hándicap"}`,
      `Parada: ${parada?.numero} · ${parada?.ciudad} (${parada?.fecha}) · ${parada?.causa}`,
      `Modalidad: ${elegida.titulo} · ${pesos(elegida.precio)} ${elegida.unidad}`,
    ].join("\n");
    window.location.assign(`mailto:${sitio.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`);
  };

  return (
    <form className={s.form} onSubmit={enviar}>
      <fieldset className={s.modalidades}>
        <legend className={s.formLeyenda}>Modalidad</legend>
        {modalidades.map((m) => (
          <label key={m.id} className={s.modalidad} data-activa={m.id === modalidad || undefined}>
            <input
              type="radio"
              name="modalidad"
              value={m.id}
              checked={m.id === modalidad}
              onChange={() => setModalidad(m.id)}
              className="sr-only"
            />
            <span className={s.modalidadTitulo}>{m.titulo}</span>
            <span className={s.modalidadPrecio}>{pesos(m.precio)}</span>
            <span className={s.modalidadUnidad}>{m.unidad}</span>
            <ul className={s.modalidadIncluye}>
              {m.incluye.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </label>
        ))}
      </fieldset>

      <div className={s.campos}>
        <label className={s.campo}>
          <span>Nombre completo</span>
          <input name="nombre" required autoComplete="name" />
        </label>
        <label className={s.campo}>
          <span>Correo</span>
          <input name="correo" type="email" required autoComplete="email" />
        </label>
        <label className={s.campo}>
          <span>Teléfono</span>
          <input name="telefono" type="tel" required autoComplete="tel" />
        </label>
        <label className={s.campo}>
          <span>Hándicap (opcional)</span>
          <input name="handicap" inputMode="numeric" pattern="[0-9]{1,2}" />
        </label>
        <label className={`${s.campo} ${s.campoAncho}`}>
          <span>Parada</span>
          <select name="parada" defaultValue={paradas[0].numero}>
            {paradas.map((p) => (
              <option key={p.numero} value={p.numero}>
                {p.numero} · {p.ciudad} · {p.fecha} · {p.causa}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={s.formPie}>
        <p className={s.formTotal}>
          <small>Total</small>
          {pesos(elegida.precio)}
        </p>
        <button type="submit" className={s.formEnviar}>
          Enviar inscripción
          <span className={s.formEnviarFlecha} aria-hidden>
            <FlechaLarga />
          </span>
        </button>
      </div>
    </form>
  );
}
