"use client";

import { useId, useState } from "react";
import { trips, type TripId } from "@/content/trips";
import { site, defaultWhatsappMessage } from "@/content/site";
import { DIVE_LEVELS, levelLabel } from "@/lib/inquiry";
import type { Locale } from "@/lib/i18n";

const ui = {
  es: {
    name: "Nombre completo",
    email: "Email",
    whatsapp: "WhatsApp (con código de país)",
    plan: "Plan de interés",
    level: "Nivel de buceo",
    people: "Número de personas",
    message: "Mensaje (opcional)",
    submit: "Enviar consulta",
    thanks: "¡Gracias! Te contactamos en menos de 24 horas por WhatsApp.",
    error: "No se pudo enviar. Prueba de nuevo o escríbenos por WhatsApp.",
    unconfigured: "El correo aún no está conectado. Te abrimos WhatsApp para no perder la consulta.",
    sending: "Enviando…",
  },
  en: {
    name: "Full name",
    email: "Email",
    whatsapp: "WhatsApp (with country code)",
    plan: "Plan of interest",
    level: "Certification",
    people: "Number of people",
    message: "Message (optional)",
    submit: "Send inquiry",
    thanks: "Thank you! We'll contact you within 24 hours on WhatsApp.",
    error: "Couldn't send. Try again or message us on WhatsApp.",
    unconfigured: "Email isn't connected yet. We'll open WhatsApp so the inquiry isn't lost.",
    sending: "Sending…",
  },
} as const;

export function InquiryForm({
  locale,
  defaultTrip,
  onSuccess,
}: {
  locale: Locale;
  defaultTrip?: TripId;
  onSuccess?: () => void;
}) {
  const copy = ui[locale];
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setMsg("");
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      plan: String(fd.get("plan") ?? ""),
      level: String(fd.get("level") ?? ""),
      people: Number(fd.get("people") ?? 1),
      message: String(fd.get("message") ?? ""),
      locale,
      company: String(fd.get("company") ?? ""),
    };
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; fallback?: string };
      if (res.ok && json.ok) {
        setStatus("ok");
        setMsg(copy.thanks);
        form.reset();
        onSuccess?.();
        return;
      }
      if (json.error === "unconfigured") {
        const trip = trips.find((t) => t.id === payload.plan);
        const wa = [
          defaultWhatsappMessage[locale],
          `${copy.name}: ${payload.name}`,
          `Email: ${payload.email}`,
          `WhatsApp: ${payload.whatsapp}`,
          trip ? trip.name[locale] : payload.plan,
          payload.message,
        ]
          .filter(Boolean)
          .join("\n");
        window.open(site.whatsapp.waLink({ es: wa, en: wa }, locale), "_blank", "noopener,noreferrer");
        setStatus("err");
        setMsg(copy.unconfigured);
        return;
      }
      setStatus("err");
      setMsg(copy.error);
    } catch {
      setStatus("err");
      setMsg(copy.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        {copy.name}
        <input name="name" required autoComplete="name" className="min-h-11 border border-(--color-deep-blue)/20 px-3" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.email}
        <input name="email" type="email" required autoComplete="email" className="min-h-11 border border-(--color-deep-blue)/20 px-3" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.whatsapp}
        <input name="whatsapp" required autoComplete="tel" placeholder="+1…" className="min-h-11 border border-(--color-deep-blue)/20 px-3" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.plan}
        <select name="plan" defaultValue={defaultTrip ?? trips[0]?.id} className="min-h-11 border border-(--color-deep-blue)/20 px-3">
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name[locale]} — {trip.dates[locale]}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.level}
        <select name="level" defaultValue="ow" className="min-h-11 border border-(--color-deep-blue)/20 px-3">
          {DIVE_LEVELS.map((id) => (
            <option key={id} value={id}>
              {levelLabel[id][locale]}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.people}
        <input name="people" type="number" min={1} max={12} defaultValue={1} className="min-h-11 border border-(--color-deep-blue)/20 px-3" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {copy.message}
        <textarea name="message" rows={3} className="border border-(--color-deep-blue)/20 px-3 py-2" />
      </label>
      <div className="hidden" aria-hidden>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
      {msg ? (
        <p
          id={statusId}
          role={status === "ok" ? "status" : "alert"}
          tabIndex={-1}
          className="text-sm"
        >
          {msg}
        </p>
      ) : null}
    </form>
  );
}
