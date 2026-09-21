import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programas } from "@/content/sitio";
import { PaginaPrograma } from "@/components/paginas/programa-detalle";

export function generateStaticParams() {
  return programas.items.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/programas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = programas.items.find((x) => x.slug === slug);
  return p ? { title: p.titulo, description: p.texto } : {};
}

export default async function Programa(props: PageProps<"/programas/[slug]">) {
  const { slug } = await props.params;
  const p = programas.items.find((x) => x.slug === slug);
  if (!p) notFound();
  // key: al pasar de un programa a otro se remonta todo (SplitText y animaciones)
  return <PaginaPrograma key={slug} p={p} />;
}
