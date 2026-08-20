import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { pathFor } from "@/content/routes";
import { META } from "@/content/meta";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = META.home[lang];
  return { title: m.title, description: m.description };
}

const copy = {
  es: {
    tagline: "El Pacífico más prístino del mundo.",
    subtitle: "A 20 minutos de Pixvae.",
    description:
      "Viajes de buceo exclusivos al Parque Nacional Coiba, Panamá. Grupos pequeños. Instructores PADI con más de 25 años de experiencia.",
    cta: "Ver fechas disponibles",
  },
  en: {
    tagline: "The world's most pristine Pacific.",
    subtitle: "20 minutes from Pixvae.",
    description:
      "Exclusive dive expeditions to Coiba National Park, Panama. Small groups. PADI instructors with over 25 years of experience.",
    cta: "See available dates",
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = copy[locale];

  return (
    <section
      className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center bg-(--color-soft-black) px-4 text-center text-white section-y"
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        className="font-heading font-extrabold"
        style={{ fontSize: "var(--fs-display)" }}
      >
        {t.tagline}
      </h1>
      <p
        className="mt-4 font-heading font-semibold text-(--color-turquoise)"
        style={{ fontSize: "var(--fs-lead)" }}
      >
        {t.subtitle}
      </p>
      <p className="mt-6 measure text-white/90" style={{ fontSize: "var(--fs-body)" }}>
        {t.description}
      </p>
      <Link href={pathFor("trips", locale)} className="btn-primary mt-8">
        {t.cta}
      </Link>
    </section>
  );
}
