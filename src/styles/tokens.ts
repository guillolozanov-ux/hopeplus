/**
 * TSP Hope — tokens de diseño.
 *
 * Fuente de verdad del sitio. Los valores de color salen de la sub-marca
 * TSP Hope Fundación dentro del sistema de diseño TuSalud+ (marino, coral, crema).
 * Ningún componente escribe un color, tamaño o espaciado suelto: todo pasa por aquí
 * y llega al CSS como variable (ver `cssVars`).
 *
 * TypeScript plano, sin dependencias de librerías de estilo.
 */

export const color = {
  // Base de marca
  ink: "#20314F", // marino institucional: texto principal y superficies inversas
  inkDeep: "#141F33",
  inkSoft: "#2B4068",
  inkMuted: "#7A8394", // etiquetas y texto secundario
  line: "#DCE1E4", // filete hairline

  accent: "#E06738", // coral: único acento
  accentStrong: "#C9552A", // hover / pressed
  accentSoft: "#F0A98E",
  blush: "#F7E9E0", // panel cálido
  blushLight: "#FCF3ED",

  page: "#F9F8F3", // crema: fondo de página
  pageDeep: "#F2EFE7",
  surface: "#FFFFFF",
  onInk: "#F9F8F3",
  onAccent: "#FFFFFF",

  lineOnInk: "rgba(249, 248, 243, 0.18)",
  scrim: "linear-gradient(180deg, rgba(20, 31, 51, 0) 30%, rgba(20, 31, 51, 0.86) 100%)",
  duotone: "rgba(32, 49, 79, 0.28)",

  // Sub-marca Hope Golf Tour (colores del logo): verde bosque y crema
  golf: "#2F4127",
  golfDeep: "#1B2616",
  golfSoft: "#56694B",
  golfCream: "#FDF5DE",
  golfSand: "#EFE4C6",
  lineOnGolf: "rgba(253, 245, 222, 0.24)",
  lineGolf: "rgba(47, 65, 39, 0.18)",
  golfBrillo: "#FF8A3D", // naranja brillante del destello que arma el logo del Golf Tour
  golfVidrio: "rgba(27, 38, 22, 0.55)",
  golfVineta: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(27, 38, 22, 0.42) 0%, rgba(27, 38, 22, 0) 70%)",
  golfVelo: "linear-gradient(180deg, rgba(27, 38, 22, 0.55) 0%, rgba(27, 38, 22, 0.18) 38%, rgba(27, 38, 22, 0.28) 62%, rgba(27, 38, 22, 0.82) 100%)",
} as const;

export const font = {
  // Titulares: Google Sans (se carga con next/font en layout.tsx)
  display: "var(--ff-display), 'Helvetica Neue', Arial, sans-serif",
  sans: "var(--ff-sans), 'Helvetica Neue', Arial, sans-serif", // interfaz y cuerpo
  // Serif editorial, solo en la sub-marca Hope Golf Tour (Cormorant Garamond, OFL)
  serif: "var(--ff-serif), 'Times New Roman', Georgia, serif",
} as const;

export const weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Escala tipográfica. Cada token declara sus tres breakpoints
 * (móvil / tablet / escritorio). Ratio ≈ 1.33 entre niveles de escritorio.
 */
export const breakpoint = {
  tablet: 768,
  desktop: 1200,
} as const;

type Step = { mobile: string; tablet: string; desktop: string; leading: number; tracking: string };

export const type = {
  mega: { mobile: "72px", tablet: "120px", desktop: "176px", leading: 0.9, tracking: "-0.045em" },
  menu: { mobile: "32px", tablet: "48px", desktop: "64px", leading: 1.1, tracking: "-0.03em" }, // enlaces del panel del menú
  stat: { mobile: "64px", tablet: "80px", desktop: "96px", leading: 0.95, tracking: "-0.035em" }, // cifras dentro de tarjetas
  display: { mobile: "40px", tablet: "56px", desktop: "72px", leading: 1.02, tracking: "-0.035em" },
  h2: { mobile: "32px", tablet: "40px", desktop: "52px", leading: 1.08, tracking: "-0.03em" },
  h3: { mobile: "22px", tablet: "24px", desktop: "28px", leading: 1.15, tracking: "-0.015em" },
  lead: { mobile: "17px", tablet: "18px", desktop: "20px", leading: 1.5, tracking: "0" },
  body: { mobile: "15px", tablet: "16px", desktop: "16px", leading: 1.55, tracking: "0" },
  small: { mobile: "13px", tablet: "14px", desktop: "14px", leading: 1.45, tracking: "0" },
  label: { mobile: "11px", tablet: "12px", desktop: "12px", leading: 1.2, tracking: "0.16em" },
  editorial: { mobile: "46px", tablet: "80px", desktop: "112px", leading: 0.96, tracking: "-0.02em" }, // serif del Golf Tour
  ribbon: { mobile: "34px", tablet: "56px", desktop: "72px", leading: 1.1, tracking: "-0.025em" },
} as const satisfies Record<string, Step>;

export const space = {
  "3xs": "4px",
  "2xs": "8px",
  xs: "12px",
  sm: "16px",
  md: "24px",
  lg: "32px",
  xl: "48px",
  "2xl": "64px",
  "3xl": "96px",
  "4xl": "128px",
} as const;

/** Padding vertical de sección, también por breakpoint. */
export const section = {
  mobile: "80px",
  tablet: "104px",
  desktop: "128px",
} as const;

export const layout = {
  container: "1240px",
  gutter: { mobile: "16px", tablet: "32px", desktop: "40px" },
  measure: "58ch",
} as const;

/** Medidas fijas de interfaz: barra, controles redondos, íconos y filetes. */
export const size = {
  header: "64px",
  controlSm: "32px",
  controlMd: "40px",
  controlLg: "48px",
  controlXl: "52px",
  iconXs: "10px",
  iconSm: "14px",
  iconMd: "18px",
  hairline: "1px",
  panelMedia: "440px", // alto mínimo del video del panel del menú
  bannerMin: "640px", // alto mínimo del banner del Golf Tour
  logoGolf: "640px", // ancho máximo del logo del Golf Tour
} as const;

export const radius = {
  sm: "10px",
  md: "18px",
  lg: "28px",
  xl: "40px",
  pill: "999px",
} as const;

export const shadow = {
  card: "0 1px 2px rgba(20, 31, 51, 0.06), 0 12px 32px -12px rgba(20, 31, 51, 0.18)",
  lift: "0 24px 60px -20px rgba(20, 31, 51, 0.35)",
} as const;

/**
 * Curvas con nombre. Las mismas se registran en GSAP con CustomEase (src/lib/gsap.ts)
 * para que CSS y GSAP compartan el movimiento.
 * - inOutFuerte: arranque lento y remate seco (paneles, enlaces del menú).
 * - inOutSuave: cierre de paneles.
 */
export const curva = {
  inOutFuerte: "0.5, 0, 0.15, 1",
  inOutSuave: "0.645, 0.045, 0.355, 1",
} as const;

/**
 * Resorte amortiguado: `amortiguacion` < 1 rebota. 0.7 ≈ 5 % de sobrepaso, un
 * asentamiento suave (0.45 daba ~20 % y se sentía exagerado). Se convierte en la curva "resorte" de GSAP en src/lib/gsap.ts.
 */
export const resorte = {
  amortiguacion: 0.7,
} as const;

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeInOutFuerte: `cubic-bezier(${curva.inOutFuerte})`,
  fast: "180ms",
  base: "320ms",
  slow: "640ms",
} as const;

/* ------------------------------------------------------------------ */
/* Salida a CSS: una sola hoja de variables generada desde los tokens. */
/* ------------------------------------------------------------------ */

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function flat(prefix: string, obj: Record<string, string | number>) {
  return Object.entries(obj).map(([k, v]) => `--${prefix}-${kebab(k)}:${v};`);
}

function typeVars(bp: "mobile" | "tablet" | "desktop") {
  return Object.entries(type).map(([k, v]) => `--type-${k}:${v[bp]};`);
}

export function cssVars() {
  const base = [
    ...flat("color", color),
    ...flat("font", font),
    ...flat("weight", weight),
    ...flat("space", space),
    ...flat("size", size),
    ...flat("radius", radius),
    ...flat("shadow", shadow),
    ...flat("motion", motion),
    `--container:${layout.container};`,
    `--measure:${layout.measure};`,
    ...Object.entries(type).flatMap(([k, v]) => [
      `--leading-${k}:${v.leading};`,
      `--tracking-${k}:${v.tracking};`,
    ]),
    ...typeVars("mobile"),
    `--gutter:${layout.gutter.mobile};`,
    `--section:${section.mobile};`,
  ];
  const tablet = [...typeVars("tablet"), `--gutter:${layout.gutter.tablet};`, `--section:${section.tablet};`];
  const desktop = [...typeVars("desktop"), `--gutter:${layout.gutter.desktop};`, `--section:${section.desktop};`];

  return [
    `:root{${base.join("")}}`,
    `@media (min-width:${breakpoint.tablet}px){:root{${tablet.join("")}}}`,
    `@media (min-width:${breakpoint.desktop}px){:root{${desktop.join("")}}}`,
  ].join("\n");
}
