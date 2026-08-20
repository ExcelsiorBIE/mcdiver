"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { PageId } from "@/content/routes";
import type { TripId } from "@/content/trips";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { InquiryDialog } from "@/components/InquiryDialog";

const ReserveCtx = createContext<(id?: TripId) => void>(() => {});

export function useReserve() {
  return useContext(ReserveCtx);
}

export function SiteChrome({
  locale,
  pageId,
  children,
}: {
  locale: Locale;
  pageId: PageId;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState<TripId | undefined>();
  const reserve = useCallback((id?: TripId) => {
    setTrip(id);
    setOpen(true);
  }, []);

  return (
    <ReserveCtx.Provider value={reserve}>
      <div className="flex min-h-screen flex-col" lang={locale}>
        <SiteHeader locale={locale} pageId={pageId} onReserve={() => reserve()} />
        {children}
        <SiteFooter locale={locale} pageId={pageId} />
        <WhatsAppFab locale={locale} />
        <InquiryDialog
          key={`${String(open)}-${trip ?? "none"}`}
          locale={locale}
          open={open}
          defaultTrip={trip}
          onClose={() => setOpen(false)}
        />
      </div>
    </ReserveCtx.Provider>
  );
}
