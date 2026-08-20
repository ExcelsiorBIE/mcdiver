"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Trip } from "@/content/trips";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { useReserve } from "@/components/ReserveContext";

export function TripCard({
  trip,
  locale,
}: {
  trip: Trip;
  locale: Locale;
}) {
  const onReserve = useReserve();
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const price = trip.priceUsd.toLocaleString(locale === "es" ? "es-PA" : "en-US");

  return (
    <article className="trip-card">
      <div className="trip-card__photo">
        <Image
          src={trip.photo}
          alt={`${trip.name[locale]} — ${copy.mediaCredit}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className={trip.badgeColor === "gold" ? "badge badge-gold" : "badge badge-turquoise"}>
          {trip.days} {locale === "es" ? "días" : "days"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-(--color-deep-blue)" style={{ fontSize: "var(--fs-h3)" }}>
          {trip.name[locale]}
        </h3>
        <p className="mt-1 font-heading font-semibold text-(--color-deep-blue)">{trip.dates[locale]}</p>
        <ul className="mt-4 space-y-1 text-sm text-(--color-soft-black)/80">
          <li>
            {trip.dives} {copy.divesIncluded}
          </li>
          <li>{copy.fromPixvae}</li>
          <li>{copy.maxGroup}</li>
          <li>{copy.padi}</li>
          {trip.includesInsurance ? <li>{copy.insurance}</li> : null}
        </ul>
        <p className="mt-auto pt-6">
          <span className="block text-sm text-(--color-soft-black)/70">{copy.from}</span>
          <span className="font-heading font-extrabold text-(--color-deep-blue)" style={{ fontSize: "var(--fs-price)" }}>
            ${price} {copy.perPerson}
          </span>
        </p>
        <button type="button" className="btn-primary mt-6 w-full" onClick={() => onReserve(trip.id)}>
          {copy.reserve}
        </button>
        <button
          type="button"
          className="mt-3 min-h-11 text-sm font-semibold text-(--color-deep-blue) underline-offset-4 hover:underline"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? copy.hideItinerary : copy.itinerary}
        </button>
        <div id={panelId} hidden={!open} className="mt-4 border-t border-(--color-deep-blue)/10 pt-4 text-sm">
          <ol className="space-y-2">
            {trip.itinerary.map((day) => (
              <li key={day.day}>
                <strong>
                  {copy.day} {day.day}.
                </strong>{" "}
                {day[locale]}
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-heading font-semibold">{copy.includes}</p>
              <ul className="mt-1 list-disc pl-4">
                {trip.includes[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-heading font-semibold">{copy.excludes}</p>
              <ul className="mt-1 list-disc pl-4">
                {trip.excludes[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
