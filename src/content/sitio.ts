/**
 * Contenido del sitio TSP Hope.
 *
 * BORRADOR: cifras, programas, metas, equipo y datos de donación son provisionales
 * hasta que la fundación los confirme. Ver `content/datos-pendientes.md`.
 */

export const sitio = {
  nombre: "TSP Hope",
  nombreLegal: "TSP Hope Fundación",
  descripcion:
    "Fundación sin ánimo de lucro del grupo TuSalud+. Llevamos jornadas de salud y programas de acceso a comunidades del Caribe colombiano.",
  claim: "La esperanza también se cuida",
  ciudad: "Barranquilla, Colombia",
  correo: "contacto@tsphope.org", // PENDIENTE: confirmar correo
  anio: 2026,
};

export type ItemMenu = {
  label: string;
  href: string;
  grupo?: { label: string; href: string }[];
  /** Clip corto del panel del menú: `/video/menu/<nombre>.{webm,mp4,jpg}` */
  video?: { nombre: string; alt: string };
};

/** Menú principal. Los ítems con `grupo` abren un panel desplegable. */
export const navegacion: ItemMenu[] = [
  {
    label: "Nosotros",
    href: "/nosotros",
    video: { nombre: "nosotros-rostro", alt: "Una señora mayor sonríe a la cámara con luz cálida" },
    grupo: [
      { label: "Quiénes somos", href: "/nosotros" },
      { label: "Cómo trabajamos", href: "/nosotros#proceso" },
      { label: "Equipo", href: "/nosotros#equipo" },
    ],
  },
  {
    label: "Programas",
    href: "/programas",
    video: { nombre: "programas-rostro", alt: "Un niño sonríe a la cámara" },
    grupo: [
      { label: "Todos los programas", href: "/programas" },
      { label: "Jornadas rurales", href: "/programas/jornadas-rurales" },
      { label: "Tamizaje escolar", href: "/programas/tamizaje-escolar" },
      { label: "Adultos mayores", href: "/programas/adultos-mayores" },
      { label: "Materno infantil", href: "/programas/materno-infantil" },
      { label: "Nutrición infantil", href: "/programas/nutricion-infantil" },
    ],
  },
  {
    label: "Participa",
    href: "/participa",
    video: { nombre: "participa-rostro", alt: "Una voluntaria sonríe y conversa" },
    grupo: [
      { label: "Voluntariado", href: "/participa#voluntariado" },
      { label: "Aliados", href: "/participa#aliados" },
      { label: "Contacto", href: "/participa#contacto" },
      { label: "Preguntas frecuentes", href: "/donar#preguntas" },
    ],
  },
  { label: "Impacto", href: "/impacto" },
  { label: "Golf Tour", href: "/golf-tour" },
];

export const hero = {
  titulo: ["Llevamos salud a donde", "más se necesita"],
  marca: "necesita",
  bajada:
    "Somos la fundación del grupo TuSalud+. Organizamos jornadas de salud y programas de acceso para familias que hoy no llegan a la consulta.",
  primario: { label: "Donar ahora", href: "/donar" },
  secundario: { label: "Ver programas", href: "/programas" },
};

export const mosaico = {
  cifra: {
    valor: "3.200+",
    texto: "personas atendidas en jornadas de salud durante 2025.",
    cta: { label: "Donar", href: "/donar" },
  },
  voz: { titulo: "Cuéntanos tu caso", href: "/participa#contacto" },
  causaA: {
    etiqueta: "Niñez",
    titulo: "Tamizaje visual para escolares",
    foto: "/fotos/nino-sonrisa-hd.jpg",
    alt: "Niño sonriendo mirando hacia arriba",
  },
  comunidad: { titulo: "Súmate a 500 voluntarios", cta: { label: "Ser voluntario", href: "/participa" } },
  causaB: {
    etiqueta: "Adulto mayor",
    titulo: "Brigadas para adultos mayores en zona rural",
    foto: "/fotos/adulto-mayor-medica-hd.jpg",
    alt: "Médica conversa con un paciente mayor",
  },
  explorar: {
    titulo: "Explorar programas",
    href: "/programas",
    foto: "/fotos/manos-hd.jpg",
    alt: "Mano adulta sostiene la mano de un bebé",
  },
  confianza: { titulo: "Tu aporte llega completo", href: "/impacto" },
};

export const manifiesto =
  "Nacimos dentro de una institución de salud y sabemos lo que cuesta llegar a una consulta. Por eso salimos a buscar a quienes no pueden venir: con médicos, con medicamentos y con tiempo para escuchar.";

export const comoAyudar = {
  etiqueta: "Participa",
  titulo: ["Ayudar a la fundación", "toma solo unos minutos"],
  marca: "minutos",
  pasos: [
    {
      icono: "donar",
      titulo: "Dona",
      texto: "Cada aporte financia consultas, medicamentos y transporte para una jornada completa.",
    },
    {
      icono: "voluntario",
      titulo: "Sé voluntario",
      texto: "Profesionales de salud y estudiantes acompañan las brigadas en campo y en sede.",
    },
    {
      icono: "aliado",
      titulo: "Súmate como aliado",
      texto: "Empresas e instituciones patrocinan programas completos y reciben informe de impacto.",
    },
  ],
};

export type Programa = {
  slug: string;
  titulo: string;
  corto: string; // nombre para tarjetas y menús

  texto: string;
  foto: string;
  alt: string;
  recaudado: number;
  meta: number;
  apoyos: number;
  categoria: string;
  // Detalle (página /programas/[slug]) — BORRADOR
  beneficiarios: number;
  lugares: string;
  frecuencia: string;
  descripcion: string;
  incluye: string[];
  fotoDetalle: string;
  altDetalle: string;
};

export const programas: { etiqueta: string; titulo: string; marca: string; items: Programa[] } = {
  etiqueta: "Programas",
  titulo: "Causas que necesitan tu apoyo",
  marca: "apoyo",
  items: [
    {
      slug: "jornadas-rurales",
      corto: "Jornadas rurales",
      titulo: "Jornadas de salud en zonas rurales del Atlántico",
      texto: "Consulta médica, odontología y entrega de medicamentos en veredas sin puesto de salud.",
      foto: "/fotos/enfermero-adulta-hd.jpg",
      alt: "Equipo de salud atiende en una jornada comunitaria",
      recaudado: 38_450_000,
      meta: 60_000_000,
      apoyos: 412,
      categoria: "Atención primaria",
      beneficiarios: 1850,
      lugares: "Veredas de Luruaco, Repelón y Manatí",
      frecuencia: "Una jornada al mes",
      descripcion:
        "Llevamos un equipo completo a veredas que no tienen puesto de salud: medicina general, odontología, enfermería y farmacia. Cada jornada atiende en un día lo que a una familia le tomaría semanas conseguir.",
      incluye: ["Consulta de medicina general.", "Valoración y limpieza odontológica.", "Toma de tensión y glucometría.", "Entrega de medicamentos formulados."],
      fotoDetalle: "/fotos/saludo-hd.jpg",
      altDetalle: "Cuidadora saluda a una señora mayor en su casa",
    },
    {
      slug: "tamizaje-escolar",
      corto: "Tamizaje escolar",
      titulo: "Tamizaje visual y auditivo para escolares",
      texto: "Detección temprana en colegios públicos y entrega de gafas formuladas sin costo.",
      foto: "/fotos/nino-sonrisa-hd.jpg",
      alt: "Niño sonriendo",
      recaudado: 21_300_000,
      meta: 35_000_000,
      apoyos: 268,
      categoria: "Niñez",
      beneficiarios: 2400,
      lugares: "Colegios públicos de Barranquilla y Soledad",
      frecuencia: "Calendario escolar",
      descripcion:
        "Un niño que no ve bien el tablero parece un niño que no aprende. Revisamos visión y audición en colegios públicos y entregamos las gafas formuladas sin costo para la familia.",
      incluye: ["Tamizaje de agudeza visual.", "Audiometría de barrido.", "Remisión a optometría.", "Gafas formuladas sin costo."],
      fotoDetalle: "/fotos/lectura-hd.jpg",
      altDetalle: "Niño en un examen visual",
    },
    {
      slug: "adultos-mayores",
      corto: "Adultos mayores",
      titulo: "Acompañamiento a adultos mayores",
      texto: "Control de hipertensión y diabetes, y visitas domiciliarias a personas que viven solas.",
      foto: "/fotos/adulto-mayor-medica-hd.jpg",
      alt: "Médica conversa con un paciente mayor",
      recaudado: 14_800_000,
      meta: 30_000_000,
      apoyos: 190,
      categoria: "Adulto mayor",
      beneficiarios: 620,
      lugares: "Barrios del sur de Barranquilla",
      frecuencia: "Visitas cada quince días",
      descripcion:
        "Muchos adultos mayores con hipertensión o diabetes viven solos y dejan de ir a control. Los visitamos en casa, revisamos su tratamiento y los conectamos con su EPS cuando hace falta.",
      incluye: ["Control de tensión arterial y glucosa.", "Revisión de medicamentos.", "Visita domiciliaria de enfermería.", "Acompañamiento en trámites de salud."],
      fotoDetalle: "/fotos/manos-mayor-hd.jpg",
      altDetalle: "Manos entrelazadas con una persona mayor",
    },
    {
      slug: "materno-infantil",
      corto: "Materno infantil",
      titulo: "Salud materna y primera infancia",
      texto: "Controles prenatales, vacunación y seguimiento nutricional durante los primeros mil días.",
      foto: "/fotos/madre-hija-hd.jpg",
      alt: "Madre e hija abrazadas",
      recaudado: 26_900_000,
      meta: 40_000_000,
      apoyos: 331,
      categoria: "Materno infantil",
      beneficiarios: 540,
      lugares: "Zona rural del Atlántico",
      frecuencia: "Seguimiento mensual",
      descripcion:
        "Los primeros mil días definen buena parte de la salud de una persona. Acompañamos a madres gestantes y a sus bebés con controles, vacunación y orientación nutricional.",
      incluye: ["Controles prenatales.", "Esquema de vacunación al día.", "Seguimiento de peso y talla.", "Talleres de lactancia y crianza."],
      fotoDetalle: "/fotos/bebe-hd.jpg",
      altDetalle: "Bebé sonriendo",
    },
    {
      slug: "nutricion-infantil",
      corto: "Nutrición infantil",
      titulo: "Nutrición para niños en riesgo",
      texto: "Complemento alimentario y valoración por nutricionista para niños con bajo peso.",
      foto: "/fotos/nino-balon-hd.jpg",
      alt: "Niño comiendo un plato de verduras",
      recaudado: 9_750_000,
      meta: 25_000_000,
      apoyos: 124,
      categoria: "Nutrición",
      beneficiarios: 310,
      lugares: "Comunidades de Malambo y Sabanagrande",
      frecuencia: "Seguimiento semanal",
      descripcion:
        "Detectamos a tiempo a niños con bajo peso y los acompañamos hasta que recuperan su curva de crecimiento, con complemento alimentario y valoración por nutricionista.",
      incluye: ["Valoración por nutricionista.", "Complemento alimentario.", "Desparasitación.", "Orientación a las familias."],
      fotoDetalle: "/fotos/nino-brazos-hd.jpg",
      altDetalle: "Niña con los brazos arriba en un parque",
    },
  ],
};

export const comunidad = {
  frase: "Únete a una comunidad que dona, acompaña y hace parte del cambio. Ya somos",
  cifra: 12480,
  sufijo: "+",
  texto: "personas que apoyan a la fundación",
  cta: { label: "Quiero ser parte", href: "/participa" },
  fotos: [
    { src: "/fotos/nino-risa-hd.jpg", alt: "Niño riendo" },
    { src: "/fotos/joven-sonrisa-hd.jpg", alt: "Joven sonriendo" },
    { src: "/fotos/abrazo-hd.jpg", alt: "Madre e hija abrazadas" },
    { src: "/fotos/bebe-hd.jpg", alt: "Bebé sonriendo" },
  ],
};

export const cinta = ["La esperanza se comparte", "Cuidar es llegar a tiempo"];

export const equipo = {
  etiqueta: "Equipo",
  titulo: "Las personas detrás de la fundación",
  marca: "fundación",
  bajada: "Un equipo pequeño, respaldado por el talento humano de TuSalud+.",
  // PENDIENTE: nombres reales. Fotos provistas por el cliente (origen y permisos a su cargo).
  personas: [
    { nombre: "Por confirmar", cargo: "Dirección ejecutiva", foto: "/fotos/equipo-direccion-foto.jpg" },
    { nombre: "Por confirmar", cargo: "Coordinación de programas", foto: "/fotos/equipo-coordinacion-foto.jpg" },
    { nombre: "Por confirmar", cargo: "Alianzas y recursos", foto: "/fotos/equipo-alianzas-foto2.jpg" },
    { nombre: "Por confirmar", cargo: "Voluntariado", foto: "/fotos/equipo-voluntariado-foto2.jpg" },
  ],
};

export const donar = {
  etiqueta: "Donar",
  titulo: "Tu aporte va directo a los programas",
  marca: "programas",
  bajada: "Elige un monto o escribe el tuyo. Al confirmar la transferencia te enviamos el soporte de tu donación.",
  montos: [20_000, 50_000, 100_000, 250_000],
  minimo: 20_000, // monto mínimo para "Otro monto"
  equivalencias: {
    20000: "Cubre los medicamentos de una consulta.",
    50000: "Financia el tamizaje visual de cinco escolares.",
    100000: "Paga el transporte de un médico a una vereda.",
    250000: "Sostiene un día completo de brigada.",
  } as Record<number, string>,
  // PENDIENTE: datos bancarios reales. Hoy son de muestra.
  cuenta: [
    { k: "Banco", v: "Por confirmar" },
    { k: "Tipo", v: "Cuenta de ahorros" },
    { k: "Número", v: "000-000000-00" },
    { k: "Titular", v: "TSP Hope Fundación" },
    { k: "NIT", v: "Por confirmar" },
  ],
};

export const preguntas = {
  titulo: "Preguntas frecuentes",
  bajada: "Si tienes otra pregunta, escríbenos a",
  items: [
    {
      q: "¿Qué es TSP Hope?",
      a: "Es la fundación sin ánimo de lucro del grupo TuSalud+. Organiza jornadas de salud y programas de acceso para comunidades con barreras geográficas o económicas.",
    },
    {
      q: "¿Cómo se usan las donaciones?",
      a: "Los aportes financian medicamentos, transporte del equipo médico, insumos y logística de cada jornada. Publicamos un informe de cada programa al cerrarlo.",
    },
    {
      q: "¿Puedo recibir un certificado de donación?",
      a: "Sí. Escríbenos con el soporte de la transferencia y tus datos, y te enviamos el certificado correspondiente.",
    },
    {
      q: "¿Puedo donar medicamentos o insumos?",
      a: "Sí, siempre que estén vigentes y sellados. Contáctanos antes para coordinar la entrega y confirmar qué necesita la próxima jornada.",
    },
    {
      q: "¿Cómo me inscribo como voluntario?",
      a: "Escríbenos con tu perfil y disponibilidad. Priorizamos profesionales y estudiantes de áreas de la salud, pero también necesitamos apoyo en logística.",
    },
    {
      q: "¿Qué relación tiene la fundación con TuSalud+?",
      a: "TuSalud+ es la IPS que respalda a la fundación con talento humano, sedes y unidades móviles. La fundación gestiona sus propios recursos y programas.",
    },
  ],
};

export const pie = {
  columnas: [
    {
      titulo: "Fundación",
      links: [
        { label: "Nosotros", href: "/nosotros" },
        { label: "Programas", href: "/programas" },
        { label: "Impacto", href: "/impacto" },
      ],
    },
    {
      titulo: "Participa",
      links: [
        { label: "Donar", href: "/donar" },
        { label: "Voluntariado", href: "/participa" },
        { label: "Preguntas", href: "/donar#preguntas" },
      ],
    },
    {
      titulo: "Redes",
      // PENDIENTE: URLs de redes sociales
      links: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "X", href: "#" },
      ],
    },
  ],
  grupo: "Parte del grupo TuSalud+",
};
