/**
 * Los 4 sitios de buceo nombrados en el PDF **§8.2** `/isla-coiba`
 * ("Los mejores sitios de buceo: Roca Partida, El Bajo Hannibal, Granito de
 * Oro, Las Lajas, con foto de cada uno"). No en §5.4 como se citó primero —
 * verificado línea por línea contra el texto antes de escribir esto.
 *
 * El PDF da los NOMBRES y nada más — ninguna profundidad, nivel requerido ni
 * fauna típica por sitio. Inventar esos datos sería el mismo problema que
 * CI-3 (docs/08-content-integrity.md) en un lugar nuevo: un dato que suena
 * verificable y no lo es. `depthM` y `levelRequired` quedan `null` hasta que
 * Pacho los confirme — igual que `padiCert` en content/team.ts.
 *
 * `isStock` vive en el tipo de la foto, no en una lista aparte: el estado
 * stock-vs-real viaja con cada sitio en vez de depender de que alguien
 * cruce referencias con un documento distinto.
 */
export type DiveSite = {
  id: "roca-partida" | "bajo-hannibal" | "granito-de-oro" | "las-lajas";
  name: string;
  description: { es: string; en: string };
  depthM: number | null;
  levelRequired: string | null;
  photo: { isStock: boolean; alt: { es: string; en: string } };
};

export const diveSites: DiveSite[] = [
  {
    id: "roca-partida",
    name: "Roca Partida",
    description: {
      es: "Formación rocosa aislada, corriente variable. Uno de los sitios más solicitados; sujeto a condiciones del día.",
      en: "Isolated rock formation, variable current. One of the most requested sites; conditions permitting.",
    },
    depthM: null, // pendiente: confirmar con Pacho
    levelRequired: null, // pendiente: confirmar con Pacho
    photo: {
      isStock: true,
      alt: {
        es: "Formación rocosa submarina en aguas abiertas del Pacífico",
        en: "Underwater rock formation in open Pacific waters",
      },
    },
  },
  {
    id: "bajo-hannibal",
    name: "El Bajo Hannibal",
    description: {
      es: "Pináculo sumergido en el Parque Nacional Coiba. Sitio exclusivo, sujeto a condiciones del día.",
      en: "Submerged pinnacle in Coiba National Park. Exclusive site, conditions permitting.",
    },
    depthM: null,
    levelRequired: null,
    photo: {
      isStock: true,
      alt: {
        es: "Pináculo submarino con vida marina en el Pacífico panameño",
        en: "Underwater pinnacle with marine life in the Panamanian Pacific",
      },
    },
  },
  {
    id: "granito-de-oro",
    name: "Granito de Oro",
    description: {
      es: "Islote dentro del Parque Nacional Coiba, conocido por su arrecife. Sujeto a condiciones del día.",
      en: "Small island within Coiba National Park, known for its reef. Conditions permitting.",
    },
    depthM: null,
    levelRequired: null,
    photo: {
      isStock: true,
      alt: {
        es: "Arrecife de coral con peces tropicales en el Pacífico",
        en: "Coral reef with tropical fish in the Pacific",
      },
    },
  },
  {
    id: "las-lajas",
    name: "Las Lajas",
    description: {
      es: "Sitio de buceo dentro del Parque Nacional Coiba. Sujeto a condiciones del día.",
      en: "Dive site within Coiba National Park. Conditions permitting.",
    },
    depthM: null,
    levelRequired: null,
    photo: {
      isStock: true,
      alt: {
        es: "Formación de roca submarina en el Parque Nacional Coiba",
        en: "Underwater rock formation in Coiba National Park",
      },
    },
  },
];
