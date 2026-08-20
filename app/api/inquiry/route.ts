import { NextResponse } from "next/server";
import { inquirySchema, levelLabel } from "@/lib/inquiry";
import { trips } from "@/content/trips";
import { site } from "@/content/site";

const hits = new Map<string, { n: number; t: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return true;
  }
  if (row.n >= 8) return false;
  row.n += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const data = parsed.data;
  if (data.company) {
    return NextResponse.json({ ok: true }); // honeypot: pretend success
  }

  const trip = trips.find((t) => t.id === data.plan);
  const locale = data.locale;
  const to = process.env.INQUIRY_TO_EMAIL || site.email;
  const key = process.env.RESEND_API_KEY;
  const body = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Plan: ${trip ? trip.name[locale] : data.plan}`,
    `Nivel: ${levelLabel[data.level][locale]}`,
    `Personas: ${data.people}`,
    data.message ? `Mensaje: ${data.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!key) {
    return NextResponse.json({ ok: false, error: "unconfigured", fallback: "whatsapp" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "MCDiver <beth.t@example.com>",
      to: [to],
      reply_to: data.email,
      subject: `Consulta MCDiver — ${trip ? trip.name.es : data.plan} — ${data.name}`,
      text: body,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
