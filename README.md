# TSP Hope Fundación — sitio web

Sitio de una sola página para la fundación del grupo TuSalud+.
Next.js 16 (App Router) + GSAP + Lenis + componentes adaptados de React Bits.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint && npm run typecheck
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/styles/tokens.ts` | **Fuente de verdad del diseño.** Colores, tipografía (3 breakpoints), espacios, radios, medidas. Se inyecta como variables CSS en `layout.tsx`. |
| `src/content/sitio.ts` | Todos los textos, cifras y programas. |
| `src/components/secciones/` | Una sección por archivo: hero, manifiesto, cómo ayudar, programas, comunidad, cinta, equipo, donar, preguntas. |
| `src/components/reactbits/` | SplitText, ScrollReveal, ScrollVelocity, CountUp, TiltedCard, Magnet (adaptados). |
| `src/lib/gsap.ts` | Registro de plugins GSAP y media query de movimiento reducido. |
| `docs/informe-estructura.md` | Qué se tomó de la referencia (esqueleto) y qué no (piel). |
| `content/datos-pendientes.md` | Lo que falta confirmar con la fundación. |

Reglas:
- Ningún color, fuente o medida compartida se escribe suelto en un componente: sale de `tokens.ts`.
- Todas las animaciones respetan `prefers-reduced-motion`.
- Breakpoints: 768 px (tablet) y 1200 px (escritorio). En los `.module.css` se repiten
  como literales porque CSS no admite variables en `@media`.

## Despliegue

Vercel, framework Next.js, sin variables de entorno.
