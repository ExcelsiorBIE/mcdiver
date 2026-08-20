import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageIdForSlug } from "@/content/routes";
import { SiteChrome } from "@/components/ReserveContext";

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
  const segments = withoutLocale ? withoutLocale.split("/").filter(Boolean) : [];
  const pageId = pageIdForSlug(locale, segments) ?? "home";

  const skipLabel =
    locale === "es" ? "Saltar al contenido principal" : "Skip to main content";

  return (
    <>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <SiteChrome locale={locale} pageId={pageId}>
        {children}
      </SiteChrome>
    </>
  );
}
