import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Poppins } from "next/font/google";
import { cssVars, color } from "@/styles/tokens";
import { sitio } from "@/content/sitio";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Intro } from "@/components/intro";
import { scriptIntro } from "@/lib/intro";
import "./globals.css";

const display = DM_Serif_Display({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Poppins({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${sitio.nombreLegal} · ${sitio.claim}`,
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
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
