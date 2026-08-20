"use client";

import { site, defaultWhatsappMessage } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { PageId } from "@/content/routes";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export function SiteChrome({
  locale,
  pageId,
  children,
}: {
  locale: Locale;
  pageId: PageId;
  children: React.ReactNode;
}) {
  const reserveHref = site.whatsapp.waLink(defaultWhatsappMessage, locale);
  return (
    <div className="flex min-h-screen flex-col" lang={locale}>
      <SiteHeader locale={locale} pageId={pageId} reserveHref={reserveHref} />
      {children}
      <SiteFooter locale={locale} pageId={pageId} />
      <WhatsAppFab locale={locale} />
    </div>
  );
}
