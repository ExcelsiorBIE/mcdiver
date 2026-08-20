/**
 * Equipo, PDF §5.6. Bios reales del PDF, traducidas — nada inventado.
 *
 * CI-3 (docs/08-content-integrity.md): los "+25 años" y "fundador" quedan
 * SOLO en Pacho, que es lo único que su propia ficha sostiene. No se le
 * asigna una cifra a Sebastián. `yearsExperience` y `padiCert` quedan
 * `null` hasta que Jhon entregue los datos reales — nunca un número
 * plausible inventado (docs/00-brief.md §8).
 */
export type TeamMember = {
  id: "pacho" | "sebastian" | "jhon";
  displayName: string;
  photoBorder: "turquoise" | "gold";
  yearsExperience: number | null;
  padiCert: string | null;
  role: { es: string; en: string };
  bio: { es: string; en: string };
  quote?: { es: string; en: string };
};

export const team: TeamMember[] = [
  {
    id: "pacho",
    displayName: 'Francisco "Pacho" Martínez',
    photoBorder: "turquoise",
    yearsExperience: 25,
    padiCert: null, // pendiente: número real de certificación PADI
    role: { es: "Instructor PADI | +25 años de experiencia", en: "PADI Instructor | 25+ years of experience" },
    bio: {
      es: "Fundador de La Tienda de Buceo El Rodadero en Santa Marta, Colombia. Operador en Santa Catalina, Panamá por más de una década. Hoy lidera las operaciones desde Pixvae, el punto más cercano a los mejores sitios de buceo del Parque Nacional Coiba.",
      en: "Founder of La Tienda de Buceo El Rodadero in Santa Marta, Colombia. Operated in Santa Catalina, Panama for over a decade. Today he leads operations from Pixvae, the closest point to Coiba National Park's best dive sites.",
    },
  },
  {
    id: "sebastian",
    displayName: "Sebastián Martínez",
    photoBorder: "turquoise",
    yearsExperience: null, // pendiente: años reales (docs/08 CI-3)
    padiCert: null, // pendiente: número real de certificación PADI
    role: { es: "Instructor PADI | Guía de Inmersiones", en: "PADI Instructor | Dive Guide" },
    bio: {
      es: "Formado en el buceo desde niño junto a su padre. Especialista en avistamientos de tiburón ballena y mantarrayas en Coiba. Su conocimiento de los sitios de buceo del Pacífico panameño es único e irrepetible.",
      en: "Grew up diving alongside his father. Specialist in whale shark and manta ray sightings in Coiba. His knowledge of the Panamanian Pacific's dive sites is one of a kind.",
    },
  },
  {
    id: "jhon",
    displayName: "Jhon Torres",
    photoBorder: "gold",
    yearsExperience: null,
    padiCert: null,
    role: { es: "Rescue Diver | Organizador & Contacto en Miami", en: "Rescue Diver | Organizer & Miami Contact" },
    bio: {
      es: "Organiza los viajes desde Miami para buceadores hispanohablantes en USA.",
      en: "Organizes the trips from Miami for Spanish-speaking divers in the US.",
    },
    quote: {
      es: "Soy buzo como tú. Conozco Coiba de primera mano y quedé enamorado del lugar. Me asocié con el mejor equipo de instructores que conozco para hacer fácil lo que antes era difícil de organizar desde USA. Mi trabajo es que tu viaje sea perfecto desde que salgas de Miami.",
      en: "I'm a diver just like you. I know Coiba firsthand and fell in love with it. I partnered with the best instructor team I know to make easy what used to be hard to organize from the US. My job is making sure your trip is perfect from the moment you leave Miami.",
    },
  },
];
