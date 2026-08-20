# 00 — Brief del producto

Derivado de `source/especificaciones-mcdiver-v1.0.pdf` (v1.0, agosto 2026,
24 páginas, autor: Jhon Torres).

## 1. El negocio

MCDiver vende **viajes de buceo con grupo cerrado al Parque Nacional Coiba**,
Panamá, operando desde **Pixvae / Bahía Honda**.

La propuesta de valor es una sola frase y todo el sitio gira alrededor de ella:

> **Salimos desde Pixvae: 20–30 minutos a los sitios de buceo, contra 60–90
> minutos desde Santa Catalina. Buceas más y viajas menos.**

Los diferenciadores secundarios:

- Coiba es Patrimonio UNESCO — "el Galápagos del Pacífico", 760+ especies de peces.
- Instructores PADI con +25 años (Francisco "Pacho" Martínez, Sebastián Martínez).
- Grupos de **máximo 12 personas**.
- Puente Miami ⇄ Panamá: Jhon organiza desde USA para buzos hispanohablantes.

## 2. A quién le vendemos

Buceadores hispanohablantes en **USA, especialmente Miami**. Certificados
Open Water como mínimo. Idioma principal **español**, inglés como toggle.

## 3. Qué tiene que lograr el sitio

El sitio **no cobra**. Su único trabajo es **capturar el lead**:

1. Formulario → email a Jhon.
2. WhatsApp (+1 305 904 3587) → conversación directa.

Jhon cierra el pago manualmente (transferencia / Zelle / PayPal). Pasarela de
pagos (Stripe/PayPal) es **fase 2**, explícitamente fuera del lanzamiento.

## 4. La oferta (dos planes)

| | Coiba Esencial | Coiba Completo |
| --- | --- | --- |
| Fechas | 15–19 octubre 2026 | 5–11 noviembre 2026 |
| Duración | 5 días / 4 noches | 7 días / 6 noches |
| Inmersiones | 8 | 14 |
| Precio | **$1,650 USD** p/p | **$2,450 USD** p/p |
| Cupos | máx. 12 | máx. 12 |
| Seguro de buceo | ✗ | ✓ |
| Badge | turquesa | dorado `#C9A96E` |

Reserva: **50% de anticipo**, 50% restante 15 días antes.
Si el grupo no llega a **10 personas**, se devuelve el 100% del anticipo.
Cancelación: >30 días → 80% del anticipo; <15 días → no reembolsable.

## 5. Identidad visual

```
Azul profundo  #1B3A6B   dominante, navbar, fondos
Turquesa       #00B4CC   acento, CTAs, íconos
Blanco         #FFFFFF   texto sobre oscuro
Dorado arena   #C9A96E   acento cálido, separadores
Negro suave    #1A1A2E   overlay del hero
Azul footer    #0D1F3C
Gris claro     #F8F9FA   fondos alternos
```

Tipografía: **Montserrat** (títulos Bold/ExtraBold, botones SemiBold en
mayúsculas) + **Open Sans** (cuerpo Regular/Light).

Referencia visual declarada: `destinosentreazules.com`.
Tono: exclusividad y aventura seria — **no turismo masivo**. Mucho espacio en
blanco, la fotografía manda, el texto es corto.

## 6. Mapa del sitio

Español en la raíz, inglés bajo `/en`:

| ES | EN |
| --- | --- |
| `/` | `/en` |
| `/nuestros-viajes` | `/en/our-trips` |
| `/isla-coiba` | `/en/coiba-island` |
| `/por-que-pixvae` | `/en/why-pixvae` |
| `/nuestro-equipo` | `/en/our-team` |
| `/galeria` | `/en/gallery` |
| `/faq` | `/en/faq` |
| `/blog`, `/blog/[slug]` | `/en/blog`, `/en/blog/[slug]` |
| `/contacto` | `/en/contact` |

Homepage = 11 secciones (hero, barra de confianza, próximas salidas, por qué
Coiba, ventaja Pixvae, equipo, galería preview, testimonios, FAQ preview,
CTA final, footer). Detalle sección por sección en el PDF §5.

## 7. Requisitos técnicos que exige el PDF

- Bilingüe real: URLs separadas por idioma, todo traducido.
- SEO: meta title (≤60) y description (≤160) únicos por página, alt text,
  sitemap.xml, robots.txt, **GA4** y **Meta Pixel**.
- Rendimiento: imágenes WebP ≤300KB, video hero ≤15MB sin audio,
  **PageSpeed >80 mobile / >90 desktop**, lazy loading.
- WhatsApp flotante 56px (60px mobile) en todas las páginas, pulso cada 4s.
- Barra de cupos "X de 12 disponibles"; al llegar a 0 el botón cambia a
  "Lista de espera". **Editable por Jhon sin tocar código** (ver
  `05-open-questions.md` Q3).

## 8. Contenido pendiente del lado del fundador

El PDF lo declara explícitamente — no es deuda nuestra, es insumo que falta:

- Fotos reales de Coiba (mientras tanto: stock Unsplash/Pexels).
- Fotos y bios definitivas de Pacho y Sebastián.
- **Números de certificación PADI** de ambos (placeholder `PADI #XXXXX`).
- **Años de experiencia reales de Pacho y de Sebastián, por separado.** El PDF
  atribuye "+25 años" a los dos en la FAQ #5 pero solo a Pacho en su ficha.
  Ver `08-content-integrity.md` CI-3.
- **Testimonios reales** de clientes anteriores de Pacho (texto + foto).
  ⚠️ Ver `05-open-questions.md` Q1 — hay testimonios inventados en Wix hoy.
