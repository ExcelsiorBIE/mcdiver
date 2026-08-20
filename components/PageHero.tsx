import Image from "next/image";
import type { Locale } from "@/lib/i18n";

type Variant = "standard" | "compact" | "plain";

export function PageHero({
  locale,
  variant,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  locale: Locale;
  variant: Variant;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}) {
  if (variant === "plain") return null;

  if (variant === "compact") {
    return (
      <header className="bg-(--color-deep-blue) text-white">
        <div className="mx-auto flex min-h-[40vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24">
          <p className="eyebrow">MCDiver</p>
          <div className="gold-rule mt-4" />
          <h1 className="mt-5 font-heading font-extrabold" style={{ fontSize: "var(--fs-display)" }}>
            {title}
          </h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-white/85">{subtitle}</p> : null}
        </div>
      </header>
    );
  }

  return (
    <header className="relative flex min-h-[60vh] min-h-[60svh] items-end overflow-hidden text-white">
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? (locale === "es" ? "Imagen ilustrativa" : "Illustrative image")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-(--color-deep-blue)" />
      )}
      <div className="absolute inset-0 bg-(--color-deep-blue)/55" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-28">
        <p className="eyebrow">MCDiver</p>
        <div className="gold-rule mt-4" />
        <h1 className="mt-5 font-heading font-extrabold" style={{ fontSize: "var(--fs-display)" }}>
          {title}
        </h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-white/90">{subtitle}</p> : null}
      </div>
    </header>
  );
}
