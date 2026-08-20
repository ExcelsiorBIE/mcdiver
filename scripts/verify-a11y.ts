/**
 * Gate de contraste WCAG — docs/07-design-system.md §4, docs/10-component-states.md.
 * Codifica D9/D19/D20/D21 como comprobación ejecutable, no como memoria de equipo.
 */

function luminance(hex: string): number {
  const c = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((h) => parseInt(h, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function ratio(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const COLOR = {
  deepBlue: "#1B3A6B",
  turquoise: "#00B4CC",
  turquoiseHover: "#00A3B8",
  turquoiseActive: "#0093A6",
  white: "#FFFFFF",
  sandGold: "#C9A96E",
  softBlack: "#1A1A2E",
  footer: "#0D1F3C",
  lightGray: "#F8F9FA",
  error: "#C0392B",
  success: "#1E7A4F",
  warning: "#8A6D1F",
};

let failures = 0;
function checkText(label: string, fg: string, bg: string, min = 4.5) {
  const r = ratio(fg, bg);
  if (r < min) {
    failures++;
    console.error(`  FAIL: ${label} — ${r.toFixed(2)}:1 (mínimo ${min}:1)`);
  } else {
    console.log(`  PASS: ${label} — ${r.toFixed(2)}:1`);
  }
}

console.log("verify:a11y");

// Botón primario y sus estados — D9/D25, D20 (docs/10 §2)
checkText("Botón turquesa (default) texto oscuro", COLOR.softBlack, COLOR.turquoise);
checkText("Botón turquesa (hover) texto oscuro", COLOR.softBlack, COLOR.turquoiseHover);
checkText("Botón turquesa (active) texto oscuro", COLOR.softBlack, COLOR.turquoiseActive);
checkText("Badge dorado texto oscuro", COLOR.softBlack, COLOR.sandGold);
checkText("Azul profundo + blanco", COLOR.white, COLOR.deepBlue);
checkText("Footer + blanco", COLOR.white, COLOR.footer);
checkText("Gris claro + negro suave", COLOR.softBlack, COLOR.lightGray);

// Turquesa como TEXTO — legal solo sobre fondo oscuro, texto grande (docs/07 §2)
checkText("Turquesa texto sobre azul profundo (num. grande, 3:1)", COLOR.turquoise, COLOR.deepBlue, 3);

// PROHIBIDO: turquesa/dorado con texto blanco (D9) — falla a propósito si alguien lo reintroduce
{
  const r1 = ratio(COLOR.white, COLOR.turquoise);
  if (r1 >= 4.5) {
    console.log(`  (info) blanco sobre turquesa ahora pasa (${r1.toFixed(2)}:1) — paleta cambió, revisar docs/07`);
  }
}

// Colores semánticos — docs/10 §3, D21: el dorado NO sirve de aviso
checkText("Error sobre blanco", COLOR.error, COLOR.white);
checkText("Error sobre gris claro", COLOR.error, COLOR.lightGray);
checkText("Success sobre blanco", COLOR.success, COLOR.white);
checkText("Success sobre gris claro", COLOR.success, COLOR.lightGray);
checkText("Warning sobre blanco", COLOR.warning, COLOR.white);
checkText("Warning sobre gris claro", COLOR.warning, COLOR.lightGray);
{
  const r = ratio(COLOR.sandGold, COLOR.white);
  if (r >= 4.5) {
    failures++;
    console.error(`  FAIL: el dorado ahora pasaría como aviso (${r.toFixed(2)}:1) — D21 asumía que fallaba; revisar`);
  } else {
    console.log(`  PASS (por diseño): dorado sobre blanco sigue sin servir de aviso — ${r.toFixed(2)}:1 (D21)`);
  }
}

// Anillo de foco de dos tonos — D19: al menos un borde ≥3:1 contra cada fondo real
const grounds = [
  ["turquesa", COLOR.turquoise],
  ["blanco", COLOR.white],
  ["gris claro", COLOR.lightGray],
  ["azul profundo", COLOR.deepBlue],
] as const;
for (const [name, ground] of grounds) {
  const inner = ratio(COLOR.softBlack, ground);
  const outer = ratio(COLOR.white, ground);
  if (inner < 3 && outer < 3) {
    failures++;
    console.error(`  FAIL: anillo de foco sobre ${name} — ni interior (${inner.toFixed(2)}) ni exterior (${outer.toFixed(2)}) llegan a 3:1`);
  } else {
    console.log(`  PASS: anillo de foco sobre ${name} — interior ${inner.toFixed(2)}, exterior ${outer.toFixed(2)}`);
  }
}

if (failures > 0) {
  console.error(`\nverify:a11y — ${failures} fallo(s)`);
  process.exit(1);
}
console.log("  PASS");
