/**
 * Gate: docs/03-deploy-automation.md §4. Toda ruta ES tiene par EN y viceversa;
 * todo meta title/description existe y respeta el límite del PDF §9.
 */
import { ROUTES, allPageIds } from "../content/routes";
import { META } from "../content/meta";

const TITLE_MAX = 60;
const DESC_MAX = 160;

let failures = 0;
function fail(msg: string) {
  failures++;
  console.error(`  FAIL: ${msg}`);
}

console.log("verify:i18n");

for (const id of allPageIds()) {
  const entry = ROUTES[id];
  if (id !== "home" && (!entry.es || !entry.en)) {
    fail(`routes.ts: "${id}" le falta el slug ES o EN`);
  }
}

// Sin dos páginas compartiendo slug en el mismo idioma.
for (const locale of ["es", "en"] as const) {
  const seen = new Map<string, string>();
  for (const id of allPageIds()) {
    const slug = ROUTES[id][locale];
    if (id === "home") continue;
    if (seen.has(slug)) {
      fail(`routes.ts: slug "${slug}" (${locale}) duplicado entre "${seen.get(slug)}" y "${id}"`);
    }
    seen.set(slug, id);
  }
}

for (const id of allPageIds()) {
  const meta = META[id];
  if (!meta) {
    fail(`meta.ts: falta la entrada completa para "${id}"`);
    continue;
  }
  for (const locale of ["es", "en"] as const) {
    const m = meta[locale];
    if (!m?.title) fail(`meta.ts: "${id}".${locale}.title vacío`);
    if (!m?.description) fail(`meta.ts: "${id}".${locale}.description vacío`);
    if (m?.title && m.title.length > TITLE_MAX) {
      fail(`meta.ts: "${id}".${locale}.title mide ${m.title.length} chars (máx ${TITLE_MAX}): "${m.title}"`);
    }
    if (m?.description && m.description.length > DESC_MAX) {
      fail(`meta.ts: "${id}".${locale}.description mide ${m.description.length} chars (máx ${DESC_MAX})`);
    }
  }
}

if (failures > 0) {
  console.error(`\nverify:i18n — ${failures} fallo(s)`);
  process.exit(1);
}
console.log("  PASS");
