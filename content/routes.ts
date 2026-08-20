import type { Locale } from "@/lib/i18n";

/**
 * Mapa canónico ES↔EN. Fuente única de la que se derivan generateStaticParams,
 * sitemap.xml, hreflang y el destino del toggle de idioma.
 * Ver docs/02-architecture.md §2 y docs/00-brief.md §6.
 */
export type PageId =
  | "home"
  | "trips"
  | "coiba"
  | "pixvae"
  | "team"
  | "gallery"
  | "faq"
  | "blog"
  | "contact";

type RouteEntry = { es: string; en: string };

export const ROUTES: Record<PageId, RouteEntry> = {
  home: { es: "", en: "" },
  trips: { es: "nuestros-viajes", en: "our-trips" },
  coiba: { es: "isla-coiba", en: "coiba-island" },
  pixvae: { es: "por-que-pixvae", en: "why-pixvae" },
  team: { es: "nuestro-equipo", en: "our-team" },
  gallery: { es: "galeria", en: "gallery" },
  faq: { es: "faq", en: "faq" },
  blog: { es: "blog", en: "blog" },
  contact: { es: "contacto", en: "contact" },
};

const pageIds = Object.keys(ROUTES) as PageId[];

/** Slug (sin idioma, sin barra inicial) para una página en un idioma dado. */
export function slugFor(id: PageId, locale: Locale): string {
  return ROUTES[id][locale];
}

/** Ruta pública completa, con prefijo /en cuando corresponde (D6: ES sin prefijo). */
export function pathFor(id: PageId, locale: Locale): string {
  const slug = slugFor(id, locale);
  if (locale === "en") return slug ? `/en/${slug}` : "/en";
  return slug ? `/${slug}` : "/";
}

/** Resuelve un array de segmentos (del catch-all [...slug]) a un PageId, para un idioma. */
export function pageIdForSlug(locale: Locale, segments: string[]): PageId | undefined {
  const joined = segments.join("/");
  return pageIds.find((id) => ROUTES[id][locale] === joined);
}

/**
 * Dado el PageId actual y el idioma destino, la URL de la MISMA página en el
 * otro idioma. Es lo que usa el toggle ES|EN — nunca lleva al home (D6).
 */
export function alternatePath(id: PageId, targetLocale: Locale): string {
  return pathFor(id, targetLocale);
}

export function allPageIds(): PageId[] {
  return pageIds;
}

/** Nav del PDF §4. Labels bilingües; destinos desde ROUTES (D6). */
export const NAV: { id: PageId; es: string; en: string }[] = [
  { id: "home", es: "Inicio", en: "Home" },
  { id: "trips", es: "Nuestros Viajes", en: "Our Trips" },
  { id: "coiba", es: "Isla Coiba", en: "Coiba Island" },
  { id: "pixvae", es: "Por qué Pixvae", en: "Why Pixvae" },
  { id: "gallery", es: "Galería", en: "Gallery" },
  { id: "team", es: "Nosotros", en: "Team" },
  { id: "faq", es: "FAQ", en: "FAQ" },
  { id: "blog", es: "Blog", en: "Blog" },
];
