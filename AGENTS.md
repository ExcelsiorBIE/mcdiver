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
