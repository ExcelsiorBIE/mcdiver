/**
 * Los 2 planes de viaje, PDF §5.3. Un dato, un lugar (docs/00-brief §4):
 * precio, fechas, inmersiones y cupos NUNCA se retipean en un componente —
 * siempre se leen de aquí. Sin barra de cupos (D23, Q9 = B).
 */
export type TripId = "essential" | "complete";

export type Trip = {
  id: TripId;
  badgeColor: "turquoise" | "gold";
  dates: { es: string; en: string };
  days: number;
  nights: number;
  dives: number;
  priceUsd: number;
  maxGroup: 12;
  includesInsurance: boolean;
  name: { es: string; en: string };
  itinerary: { day: number; es: string; en: string }[];
  includes: { es: string[]; en: string[] };
  excludes: { es: string[]; en: string[] };
};

export const trips: Trip[] = [
  {
    id: "essential",
    badgeColor: "turquoise",
    dates: { es: "15–19 de octubre, 2026", en: "October 15–19, 2026" },
    days: 5,
    nights: 4,
    dives: 8,
    priceUsd: 1650,
    maxGroup: 12,
    includesInsurance: false,
    name: { es: "Plan Coiba Esencial", en: "Coiba Essential Plan" },
    itinerary: [
      {
        day: 1,
        es: "Llegada a Ciudad de Panamá. Traslado a Pixvae (aprox. 4-5 hrs). Bienvenida y briefing con el equipo. Alojamiento en Pixvae.",
        en: "Arrival in Panama City. Transfer to Pixvae (approx. 4-5 hrs). Welcome and team briefing. Overnight in Pixvae.",
      },
      {
        day: 2,
        es: "Primera jornada de buceo. 3 inmersiones en el PNN Coiba. 20-30 minutos en lancha desde Pixvae. Almuerzo a bordo.",
        en: "First diving day. 3 dives in PNN Coiba. 20-30 minutes by boat from Pixvae. Lunch on board.",
      },
      {
        day: 3,
        es: "Segunda jornada de buceo. 3 inmersiones. Sitios exclusivos. Posibilidad de avistamiento de tiburón ballena (temporada).",
        en: "Second diving day. 3 dives. Exclusive sites. Possible whale shark sighting (seasonal).",
      },
      {
        day: 4,
        es: "Tercera jornada. 2 inmersiones matutinas. Tarde libre en Pixvae. Traslado de regreso a Ciudad de Panamá. 1 noche en hotel.",
        en: "Third day. 2 morning dives. Free afternoon in Pixvae. Transfer back to Panama City. 1 night in hotel.",
      },
      {
        day: 5,
        es: "Desayuno. Vuelo de regreso a ciudad de origen.",
        en: "Breakfast. Return flight home.",
      },
    ],
    includes: {
      es: [
        "Transporte Ciudad de Panamá ↔ Pixvae",
        "3 noches alojamiento en Pixvae + 1 noche en Ciudad de Panamá",
        "8 inmersiones en el PNN Coiba",
        "Entrada al Parque Nacional Coiba",
        "Chaleco BCD y regulador",
        "Instructor/Divemaster certificado PADI",
        "Todas las comidas durante los días de buceo",
      ],
      en: [
        "Transport Panama City ↔ Pixvae",
        "3 nights lodging in Pixvae + 1 night in Panama City",
        "8 dives in PNN Coiba",
        "Coiba National Park entrance fee",
        "BCD and regulator",
        "Certified PADI Instructor/Divemaster",
        "All meals on diving days",
      ],
    },
    excludes: {
      es: [
        "Tiquete aéreo",
        "Bebidas personales",
        "Buceo nocturno",
        "Traje de neopreno (alquiler disponible)",
        "Gastos personales extras",
      ],
      en: [
        "Airfare",
        "Personal beverages",
        "Night diving",
        "Wetsuit (rental available)",
        "Extra personal expenses",
      ],
    },
  },
  {
    id: "complete",
    badgeColor: "gold",
    dates: { es: "5–11 de noviembre, 2026", en: "November 5–11, 2026" },
    days: 7,
    nights: 6,
    dives: 14,
    priceUsd: 2450,
    maxGroup: 12,
    includesInsurance: true,
    name: { es: "Plan Coiba Completo", en: "Coiba Complete Plan" },
    itinerary: [
      {
        day: 1,
        es: "Llegada a Ciudad de Panamá. Traslado a Bahía Honda/Pixvae. Bienvenida, briefing y cena. Alojamiento incluido.",
        en: "Arrival in Panama City. Transfer to Bahía Honda/Pixvae. Welcome, briefing and dinner. Lodging included.",
      },
      { day: 2, es: "Primera jornada. 3 inmersiones en el PNN Coiba.", en: "First day. 3 dives in PNN Coiba." },
      {
        day: 3,
        es: "Segunda jornada. 3 inmersiones. Sitios de pared y arrecife.",
        en: "Second day. 3 dives. Wall and reef sites.",
      },
      {
        day: 4,
        es: "Tercera jornada. 2 inmersiones AM + buceo nocturno opcional ($60 USD).",
        en: "Third day. 2 morning dives + optional night dive ($60 USD).",
      },
      {
        day: 5,
        es: "Cuarta jornada. 3 inmersiones. Roca Partida y sitios profundos.",
        en: "Fourth day. 3 dives. Roca Partida and deep sites.",
      },
      {
        day: 6,
        es: "Quinta jornada. 3 inmersiones matutinas. Tarde libre. Cena de cierre.",
        en: "Fifth day. 3 morning dives. Free afternoon. Closing dinner.",
      },
      { day: 7, es: "Traslado a Ciudad de Panamá. Vuelo de regreso.", en: "Transfer to Panama City. Return flight." },
    ],
    includes: {
      es: [
        "Transporte Ciudad de Panamá ↔ Pixvae/Bahía Honda",
        "6 noches de alojamiento",
        "14 inmersiones en el PNN Coiba",
        "Entrada al Parque Nacional Coiba",
        "Instructor/Divemaster certificado PADI",
        "Todas las comidas durante los 7 días",
        "Seguro de buceo",
        "Souvenir MCDiver",
        "Alquiler completo de equipos",
      ],
      en: [
        "Transport Panama City ↔ Pixvae/Bahía Honda",
        "6 nights lodging",
        "14 dives in PNN Coiba",
        "Coiba National Park entrance fee",
        "Certified PADI Instructor/Divemaster",
        "All meals for all 7 days",
        "Dive insurance",
        "MCDiver souvenir",
        "Full gear rental",
      ],
    },
    excludes: {
      es: ["Tiquete aéreo", "Bebidas alcohólicas", "Buceo nocturno ($60 USD extra)", "Gastos personales"],
      en: ["Airfare", "Alcoholic beverages", "Night diving ($60 USD extra)", "Personal expenses"],
    },
  },
];

export function tripById(id: TripId): Trip {
  const trip = trips.find((t) => t.id === id);
  if (!trip) throw new Error(`Trip "${id}" no existe en content/trips.ts`);
  return trip;
}
