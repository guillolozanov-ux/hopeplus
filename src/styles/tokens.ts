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
} as const;

export const font = {
  display: "var(--ff-display), 'Times New Roman', serif", // titulares: serif del monograma TH
  sans: "var(--ff-sans), 'Helvetica Neue', Arial, sans-serif", // interfaz y cuerpo
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
  mega: { mobile: "72px", tablet: "120px", desktop: "176px", leading: 0.9, tracking: "-0.03em" },
  display: { mobile: "40px", tablet: "56px", desktop: "72px", leading: 1.02, tracking: "-0.02em" },
  h2: { mobile: "32px", tablet: "40px", desktop: "52px", leading: 1.08, tracking: "-0.015em" },
  h3: { mobile: "22px", tablet: "24px", desktop: "28px", leading: 1.15, tracking: "-0.01em" },
  lead: { mobile: "17px", tablet: "18px", desktop: "20px", leading: 1.5, tracking: "0" },
  body: { mobile: "15px", tablet: "16px", desktop: "16px", leading: 1.55, tracking: "0" },
  small: { mobile: "13px", tablet: "14px", desktop: "14px", leading: 1.45, tracking: "0" },
  label: { mobile: "11px", tablet: "12px", desktop: "12px", leading: 1.2, tracking: "0.16em" },
  ribbon: { mobile: "34px", tablet: "56px", desktop: "72px", leading: 1.1, tracking: "-0.01em" },
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
  header: "76px",
  controlSm: "32px",
  controlMd: "40px",
  controlLg: "48px",
  controlXl: "52px",
  iconXs: "10px",
  iconSm: "14px",
  iconMd: "18px",
  hairline: "1px",
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

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
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
