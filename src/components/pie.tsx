import Image from "next/image";
import { pie, sitio } from "@/content/sitio";
import { Boton, Titular } from "@/components/ui";
import s from "./pie.module.css";

export function Pie() {
  return (
    <footer className={s.pie}>
      <div className={s.bloque}>
        <div className={`contenedor ${s.interior}`}>
          <Titular lineas={sitio.claim} marca="cuida" as="p" className={s.claim} />

          <div className={s.grilla}>
            <div className={s.marca}>
              <Image src="/marca/hope-logo-claro.svg" alt="hope+ Fundation" width={740} height={266} unoptimized className={s.logo} />
              <p className={s.descripcion}>{sitio.descripcion}</p>
            </div>
            {pie.columnas.map((c) => (
              <nav key={c.titulo} className={s.columna} aria-label={c.titulo}>
                <p className={s.colTitulo}>{c.titulo}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={s.link}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className={s.base}>
            <p>
              {sitio.anio} © {sitio.nombreLegal} · {sitio.ciudad} · {pie.grupo}
            </p>
            <Boton href="#donar" variante="acento">
              Donar ahora
            </Boton>
          </div>
        </div>
      </div>
    </footer>
  );
}
