# 06 — Registro de decisiones

## 2026-08-20

### D1 — Abandonar Wix y desarrollar a medida
**Decidió:** Jhon (fundador).
**Razón:** *"queda muy cerrado"*. Wix no permite el pipeline de despliegue
automático que quiere, ni control real sobre rendimiento y SEO.

### D2 — Repo nuevo desde cero, no continuar `Scuba-Panama`
**Decidió:** Jhon.
**Razón:** instrucción explícita — *"vamos a abandonar totalmente el desarrollo
actual y repo actual, vamos a arrancar de cero"*.
**Consecuencia:** `Scuba-Panama` (marca "Coiba Expeditions") queda archivado.
Sus ~69 cambios sin commitear no se migran. Este repo parte del PDF.

### D3 — El PDF es la fuente de verdad; Wix es referencia
**Decidió:** el equipo, dentro del encargo de Jhon.
**Razón:** el capture mostró que Wix está en ~15% y buena parte de lo que hay
es plantilla ajena al negocio (kayak, surf, "Coastal Wilderness"). El PDF
describe el sitio completo y es más reciente.
**Ver:** `01-wix-capture.md` §3.

### D4 — No migrar los testimonios de Wix
**Decidió:** el equipo. **Pendiente de confirmación del fundador (Q1).**
**Razón:** el PDF dice que los testimonios están pendientes de conseguir, así
que los tres firmados que aparecen en Wix son casi con certeza relleno de
plantilla. Publicar reseñas inventadas con nombre propio en un sitio comercial
dirigido a clientes en USA es publicidad engañosa (FTC Endorsement Guides).
**Reversible:** si Jhon confirma que son reales, entran sin más.

### D5 — Next.js 16 + Vercel
**Decidió:** el equipo.
**Razón:** el requisito de despliegue automático se resuelve nativo (push a
`main` → producción) y el objetivo de PageSpeed >90 es alcanzable con SSG +
`next/image` sin trabajo extra.
**Nota:** Next 16 renombró `middleware.ts` a `proxy.ts` y `params` ahora es
Promise. Verificado contra `node_modules/next/dist/docs/`.

### D6 — Español sin prefijo, inglés bajo `/en`, con slugs traducidos
**Decidió:** lo fija el PDF §3.
**Consecuencia:** no sirve el i18n por defecto de Next. Requiere `proxy.ts` con
rewrite y un mapa canónico de rutas (`content/routes.ts`) del que se generan
sitemap, hreflang y el toggle de idioma.

### D7 — Push directo a `main` para contenido; preview para estructura
**Decidió:** el equipo, derivado del requisito de Jhon.
**Razón:** *"cualquier cambio → deploy automático"* es incompatible con
aprobación por PR. La seguridad la dan los gates de CI, no la revisión humana.
**Ver:** `03-deploy-automation.md` §3.

### D8 — Sin pasarela de pagos en el lanzamiento
**Decidió:** lo fija el PDF §10.
**Razón:** el objetivo del sitio es capturar el lead; Jhon cobra manualmente
por transferencia/Zelle/PayPal. Stripe/PayPal es fase 2.

### D9 — Texto oscuro sobre los fondos turquesa y dorado
**Decidió:** el equipo. **Pendiente de confirmación del fundador (Q7).**
**Razón:** blanco sobre `#00B4CC` da 2.50:1 y sobre `#C9A96E` da 2.24:1, contra
el mínimo WCAG AA de 4.5:1. Con texto `#1A1A2E` suben a 6.82:1 y 7.62:1.
Corrige el CTA principal del sitio sin tocar ni uno de los cinco colores del PDF.
**Hallazgo de:** Scuba Web Designer. Ratios recalculados y confirmados.
**Ver:** `07-design-system.md`.

### D10 — Escala tipográfica fluida entre los extremos del PDF
**Decidió:** el equipo.
**Razón:** el PDF fija 52px desktop / 32px mobile y no dice nada del intermedio,
donde cae la tablet. Un `clamp()` entre esos dos valores da exactamente los
números del PDF en ambos extremos y resuelve el hueco.

### D11 — El número de WhatsApp vive en `content/site.ts`, no en una variable de entorno
**Decidió:** el equipo, **corrigiendo** una propuesta de Scuba Web Designer.
**Razón:** el objetivo correcto es que el número exista escrito una sola vez, y
eso lo cumple `content/site.ts`. Pero una variable de entorno es para *secretos*,
y este número es información pública de contacto: aparece en el HTML servido y
en el enlace `wa.me` pase lo que pase. Meterlo en `.env` no lo protege de nada y
sí añade una forma de que el build salga sin número de teléfono.

### D12 — Ninguna cifra sin fuente en copy de cara al cliente
**Decidió:** el equipo. **Q8 pendiente con el fundador.**
**Razón:** el PDF se contradice a sí mismo — §5.4 anuncia "30m+ visibilidad
promedio" mientras su propia FAQ #8 dice "hasta 30m" y solo de diciembre a mayo.
Las dos frases van publicadas en el mismo sitio. Regla general: toda cifra en
copy de cara al cliente necesita fuente o se reemplaza por un dato verificable.
Aplica también a los números PADI y a los testimonios (D4).
**Catálogo completo de las cinco contradicciones:** `08-content-integrity.md`.

### D13 — Un solo tamaño para los títulos de sección
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** el PDF los especifica a 40px, 38px, 38px y 36px. Tres tamaños para
un mismo nivel jerárquico; a esas diferencias no se percibe jerarquía, se
percibe descuido. Jerarquía por espacio o por color de fondo, no por 2px.

### D14 — Dos tokens de ritmo vertical para todo el sitio
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** en 779 líneas el PDF da **un** valor de espaciado (`gap: 16px` entre
dos botones) mientras declara "mucho espacio en blanco" como el centro de la
estética. Sin especificar significa inventado en cada una de las 19 secciones.
`--section-y` y `--section-y-tight`, sin tercera opción.

### D15 — Se elimina "Completamente" de la respuesta sobre seguridad
**Decidió:** el equipo. **Se le informa a Jhon, no se le pregunta.**
**Razón:** afirmación de seguridad absoluta sobre buceo recreativo, por escrito,
en el sitio que vendió el viaje. El resto de la respuesta (operaciones
reguladas, briefing, divemaster en el agua) es cierto y suficiente. No existe
versión defendible de la alternativa, así que no es una decisión del fundador.
**Ver:** `08-content-integrity.md` CI-4.
