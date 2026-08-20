import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function TrustBar({ locale }: { locale: Locale }) {
  const items = t(locale).trust;
  return (
    <section
      className="bg-(--color-deep-blue) text-white section-y-tight"
      aria-label={locale === "es" ? "Confianza" : "Trust"}
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.value} className="text-center">
            <p className="font-heading text-2xl font-bold text-(--color-turquoise)">{item.value}</p>
            <p className="mt-1 text-sm text-white/80">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
