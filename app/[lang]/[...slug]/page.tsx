import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { allPageIds, pageIdForSlug, slugFor, type PageId } from "@/content/routes";
import { META } from "@/content/meta";
import {
  BlogPage,
  CoibaPage,
  ContactPage,
  FaqPage,
  GalleryPage,
  PixvaePage,
  TeamPage,
  TripsPage,
} from "@/components/interiors";

export function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  for (const locale of locales) {
    for (const id of allPageIds()) {
      if (id === "home") continue;
      const slug = slugFor(id, locale);
      if (slug) params.push({ lang: locale, slug: [slug] });
    }
  }
  return params;
}

function resolve(lang: string, slug: string[]): { locale: Locale; pageId: PageId } {
  if (!isLocale(lang)) notFound();
  const pageId = pageIdForSlug(lang, slug);
  if (!pageId || pageId === "home") notFound();
  return { locale: lang, pageId };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const pageId = pageIdForSlug(lang, slug);
  if (!pageId) return {};
  const m = META[pageId][lang];
  const extra = pageId === "blog" ? { robots: { index: false, follow: false } } : {};
  return { title: m.title, description: m.description, ...extra };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  const { locale, pageId } = resolve(lang, slug);
  switch (pageId) {
    case "trips":
      return <TripsPage locale={locale} />;
    case "coiba":
      return <CoibaPage locale={locale} />;
    case "pixvae":
      return <PixvaePage locale={locale} />;
    case "team":
      return <TeamPage locale={locale} />;
    case "gallery":
      return <GalleryPage locale={locale} />;
    case "faq":
      return <FaqPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "blog":
      return <BlogPage locale={locale} />;
    default:
      notFound();
  }
}
