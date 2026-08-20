/**
 * Las 3 estadísticas grandes de §5.4 "Por qué Coiba". La tercera fue
 * corregida por decisión de Jhon (Q8): "30m+ visibilidad promedio" se
 * contradecía con la propia FAQ #8 del PDF ("hasta 30m", solo dic–may).
 * Reemplazada por un dato de la misma FAQ, verdadero y sin fuente dudosa.
 * Ver docs/08-content-integrity.md CI-1, docs/06-decision-log.md D24.
 */
export type Stat = { value: string; es: string; en: string };

export const homeStats: Stat[] = [
  { value: "760+", es: "especies de peces", en: "fish species" },
  { value: "UNESCO", es: "Patrimonio de la Humanidad", en: "World Heritage Site" },
  { value: "jun–nov", es: "temporada de tiburón ballena", en: "whale shark season" },
];
