import Image from "next/image";
import Link from "next/link";
import { galleryPreview } from "@/content/gallery";
import { pathFor } from "@/content/routes";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function GalleryPreview({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section className="section-y" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="gallery-heading"
          className="text-center font-heading font-bold text-(--color-deep-blue)"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {copy.galleryTitle}
        </h2>
        <p className="mt-3 text-center text-sm text-(--color-soft-black)/70">{copy.galleryNote}</p>
        <div className="gallery-mosaic mt-10">
          {galleryPreview.map((img) => (
            <Link key={img.src} href={pathFor("gallery", locale)} aria-label={img.alt[locale]}>
              <Image src={img.src} alt={img.alt[locale]} fill sizes="(min-width: 768px) 33vw, 50vw" />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href={pathFor("gallery", locale)} className="btn-primary">
            {copy.galleryCta}
          </Link>
        </p>
      </div>
    </section>
  );
}
