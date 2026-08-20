# 02 — Arquitectura

## 1. Stack propuesto

| Capa | Elección | Por qué |
| --- | --- | --- |
| Framework | **Next.js 16.2.x** (App Router) + React 19.2 | SSG/ISR para PageSpeed >90, `next/image` resuelve el requisito WebP ≤300KB solo |
| Lenguaje | **TypeScript 5** | Contenido tipado = no se rompe una traducción en silencio |
| Estilos | **Tailwind CSS 4** | Tokens de la paleta en CSS vars; sin CSS suelto que se desincronice |
| Fuentes | `next/font/google` — Montserrat + Open Sans | Self-hosted automático, sin FOUT, sin llamada a Google en runtime |
| Contenido | Archivos versionados en `content/` (TS + MDX para blog) | Ver §3 |
| Formulario | Route Handler + **Resend** | Ver §4 |
| Hosting | **Vercel** | Ver `03-deploy-automation.md` |
| Analítica | GA4 + Meta Pixel vía `next/script` | Requisito del PDF §9 |

> ⚠️ **Next.js 16 no es el Next.js de memoria.** Antes de escribir código,
> leer `node_modules/next/dist/docs/`. Cambios ya verificados en la 16.2.12:
> - `middleware.ts` **se llama ahora `proxy.ts`** y exporta `proxy()`.
> - `params` es una **Promise** — hay que `await params` en layouts y páginas.
> - Existe el helper de tipos `PageProps<'/[lang]'>`.

## 2. Routing bilingüe — el punto delicado

El PDF pide algo que **no** es el i18n por defecto de Next: español **sin
prefijo** en la raíz, inglés bajo `/en`, y además **slugs traducidos**
(`/nuestros-viajes` ↔ `/en/our-trips`, no `/en/nuestros-viajes`).

Son dos requisitos combinados: *prefijo condicional* + *rutas localizadas*.

**Diseño:**

```
app/
  [lang]/
    layout.tsx
    page.tsx                  → / y /en
    [...slug]/page.tsx        → resuelve vía mapa de rutas localizadas
proxy.ts                      → reescribe / → /es, deja /en tal cual
content/routes.ts             → mapa canónico ES↔EN
```

- `proxy.ts` reescribe (`rewrite`, **no** redirect) las URLs sin prefijo a
  `/es/...` internamente. El usuario nunca ve `/es` en la barra de direcciones.
- `content/routes.ts` es la tabla única ES↔EN. De ahí salen, generadas y no
  escritas a mano: el `generateStaticParams`, el `sitemap.xml`, los
  `<link rel="alternate" hreflang>` y el destino del toggle de idioma.
- El toggle ES|EN lleva a la **misma página** en el otro idioma, no al home.
  Es el error clásico de los sitios bilingües y se evita porque el mapa existe.

**Riesgo asumido:** un mapa de rutas mal mantenido rompe SEO en silencio.
Mitigación: script `verify:i18n` en `prebuild` que falla el build si una ruta
existe en un idioma y no en el otro, o si falta una traducción.

## 3. Modelo de contenido — una sola fuente por dato

Regla: **cada dato del negocio vive en exactamente un lugar.** El precio
$1,650 aparece en la homepage, en `/nuestros-viajes`, en el dropdown del
formulario y en el JSON-LD. Debe ser una constante, no cuatro literales.

```
content/
  trips.ts          ← planes: fechas, precios, inmersiones, cupos, incluye/no incluye
  team.ts           ← Pacho, Sebastián, Jhon
  faq.ts            ← las 15 preguntas (4 marcadas para el preview del home)
  routes.ts         ← mapa ES↔EN
  site.ts           ← WhatsApp, email, horarios, redes, dominio
  dive-sites.ts     ← Roca Partida, Bajo Hannibal, Granito de Oro, Las Lajas
  testimonials.ts   ← VACÍO hasta que Jhon entregue reales (ver 01 §4)
  blog/*.mdx        ← artículos, por idioma
```

Cada entrada lleva `{ es: string, en: string }`. El typecheck obliga a que
exista el par completo — no se puede publicar una traducción a medias.

`trips.ts` alimenta además el **JSON-LD** (`TouristTrip` / `Product` +
`FAQPage` desde `faq.ts`), que es de donde salen los rich results de Google.

## 4. Formulario de contacto

Campos (PDF §7): nombre*, email*, WhatsApp con código de país*, plan de
interés (dropdown desde `trips.ts`), nivel de buceo, número de personas,
mensaje.

- Route Handler `app/api/inquiry/route.ts`, validación con **Zod**
  (frontend y backend con el mismo esquema).
- Envío por **Resend** al correo de Jhon. Elegido sobre SMTP porque Vercel no
  permite SMTP saliente en serverless, y sobre Formspree porque el dato del
  lead se queda en nuestro dominio.
- Honeypot + rate limit por IP. Un formulario público sin esto se llena de spam
  en semanas y el lead real se pierde entre basura.
- Confirmación en pantalla: *"¡Gracias! Te contactamos en menos de 24 horas
  por WhatsApp."*
- Fallback siempre visible: botón de WhatsApp prellenado.

## 5. Rendimiento — cómo llegamos a >80 mobile / >90 desktop

El enemigo es el **video del hero**. El PDF ya lo previó: en mobile se sirve
foto estática, nunca el video.

- Video: `poster` obligatorio, `preload="none"`, `muted`, `playsInline`, ≤15MB,
  y solo se monta arriba de 768px.
- Imágenes: `next/image` con AVIF+WebP, `sizes` correcto, `priority` **solo**
  en el hero, `loading="lazy"` en galería y blog.
- Fuentes: `next/font` con `display: swap` y subconjunto latino.
- GA4 y Meta Pixel con `next/script` en `strategy="afterInteractive"` — nunca
  bloqueando el render.
- Galería: lightbox cargado con `dynamic()`, no en el bundle inicial.
- Presupuesto: **JS inicial < 120KB gzip**. Lighthouse CI en el pipeline
  (ver `03-deploy-automation.md` §4) falla el deploy si se cae por debajo del
  objetivo del PDF.

## 6. Lo que NO construimos en el lanzamiento

Explícito para que no haya expectativa equivocada:

- ❌ Pasarela de pagos (Stripe/PayPal) — el PDF lo pone en fase 2.
- ❌ Reserva con calendario en tiempo real — los cupos son manuales.
- ❌ Login / área de cliente — nada en el PDF lo pide.
- ❌ Cualquier cosa de `/book-online` de Wix (kayak, surf) — no es el negocio.
