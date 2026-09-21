import { Encabezado } from "@/components/encabezado";
import { Hero } from "@/components/secciones/hero";
import { Manifiesto } from "@/components/secciones/manifiesto";
import { ComoAyudar } from "@/components/secciones/como-ayudar";
import { Programas } from "@/components/secciones/programas";
import { Comunidad } from "@/components/secciones/comunidad";
import { Cinta } from "@/components/secciones/cinta";
import { Equipo } from "@/components/secciones/equipo";
import { Donar } from "@/components/secciones/donar";
import { Preguntas } from "@/components/secciones/preguntas";
import { Pie } from "@/components/pie";

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main>
        <Hero />
        <Manifiesto />
        <ComoAyudar />
        <Programas />
        <Comunidad />
        <Cinta />
        <Equipo />
        <Donar />
        <Preguntas />
      </main>
      <Pie />
    </>
  );
}
