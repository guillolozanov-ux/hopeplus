# Hope+ — Informe de estructura

Referencia: captura de una plantilla de donaciones (se usa solo como esqueleto).
Piel: marca TSP Hope Fundación, sub-marca de TuSalud+.

## Arquitectura
1. **Navegación** — logo a la izquierda, 4 enlaces al centro, menú a la derecha.
2. **Hero** — titular serif centrado a dos líneas, bajada corta, dos botones
   (primario "Donar", secundario "Ver video"). Debajo, un **mosaico de 7 tarjetas**
   de alturas escalonadas: cifra de impacto, causas con foto, CTA de comunidad,
   tarjeta de acción ("Tu voz cuenta", "Explorar").
3. **Cómo ayudar** — panel de color de ancho casi total, título centrado,
   3 columnas con ilustración + título + texto corto.
4. **Causas / programas urgentes** — título a la izquierda, flechas de carrusel a la
   derecha, tarjetas horizontales deslizables: foto, título, bajada, barra de
   progreso, recaudado vs. meta, apoyos, etiqueta de categoría.
5. **Comunidad** — frase centrada, **contador gigante**, CTA; fotos pequeñas
   flotando alrededor.
6. **Cinta** — dos franjas de texto en bucle, cruzadas en ángulo.
7. **Equipo** — 4 retratos en tarjeta, nombre y cargo.
8. **Preguntas frecuentes** — panel de fondo tenue, acordeón.
9. **Pie** — bloque oscuro redondeado: logo + claim, 3 columnas de enlaces,
   copyright + botón de donar.

## Proporciones (estimadas desde la captura, no medidas)
- Contenedor ≈ 1200 px, margen lateral ≈ 40 px; los paneles de color casi a sangre
  con radio grande.
- Escala tipográfica ≈ 1.33: hero ≈ 56 px → sección ≈ 36 px → tarjeta ≈ 18 px → cuerpo 14 px.
- Titulares serif de peso regular/medio; cuerpo sans pequeño.
- Padding vertical de sección ≈ 8× el cuerpo (≈ 112–128 px).
- Medida de línea de bajadas: 45–60 caracteres.

## Recursos estructurales
- Tarjetas con radio grande como unidad básica; contraste de fondo entre bloques.
- Paneles de color para agrupar secciones (cómo ayudar, FAQ, pie).
- Barra de progreso como dato principal de cada causa.
- Número gigante como único foco de una sección.
- Desbordamiento horizontal (carrusel, cinta).

## Gestos firma de la referencia (NO se copian)
- Verde lima + verde bosque, y fotos en blanco y negro.
- Tarjetas con **pestaña de carpeta** en la esquina.
- Ilustraciones de manos/objetos en collage (tipo recorte de revista).
- Cinta con asterisco `*` como separador.
- Textos, nombres, cifras y el nombre de la marca.

## Cómo se resuelven en Hope+
| Gesto de referencia | Resolución Hope+ |
|---|---|
| Lima + verde bosque | Azul marino + coral + crema (marca TSP Hope) |
| Serif genérica | Serif de alto contraste que dialoga con el monograma TH |
| Pestaña de carpeta | Esquina con el **"+"** de la marca como marcador |
| Collage de manos | Ilustraciones de línea propias (mano, personas, apretón) que se dibujan con DrawSVG |
| Asterisco en la cinta | Separador **"+"** coral |
| Fotos B/N | Fotos con duotono marino (tratamiento ya usado por TuSalud+) |

## Verificación (paso 5)
- [x] Ningún color de la referencia (lima / verde bosque) en el código: todos los colores salen de `tokens.ts`.
- [x] Ninguna tipografía de la referencia: DM Serif Display + Poppins.
- [x] Colores, fuentes, escala tipográfica, espacios, radios, sombras y medidas de control vienen de tokens.
      Quedan literales solo en geometría propia de un componente (alto de tarjetas, tamaño de ilustraciones).
- [x] Ningún texto, nombre ni cifra de la referencia: textos propios en español de Colombia.
- [x] Ninguna imagen, ícono o SVG de la referencia: fotos CC0 de StockSnap, ilustraciones de línea propias.
- [x] Gestos firma resueltos distinto (ver tabla).
- [x] Responsive revisado en 390 px, 1440 px (capturas headless) y 820 px (tablet).

## Intro (referencia: stauffer.org)
- **Tomado (técnica):** un velo a pantalla completa con la forma del logo recortada; el velo
  escala desde el centro y la página aparece a través del recorte, mientras el hero se asienta
  desde un leve zoom.
- **No tomado (firma):** la "S" dibujada con líneas paralelas que suben una a una.
- **Resolución hope+:** las letras del logo se arman (h-o-p-e, la mano, FUNDATION), el "+" entra
  girando, las letras se van, el "+" viaja al centro y se vuelve la ventana que se abre.
  `src/components/intro.tsx`. Una vez por sesión; desactivada con `prefers-reduced-motion`.

## Páginas internas (referencias de layout, segunda ronda)
Se tomaron seis láminas de referencia como **estructura**; la piel sigue siendo hope+.

| Recurso estructural de la referencia | Dónde se usa | Cómo se resolvió en hope+ |
|---|---|---|
| Tarjeta de texto sobre foto a sangre, cinta que cruza la imagen | `/nosotros` (hero) | Tarjeta crema + `Trazo`: cinta propia coral→marino que da una vuelta y se dibuja con DrawSVG |
| Banner de tres paneles (mensaje / marca / foto) | `/nosotros` | El tercio central es el "+" del logo girando con el scroll |
| Bento con etiqueta montada en el borde superior | `/nosotros`, `/programas`, `/participa` | `TagBorde` con versalitas; tarjetas foto esmeriladas, coral y marino |
| Tarjetas con esquina recortada y flecha en el hueco | `/participa` | Máscara radial en la esquina superior derecha |
| Lista con flechas y filetes | `/nosotros`, `/programas/[slug]` | Flecha circular marino que gira 45° al pasar |
| Bento de cifras grandes con foto alta y panel degradado | `/impacto`, `/programas/[slug]` | Degradados cálidos de marca; cifras con CountUp |
| Lista esmerilada sobre foto | `/participa` (voluntariado) | Vidrio marino con íconos "+" coral |

**No tomado:** el verde lima y el azul eléctrico, las tipografías, el glifo "A" de cinta y el arcoíris de las piezas de salud.

## Transiciones entre páginas
Cada ruta tiene la suya (`src/lib/transiciones.ts`, `src/components/transicion/`). El velo
muestra el nombre del destino; las entradas de la página nueva esperan a que se abra.

| Destino | Transición |
|---|---|
| `/` | Velo crema con el "+" que gira |
| `/nosotros` | Cortina: panel coral y marino suben y se van |
| `/programas` | Columnas marino que caen escalonadas |
| `/programas/[slug]` | Círculo coral que se abre desde el punto del clic |
| `/participa` | El "+" crece hasta tapar y luego se abre como ventana |
| `/impacto` | Persianas horizontales rubor y marino |
| `/donar` | Cinta coral en diagonal |

## Encabezado (referencia: higherlifefoundation.org)
- **Tomado (estructura y comportamiento):** barra fija delgada (64 px) y transparente arriba,
  que se oculta al bajar y reaparece al subir; navegación alineada a la derecha junto al botón
  de acción; los enlaces vecinos se atenúan al pasar el cursor; grupos con ▾ que abren un
  panel a todo el ancho con enlaces grandes, frase al pie y la página oscurecida detrás;
  botón compacto cuya flecha salta de izquierda a derecha; en móvil, botón de acción +
  botón de menú cuadrado y panel lateral con acordeones, redes y frase.
- **No tomado:** el verde lima del botón, la tipografía Cera Pro, el logo y los textos.
- **Resolución hope+:** botón coral que pasa a marino; enlaces del panel en la serif de marca
  con flecha coral; grupos Nosotros · Programas · Participa + Impacto.
