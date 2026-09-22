/**
 * Hope Golf Tour: contenido del banner de inicio y de /golf-tour.
 * BORRADOR: fechas, sedes, precios y causas son propuestas hasta que la
 * fundación las confirme (ver `content/datos-pendientes.md`).
 */

export const golfTour = {
  meta: {
    titulo: "Hope Golf Tour",
    descripcion:
      "Un circuito de golf en seis paradas por Colombia. Cada parada juega por una causa: mujeres cafeteras, La Guajira, Amazonas, el Eje Cafetero y más.",
  },
  video: { nombre: "golf/tour", alt: "Un golfista hace su swing en un campo abierto" },
  logo: { positivo: "/marca/golf-logo.svg", negativo: "/marca/golf-logo-claro.svg", alt: "Hope Golf Tour" },
  temporada: "Temporada 2027",

  banner: {
    antetitulo: "hope+ presenta",
    estado: "Próximamente",
    frase: "Seis campos. Seis causas. Un mismo swing.",
    esquinas: ["Nº 01", "Circuito benéfico", "Colombia", "2027"],
    cta: { label: "Conoce más", href: "/golf-tour" },
  },

  hero: {
    antetitulo: "hope+ presenta",
    bajada: "Un circuito de golf que recorre Colombia jugando por las comunidades que más lo necesitan.",
  },

  manifiesto: {
    etiqueta: "El tour",
    titulo: ["Cada hoyo", "juega por alguien"],
    cursiva: "juega por alguien",
    parrafos: [
      "Hope Golf Tour es el circuito benéfico de hope+. Seis paradas en seis campos del país, cada una dedicada a una causa concreta y con una meta de recaudo pública.",
      "Juegan jugadores aficionados, empresas y aliados. Lo que se recauda en inscripciones, patrocinios y subastas va a la causa de esa parada, y al cierre de la temporada publicamos a dónde llegó cada peso.",
    ],
    cifras: [
      { valor: "6", texto: "paradas en 2027" },
      { valor: "108", texto: "hoyos por causas" },
      { valor: "$1.200M", texto: "meta de la temporada" },
      { valor: "100%", texto: "de la inscripción neta va a la causa" },
    ],
  },

  causas: {
    etiqueta: "Las causas",
    titulo: "Seis paradas, seis causas",
    cursiva: "seis causas",
    bajada: "Cada parada se juega en un campo distinto, pero lo que se recauda viaja a donde está la necesidad.",
    items: [
      {
        numero: "I",
        slug: "mujeres-cafeteras",
        titulo: "Mujeres cafeteras",
        lugar: "Armenia, Quindío",
        texto:
          "Salud para las recolectoras y caficultoras del Quindío: tamizaje de cáncer de mama y de cuello uterino, salud ocupacional y jornadas en las fincas durante la cosecha.",
        meta: 240_000_000,
        foto: "/fotos/golf/cafeteras.jpg",
        alt: "Mujer caficultora sostiene un balde lleno de cerezas de café",
      },
      {
        numero: "II",
        slug: "memoria-del-99",
        titulo: "Memoria del 99",
        lugar: "Eje Cafetero",
        texto:
          "A más de 25 años del terremoto de 1999, acompañamos a familias que aún viven en zonas de riesgo sísmico: refuerzo de viviendas, botiquines comunitarios y salud mental.",
        meta: 220_000_000,
        foto: "/fotos/golf/quindio.jpg",
        alt: "Calle de casas coloridas en un pueblo del Quindío",
      },
      {
        numero: "III",
        slug: "la-guajira",
        titulo: "Agua para La Guajira",
        lugar: "Alta Guajira",
        texto:
          "Pozos, filtros y brigadas de nutrición para niños wayuu en rancherías donde el agua potable queda a horas de camino.",
        meta: 260_000_000,
        foto: "/fotos/golf/guajira.jpg",
        alt: "Paisaje desértico de La Guajira bajo un cielo azul",
      },
      {
        numero: "IV",
        slug: "amazonas",
        titulo: "Brigadas por el río",
        lugar: "Leticia, Amazonas",
        texto:
          "Una lancha-consultorio que recorre el río con médico, enfermera y vacunas para comunidades ribereñas sin centro de salud cercano.",
        meta: 200_000_000,
        foto: "/fotos/golf/amazonas.jpg",
        alt: "Vista aérea de una lancha que avanza por un río entre la selva",
      },
      {
        numero: "V",
        slug: "maternidad-segura",
        titulo: "Maternidad segura",
        lugar: "Magdalena Medio",
        texto:
          "Controles prenatales, transporte al parto y seguimiento del recién nacido para madres de veredas alejadas del hospital.",
        meta: 140_000_000,
        foto: "/fotos/madre-hija-hd.jpg",
        alt: "Una madre abraza a su hija",
      },
      {
        numero: "VI",
        slug: "adultos-mayores",
        titulo: "Abuelos del Caribe",
        lugar: "Atlántico",
        texto:
          "La gran final vuelve a casa: visitas médicas domiciliarias y medicamentos para adultos mayores que viven solos en el Atlántico.",
        meta: 140_000_000,
        foto: "/fotos/abuelas-hd.jpg",
        alt: "Tres generaciones de mujeres juntas",
      },
    ],
  },

  calendario: {
    etiqueta: "Calendario",
    titulo: "La temporada 2027",
    cursiva: "2027",
    nota: "Fechas y campos por confirmar. Las inscripciones abren 60 días antes de cada parada.",
    paradas: [
      { numero: "I", fecha: "13 mar", mes: "Marzo", ciudad: "Armenia", sede: "Quindío", causa: "Mujeres cafeteras" },
      { numero: "II", fecha: "24 abr", mes: "Abril", ciudad: "Pereira", sede: "Risaralda", causa: "Memoria del 99" },
      { numero: "III", fecha: "12 jun", mes: "Junio", ciudad: "Cartagena", sede: "Bolívar", causa: "Agua para La Guajira" },
      { numero: "IV", fecha: "21 ago", mes: "Agosto", ciudad: "Bogotá", sede: "Cundinamarca", causa: "Brigadas por el río" },
      { numero: "V", fecha: "02 oct", mes: "Octubre", ciudad: "Medellín", sede: "Antioquia", causa: "Maternidad segura" },
      { numero: "VI", fecha: "27 nov", mes: "Noviembre", ciudad: "Barranquilla", sede: "Gran final", causa: "Abuelos del Caribe" },
    ],
  },

  formato: {
    etiqueta: "El formato",
    titulo: "Un día en el tour",
    cursiva: "en el tour",
    foto: "/fotos/golf/campo.jpg",
    alt: "Campo de golf ondulado al atardecer",
    momentos: [
      { hora: "06:30", titulo: "Registro y desayuno", texto: "Kit del jugador, práctica en el driving range y foto de equipo." },
      { hora: "07:30", titulo: "Salida a escopeta", texto: "Todos los equipos salen a la vez, cada uno desde un hoyo distinto." },
      { hora: "08:00", titulo: "18 hoyos, scramble a cuatro", texto: "Juego por equipos con hándicap: se disfruta sin importar el nivel." },
      { hora: "13:30", titulo: "Almuerzo y premiación", texto: "Mejor equipo, drive más largo y approach más cercano en cada par 3." },
      { hora: "19:30", titulo: "Cena y subasta", texto: "Una noche para la causa: subasta silenciosa y testimonio de la comunidad." },
    ],
    reglas: ["Hándicap máximo 36 (damas) y 28 (caballeros)", "Hoyo en uno patrocinado en cada par 3", "Equipos mixtos y empresariales"],
  },

  inscripcion: {
    etiqueta: "Inscríbete",
    titulo: "Juega por una causa",
    cursiva: "una causa",
    bajada: "Elige tu parada y tu modalidad. Te enviamos la confirmación y los datos de pago por correo.",
    foto: "/fotos/golf/salida.jpg",
    alt: "Pelota de golf sobre el tee junto a la cabeza de un driver",
    modalidades: [
      {
        id: "individual",
        titulo: "Jugador",
        precio: 1_600_000,
        unidad: "por jugador",
        incluye: ["Green fee y carro compartido", "Kit del jugador", "Almuerzo y cena de gala"],
      },
      {
        id: "equipo",
        titulo: "Equipo de cuatro",
        precio: 5_800_000,
        unidad: "por equipo",
        incluye: ["Cuatro cupos y dos carros", "Nombre del equipo en el tablero", "Mesa reservada en la cena"],
        destacada: true,
      },
      {
        id: "empresa",
        titulo: "Equipo empresarial",
        precio: 9_500_000,
        unidad: "por equipo",
        incluye: ["Todo lo del equipo de cuatro", "Tu marca en un tee de salida", "Certificado de donación"],
      },
    ],
  },

  sponsors: {
    etiqueta: "Patrocinio",
    titulo: "Pon tu nombre junto a una causa",
    cursiva: "una causa",
    bajada:
      "Los patrocinios cubren los costos de cada parada para que las inscripciones lleguen completas a la causa. Recibes informe de impacto y certificado de donación.",
    niveles: [
      {
        nombre: "Presentador",
        precio: "$180M",
        cupos: "1 cupo por temporada",
        beneficios: ["Nombre en el título del tour", "Logo en todas las paradas y banderas", "Tres equipos en cada parada", "Palabras en la gran final"],
        destacado: true,
      },
      {
        nombre: "Parada",
        precio: "$60M",
        cupos: "1 por parada",
        beneficios: ["La parada lleva tu nombre", "Dos equipos inscritos", "Visita de campo a la causa"],
      },
      {
        nombre: "Hoyo",
        precio: "$15M",
        cupos: "18 por parada",
        beneficios: ["Tu marca en el tee de salida", "Un cupo de jugador", "Mención en la premiación"],
      },
      {
        nombre: "Amigo del tour",
        precio: "$5M",
        cupos: "Sin límite",
        beneficios: ["Nombre en el muro de aliados", "Dos cupos para la cena", "Certificado de donación"],
      },
    ],
    cta: { label: "Patrocinar", asunto: "Patrocinio Hope Golf Tour" },
  },

  frase: {
    texto: "El golf se juega en silencio. Lo que hace este tour se oye lejos.",
    firma: "hope+ Fundación",
    foto: "/fotos/golf/links.jpg",
    alt: "Golfista en un campo junto al mar bajo un cielo nublado",
  },

  preguntas: {
    titulo: "Preguntas del tour",
    items: [
      {
        q: "¿Necesito ser un golfista experto?",
        a: "No. El formato scramble por equipos permite que juegue cualquier persona con hándicap, y también puedes asistir solo a la cena y la subasta.",
      },
      {
        q: "¿A dónde va el dinero de mi inscripción?",
        a: "Los patrocinios cubren los costos de la parada, así que el valor neto de tu inscripción va a la causa de esa parada. Publicamos el informe al cerrar la temporada.",
      },
      {
        q: "¿Puedo deducir mi aporte de impuestos?",
        a: "hope+ es una entidad sin ánimo de lucro y expide certificado de donación. Consulta con tu contador cómo aplicarlo en tu declaración.",
      },
      {
        q: "¿Puedo jugar en varias paradas?",
        a: "Sí. Quienes juegan tres paradas o más clasifican a la gran final en Barranquilla con cupo preferencial.",
      },
      {
        q: "¿Mi empresa puede apoyar sin jugar?",
        a: "Sí, con un patrocinio de hoyo, de parada o como Amigo del tour. También recibimos donaciones en especie para la subasta.",
      },
    ],
  },

  cierre: {
    titulo: "Nos vemos en el primer tee",
    texto: "Inscripciones y patrocinios abiertos para la temporada 2027.",
  },
};
