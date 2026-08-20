# 03 — Automatización del despliegue

> Requisito literal del fundador (20/08/2026):
> *"necesito que todo quede automatizado cuando hagamos despliegue a productivo
> de tal manera que yo les pida algo aquí un cambio, cualquier cambio, y
> automáticamente se haga el deploy en el sitio oficial"*

## 1. La cadena completa

```
Jhon escribe un DM  →  agente edita el repo  →  commit + push a main
                                                        │
                                                        ▼
                                            GitHub Actions (gates)
                                            typecheck · lint · verify:i18n
                                            build · Lighthouse CI
                                                        │
                                              ¿pasa?  ──✗──▶ NO despliega.
                                                │             El agente avisa a
                                                ✓             Jhon por DM.
                                                ▼
                                     Vercel build & deploy → mcdiver.co
                                                        │
                                                        ▼
                                   El agente le confirma a Jhon por DM
                                   con la URL y qué cambió.
```

Jhon no toca git, ni Vercel, ni un panel. Pide y confirma. Eso es todo.

## 2. Piezas y quién hace qué

| Pieza | Responsable | Detalle |
| --- | --- | --- |
| Repo | GitHub privado | `main` es la rama de producción |
| Hosting | Vercel | Proyecto conectado al repo; deploy automático en push a `main` |
| Dominio | `mcdiver.co` | Apuntado a Vercel (hoy está aparcado — ver Q4) |
| Gates | GitHub Actions | Corren **antes** de que Vercel promueva a producción |
| Rollback | Vercel Instant Rollback | Un comando: vuelve al deploy anterior en segundos |

## 3. Por qué push directo a `main` y no PRs

Porque el fundador pidió *"cualquier cambio → deploy automático"*, y un flujo
de PR con aprobación humana contradice eso.

El seguro no es la revisión humana, son **los gates**: si el build o los
verificadores fallan, no hay deploy. El sitio en producción nunca queda roto
por un push malo, en el peor caso queda **sin actualizar**, que es un estado
seguro.

Cambios de riesgo alto (rediseño completo, cambio de precios, textos legales)
sí van por rama + preview URL, y el agente le manda a Jhon el link del preview
antes de mezclar. La regla:

- **Contenido y ajustes** (copy, foto, cupos, fecha, precio de una card) → directo a `main`.
- **Estructura** (páginas nuevas, rediseño, cambio de stack, legales) → preview primero.

## 4. Gates de calidad (GitHub Actions)

```yaml
# .github/workflows/ci.yml  (esqueleto — se implementa en Fase 1)
on: { push: { branches: [main] }, pull_request: {} }
jobs:
  verify:
    - npm ci
    - npm run typecheck          # TS: contenido bilingüe completo
    - npm run lint
    - npm run verify:i18n        # toda ruta ES tiene par EN y viceversa
    - npm run verify:content     # precios/fechas/cupos coherentes en todo el sitio
    - npm run build
    - lhci autorun               # PageSpeed: falla si mobile <80 o desktop <90
```

`verify:content` existe porque el dato más caro de equivocar es un **precio**.
Si `trips.ts` dice $1,650 y el JSON-LD dice otra cosa, el build para.

## 5. Secretos necesarios

En GitHub Actions y en Vercel (nunca en el repo):

| Secreto | Para qué |
| --- | --- |
| `RESEND_API_KEY` | Envío del formulario |
| `INQUIRY_TO_EMAIL` | Destino de los leads (ver Q2) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `VERCEL_TOKEN` / `ORG_ID` / `PROJECT_ID` | Deploy y rollback desde CI |

## 6. Rollback

Si algo llega mal a producción:

```bash
vercel rollback --yes        # vuelve al deploy anterior, ~segundos
```

Después se arregla en el repo y se vuelve a desplegar. Jhon puede pedir el
rollback por DM en una línea: *"devuelve el sitio a como estaba"*.

## 7. Lo que hace falta de Jhon para que esto funcione

Ver `05-open-questions.md`: **Q2** (email de leads), **Q4** (DNS del dominio),
**Q5** (cuenta de Vercel). Sin Q4 el sitio existe pero no vive en mcdiver.co.
