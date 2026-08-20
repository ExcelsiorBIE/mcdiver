import { site, defaultWhatsappMessage } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function WhatsAppFab({ locale }: { locale: Locale }) {
  const href = site.whatsapp.waLink(defaultWhatsappMessage, locale);
  const label =
    locale === "es" ? "Escribir a Jhon por WhatsApp" : "Message Jhon on WhatsApp";
  return (
    <a
      href={href}
      className="wa-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="currentColor">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.8-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6.3-.4c.1-.2 0-.3 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-1 1-1 2.4 1 2.8 1.1 3 .2.4 2 3.1 3.2 2.3 3.7 2.6.8.2 1.2.1 1.5-.6 1.7-1.2.2-1.1.2-1.2c0-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  );
}
