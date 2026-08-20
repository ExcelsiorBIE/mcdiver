# 04 — Plan de implementación

**Estado: EN CURSO.** Jhon dio el "go" el 20/08/2026. Fase 0 completa.

Cada fase tiene entregable y criterio de aceptación. Una fase no se da por
cerrada si su criterio no se cumple.

---

## Fase 0 — Cimientos ✅ **COMPLETA** (20/08/2026)

Scaffold Next 16.3.1 + TS + Tailwind 4, tokens de la paleta como CSS vars,
fuentes Montserrat/Open Sans vía `next/font`, `proxy.ts` con el rewrite de
idioma, `content/routes.ts`, y los tres verificadores (`verify:i18n`,
`verify:ssot`, `verify:a11y`).

**Aceptación cumplida:** `/` y `/en` renderizan (verificado con curl: HTTP 200
en ambos, sin redirect visible), el toggle en una página interior lleva a la
misma página en el otro idioma (`/nuestros-viajes` ↔ `/en/our-trips`,
verificado), `npm run verify:all` pasa en verde — 19 contrastes WCAG, i18n,
contenido, lint y typecheck.

**Nota de versión:** se subió de Next 16.2.12 a **16.3.1** — `npm audit`
encontró 3 CVEs high transitivas (postcss, sharp) dentro del propio Next;
16.3.1 las resuelve sin cambiar la convención de `proxy.ts` ni `params` como
Promise. `npm audit`: 0 vulnerabilidades tras el bump.

**Bug real encontrado y corregido en el camino:** `app/not-found.tsx`
redeclaraba `<html>/<body>`, inválido en Next App Router — solo el layout raíz
puede declararlos. Corregido antes de cerrar la fase.

---

## Fase 1 — Pipeline de despliegue *(⏳ EN CURSO — necesita una acción de Jhon)*

Proyecto en Vercel bajo la cuenta de Jhon, conectado al repo en `ExcelsiorBIE`.
`ci.yml` con todos los gates, Lighthouse CI, secretos cargados, `noindex`
mientras dure la etapa provisional, y rollback probado de verdad (no "debería
funcionar" — probado).

> **Lo único que no podemos hacer nosotros:** conectar el repo a la cuenta de
> Vercel de Jhon requiere que él lo autorice — un agente no puede iniciar
> sesión en su cuenta. Es un clic de su lado: en vercel.com → "Add New Project"
> → importar `ExcelsiorBIE/mcdiver`. Se le pide en el resumen de estado.

**Aceptación:** un commit de prueba a `main` llega solo a
`https://mcdiver.vercel.app` en menos de 5 minutos, y un commit deliberadamente
roto **no** llega. El dominio `mcdiver.co` no se toca hasta la Fase 8 (D26).

> Se hace temprano a propósito. Es el requisito que más le importa al fundador
> y el que más sorpresas da; si falla, queremos saberlo la primera semana y no
> la última.

---

## Fase 2 — Modelo de contenido *(✅ desbloqueada)*

Poblar `content/` con todo el material del PDF: los 2 planes con sus
itinerarios e incluye/no incluye, las 15 FAQ, los 3 miembros del equipo, los
4 sitios de buceo, datos de contacto. Todo con su par ES/EN.

**Aceptación:** ningún precio ni fecha aparece escrito a mano en un componente.
`verify:content` lo comprueba. Todo el copy pasa por la regla **"estandarizar,
no garantizar"** (D24) antes de entrar.

---

## Fase 3 — Homepage (11 secciones)

Hero con video+poster · barra de confianza · **próximas salidas** (la sección
que convierte: cards con badge, **sin barra de cupos** (D23), acordeón de
itinerario, tabla incluye/no incluye) · por qué Coiba · ventaja Pixvae · equipo
· galería preview · testimonios (**módulo vacío** — D27) · FAQ preview · CTA
final · footer.
Más el botón flotante de WhatsApp global.

**Aceptación:** paridad sección por sección con el PDF §5, en ES y EN,
correcto en mobile, tablet y desktop.

---

## Fase 4 — Páginas internas

`/nuestros-viajes`, `/isla-coiba`, `/por-que-pixvae`, `/nuestro-equipo`,
`/galeria` (filtros + lightbox), `/faq` (las 15), `/contacto`. Cada una con su
gemela en inglés.

Más las páginas de error: `not-found.tsx` y `error.tsx`, bilingües, con marca y
navegación (D30, `12-loading-empty-error.md` §3).

**Aceptación:** las 9 rutas × 2 idiomas responden 200, con hreflang correcto,
y un path inexistente devuelve el 404 con marca **en el idioma correcto**.

---

## Fase 5 — Formulario y captura de leads *(✅ desbloqueada — jjtorresv@gmail.com)*

Route Handler + Zod + Resend, honeypot y rate limit, modal desde "Reservar mi
lugar", confirmación en pantalla, WhatsApp prellenado como alternativa.

**Aceptación:** un envío de prueba llega al correo de Jhon con los 7 campos
completos. Probado end-to-end, no simulado.

---

## Fase 6 — SEO, analítica y rendimiento

Meta titles/descriptions del PDF §9, JSON-LD (`TouristTrip`, `FAQPage`,
`Organization`), `sitemap.xml` y `robots.txt` generados desde `routes.ts`,
alt text en todo, GA4, Meta Pixel, Open Graph.

**Aceptación:** **Lighthouse ≥80 mobile y ≥90 desktop** — el número del PDF,
medido, no estimado. Rich Results Test de Google en verde.

---

## Fase 7 — Blog

Pipeline MDX, `/blog` y `/blog/[slug]` bilingües, y los 2 artículos que el
PDF ya define: *"Por qué Pixvae es el mejor punto de partida para bucear en
Coiba"* y *"Todo lo que necesitas saber para bucear en el PNN Coiba"*.

**Aceptación:** ambos publicados en ES y EN, indexables.

---

## Fase 8 — Lanzamiento

Legales (privacidad y términos, con la política de cancelación real del PDF
§8.6 Q14), revisión de contenido con Jhon, QA cross-browser, Search Console.

Y los tres pasos del corte a producción (D26):
1. Jhon aprueba mirando `mcdiver.vercel.app` en su móvil.
2. Se añade `mcdiver.co` al proyecto Vercel; Jhon aplica dos registros DNS en
   GoDaddy con los valores exactos que le pasemos.
3. Se retira el `noindex`.

**Y un paso que solo puede dar Jhon:** despublicar el sitio de Wix. Si sigue
vivo, queda un sitio obsoleto compitiendo en búsquedas con precios de
plantilla, la página de kayak y surf, y los testimonios falsos.

**Aceptación:** `mcdiver.co` sirviendo el sitio real, formulario recibiendo,
WhatsApp funcionando, analítica registrando.

---

## Después del lanzamiento (fase 2 del PDF, fuera de alcance hoy)

Stripe/PayPal para el anticipo del 50% · fotos reales de Jhon reemplazando el
stock · testimonios reales · más artículos de blog · panel de administración
si algún día Jhon prefiere editar sin pedírnoslo (hoy: opción A, D23).

---

## Ruta crítica

```
Fase 0 ──▶ Fase 1 ──▶ Fase 2 ──▶ Fase 3 ──▶ Fase 4 ──▶ Fase 5 ──▶ Fase 6 ──▶ Fase 8
                                                                              ▲
                                                                              │
                                                                       DNS en GoDaddy
```

**Ninguna fase está bloqueada.** Las nueve respuestas del fundador llegaron el
20/08/2026 y el lanzamiento en dos etapas (D26) mueve el único requisito
externo — los registros DNS en GoDaddy — de la Fase 1 a la Fase 8.

**Advertencia de calendario:** el primer viaje sale el **15 de octubre de
2026**. Un sitio que capture leads en noviembre no sirve para llenar ese
grupo. La Fase 8 debería cerrar con margen suficiente para hacer marketing
antes de esa fecha.
