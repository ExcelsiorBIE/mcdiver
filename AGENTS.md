# Reglas para agentes — MCDiver

## Estado del proyecto

🟡 **PLANEACIÓN.** No se escribe código de aplicación hasta que el fundador
apruebe el plan. Ver `docs/04-implementation-plan.md`.

## Este NO es el Next.js que conoces

El proyecto usa **Next.js 16.2.x**. Hay cambios de API respecto a lo que
probablemente tienes memorizado. **Lee `node_modules/next/dist/docs/` antes de
escribir código.** Ya verificado:

- `middleware.ts` → ahora es **`proxy.ts`**, exporta `proxy()`.
- `params` es una **Promise**: `const { lang } = await params`.
- Existe el helper de tipos `PageProps<'/[lang]'>`.

## Fuente de verdad

1. `docs/source/especificaciones-mcdiver-v1.0.pdf` — **manda esto**.
2. `docs/source/wix-capture-*.txt` — referencia histórica, **no** autoridad.

Donde Wix y el PDF se contradigan, gana el PDF. Ver `docs/01-wix-capture.md` §3.

## Dónde podemos decidir, y dónde no

Regla de límites. Aplícala antes de "mejorar" nada del PDF.

| Situación | Quién decide | Ejemplos |
| --- | --- | --- |
| El PDF **calla** | **Nosotros.** Documentar la decisión. | Espaciado vertical, estructura de componentes, alturas de hero sin especificar, stack |
| El PDF **se contradice** | **Nosotros**, eligiendo la versión honesta y avisando a Jhon. | Las cinco de `docs/08-content-integrity.md` |
| El PDF viola un **estándar objetivo** | **Nosotros**, corrigiendo por el camino más barato. Se informa. | Contraste WCAG por debajo de 4.5:1 |
| El PDF es **explícito** y nuestra objeción es de **gusto** | **Jhon.** Se propone con capturas, después de la aprobación. Nunca en silencio. | Colores de fondo por sección, orden de secciones, elección de copy |

La distinción que más se resbala es la última contra la tercera. "Blanco sobre
turquesa da 2.50:1" es un hecho medible. "Diez alternancias de fondo parecen
rayas" es criterio. El primero se arregla; el segundo se propone.

## Reglas de contenido

- **Un dato, un lugar.** Precios, fechas, cupos e inmersiones viven en
  `content/trips.ts` y en ningún otro sitio. Nada de literales en componentes.
- **Todo par ES/EN completo.** El typecheck lo obliga. No se publica media
  traducción.
- **Nada inventado.** No se escriben testimonios, números de certificación
  PADI, estadísticas ni credenciales que no vengan del PDF o de Jhon.
  Si falta un dato, va un placeholder visible — nunca un invento plausible.

## Antes de hacer push a `main`

`npm run verify:all` tiene que pasar. Un push a `main` va a **producción**
(mcdiver.co). Ver `docs/03-deploy-automation.md`.

- Contenido y ajustes → directo a `main`.
- Estructura, rediseño, precios, legales → rama + preview, y se le manda a
  Jhon el link antes de mezclar.

## Comunicación con el fundador

- Solo **DM**, no threads.
- Preguntas a Jhon: pocas, críticas y concretas. Si no responde rápido, se le
  reenvía la pregunta tal cual.
- Después de cada deploy a producción: confirmarle por DM qué cambió.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
