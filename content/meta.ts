import type { PageId } from "./routes";

/**
 * Meta title/description por página e idioma. Límites del PDF §9: title ≤60,
 * description ≤160. docs/11-media-motion-seo.md §5 — la home original media
 * 61 chars y se recortó a 53 sin perder nada (Panamá ya está en el H1).
 *
 * Los títulos EN son redacción original, no traducción literal (docs/11 §5.1).
 * Se refinan en Fase 6; deben existir y cumplir el límite desde ya.
 */
export const META: Record<PageId, { es: { title: string; description: string }; en: { title: string; description: string } }> = {
  home: {
    es: {
      title: "MCDiver | Buceo Exclusivo en el Parque Nacional Coiba",
      description:
        "Viajes de buceo exclusivos al Parque Nacional Coiba, Panamá, desde Pixvae. Grupos pequeños, instructores PADI con décadas de experiencia.",
    },
    en: {
      title: "MCDiver | Dive Expeditions to Coiba National Park",
      description:
        "Exclusive dive expeditions to Coiba National Park, Panama, from Pixvae. Small groups, PADI instructors with decades of experience.",
    },
  },
  trips: {
    es: {
      title: "Planes de Buceo en Coiba | MCDiver | Grupos Pequeños",
      description:
        "Dos planes de buceo a Isla Coiba desde Pixvae: 5 y 7 días. Grupos máximo 12 personas, instructores PADI certificados.",
    },
    en: {
      title: "Coiba Dive Trips | MCDiver | Small Groups",
      description:
        "Two dive trip options to Coiba Island from Pixvae: 5 and 7 days. Max 12 divers per group, certified PADI instructors.",
    },
  },
  coiba: {
    es: {
      title: "Isla Coiba: Buceo en el Galápagos del Pacífico | MCDiver",
      description:
        "Parque Nacional Coiba, Patrimonio de la Humanidad UNESCO. Biodiversidad, mejores sitios de buceo y cuándo visitar.",
    },
    en: {
      title: "Coiba Island: Diving the Pacific's Galápagos | MCDiver",
      description:
        "Coiba National Park, a UNESCO World Heritage Site. Biodiversity, top dive sites, and when to visit.",
    },
  },
  pixvae: {
    es: {
      title: "Por qué Pixvae es el Mejor Punto para Bucear en Coiba",
      description:
        "Desde Pixvae, 20–30 minutos a los sitios de buceo de Coiba — menos trayecto, más inmersiones que desde Santa Catalina.",
    },
    en: {
      title: "Why Pixvae Is the Best Base for Diving Coiba | MCDiver",
      description:
        "From Pixvae, 20–30 minutes to Coiba's dive sites — shorter transit, more dive time than from Santa Catalina.",
    },
  },
  team: {
    es: {
      title: "Nuestro Equipo de Instructores PADI | MCDiver Coiba",
      description:
        "Conoce al equipo de instructores PADI de MCDiver: décadas de experiencia buceando en el Pacífico panameño.",
    },
    en: {
      title: "Our PADI Instructor Team | MCDiver Coiba",
      description:
        "Meet MCDiver's PADI instructor team — decades of experience diving the Panamanian Pacific.",
    },
  },
  gallery: {
    es: {
      title: "Galería de Fotos y Videos | Buceo en Coiba | MCDiver",
      description: "Fotos y videos de nuestras expediciones de buceo al Parque Nacional Coiba, Panamá.",
    },
    en: {
      title: "Photo & Video Gallery | Diving Coiba | MCDiver",
      description: "Photos and videos from our dive expeditions to Coiba National Park, Panama.",
    },
  },
  faq: {
    es: {
      title: "Preguntas Frecuentes sobre Buceo en Coiba | MCDiver",
      description: "Todo lo que necesitas saber antes de bucear en Coiba: nivel requerido, reservas, seguridad y más.",
    },
    en: {
      title: "Frequently Asked Questions | Diving Coiba | MCDiver",
      description: "Everything you need to know before diving Coiba: certification level, booking, safety and more.",
    },
  },
  blog: {
    es: {
      title: "Blog | Buceo en Coiba y Pixvae | MCDiver",
      description: "Guías y artículos sobre buceo en el Parque Nacional Coiba y la región de Pixvae, Panamá.",
    },
    en: {
      title: "Blog | Diving Coiba & Pixvae | MCDiver",
      description: "Guides and articles on diving Coiba National Park and the Pixvae region, Panama.",
    },
  },
  contact: {
    es: {
      title: "Contacto y Reservas | MCDiver Buceo en Coiba",
      description: "Escríbenos por WhatsApp o correo para reservar tu viaje de buceo a Coiba con MCDiver.",
    },
    en: {
      title: "Contact & Booking | MCDiver Diving Coiba",
      description: "Reach us by WhatsApp or email to book your Coiba dive trip with MCDiver.",
    },
  },
};
