"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/faq";
import type { Locale } from "@/lib/i18n";

export function FaqAccordion({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="divide-y divide-(--color-deep-blue)/10 border-y border-(--color-deep-blue)/10">
      {items.map((item, i) => {
        const panelId = `${base}-p-${i}`;
        const expanded = open === i;
        return (
          <div key={item[locale].q}>
            <h3>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left font-heading font-semibold text-(--color-deep-blue)"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
              >
                {item[locale].q}
                <span aria-hidden className="text-(--color-sand-gold)">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!expanded} className="pb-4 text-(--color-soft-black)/85">
              {item[locale].a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
