/**
 * Datos de contacto y negocio. Información pública, no secretos — vive aquí,
 * no en variables de entorno (D11). Un dato, un lugar.
 */
export const site = {
  brand: "MCDiver",
  domain: "mcdiver.co",
  whatsapp: {
    e164: "+13059043587",
    digits: "13059043587",
    waLink: (text: { es: string; en: string }, locale: "es" | "en") =>
      `https://wa.me/13059043587?text=${encodeURIComponent(text[locale])}`,
  },
  email: "jjtorresv@gmail.com",
  location: {
    es: "Miami, FL, USA · Operaciones: Pixvae, Panamá",
    en: "Miami, FL, USA · Operations: Pixvae, Panama",
  },
  hours: {
    es: "Lunes a Viernes: 9am – 7pm (EST) · Sábados: 10am – 4pm (EST)",
    en: "Monday to Friday: 9am – 7pm (EST) · Saturday: 10am – 4pm (EST)",
  },
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  },
} as const;

export const defaultWhatsappMessage = {
  es: "Hola Jhon, me interesa un viaje de buceo a Coiba con MCDiver. ¿Me puedes dar más información?",
  en: "Hi Jhon, I'm interested in a Coiba dive trip with MCDiver. Can you share more info?",
};
