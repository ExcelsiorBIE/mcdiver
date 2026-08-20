/**
 * Gate de contenido — docs/03-deploy-automation.md §4. En Fase 0 verifica
 * consistencia estructural; Fase 2 añade precios/fechas/cupos (docs/00-brief §4).
 */
import { allPageIds } from "../content/routes";
import { META } from "../content/meta";
import { site } from "../content/site";

let failures = 0;
function fail(msg: string) {
  failures++;
  console.error(`  FAIL: ${msg}`);
}

console.log("verify:ssot");

for (const id of allPageIds()) {
  if (!META[id]) fail(`meta.ts: falta "${id}" (content/routes.ts lo declara)`);
}
for (const id of Object.keys(META) as Array<keyof typeof META>) {
  if (!allPageIds().includes(id)) fail(`meta.ts: "${id}" no existe en content/routes.ts`);
}

if (!site.email || !site.email.includes("@")) fail("content/site.ts: email inválido");
if (!/^\+\d{10,15}$/.test(site.whatsapp.e164)) fail("content/site.ts: whatsapp.e164 con formato inválido");
if (site.whatsapp.digits !== site.whatsapp.e164.replace("+", "")) {
  fail("content/site.ts: whatsapp.digits no coincide con whatsapp.e164 — un dato, un lugar (D11)");
}

if (failures > 0) {
  console.error(`\nverify:ssot — ${failures} fallo(s)`);
  process.exit(1);
}
console.log("  PASS");
