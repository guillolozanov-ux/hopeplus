/**
 * Contenido de las páginas internas. BORRADOR hasta que la fundación lo confirme
 * (ver `content/datos-pendientes.md`).
 */

export const nosotros = {
  meta: {
    titulo: "Nosotros",
    descripcion: "Quiénes somos, cómo trabajamos y por qué salimos a buscar a quienes no llegan a la consulta.",
  },
  about: {
    titulo: "Nosotros",
    parrafos: [
      "hope+ nació dentro de TuSalud+, una IPS del Caribe colombiano, para llevar salud a las familias que no llegan a la consulta por distancia, costo o falta de información.",
      "Organizamos jornadas en veredas y barrios, acompañamos a adultos mayores en casa y hacemos seguimiento a niños y madres gestantes. Lo hacemos con el talento humano y las unidades móviles del grupo, y con el aporte de donantes y aliados.",
    ],
    chip: "Fundación sin ánimo de lucro · Parte del grupo TuSalud+",
    foto: "/fotos/saludo-xl.jpg",
    alt: "Cuidadora saluda a una señora mayor en su casa",
  },
  banner: {
    titulo: ["Salud que llega", "a donde hace falta"],
    marca: "falta",
    foto: "/fotos/abuelas-xl.jpg",
    alt: "Tres generaciones de mujeres juntas",
  },
  pilares: {
    etiqueta: "Lo que nos mueve",
    titulo: "Misión, visión y valores",
    marca: "valores",
    items: [
      {
        tag: "Misión",
        titulo: "Acercar la salud",
        texto: "Llevar atención primaria, prevención y acompañamiento a comunidades con barreras de acceso.",
        tono: "claro",
      },
      {
        tag: "Visión",
        titulo: "Ninguna vereda sin control",
        texto: "Que en 2030 cada comunidad del Atlántico con la que trabajamos tenga seguimiento de salud continuo.",
        tono: "acento",
      },
      {
        tag: "Valor",
        titulo: "Llegar a tiempo",
        texto: "Prevenir cuesta menos que tratar y duele menos que esperar.",
        tono: "foto",
        foto: "/fotos/nino-sonrisa-xl.jpg",
      },
      {
        tag: "Valor",
        titulo: "Rendir cuentas",
        texto: "Publicamos a qué se destinó cada aporte al cerrar cada programa.",
        tono: "marino",
      },
      {
        tag: "Valor",
        titulo: "Escuchar primero",
        texto: "Cada jornada empieza preguntando qué necesita la comunidad.",
        tono: "foto",
        foto: "/fotos/escolares-antioquia.jpg",
      },
      {
        tag: "Valor",
        titulo: "Trabajar en red",
        texto: "Con la EPS, el colegio, la junta de acción comunal y la familia.",
        tono: "claro",
      },
    ],
  },
  proceso: {
    etiqueta: "Cómo trabajamos",
    titulo: "De la primera visita al seguimiento",
    marca: "seguimiento",
    texto: "Cada programa sigue el mismo recorrido para que la atención no se quede en un día de jornada.",
    pasos: [
      "Diagnóstico con la comunidad y sus líderes.",
      "Jornada de atención con equipo completo.",
      "Remisión y gestión con la EPS del paciente.",
      "Seguimiento en casa o por telemedicina.",
      "Informe público del programa.",
    ],
  },
};

export const participa = {
  meta: {
    titulo: "Participa",
    descripcion: "Dona, sé voluntario o súmate como aliado de hope+.",
  },
  hero: {
    etiqueta: "Participa",
    titulo: ["Hay muchas formas", "de sumar"],
    marca: "sumar",
    bajada: "Cada forma de participar sostiene una parte distinta del trabajo. Elige la que más se parece a ti.",
  },
  formas: [
    {
      titulo: "Dona",
      tono: "claro",
      href: "/donar",
      puntos: ["Aporte único o mensual.", "Soporte de cada donación.", "Informe de a dónde fue tu aporte."],
    },
    {
      titulo: "Sé voluntario",
      tono: "marino",
      href: "#voluntariado",
      puntos: ["Profesionales de salud.", "Estudiantes en práctica.", "Apoyo logístico en jornadas.", "Traducción y registro de datos."],
    },
    {
      titulo: "Súmate como aliado",
      tono: "acento",
      href: "#aliados",
      puntos: ["Patrocinio de un programa completo.", "Voluntariado corporativo.", "Donación en especie.", "Informe de impacto para tu empresa."],
    },
  ],
  voluntariado: {
    etiqueta: "Voluntariado",
    titulo: "Qué hace un voluntario en una jornada",
    marca: "jornada",
    texto:
      "Las jornadas empiezan temprano y terminan cuando se atiende a la última persona en la fila. Te asignamos un rol según tu perfil y siempre trabajas acompañado por el equipo de la fundación.",
    foto: "/fotos/enfermero-adulta-xl.jpg",
    alt: "Equipo de salud atiende en una jornada comunitaria",
    roles: [
      { titulo: "Atención", texto: "Médicos, enfermeras, odontólogos y nutricionistas." },
      { titulo: "Registro", texto: "Toma de datos y organización de la fila." },
      { titulo: "Logística", texto: "Montaje, transporte e inventario de medicamentos." },
      { titulo: "Comunidad", texto: "Convocatoria y charlas de prevención." },
    ],
  },
  aliados: {
    etiqueta: "Aliados",
    titulo: "Empresas que ya hacen parte",
    marca: "parte",
    texto: "Un aliado puede patrocinar un programa completo y recibir el informe de impacto con las cifras de su aporte.",
    beneficios: [
      { tag: "Impacto", titulo: "Informe trimestral", texto: "Personas atendidas, lugares y resultados." },
      { tag: "Equipo", titulo: "Voluntariado corporativo", texto: "Jornadas con participación de tu equipo." },
      { tag: "Marca", titulo: "Reconocimiento", texto: "Presencia en el programa que apoyas." },
    ],
  },
  contacto: {
    titulo: "¿Listo para sumarte?",
    texto: "Escríbenos con tu perfil o el de tu empresa y te contamos la próxima jornada.",
  },
};

export const impacto = {
  meta: {
    titulo: "Impacto",
    descripcion: "Cifras de atención y cómo se usan los aportes a hope+.",
  },
  hero: {
    titulo: "Cada aporte, medido",
    marca: "medido",
    bajada: "Contamos lo que hacemos para que sepas exactamente a dónde llega tu apoyo.",
  },
  cifras: {
    atendidos: { valor: 3200, sufijo: "+", titulo: "Personas atendidas", texto: "En jornadas de salud durante 2025, en 14 municipios del Atlántico.", foto: "/fotos/madre-hija-xl.jpg", alt: "Madre e hija" },
    programas: { valor: 92, sufijo: "%", texto: "de cada peso donado va directo a los programas." },
    jornadas: { valor: 38, texto: "Jornadas realizadas", titulo: "Presencia en campo", detalle: "Cada jornada incluye medicina, odontología, enfermería y farmacia." },
    gestion: {
      titulo: "Gestión transparente",
      texto: "Publicamos el informe de cada programa al cerrarlo, con ingresos, gastos y personas atendidas.",
      items: [
        { titulo: "Informes", texto: "Uno por programa." },
        { titulo: "Auditoría", texto: "Revisión contable anual." },
      ],
    },
    seguimiento: { valor: 74, sufijo: "%", texto: "de los pacientes crónicos sigue en control seis meses después." },
  },
  uso: {
    etiqueta: "Uso de los recursos",
    titulo: "A dónde va cada peso",
    marca: "peso",
    partidas: [
      { concepto: "Medicamentos e insumos", pct: 41 },
      { concepto: "Transporte y logística de jornadas", pct: 27 },
      { concepto: "Talento humano en campo", pct: 24 },
      { concepto: "Administración", pct: 8 },
    ],
    nota: "Distribución de 2025. Cifras provisionales hasta la publicación del informe anual.",
  },
};

export const paginaDonar = {
  meta: {
    titulo: "Donar",
    descripcion: "Dona a hope+ por transferencia y recibe el soporte de tu aporte.",
  },
};
