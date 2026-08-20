import { team } from "@/content/team";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";

export function TeamGrid({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <section className="bg-(--color-deep-blue) text-white section-y" aria-labelledby="team-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="team-heading"
          className="text-center font-heading font-bold"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {copy.teamTitle}
        </h2>
        <div className="gold-rule mx-auto mt-5" />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {team.map((member) => {
            const letters = member.id === "pacho" ? "PM" : member.id === "sebastian" ? "SM" : "JT";
            const border =
              member.photoBorder === "gold" ? "border-(--color-sand-gold)" : "border-(--color-turquoise)";
            return (
              <li key={member.id} className="text-center">
                <div
                  className={`team-photo border-[3px] ${border} bg-(--color-footer)`}
                  aria-hidden
                >
                  {letters}
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold">{member.displayName}</h3>
                <p className="mt-1 text-sm text-(--color-turquoise)">{member.role[locale]}</p>
                <div className="gold-rule mx-auto mt-3" />
                <p className="mt-4 text-sm text-white/85">{member.bio[locale]}</p>
                {member.quote ? (
                  <blockquote className="mt-4 text-sm italic text-white/80">“{member.quote[locale]}”</blockquote>
                ) : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-xs text-white/50">
          {locale === "es"
            ? "Fotos reales del equipo pendientes — no sustituimos caras."
            : "Real team photos pending — we don't substitute faces."}
        </p>
      </div>
    </section>
  );
}
