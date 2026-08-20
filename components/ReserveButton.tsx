"use client";

import { t } from "@/content/home";
import { useReserve } from "@/components/ReserveContext";
import type { Locale } from "@/lib/i18n";
import type { TripId } from "@/content/trips";

export function ReserveButton({ locale, tripId, className }: { locale: Locale; tripId?: TripId; className?: string }) {
  const reserve = useReserve();
  return (
    <button type="button" className={className ?? "btn-primary"} onClick={() => reserve(tripId)}>
      {t(locale).reserve}
    </button>
  );
}
