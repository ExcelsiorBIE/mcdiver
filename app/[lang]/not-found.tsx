import { headers } from "next/headers";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { pathFor } from "@/content/routes";

const copy = {
  es: {
    title: "Esta página no existe.",
    body: "Puede que el enlace esté roto o que la página haya cambiado de dirección.",
    home: "Ir al inicio",
    trips: "Ver nuestros viajes",
  },
  en: {
    title: "This page doesn't exist.",
    body: "The link may be broken, or the page may have moved.",
    home: "Go to homepage",
    trips: "See our trips",
  },
} as const;

/** docs/12-loading-empty-error.md §3 — bilingüe, con marca y dos salidas. */
export default async function LocaleNotFound() {
  const headerStore = await headers();
  const raw = headerStore.get("x-locale") ?? "es";
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = copy[locale];

  return (
    <section className="section-y mx-auto flex max-w-xl flex-col items-center px-4 text-center">
      <h1 className="font-heading" style={{ fontSize: "var(--fs-h2)" }}>
        {t.title}
      </h1>
      <p className="mt-4" style={{ fontSize: "var(--fs-body)" }}>
        {t.body}
      </p>
      <div className="mt-8 flex gap-4">
        <Link href={pathFor("home", locale)} className="btn-primary">
          {t.home}
        </Link>
        <Link href={pathFor("trips", locale)} className="btn-primary">
          {t.trips}
        </Link>
      </div>
    </section>
  );
}
