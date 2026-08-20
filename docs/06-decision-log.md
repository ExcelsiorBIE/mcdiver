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
