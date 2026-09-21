import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Poppins } from "next/font/google";
import { cssVars, color } from "@/styles/tokens";
import { sitio } from "@/content/sitio";
import { SmoothScroll } from "@/components/smooth-scroll";
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
    <html lang="es-CO" className={`${display.variable} ${sans.variable}`}>
      <head>
        <style id="tokens" dangerouslySetInnerHTML={{ __html: cssVars() }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
