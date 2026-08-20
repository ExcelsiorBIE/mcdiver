"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Trip } from "@/content/trips";
import { t } from "@/content/home";
import { site, tripWhatsappMessage } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function TripCard({ trip, locale }: { trip: Trip; locale: Locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const price = trip.priceUsd.toLocaleString(locale === "es" ? "es-PA" : "en-US");
  const wa = site.whatsapp.waLink(
    {
      es: tripWhatsappMessage("es", trip.name.es, trip.dates.es),
      en: tripWhatsappMessage("en", trip.name.en, trip.dates.en),
    },
    locale,
  );
  const seats =
    trip.seats === "soldout"
      ? locale === "es"
        ? "Sold out"
        : "Sold out"
      : locale === "es"
        ? "Hay lugares · máx. 12 · confirma por WhatsApp"
        : "Spots open · max 12 · confirm on WhatsApp";

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
        <p className="mt-2 font-heading text-lg font-semibold text-(--color-deep-blue)">{trip.dates[locale]}</p>
        <p className={`mt-2 text-sm font-semibold ${trip.seats === "soldout" ? "text-(--color-error)" : "text-(--color-success)"}`}>
          {seats}
        </p>
        <ul className="mt-4 space-y-1 text-sm text-(--color-soft-black)/80">
          <li>
            {trip.dives} {copy.divesIncluded}
          </li>
          <li>{copy.fromPixvae}</li>
          {trip.includesInsurance ? <li>{copy.insurance}</li> : null}
        </ul>
        <p className="pt-6">
          <span className="block text-sm text-(--color-soft-black)/70">{copy.from}</span>
          <span className="font-heading font-extrabold text-(--color-deep-blue)" style={{ fontSize: "var(--fs-price)" }}>
            ${price} {copy.perPerson}
          </span>
        </p>

        <h4 className="mt-8 text-center font-heading text-lg font-bold">{copy.includes}</h4>
        <ul className="mt-3">
          {trip.includes[locale].map((item) => (
            <li key={item} className="include-row">
              <span aria-hidden className="text-(--color-turquoise)">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <h4 className="mt-6 text-center font-heading text-lg font-bold">{copy.excludes}</h4>
        <ul className="mt-3">
          {trip.excludes[locale].map((item) => (
            <li key={item} className="exclude-row">
              <span aria-hidden className="text-(--color-soft-black)/40">–</span>
              {item}
            </li>
          ))}
        </ul>

        {trip.seats === "soldout" ? (
          <p className="btn-primary mt-6 w-full cursor-not-allowed opacity-60">{seats}</p>
        ) : (
          <a href={wa} className="btn-primary mt-6 w-full" target="_blank" rel="noopener noreferrer">
            {copy.reserve}
          </a>
        )}
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
        </div>
      </div>
    </article>
  );
}
