"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { hayNavegador, navegar } from "@/lib/transiciones";
import { lenis } from "@/components/smooth-scroll";

type Props = ComponentProps<typeof Link> & { href: string };

/**
 * Enlace del sitio. Entre páginas distintas intercepta la navegación para
 * reproducir la transición del destino; dentro de la misma página desplaza
 * suavemente hasta el ancla.
 */
export function Enlace({ href, onClick, ...rest }: Props) {
  const ruta = usePathname();
  const url = href.startsWith("#") ? { pathname: ruta, hash: href } : new URL(href, "http://x");
  const mismaPagina = url.pathname === ruta;

  return (
    <Link
      href={href}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (mismaPagina && url.hash) {
          e.preventDefault();
          const destino = document.querySelector<HTMLElement>(url.hash);
          if (destino && lenis) lenis.scrollTo(destino, { offset: -80 });
          else destino?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", url.hash);
        }
      }}
      onNavigate={(e) => {
        if (mismaPagina || !hayNavegador()) return;
        e.preventDefault();
        navegar(href);
      }}
      {...rest}
    />
  );
}
