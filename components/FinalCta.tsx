import Image from "next/image";
import Link from "next/link";
import { pathFor } from "@/content/routes";
import { site, defaultWhatsappMessage } from "@/content/site";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function FinalCta({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/media/cta-underwater.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-(--color-deep-blue)/60" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center section-y">
        <h2 className="font-heading font-bold" style={{ fontSize: "var(--fs-h2)" }}>
          {copy.ctaTitle}
        </h2>
        <div className="gold-rule mx-auto mt-5" />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
      </div>
    </section>
  );
}
