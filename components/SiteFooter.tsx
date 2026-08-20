import Link from "next/link";
import { site } from "@/content/site";
import { NAV, pathFor, type PageId } from "@/content/routes";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale, pageId }: { locale: Locale; pageId: PageId }) {
  const legal =
    locale === "es"
      ? { privacy: "Política de privacidad", terms: "Términos" }
      : { privacy: "Privacy policy", terms: "Terms" };

  return (
    <footer className="bg-(--color-footer) text-white section-y-tight">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-extrabold tracking-[0.18em]">{site.brand}</p>
          <p className="mt-3 text-sm text-white/75 measure">
            {locale === "es"
              ? "Buceo exclusivo en Coiba, saliendo desde Pixvae."
              : "Exclusive Coiba diving, departing from Pixvae."}
          </p>
        </div>
        <nav aria-label={locale === "es" ? "Pie de página" : "Footer"}>
          <p className="eyebrow">{locale === "es" ? "Explorar" : "Explore"}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.id}>
                <Link href={pathFor(item.id, locale)} className="hover:text-(--color-sand-gold)">
                  {item[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">{locale === "es" ? "Contacto" : "Contact"}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={site.whatsapp.waLink({ es: "Hola Jhon", en: "Hi Jhon" }, locale)}>
                WhatsApp {site.whatsapp.e164}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.location[locale]}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">{locale === "es" ? "Legal" : "Legal"}</p>
          <p className="mt-3 text-sm text-white/70">
            {legal.privacy} · {legal.terms}
          </p>
          <p className="mt-4 text-sm text-white/60">© 2026 {site.brand}.</p>
          <div className="mt-4">
            <LanguageToggle locale={locale} pageId={pageId} />
          </div>
        </div>
      </div>
    </footer>
  );
}
