import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { PageId } from "@/content/routes";
import { alternatePath } from "@/content/routes";

/**
 * Lleva a la MISMA página en el otro idioma — nunca al home (D6/docs/02 §2).
 */
export function LanguageToggle({
  locale,
  pageId,
}: {
  locale: Locale;
  pageId: PageId;
}) {
  const other: Locale = locale === "es" ? "en" : "es";
  return (
    <nav aria-label={locale === "es" ? "Cambiar idioma" : "Switch language"} className="flex gap-2 text-sm font-semibold">
      <Link
        href={alternatePath(pageId, "es")}
        aria-current={locale === "es" ? "page" : undefined}
        className="min-h-11 min-w-11 flex items-center justify-center aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
      >
        ES
      </Link>
      <span aria-hidden="true">|</span>
      <Link
        href={alternatePath(pageId, "en")}
        aria-current={locale === "en" ? "page" : undefined}
        className="min-h-11 min-w-11 flex items-center justify-center aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
      >
        EN
      </Link>
      <span className="sr-only">
        {other === "en" ? "Switch to English" : "Cambiar a español"}
      </span>
    </nav>
  );
}
