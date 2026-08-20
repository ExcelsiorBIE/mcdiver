import Link from "next/link";
import { pathFor } from "@/content/routes";
import { site, defaultWhatsappMessage } from "@/content/site";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function CtaBand({ locale, title }: { locale: Locale; title: string }) {
  const copy = t(locale);
  return (
    <section className="bg-(--color-deep-blue) text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="font-heading font-bold" style={{ fontSize: "var(--fs-h2)" }}>
          {title}
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
