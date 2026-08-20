import Image from "next/image";
import { homeStats } from "@/content/stats";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function WhyCoiba({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/media/coiba.webp"
          alt={
            locale === "es"
              ? "Isla selvática encontrando el Pacífico, imagen ilustrativa."
              : "Jungle island meeting the Pacific, illustrative image."
          }
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-(--color-deep-blue)/70" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 section-y lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">{copy.whyKicker}</p>
          <div className="gold-rule mt-4" />
          <h2 className="mt-5 font-heading font-bold" style={{ fontSize: "var(--fs-h2)" }}>
            {copy.whyTitle}
          </h2>
          <p className="mt-6 measure text-white/90">{copy.whyBody}</p>
          <ul className="mt-10 grid grid-cols-3 gap-4">
            {homeStats.map((stat) => (
              <li key={stat.value}>
                <p className="font-heading text-2xl font-bold text-(--color-turquoise)">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/80">{stat[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden">
          <Image
            src="/media/cta-underwater.webp"
            alt={
              locale === "es"
                ? "Arrecife iluminado bajo el agua, imagen ilustrativa."
                : "Sunlit reef underwater, illustrative image."
            }
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
