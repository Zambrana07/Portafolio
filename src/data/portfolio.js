const VIEW_CODE = { es: 'Ver código', en: 'View code' };
const VIEW_SITE = { es: 'Ver sitio', en: 'View site' };
const FRONTEND = 'Frontend';
const LANGUAGE = { es: 'Lenguaje', en: 'Language' };
const AI = { es: 'Inteligencia artificial', en: 'Artificial intelligence' };

export const featuredProject = {
  title: 'Evolve',
  meta: { es: 'Proyecto destacado · Landing page', en: 'Featured project · Landing page' },
  description: {
    es: 'Landing page de Evolve, una app con inteligencia artificial que ayuda a las personas a ser constantes con sus hábitos: modo focus, rutinas encadenadas, rachas y recompensas, recordatorios en el momento preciso y cinco temas de color. Incluye registro a la lista de espera para el lanzamiento. Desarrollado en equipo.',
    en: 'Landing page for Evolve, an AI-powered app that helps people stay consistent with their habits: focus mode, chained routines, streaks and rewards, perfectly timed reminders and five color themes. Includes a waitlist sign-up for the launch. Built as a team.'
  },
  tags: ['React', 'Vite', 'JavaScript', 'CSS', { es: 'Trabajo en equipo', en: 'Teamwork' }],
  image: '/images/evolve.jpg',
  href: 'https://evolve-early.vercel.app'
};

export const projects = [
  {
    title: 'CoraWeb',
    meta: { es: 'Aplicación web · Frontend', en: 'Web application · Frontend' },
    description: {
      es: 'Plataforma para reportar y dar seguimiento a puntos de basura y reciclaje sobre un mapa interactivo. Incluye a Cora, una asistente con inteligencia artificial que guía a los usuarios, moderación automática de imágenes con TensorFlow, perfiles, comentarios y un panel de administración.',
      en: 'Platform for reporting and tracking litter and recycling spots on an interactive map. Includes Cora, an AI assistant that guides users, automatic image moderation with TensorFlow, profiles, comments and an admin dashboard.'
    },
    tags: ['React', 'JavaScript', 'Leaflet', 'TensorFlow.js', { es: 'Agente IA', en: 'AI agent' }],
    links: [{ label: VIEW_CODE, href: 'https://github.com/Zambrana07/CoraWeb' }]
  },
  {
    title: 'Tecnolotgia',
    meta: { es: 'Tienda online de videojuegos', en: 'Online video game store' },
    description: {
      es: 'Tienda en línea de videojuegos con página de inicio y slider de destacados, catálogo con una ficha para cada juego, carrito de compras y página de contacto.',
      en: 'Online video game store with a home page and featured-games slider, a catalog with a page for each game, a shopping cart and a contact page.'
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: VIEW_SITE, href: 'https://zambrana07.github.io/Trabajo-alvarito/' },
      { label: VIEW_CODE, href: 'https://github.com/Zambrana07/Trabajo-alvarito' }
    ]
  }
];

export const experience = [
  {
    title: 'Global Communities',
    meta: { es: 'Pasantía', en: 'Internship' },
    description: {
      es: 'Realicé una pasantía en Global Communities, una organización internacional de desarrollo, contribuyendo a iniciativas que ayudan a personas y comunidades en África. Durante la pasantía trabajé en desarrollo móvil con Android Studio y Kotlin.',
      en: 'Completed an internship at Global Communities, an international development organization, contributing to initiatives that support people and communities in Africa. During the internship I worked on mobile development with Android Studio and Kotlin.'
    },
    tags: ['Android Studio', 'Kotlin', { es: 'Desarrollo móvil', en: 'Mobile development' }],
    links: []
  },
  {
    title: 'Circuito 5',
    meta: { es: 'Práctica profesional · 2 meses', en: 'Professional practicum · 2 months' },
    description: {
      es: 'La empresa necesitaba activar a mano cerca de 2,000 artículos, uno por uno. Desde mis primeros días diseñé y desarrollé un software que automatiza por completo el registro de artículos en la base de datos, llevando la página de 500 a más de 2900 artículos publicados en una sola ejecución.',
      en: 'The company needed to activate nearly 2,000 products by hand, one by one. From my first days I designed and built software that fully automates product registration in the database, taking the site from 500 to more than 2,900 published products in a single run.'
    },
    highlight: {
      value: '100%',
      label: {
        es: 'del registro de artículos automatizado: cero activaciones manuales',
        en: 'of product registration automated: zero manual activations'
      }
    },
    tags: [
      { es: 'Automatización', en: 'Automation' },
      { es: 'Software interno', en: 'Internal software' },
      { es: 'Diseño de soluciones', en: 'Solution design' }
    ],
    links: []
  },
  {
    title: { es: 'Plataforma de catálogo y precios', en: 'Catalog and pricing platform' },
    meta: { es: 'Circuito 5 · Automatización y datos', en: 'Circuito 5 · Automation and data' },
    description: {
      es: 'Herramientas en Python integradas con la API de Zoho Books que completan, validan y publican el catálogo de la tienda en línea (casi 3,000 artículos), aplican la política de utilidad por subfamilia y comparan los precios contra seis fuentes del mercado costarricense, emparejando por especificación técnica y forma de venta; así se detectaron más de 350 artículos fuera de mercado. Incluye vigilantes que retiran de la tienda los productos sin stock o sin fotografía, una herramienta para buscar y preparar imágenes de producto, monitoreo del consumo de la API compartida con el equipo web y credenciales cifradas con acceso protegido.',
      en: 'Python tools integrated with the Zoho Books API that complete, validate and publish the online store catalog (nearly 3,000 products), apply the margin policy per subfamily and compare prices against six Costa Rican market sources, matching by technical specification and unit of sale; this flagged more than 350 products priced far from market. Includes watchers that pull products without stock or photos from the store, a tool to find and prepare product images, monitoring of the API quota shared with the web team, and encrypted credentials with protected access.'
    },
    highlight: {
      value: '3,892',
      label: {
        es: 'artículos de 76 subfamilias con su política de utilidad aplicada y verificada, sin errores',
        en: 'products across 76 subfamilies repriced with their margin policy, verified with zero errors'
      }
    },
    tags: ['Python', 'API REST', 'Zoho Books', 'OAuth 2.0', 'openpyxl', 'Web scraping'],
    links: []
  }
];

export const skills = [
  { title: 'React', subtitle: FRONTEND },
  { title: 'React Native', subtitle: { es: 'Móvil', en: 'Mobile' } },
  { title: 'JavaScript', subtitle: LANGUAGE },
  { title: 'TypeScript', subtitle: LANGUAGE },
  { title: 'HTML', subtitle: FRONTEND },
  { title: 'CSS', subtitle: FRONTEND },
  { title: { es: 'Chatbots locales y con servicios', en: 'Local and API-based chatbots' }, subtitle: AI },
  { title: { es: 'Agentes de IA', en: 'AI agents' }, subtitle: AI },
  {
    title: { es: 'Habilidades para agentes de IA', en: 'Skills for AI agents' },
    subtitle: { es: 'Configuración e instalación', en: 'Setup and configuration' }
  },
  { title: 'Bootstrap', subtitle: FRONTEND },
  { title: 'Vite', subtitle: { es: 'Herramientas', en: 'Tooling' } },
  { title: { es: 'Git y GitHub', en: 'Git & GitHub' }, subtitle: { es: 'Control de versiones', en: 'Version control' } }
];

export const certificates = [
  {
    title: 'Unity Certified User: Programmer',
    issuer: 'Unity Technologies',
    date: { es: 'Noviembre 2025', en: 'November 2025' },
    detail: { es: 'Credencial J727-4TVQ · verificable en Certiport', en: 'Credential J727-4TVQ · verifiable on Certiport' },
    image: '/images/certs/unity.webp'
  },
  {
    title: { es: 'CCNA: Introducción a las redes', en: 'CCNA: Introduction to Networks' },
    issuer: 'Cisco Networking Academy · Colegio Técnico Profesional CIT',
    date: { es: 'Diciembre 2025', en: 'December 2025' },
    detail: { es: 'Curso del programa Cisco Networking Academy', en: 'Cisco Networking Academy program course' },
    image: '/images/certs/cisco.webp'
  },
  {
    title: { es: 'Certificación en Emprendimiento e Innovación', en: 'Certificate in Entrepreneurship and Innovation' },
    issuer: 'CENECOOP R.L. · DETCE-MEP',
    date: { es: 'Abril 2026', en: 'April 2026' },
    detail: {
      es: '160 horas · Nota 81 · Análisis estratégico, finanzas, planeación e innovación',
      en: '160 hours · Grade 81 · Strategic analysis, finance, planning and innovation'
    },
    image: '/images/certs/cenecoop.webp'
  },
  {
    title: 'JavaScript Developer Certification',
    issuer: 'freeCodeCamp',
    date: { es: 'Octubre 2026', en: 'October 2026' },
    detail: {
      es: 'Aprox. 300 horas · Examen de certificación aprobado · verificable en línea',
      en: 'About 300 hours · Certification exam passed · verifiable online'
    },
    image: '/images/certs/freecodecamp-javascript.webp',
    url: 'https://www.freecodecamp.org/certification/fcc-322467ad-e654-4706-be9d-a2b0232d8756/javascript-v9'
  },
  {
    title: 'Front-End Development Libraries Certification',
    issuer: 'freeCodeCamp',
    date: { es: 'Octubre 2026', en: 'October 2026' },
    detail: {
      es: 'Aprox. 300 horas · Librerías de desarrollo front-end · verificable en línea',
      en: 'About 300 hours · Front-end development libraries · verifiable online'
    },
    image: '/images/certs/freecodecamp-front-end-libraries.webp',
    url: 'https://www.freecodecamp.org/certification/fcc-322467ad-e654-4706-be9d-a2b0232d8756/front-end-development-libraries-v9'
  }
];
