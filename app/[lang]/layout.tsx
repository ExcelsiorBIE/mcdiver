import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageIdForSlug } from "@/content/routes";
import { site } from "@/content/site";
import { LanguageToggle } from "@/components/LanguageToggle";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? (locale === "en" ? "/en" : "/");
  const withoutLocale =
    locale === "en" ? pathname.replace(/^\/en\/?/, "") : pathname.replace(/^\//, "");
  const segments = withoutLocale ? withoutLocale.split("/") : [];
  const pageId = pageIdForSlug(locale, segments) ?? "home";

  const skipLabel =
    locale === "es" ? "Saltar al contenido principal" : "Skip to main content";

  return (
    <div className="flex min-h-screen flex-col" lang={locale}>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <header className="sticky top-0 z-40 bg-(--color-deep-blue) text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="font-heading text-lg font-extrabold tracking-wide">
            {site.brand}
          </span>
          <LanguageToggle locale={locale} pageId={pageId} />
        </div>
      </header>
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <footer className="bg-(--color-footer) text-white section-y-tight">
        <div className="mx-auto max-w-6xl px-4 text-sm">
          <p>
            {site.brand} — {site.location[locale]}
          </p>
          <p className="mt-2 text-white/70">
            © 2026 {site.brand}. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
