import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { allPageIds, pageIdForSlug, slugFor, type PageId } from "@/content/routes";
import { META } from "@/content/meta";
import { posts, postBySlug } from "@/content/posts";
import {
  BlogPage,
  CoibaPage,
  ContactPage,
  FaqPage,
  GalleryPage,
  LegalPage,
  PixvaePage,
  PostPage,
  TeamPage,
  TripsPage,
} from "@/components/interiors";

export function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  for (const locale of locales) {
    for (const id of allPageIds()) {
      if (id === "home") continue;
      const s = slugFor(id, locale);
      if (s) params.push({ lang: locale, slug: [s] });
    }
    for (const post of posts) {
      params.push({ lang: locale, slug: [slugFor("blog", locale), post.slug[locale]] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  if (slug.length === 2 && slug[0] === slugFor("blog", lang)) {
    const post = postBySlug(lang, slug[1]);
    if (!post) return {};
    return { title: post.title[lang], description: post.excerpt[lang] };
  }
  const pageId = pageIdForSlug(lang, slug);
  if (!pageId) return {};
  const m = META[pageId][lang];
  return { title: m.title, description: m.description };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  if (slug.length === 2 && slug[0] === slugFor("blog", locale)) {
    const post = postBySlug(locale, slug[1]);
    if (!post) notFound();
    return <PostPage locale={locale} post={post} />;
  }

  const pageId = pageIdForSlug(locale, slug);
  if (!pageId || pageId === "home") notFound();
  switch (pageId as PageId) {
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
    case "terms":
      return <LegalPage locale={locale} kind="terms" />;
    case "privacy":
      return <LegalPage locale={locale} kind="privacy" />;
    default:
      notFound();
  }
}
