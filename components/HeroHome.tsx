import Image from "next/image";
import Link from "next/link";
import { pathFor } from "@/content/routes";
import { site, defaultWhatsappMessage } from "@/content/site";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function HeroHome({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section id="home-hero" className="hero-home" aria-labelledby="hero-heading">
      <div className="hero-home__media">
        <Image
          src="/media/hero-poster.webp"
          alt={
            locale === "es"
              ? "Banco de peces en agua clara del Pacífico, imagen ilustrativa."
              : "School of fish in clear Pacific water, illustrative image."
          }
          fill
          priority
          sizes="100vw"
          fetchPriority="high"
        />
      </div>
      <div className="hero-home__overlay" />
      <div className="hero-home__content">
        <p className="eyebrow">{site.brand}</p>
        <div className="gold-rule mx-auto mt-4" />
        <h1
          id="hero-heading"
          className="mt-6 font-heading font-extrabold leading-[1.05]"
          style={{ fontSize: "var(--fs-display)" }}
        >
          {copy.tagline}
        </h1>
        <p
          className="mt-4 font-heading font-semibold text-(--color-turquoise)"
          style={{ fontSize: "var(--fs-lead)" }}
        >
          {copy.subtitle}
        </p>
        <p className="mx-auto mt-6 measure text-white/90" style={{ fontSize: "var(--fs-body)" }}>
          {copy.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={pathFor("trips", locale)} className="btn-primary">
            {copy.ctaDates}
          </Link>
          <a
            href={site.whatsapp.waLink(defaultWhatsappMessage, locale)}
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.ctaWhatsapp}
          </a>
        </div>
        <a
          href="#proximas-salidas"
          className="mt-16 inline-flex flex-col items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/80"
        >
          {copy.scroll}
          <span aria-hidden className="block h-8 w-px bg-white/70" />
        </a>
      </div>
    </section>
  );
}
