import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { pathFor } from "@/content/routes";
import { META } from "@/content/meta";
import { trips } from "@/content/trips";
import { faqPreview } from "@/content/faq";
import { t } from "@/content/home";
import { notFound } from "next/navigation";
import { HeroHome } from "@/components/HeroHome";
import { TrustBar } from "@/components/TrustBar";
import { TripCard } from "@/components/TripCard";
import { WhyCoiba } from "@/components/WhyCoiba";
import { PixvaeAdvantage } from "@/components/PixvaeAdvantage";
import { TeamGrid } from "@/components/TeamGrid";
import { GalleryPreview } from "@/components/GalleryPreview";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { BookingFlow } from "@/components/BookingFlow";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const copy = t(locale);

  return (
    <main id="main-content" tabIndex={-1}>
      <HeroHome locale={locale} />
      <TrustBar locale={locale} />

      <section
        id="proximas-salidas"
        className="section-y bg-white"
        aria-labelledby="departures-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="departures-heading"
            className="text-center font-heading font-bold text-(--color-deep-blue)"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            {copy.departuresTitle}
          </h2>
          <p className="mt-3 text-center text-(--color-soft-black)/75">{copy.departuresSub}</p>
          <div className="gold-rule mx-auto mt-5" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <BookingFlow locale={locale} />
      <WhyCoiba locale={locale} />
      <PixvaeAdvantage locale={locale} />
      <TeamGrid locale={locale} />
      <GalleryPreview locale={locale} />

      <section className="section-y bg-white" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4">
          <h2
            id="faq-heading"
            className="text-center font-heading font-bold text-(--color-deep-blue)"
            style={{ fontSize: "var(--fs-h2)" }}
          >
            {copy.faqTitle}
          </h2>
          <div className="gold-rule mx-auto mt-5 mb-8" />
          <FaqAccordion items={[...faqPreview]} locale={locale} />
          <p className="mt-8 text-center">
            <Link href={pathFor("faq", locale)} className="font-heading font-semibold text-(--color-deep-blue) underline-offset-4 hover:underline">
              {copy.faqAll}
            </Link>
          </p>
        </div>
      </section>

      <FinalCta locale={locale} />
    </main>
  );
}
