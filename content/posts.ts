export type Post = {
  id: "pixvae-start" | "coiba-guide";
  category: { es: string; en: string };
  slug: { es: string; en: string };
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  date: string;
  cover: string;
  body: { es: string[]; en: string[] };
};

export const posts: Post[] = [
  {
    id: "pixvae-start",
    category: { es: "Destinos", en: "Destinations" },
    slug: { es: "por-que-pixvae-punto-de-partida-coiba", en: "why-pixvae-is-the-start-for-coiba" },
    title: {
      es: "Por qué Pixvae es el mejor punto de partida para bucear en Coiba",
      en: "Why Pixvae is the best starting point for diving Coiba",
    },
    excerpt: {
      es: "20–30 minutos a los sitios, contra 60–90 desde Santa Catalina. Menos lancha, más fondo.",
      en: "20–30 minutes to the sites, versus 60–90 from Santa Catalina. Less boat, more bottom time.",
    },
    date: "2026-08-20",
    cover: "/media/pixvae.webp",
    body: {
      es: [
        "El argumento de MCDiver cabe en una frase: salimos desde Pixvae, a 20–30 minutos de los sitios de buceo del Parque Nacional Coiba. Desde Santa Catalina el mismo trayecto suele ser de 60–90 minutos.",
        "Esa diferencia no es marketing: es inmersiones. Menos horas de lancha es menos mareo, más energía en el agua y, en la práctica, 3–4 inmersiones posibles al día frente a 2–3 cuando el traslado se come la mañana.",
        "Coiba es Patrimonio de la Humanidad UNESCO, con más de 760 especies de peces. Lo que encuentres bajo el agua depende del día y de la temporada — no hay fauna prometida. Dic–mayo el agua suele estar más clara; jun–nov es la ventana en la que se avistan con más frecuencia tiburones ballena y jorobadas en la región.",
        "El traslado terrestre Ciudad de Panamá → Pixvae va en buseta con aire y baño, incluido en ambos planes. Si te encaja un grupo de máximo 12, el siguiente paso es un WhatsApp.",
      ],
      en: [
        "MCDiver's case fits in one sentence: we leave from Pixvae, 20–30 minutes from Coiba National Park dive sites. From Santa Catalina the same run is often 60–90 minutes.",
        "That gap is not marketing: it is dives. Less boat time is less seasickness, more energy in the water, and in practice 3–4 possible dives a day versus 2–3 when the transfer eats the morning.",
        "Coiba is a UNESCO World Heritage Site, with more than 760 fish species. What you meet underwater depends on the day and the season — no wildlife is promised. Dec–May the water is often clearer; Jun–Nov is when whale sharks and humpbacks are most often sighted in the region.",
        "The Panama City → Pixvae ground transfer is an A/C coach with restroom, included in both plans. If a group of 12 maximum fits, the next step is WhatsApp.",
      ],
    },
  },
  {
    id: "coiba-guide",
    category: { es: "Guías", en: "Guides" },
    slug: { es: "guia-buceo-parque-nacional-coiba", en: "coiba-national-park-dive-guide" },
    title: {
      es: "Todo lo que necesitas saber para bucear en el Parque Nacional Coiba",
      en: "What you need to know to dive Coiba National Park",
    },
    excerpt: {
      es: "Nivel, época, equipo, cómo llegar desde Miami, y qué cubre (y qué no) el precio.",
      en: "Level, season, gear, how to get here from Miami, and what the price covers (and does not).",
    },
    date: "2026-08-20",
    cover: "/media/coiba.webp",
    body: {
      es: [
        "Nivel: mínimo Open Water. El plan de 7 días tiene inmersiones donde se recomienda Advanced. Si acabas de certificarte, el plan de 5 días es el arranque más razonable.",
        "Época: diciembre a mayo, mejor visibilidad (hasta 30 m) y mar más calmo. Junio a noviembre, más lluvia y la ventana de tiburón ballena y jorobadas en la región. Todo el año se bucea; el sitio del día lo decide el mar.",
        "Equipo: agua 27–29 °C, 3 mm suele bastar. Máscara y aletas propias si las tienes. BCD y regulador van incluidos. El neopreno no está incluido (alquiler disponible).",
        "Desde Miami: vuelo a Ciudad de Panamá (~3.5 h). El terrestre a Pixvae (unas 4–5 h) va incluido. El tiquete aéreo no.",
        "Precio: 50% de anticipo para el cupo, 50% 15 días antes. Si el grupo no llega a 10, 100% del anticipo de vuelta. Tras el anticipo te recomendamos un seguro de viaje con anulación (lo contratas tú; el seguro de buceo del plan 7 días es otra cosa).",
        "Seguridad: briefing, divemaster en el agua, grupo máximo 12. El riesgo de bucear no es cero. Coiba tiene sitios protegidos; el equipo elige según las condiciones del día.",
      ],
      en: [
        "Level: Open Water minimum. The 7-day plan includes dives where Advanced is recommended. If you just certified, the 5-day plan is the sensible start.",
        "Season: December to May, better visibility (up to 30 m) and calmer sea. June to November, more rain and the whale shark / humpback window in the region. Diving runs year-round; the day's site is the sea's call.",
        "Gear: water 27–29 °C, 3 mm is usually enough. Your own mask and fins if you have them. BCD and regulator are included. Wetsuit is not (rental available).",
        "From Miami: fly to Panama City (~3.5 h). Ground transfer to Pixvae (about 4–5 h) is included. Airfare is not.",
        "Price: 50% deposit to hold the spot, 50% 15 days before. If the group doesn't reach 10, 100% of the deposit back. After the deposit we recommend travel insurance with cancellation (you buy it; the 7-day plan's dive insurance is a different product).",
        "Safety: briefing, divemaster in the water, max group 12. Diving risk is not zero. Coiba has protected sites; the team picks from the day's conditions.",
      ],
    },
  },
];

export function postBySlug(locale: "es" | "en", slug: string): Post | undefined {
  return posts.find((p) => p.slug[locale] === slug);
}
