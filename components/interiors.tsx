import Image from "next/image";
import { team } from "@/content/team";
import { trips } from "@/content/trips";
import { faqs } from "@/content/faq";
import { diveSites } from "@/content/dive-sites";
import { pixvaeCompare, pixvaeCopy } from "@/content/pixvae-compare";
import { site, defaultWhatsappMessage } from "@/content/site";
import { t } from "@/content/home";
import { PageHero } from "@/components/PageHero";
import { TripCard } from "@/components/TripCard";
import { TeamGrid } from "@/components/TeamGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBand } from "@/components/CtaBand";
import { ReserveButton } from "@/components/ReserveButton";
import { InquiryForm } from "@/components/InquiryForm";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    tripsTitle: "Nuestros Viajes a Isla Coiba",
    tripsIntro:
      "Cada viaje a Coiba es una experiencia distinta. Grupos de máximo 12 personas, instructores PADI con décadas de experiencia, y la ventaja de salir desde Pixvae: a solo 20–30 minutos de los sitios de buceo.",
    doubts: "¿Tienes dudas? Escríbenos",
    coibaTitle: "Isla Coiba – Patrimonio de la Humanidad",
    coibaParkTitle: "El parque",
    coibaPark:
      "Coiba fue colonia penal hasta 2004. Esa historia aisló el archipiélago y, sin quererlo, protegió uno de los últimos reductos vírgenes del Pacífico panameño. Hoy es Parque Nacional y Patrimonio de la Humanidad UNESCO.",
    coibaBioTitle: "Biodiversidad",
    coibaBio:
      "Más de 760 especies de peces. Según la temporada, las aguas del parque son hábitat de tiburones de arrecife, mantarrayas, tortugas, delfines y, de junio a noviembre, tiburones ballena y ballenas jorobadas en la región. Lo que encuentres en una inmersión depende del día — no hay avistamiento prometido.",
    sitesTitle: "Sitios de buceo",
    seasonTitle: "Mejor época",
    seasonClear: "Dic–may · agua más clara",
    seasonWhales: "Jun–nov · temporada de tiburón ballena en la región",
    pixvaeTitle: "Por qué salimos desde Pixvae",
    communityTitle: "Comunidad",
    community:
      "Pixvae y Bahía Honda son pueblos pequeños del Pacífico. Operar desde aquí acorta el trayecto al parque y deja el gasto en la costa que realmente está a 20 minutos de los sitios.",
    teamTitle: "Tu equipo en Coiba",
    storyTitle: "La historia detrás de MCDiver",
    faqTitle: "Preguntas frecuentes",
    faqSub: "Todo lo que necesitas saber antes de bucear en Coiba",
    contactTitle: "Hablemos de tu próximo viaje",
    contactSub: "WhatsApp o correo. El formulario de reserva también abre desde el botón Reservar.",
    blogTitle: "Blog",
    blogEmpty: "Todavía no hay artículos publicados. El sitio no indexa esta sección hasta que existan.",
    seeInPerson: "¿Quieres ver esto en persona?",
    hours: "Horario",
  },
  en: {
    tripsTitle: "Our trips to Coiba Island",
    tripsIntro:
      "Each Coiba trip is its own experience. Groups of 12 maximum, PADI instructors with decades in the water, and the Pixvae advantage: 20–30 minutes from the dive sites.",
    doubts: "Questions? Write us",
    coibaTitle: "Coiba Island — World Heritage",
    coibaParkTitle: "The park",
    coibaPark:
      "Coiba was a penal colony until 2004. That isolation protected one of the last wild refuges in Panama's Pacific. Today it is a National Park and a UNESCO World Heritage Site.",
    coibaBioTitle: "Biodiversity",
    coibaBio:
      "More than 760 fish species. Depending on the season, the park is habitat for reef sharks, manta rays, turtles, dolphins, and from June to November whale sharks and humpback whales in the region. What you meet on a dive depends on the day — we don't promise a sighting.",
    sitesTitle: "Dive sites",
    seasonTitle: "Best time",
    seasonClear: "Dec–May · clearer water",
    seasonWhales: "Jun–Nov · whale shark season in the region",
    pixvaeTitle: "Why we leave from Pixvae",
    communityTitle: "Community",
    community:
      "Pixvae and Bahía Honda are small Pacific villages. Operating from here shortens the run to the park and keeps spending on the coast that is actually 20 minutes from the sites.",
    teamTitle: "Your team on Coiba",
    storyTitle: "The story behind MCDiver",
    faqTitle: "Frequently asked questions",
    faqSub: "Everything you need to know before diving Coiba",
    contactTitle: "Let's talk about your next trip",
    contactSub: "WhatsApp or email. The booking dialog also opens from Reserve.",
    blogTitle: "Blog",
    blogEmpty: "No articles published yet. This section stays out of the index until they exist.",
    seeInPerson: "Want to see this in person?",
    hours: "Hours",
  },
} as const;

export function TripsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        locale={locale}
        variant="standard"
        title={c.tripsTitle}
        image="/media/trip-complete.webp"
      />
      <section className="section-y mx-auto max-w-6xl px-4">
        <p className="mx-auto max-w-3xl text-center text-(--color-soft-black)/85">{c.tripsIntro}</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} locale={locale} />
          ))}
        </div>
        <p className="mt-12 text-center">
          <a
            className="font-heading font-semibold text-(--color-deep-blue) underline-offset-4 hover:underline"
            href={site.whatsapp.waLink(defaultWhatsappMessage, locale)}
          >
            {c.doubts}
          </a>
        </p>
        <div className="mx-auto mt-16 max-w-xl">
          <InquiryForm locale={locale} />
        </div>
      </section>
    </main>
  );
}

export function CoibaPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const months =
    locale === "es"
      ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Dec–May clearer = months 12,1,2,3,4,5 → indexes 11,0,1,2,3,4
  const clear = new Set([11, 0, 1, 2, 3, 4]);
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="standard" title={c.coibaTitle} image="/media/coiba.webp" />
      <section className="section-y mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
            {c.coibaParkTitle}
          </h2>
          <div className="gold-rule mt-4" />
          <p className="mt-6">{c.coibaPark}</p>
        </div>
        <div>
          <h2 className="font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
            {c.coibaBioTitle}
          </h2>
          <div className="gold-rule mt-4" />
          <p className="mt-6">{c.coibaBio}</p>
        </div>
      </section>
      <section className="bg-(--color-light-gray) section-y">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
            {c.sitesTitle}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {diveSites.map((siteRow) => (
              <article key={siteRow.id} className="overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-16/9">
                  <Image src={siteRow.photo.src} alt={siteRow.photo.alt[locale]} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-(--color-deep-blue)">{siteRow.name}</h3>
                  <p className="mt-2 text-sm">{siteRow.description[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
          {c.seasonTitle}
        </h2>
        <div className="mt-8 grid grid-cols-12 gap-1">
          {months.map((m, i) => (
            <div
              key={`${m}-${i}`}
              className={`py-3 text-xs font-heading font-bold ${
                clear.has(i) ? "bg-(--color-turquoise) text-(--color-on-turquoise)" : "bg-(--color-deep-blue) text-white"
              }`}
            >
              {m}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">{c.seasonClear}</p>
        <p className="text-sm">{c.seasonWhales}</p>
      </section>
      <CtaBand locale={locale} title={t(locale).ctaTitle} />
    </main>
  );
}

export function PixvaePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const pc = pixvaeCopy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="standard" title={c.pixvaeTitle} image="/media/pixvae.webp" />
      <section className="section-y mx-auto max-w-6xl px-4">
        <h2 className="text-center font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
          {pc.title}
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="bg-(--color-deep-blue) text-white">
                <th className="p-3 font-heading"> </th>
                <th className="p-3 font-heading">{pc.pixvaeLabel}</th>
                <th className="p-3 font-heading">{pc.catalinaLabel}</th>
              </tr>
            </thead>
            <tbody>
              {pixvaeCompare.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-(--color-light-gray)">
                  <th className="p-3 font-heading text-(--color-deep-blue)">{row.label[locale]}</th>
                  <td className="p-3 font-semibold">{row.pixvae[locale]}</td>
                  <td className="p-3 text-(--color-soft-black)/70">{row.catalina[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center">{pc.body}</p>
        <div className="relative mx-auto mt-10 aspect-16/9 max-w-4xl overflow-hidden">
          <Image
            src="/media/pixvae.webp"
            alt={locale === "es" ? "Muelle de Pixvae, imagen ilustrativa." : "Pixvae dock, illustrative image."}
            fill
            className="object-cover"
            sizes="80vw"
          />
        </div>
        <h2 className="mt-16 font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
          {c.communityTitle}
        </h2>
        <p className="mt-4 max-w-3xl">{c.community}</p>
      </section>
      <CtaBand locale={locale} title={t(locale).ctaTitle} />
    </main>
  );
}

export function TeamPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="standard" title={c.teamTitle} image="/media/gallery-04.webp" />
      <TeamGrid locale={locale} />
      <section className="section-y mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h2)" }}>
          {c.storyTitle}
        </h2>
        <div className="gold-rule mt-4" />
        <blockquote className="mt-6 text-lg italic text-(--color-soft-black)/90">
          “{team.find((m) => m.id === "jhon")?.quote?.[locale]}”
        </blockquote>
        <p className="mt-3 text-sm text-(--color-soft-black)/60">— Jhon Torres</p>
      </section>
      <CtaBand locale={locale} title={t(locale).ctaTitle} />
    </main>
  );
}

export function GalleryPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="pt-4">
        <GalleryGrid locale={locale} />
      </div>
      <p className="px-4 py-6 text-center text-sm text-(--color-soft-black)/60">
        {t(locale).galleryNote}
      </p>
      <CtaBand locale={locale} title={c.seeInPerson} />
    </main>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="compact" title={c.faqTitle} subtitle={c.faqSub} />
      <section className="section-y mx-auto max-w-3xl px-4">
        <FaqAccordion items={faqs} locale={locale} />
      </section>
    </main>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="compact" title={c.contactTitle} subtitle={c.contactSub} />
      <section className="section-y mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div className="space-y-4">
          <p>
            WhatsApp:{" "}
            <a className="underline" href={site.whatsapp.waLink(defaultWhatsappMessage, locale)}>
              {site.whatsapp.e164}
            </a>
          </p>
          <p>
            Email: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>{site.location[locale]}</p>
          <p>
            {c.hours}: {site.hours[locale]}
          </p>
          <ReserveButton locale={locale} />
        </div>
        <div className="bg-(--color-light-gray) p-8">
          <InquiryForm locale={locale} />
        </div>
      </section>
    </main>
  );
}

export function BlogPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero locale={locale} variant="compact" title={c.blogTitle} />
      <section className="section-y mx-auto max-w-3xl px-4">
        <p>{c.blogEmpty}</p>
      </section>
    </main>
  );
}
