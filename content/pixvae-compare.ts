/**
 * Comparativa Pixvae vs Santa Catalina.
 * Un dataset, dos vistas (D16): home toma las filas cualitativas;
 * /por-que-pixvae mostrará la tabla completa. PDF §5.5 ⊂ §8.3.
 * Fila de combustible omitida (D17).
 */
export type CompareRow = {
  id: string;
  pixvae: { es: string; en: string };
  catalina: { es: string; en: string };
  homeHighlight?: boolean;
};

export const pixvaeCompare: CompareRow[] = [
  {
    id: "time",
    pixvae: { es: "20–30 min a los sitios", en: "20–30 min to the sites" },
    catalina: { es: "60–90 min a los sitios", en: "60–90 min to the sites" },
    homeHighlight: true,
  },
  {
    id: "dives",
    pixvae: { es: "Más inmersiones (3–4 / día)", en: "More dives (3–4 / day)" },
    catalina: { es: "Menos tiempo en el agua (2–3 / día)", en: "Less time in the water (2–3 / day)" },
    homeHighlight: true,
  },
  {
    id: "fatigue",
    pixvae: { es: "Mínimo desgaste", en: "Minimal fatigue" },
    catalina: { es: "Alto desgaste por trayecto", en: "High fatigue from the run" },
    homeHighlight: true,
  },
  {
    id: "access",
    pixvae: { es: "Acceso exclusivo", en: "Exclusive access" },
    catalina: { es: "Acceso limitado", en: "Limited access" },
  },
];

export const pixvaeCopy = {
  es: {
    title: "Más tiempo bajo el agua. Menos tiempo en lancha.",
    pixvaeLabel: "Desde Pixvae (MCDiver)",
    catalinaLabel: "Desde Santa Catalina",
    body: "Pixvae y Bahía Honda son los puntos de acceso más cercanos al Parque Nacional Coiba. Mientras otros operadores salen desde Santa Catalina con más de una hora de travesía, nuestro equipo sale desde Pixvae. La diferencia es simple: tú buceas más y viajas menos.",
  },
  en: {
    title: "More time underwater. Less time on the boat.",
    pixvaeLabel: "From Pixvae (MCDiver)",
    catalinaLabel: "From Santa Catalina",
    body: "Pixvae and Bahía Honda are the closest access points to Coiba National Park. While other operators leave from Santa Catalina with more than an hour of crossing, our team leaves from Pixvae. The difference is simple: you dive more and travel less.",
  },
} as const;
