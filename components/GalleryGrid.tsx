"use client";

import { useState } from "react";
import Image from "next/image";
import {
  galleryAll,
  galleryFilters,
  type GalleryCategory,
  type GalleryImage,
} from "@/content/gallery";
import type { Locale } from "@/lib/i18n";

export function GalleryGrid({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<GalleryImage | null>(null);
  const items = filter === "all" ? galleryAll : galleryAll.filter((g) => g.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {galleryFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`min-h-11 px-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] ${
              filter === f.id
                ? "bg-(--color-deep-blue) text-white"
                : "bg-(--color-light-gray) text-(--color-deep-blue)"
            }`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f[locale]}
          </button>
        ))}
      </div>
      <div className="gallery-mosaic mt-8">
        {items.map((img) => (
          <button
            key={img.src + img.category}
            type="button"
            className="relative aspect-4/3 overflow-hidden"
            onClick={() => setOpen(img)}
          >
            <Image src={img.src} alt={img.alt[locale]} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
          </button>
        ))}
      </div>
      {open ? (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 flex h-full w-full items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
          onCancel={() => setOpen(null)}
        >
          <form method="dialog" className="relative max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.alt[locale]} className="max-h-[85vh] w-auto max-w-full" />
            <p className="mt-2 text-center text-sm text-white/80">{open.alt[locale]}</p>
            <button type="submit" className="btn-ghost mt-4">
              {locale === "es" ? "Cerrar" : "Close"}
            </button>
          </form>
        </dialog>
      ) : null}
    </div>
  );
}
