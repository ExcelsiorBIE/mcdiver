/**
 * Gate de contenido — docs/03-deploy-automation.md §4.
 * Fase 0: consistencia estructural. Fase 2: D24 "estandarizar, no garantizar"
 * como comprobación ejecutable, no como memoria de equipo.
 */
import { readFileSync } from "node:fs";
import { allPageIds } from "../content/routes";
import { META } from "../content/meta";
import { site } from "../content/site";
import { faqs, faqPreview } from "../content/faq";
import { trips } from "../content/trips";
import { team } from "../content/team";

let failures = 0;
function fail(msg: string) {
  failures++;
  console.error(`  FAIL: ${msg}`);
}

console.log("verify:ssot");

// --- routes.ts <-> meta.ts ---
for (const id of allPageIds()) {
  if (!META[id]) fail(`meta.ts: falta "${id}" (content/routes.ts lo declara)`);
}
for (const id of Object.keys(META) as Array<keyof typeof META>) {
  if (!allPageIds().includes(id)) fail(`meta.ts: "${id}" no existe en content/routes.ts`);
}

// --- site.ts ---
if (!site.email || !site.email.includes("@")) fail("content/site.ts: email inválido");
if (!/^\+\d{10,15}$/.test(site.whatsapp.e164)) fail("content/site.ts: whatsapp.e164 con formato inválido");
if (site.whatsapp.digits !== site.whatsapp.e164.replace("+", "")) {
  fail("content/site.ts: whatsapp.digits no coincide con whatsapp.e164 — un dato, un lugar (D11)");
}

// --- faq.ts ---
if (faqs.length !== 15) fail(`faq.ts: hay ${faqs.length} preguntas, el PDF §8.6 define 15`);
if (faqPreview.length !== 4) fail("faq.ts: faqPreview debe tener exactamente 4 (D16, PDF §5.9 = §8.6 1–4)");
for (let i = 0; i < 4; i++) {
  if (faqPreview[i] !== faqs[i]) fail(`faq.ts: faqPreview[${i}] no es faqs[${i}] — D16 exige slice(0,4), no una copia`);
}
for (const f of faqs) {
  for (const locale of ["es", "en"] as const) {
    if (!f[locale].q || !f[locale].a) fail(`faq.ts: pregunta/respuesta vacía en "${f[locale].q || "?"}"`);
  }
}

// --- trips.ts ---
for (const t of trips) {
  if (t.maxGroup !== 12) fail(`trips.ts: "${t.id}" tiene maxGroup=${t.maxGroup}, el PDF fija 12 para ambos planes`);
  if (t.priceUsd <= 0) fail(`trips.ts: "${t.id}" tiene priceUsd inválido`);
  if (t.dives <= 0) fail(`trips.ts: "${t.id}" tiene dives inválido`);
  if (t.itinerary.length !== t.days) {
    fail(`trips.ts: "${t.id}" tiene ${t.days} días pero ${t.itinerary.length} entradas de itinerario`);
  }
}
// --- team.ts ---
for (const m of team) {
  if (!m.bio.es || !m.bio.en) fail(`team.ts: "${m.id}" con bio vacía en algún idioma`);
}
{
  const sebastian = team.find((m) => m.id === "sebastian");
  if (sebastian?.yearsExperience !== null) {
    fail('team.ts: "sebastian".yearsExperience debe ser null hasta tener el dato real — CI-3, docs/08-content-integrity.md');
  }
}

// --- D24: "estandarizar, no garantizar" — frases de certeza absoluta prohibidas ---
const bannedPhrases = [
  "completamente seguro",
  "100% seguro",
  "garantizado",
  "garantizada",
  "vas a ver",
  "verás",
  "you will see",
  "guaranteed",
  "totally safe",
  "completely safe",
];
const filesToScan = [
  "content/faq.ts",
  "content/trips.ts",
  "content/team.ts",
  "content/stats.ts",
];
for (const rel of filesToScan) {
  const text = readFileSync(new URL(`../${rel}`, import.meta.url), "utf-8").toLowerCase();
  for (const phrase of bannedPhrases) {
    if (text.includes(phrase)) {
      fail(`${rel}: contiene "${phrase}" — prohibido por D24 (mandato de Jhon: "estandarizar, no garantizar")`);
    }
  }
}

if (failures > 0) {
  console.error(`\nverify:ssot — ${failures} fallo(s)`);
  process.exit(1);
}
console.log("  PASS");
