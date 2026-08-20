/**
 * Galería preview §5.7 — 6 fotos. Mood/stock (D12): el alt describe la imagen,
 * no el avistamiento que nos gustaría vender.
 */
export type GalleryCategory = "fauna" | "landscapes" | "action" | "pixvae";

export type GalleryImage = {
  src: string;
  alt: { es: string; en: string };
  isStock: true;
  category: GalleryCategory;
};

export const galleryPreview: GalleryImage[] = [
  {
    src: "/media/gallery-01.webp",
    alt: {
      es: "Tortuga marina sobre un arrecife, imagen ilustrativa.",
      en: "Sea turtle over a reef, illustrative image.",
    },
    isStock: true,
    category: "fauna",
  },
  {
    src: "/media/gallery-02.webp",
    alt: {
      es: "Atardecer sobre el Pacífico desde una cresta selvática, imagen ilustrativa.",
      en: "Pacific sunset from a jungle ridge, illustrative image.",
    },
    isStock: true,
    category: "landscapes",
  },
  {
    src: "/media/gallery-03.webp",
    alt: {
      es: "Banco de jureles en agua clara con rayos de sol, imagen ilustrativa.",
      en: "School of jacks in clear water with sun shafts, illustrative image.",
    },
    isStock: true,
    category: "fauna",
  },
  {
    src: "/media/gallery-04.webp",
    alt: {
      es: "Lancha en agua turquesa frente a una isla selvática, imagen ilustrativa.",
      en: "Skiff on turquoise water facing a jungle island, illustrative image.",
    },
    isStock: true,
    category: "action",
  },
  {
    src: "/media/gallery-05.webp",
    alt: {
      es: "Isla remota donde la selva encuentra el Pacífico, imagen ilustrativa.",
      en: "Remote island where jungle meets the Pacific, illustrative image.",
    },
    isStock: true,
    category: "landscapes",
  },
  {
    src: "/media/gallery-06.webp",
    alt: {
      es: "Muelle de madera en un pueblo costero del Pacífico, imagen ilustrativa.",
      en: "Wooden dock in a Pacific coastal village, illustrative image.",
    },
    isStock: true,
    category: "pixvae",
  },
];

export const galleryAll = galleryPreview;

export const galleryFilters: { id: GalleryCategory | "all"; es: string; en: string }[] = [
  { id: "all", es: "Todas", en: "All" },
  { id: "fauna", es: "Fauna marina", en: "Marine life" },
  { id: "landscapes", es: "Paisajes", en: "Landscapes" },
  { id: "action", es: "Buceo en acción", en: "Diving" },
  { id: "pixvae", es: "Pixvae", en: "Pixvae" },
];
