import { bookingSteps } from "@/content/booking-flow";
import type { Locale } from "@/lib/i18n";

export function BookingFlow({ locale }: { locale: Locale }) {
  const title = locale === "es" ? "Cómo se reserva" : "How booking works";
  const sub =
    locale === "es"
      ? "Sin calendario de pago en la web. Un chat con Jhon, un anticipo, un grupo."
      : "No checkout calendar on the site. A chat with Jhon, a deposit, a group.";
  return (
    <section className="section-y bg-(--color-light-gray)" aria-labelledby="booking-flow-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="booking-flow-heading"
          className="text-center font-heading font-bold text-(--color-deep-blue)"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {title}
        </h2>
        <p className="mt-3 text-center text-(--color-soft-black)/75">{sub}</p>
        <div className="gold-rule mx-auto mt-5" />
        <ol className="mt-12 grid gap-6 md:grid-cols-5">
          {bookingSteps.map((s) => (
            <li key={s.n} className="bg-white p-5">
              <p className="font-heading text-sm tracking-[0.2em] text-(--color-turquoise)">{s.n}</p>
              <h3 className="mt-2 font-heading font-bold text-(--color-deep-blue)">{s[locale].t}</h3>
              <p className="mt-2 text-sm text-(--color-soft-black)/80">{s[locale].d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
