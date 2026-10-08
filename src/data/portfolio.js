export const featuredProject = {
  title: 'Evolve',
  meta: 'Proyecto destacado · Landing page',
  description:
    'Landing page de Evolve, una app con inteligencia artificial que ayuda a las personas a ser constantes con sus hábitos: modo focus, rutinas encadenadas, rachas y recompensas, recordatorios en el momento preciso y cinco temas de color. Incluye registro a la lista de espera para el lanzamiento. Desarrollado en equipo.',
  tags: ['React', 'Vite', 'JavaScript', 'CSS', 'Trabajo en equipo'],
  image: '/images/evolve.jpg',
  href: 'https://evolve-early.vercel.app'
};

export const projects = [
  {
    title: 'CoraWeb',
    meta: 'Aplicación web · Frontend',
    description:
      'Plataforma para reportar y dar seguimiento a puntos de basura y reciclaje sobre un mapa interactivo. Incluye a Cora, una asistente con inteligencia artificial que guía a los usuarios, moderación automática de imágenes con TensorFlow, perfiles, comentarios y un panel de administración.',
    tags: ['React', 'JavaScript', 'Leaflet', 'TensorFlow.js', 'Agente IA'],
    links: [{ label: 'Ver código', href: 'https://github.com/Zambrana07/CoraWeb' }]
  },
  {
    title: 'Tecnolotgia',
    meta: 'Tienda online de videojuegos',
    description:
      'Tienda en línea de videojuegos con página de inicio y slider de destacados, catálogo con una ficha para cada juego, carrito de compras y página de contacto.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Ver sitio', href: 'https://zambrana07.github.io/Trabajo-alvarito/' },
      { label: 'Ver código', href: 'https://github.com/Zambrana07/Trabajo-alvarito' }
    ]
  }
];

export const experience = [
  {
    title: 'Global Communities',
    meta: 'Pasantía',
    description:
      'Realicé una pasantía en Global Communities, una organización internacional de desarrollo, contribuyendo a iniciativas que ayudan a personas y comunidades en África.',
    tags: [],
    links: []
  },
  {
    title: 'Circuito 5',
    meta: 'Práctica profesional · 2 meses',
    description:
      'La empresa necesitaba activar a mano cerca de 2,000 artículos, uno por uno. Desde mis primeros días diseñé y desarrollé un software que automatiza por completo el registro de artículos en la base de datos, llevando la página de 500 a más de 1,800 artículos publicados en una sola ejecución.',
    highlight: { value: '100%', label: 'del registro de artículos automatizado: cero activaciones manuales' },
    tags: ['Automatización', 'Software interno', 'Diseño de soluciones'],
    links: []
  }
];

export const skills = [
  { title: 'React', subtitle: 'Frontend' },
  { title: 'React Native', subtitle: 'Móvil' },
  { title: 'JavaScript', subtitle: 'Lenguaje' },
  { title: 'TypeScript', subtitle: 'Lenguaje' },
  { title: 'HTML', subtitle: 'Frontend' },
  { title: 'CSS', subtitle: 'Frontend' },
  { title: 'Chatbots locales y con servicios', subtitle: 'Inteligencia artificial' },
  { title: 'Agentes de IA', subtitle: 'Inteligencia artificial' },
  { title: 'Habilidades para agentes de IA', subtitle: 'Configuración e instalación' },
  { title: 'Bootstrap', subtitle: 'Frontend' },
  { title: 'Vite', subtitle: 'Herramientas' },
  { title: 'Git y GitHub', subtitle: 'Control de versiones' }
];

export const certificates = [
  {
    title: 'Unity Certified User: Programmer',
    issuer: 'Unity Technologies',
    date: 'Noviembre 2025',
    detail: 'Credencial J727-4TVQ · verificable en Certiport',
    image: '/images/certs/unity.webp'
  },
  {
    title: 'CCNA: Introducción a las redes',
    issuer: 'Cisco Networking Academy · Colegio Técnico Profesional CIT',
    date: 'Diciembre 2025',
    detail: 'Curso del programa Cisco Networking Academy',
    image: '/images/certs/cisco.webp'
  },
  {
    title: 'Certificación en Emprendimiento e Innovación',
    issuer: 'CENECOOP R.L. · DETCE-MEP',
    date: 'Abril 2026',
    detail: '160 horas · Análisis estratégico, finanzas, planeación e innovación',
    image: '/images/certs/cenecoop.webp'
  }
];
