"use client";

import { useEffect, useId, useRef } from "react";
import { site, defaultWhatsappMessage } from "@/content/site";
import { trips, type TripId } from "@/content/trips";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function InquiryDialog({
  locale,
  open,
  onClose,
  defaultTrip,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  defaultTrip?: TripId;
}) {
  const copy = t(locale);
  const titleId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const triggerReturn = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      triggerReturn.current = (document.activeElement as HTMLElement) ?? null;
      if (!el.open) el.showModal();
      document.body.style.overflow = "hidden";
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  function handleClose() {
    document.body.style.overflow = "";
    onClose();
    triggerReturn.current?.focus();
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const tripId = String(fd.get("trip") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const trip = trips.find((x) => x.id === tripId);
    const tripName = trip ? trip.name[locale] : tripId;
    const body = [
      defaultWhatsappMessage[locale],
      name && `${locale === "es" ? "Nombre" : "Name"}: ${name}`,
      email && `Email: ${email}`,
      tripName && `${locale === "es" ? "Plan" : "Plan"}: ${tripName}`,
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(site.whatsapp.waLink({ es: body, en: body }, locale), "_blank", "noopener,noreferrer");
  }

  return (
    <dialog
      ref={ref}
      className="w-[min(32rem,calc(100vw-2rem))] border-0 bg-white p-0 text-(--color-soft-black) shadow-2xl"
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current) handleClose();
      }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-6">
        <h2 id={titleId} className="font-heading text-xl font-bold text-(--color-deep-blue)">
          {copy.reserveTitle}
        </h2>
        <p className="text-sm text-(--color-soft-black)/80">{copy.reserveLead}</p>
        <label className="flex flex-col gap-1 text-sm">
          {copy.name}
          <input
            name="name"
            required
            autoComplete="name"
            className="min-h-11 border border-(--color-deep-blue)/20 px-3"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          {copy.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="min-h-11 border border-(--color-deep-blue)/20 px-3"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          {copy.trip}
          <select
            name="trip"
            defaultValue={defaultTrip ?? trips[0]?.id}
            className="min-h-11 border border-(--color-deep-blue)/20 px-3"
          >
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.name[locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          {copy.message}
          <textarea name="message" rows={3} className="border border-(--color-deep-blue)/20 px-3 py-2" />
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary">
            {copy.sendWa}
          </button>
          <button type="button" className="min-h-11 px-4 underline" onClick={handleClose}>
            {copy.close}
          </button>
        </div>
      </form>
    </dialog>
  );
}
