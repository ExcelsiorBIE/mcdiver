import { site, defaultWhatsappMessage, tripWhatsappMessage } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { Trip } from "@/content/trips";

export function ReserveButton({
  locale,
  trip,
  className,
}: {
  locale: Locale;
  trip?: Trip;
  className?: string;
}) {
  const href = trip
    ? site.whatsapp.waLink(
        {
          es: tripWhatsappMessage("es", trip.name.es, trip.dates.es),
          en: tripWhatsappMessage("en", trip.name.en, trip.dates.en),
        },
        locale,
      )
    : site.whatsapp.waLink(defaultWhatsappMessage, locale);
  return (
    <a href={href} className={className ?? "btn-primary"} target="_blank" rel="noopener noreferrer">
      {locale === "es" ? "Consultar por WhatsApp" : "Ask on WhatsApp"}
    </a>
  );
}
