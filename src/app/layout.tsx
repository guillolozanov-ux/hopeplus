import type { Metadata, Viewport } from "next";
import { Google_Sans, Poppins } from "next/font/google";
import { cssVars, color } from "@/styles/tokens";
import { sitio } from "@/content/sitio";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Intro } from "@/components/intro";
import { Transicion } from "@/components/transicion/transicion";
import { Encabezado } from "@/components/encabezado";
import { Pie } from "@/components/pie";
import { scriptIntro } from "@/lib/intro";
import "./globals.css";

// Titulares: Google Sans (Google Fonts, OFL), servida desde el propio sitio
const display = Google_Sans({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const sans = Poppins({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: `${sitio.nombreLegal} · ${sitio.claim}`, template: `%s · ${sitio.nombreLegal}` },
  description: sitio.descripcion,
  openGraph: {
    title: sitio.nombreLegal,
    description: sitio.descripcion,
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: color.page };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <style id="tokens" dangerouslySetInnerHTML={{ __html: cssVars() }} />
        <script dangerouslySetInnerHTML={{ __html: scriptIntro }} />
      </head>
      <body>
        <Intro />
        <Transicion />
        <SmoothScroll />
        <Encabezado />
        {children}
        <Pie />
      </body>
    </html>
  );
}
