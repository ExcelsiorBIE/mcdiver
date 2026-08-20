# MCDiver — Sitio Web Oficial

Sitio web bilingüe (ES/EN) de **MCDiver**, empresa de viajes de buceo al Parque
Nacional Coiba, Panamá, con salida desde Pixvae.

- **Dominio objetivo:** mcdiver.co
- **Fundador / dueño del producto:** Jhon Torres (Miami, FL)
- **Fuente de verdad del producto:** `docs/source/especificaciones-mcdiver-v1.0.pdf`
- **Estado:** 🟡 **PLANEACIÓN** — sin implementación. Esperando aprobación del fundador.

> Este repositorio reemplaza por completo el desarrollo anterior
> (`Scuba-Panama` / "Coiba Expeditions"). Arranque desde cero por decisión
> del fundador, 20 de agosto de 2026.

## Documentación

| Doc | Contenido |
| --- | --- |
| [`docs/00-brief.md`](docs/00-brief.md) | Qué es el negocio, a quién le vendemos, qué tiene que lograr el sitio |
| [`docs/01-wix-capture.md`](docs/01-wix-capture.md) | Qué existe hoy en Wix, qué se rescata y qué **no** se puede migrar |
| [`docs/02-architecture.md`](docs/02-architecture.md) | Stack, routing bilingüe, modelo de contenido |
| [`docs/03-deploy-automation.md`](docs/03-deploy-automation.md) | Pipeline "pido un cambio → se despliega solo" |
| [`docs/04-implementation-plan.md`](docs/04-implementation-plan.md) | Plan por fases con entregables y criterios de aceptación |
| [`docs/05-open-questions.md`](docs/05-open-questions.md) | Preguntas que bloquean o condicionan la implementación |
| [`docs/06-decision-log.md`](docs/06-decision-log.md) | Decisiones tomadas y por qué |
| [`docs/07-design-system.md`](docs/07-design-system.md) | Contraste WCAG, escala tipográfica y ritmo vertical |
| [`docs/08-content-integrity.md`](docs/08-content-integrity.md) | Los cinco puntos donde el PDF se contradice a sí mismo |
| [`docs/09-component-vocabulary.md`](docs/09-component-vocabulary.md) | Los seis módulos especificados dos veces, y el hero con ocho descripciones |
| [`docs/10-component-states.md`](docs/10-component-states.md) | Foco, hover, disabled, colores de estado, formularios, cards y FAB |
| [`docs/source/`](docs/source/) | Material original: PDF de especificaciones + captura íntegra del sitio Wix |

## Regla de oro

El PDF de especificaciones es la **fuente de verdad**. Wix es *referencia
histórica*, no autoridad: donde Wix y el PDF se contradicen, manda el PDF.
Ver `docs/01-wix-capture.md` §3.
