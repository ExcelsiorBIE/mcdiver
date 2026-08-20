import Image from "next/image";
import { pixvaeCompare, pixvaeCopy } from "@/content/pixvae-compare";
import type { Locale } from "@/lib/i18n";

export function PixvaeAdvantage({ locale }: { locale: Locale }) {
  const copy = pixvaeCopy[locale];
  const rows = pixvaeCompare.filter((r) => r.homeHighlight);
  return (
    <section className="bg-(--color-light-gray) section-y" aria-labelledby="pixvae-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="pixvae-heading"
          className="text-center font-heading font-bold text-(--color-deep-blue)"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {copy.title}
        </h2>
        <div className="gold-rule mx-auto mt-5" />
        <div className="compare-grid mt-12">
          <div className="bg-white p-6 shadow-sm">
            <p className="eyebrow text-(--color-turquoise)">{copy.pixvaeLabel}</p>
            <ul className="mt-4 space-y-3 font-heading font-semibold text-(--color-deep-blue)">
              {rows.map((row) => (
                <li key={row.id}>{row.pixvae[locale]}</li>
              ))}
            </ul>
          </div>
          <p className="self-center text-center font-heading text-sm tracking-[0.2em] text-(--color-sand-gold)">
            VS
          </p>
          <div className="bg-white/70 p-6">
            <p className="eyebrow text-(--color-soft-black)/50">{copy.catalinaLabel}</p>
            <ul className="mt-4 space-y-3 text-(--color-soft-black)/70">
              {rows.map((row) => (
                <li key={row.id}>{row.catalina[locale]}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 measure text-center text-(--color-soft-black)/85">{copy.body}</p>
        <div className="relative mx-auto mt-10 aspect-16/9 max-w-3xl overflow-hidden">
          <Image
            src="/media/pixvae.webp"
            alt={
              locale === "es"
                ? "Muelle de un pueblo del Pacífico, imagen ilustrativa."
                : "Pacific village dock, illustrative image."
            }
            fill
            className="object-cover"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
