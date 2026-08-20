import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { allPageIds, pageIdForSlug, slugFor, type PageId } from "@/content/routes";
import { META } from "@/content/meta";

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
  return { title: m.title, description: m.description };
}

const placeholder = {
  es: (title: string) => ({
    heading: title,
    body: "Esta página está en construcción. El contenido llega en la siguiente fase de implementación.",
  }),
  en: (title: string) => ({
    heading: title,
    body: "This page is under construction. Content is coming in the next implementation phase.",
  }),
};

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  const { locale, pageId } = resolve(lang, slug);
  const title = META[pageId][locale].title.split(" | ")[0] ?? META[pageId][locale].title;
  const p = placeholder[locale](title);

  return (
    <section className="section-y mx-auto max-w-3xl px-4">
      <h1 className="font-heading" style={{ fontSize: "var(--fs-h2)" }}>
        {p.heading}
      </h1>
      <p className="mt-4 measure" style={{ fontSize: "var(--fs-body)" }}>
        {p.body}
      </p>
    </section>
  );
}
