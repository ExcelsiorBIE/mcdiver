# 01 — Captura del sitio Wix y análisis de brechas

**Origen:** https://jjtorresv4.wixsite.com/mcdiver
**Capturado:** 20 de agosto de 2026
**Texto íntegro:** `source/wix-capture-home.txt`, `source/wix-capture-interior-pages.txt`

## 1. Qué hay realmente en Wix

El `sitemap.xml` de Wix declara 10 páginas. Al capturarlas todas, **solo una
tiene contenido real**. Este es el inventario honesto:

| Página Wix | Estado | Contenido |
| --- | --- | --- |
| `/` (Home) | 🟢 **Con contenido** | Hero, 4 badges, 2 cards de viaje, "Por qué Coiba", equipo, 3 testimonios, CTA, footer |
| `/our-trips` | 🟠 **Contenido de plantilla** | "COIBA DEEP DIVE" y "COASTAL WILDERNESS" — **no son los planes reales** |
| `/book-online` | 🔴 **Plantilla ajena** | Wix Bookings de demo: "Scuba Diving $150", "Kayaking Tour $50", "Surfing Lesson $120" |
| `/blog` | 🟠 **Relleno genérico** | 3 artículos de turismo aventura genéricos, nada de Coiba ni buceo |
| `/why-pixvae` | ⚪ **Vacía** | Solo header y footer |
| `/our-team` | ⚪ **Vacía** | Solo header y footer |
| `/gallery` | ⚪ **Vacía** | Solo header y footer |
| `/faq` | ⚪ **Vacía** | Solo header y footer |
| `/contact` | ⚪ **Vacía** | Solo header y footer |
| `/portfolio` | ⚪ **Vacía** | Página de plantilla Wix que ni siquiera pertenece al negocio |

**Conclusión:** Wix aportó ~15% de un sitio. El PDF describe el 100%.
No hay migración de contenido que hacer — hay **redacción** que hacer.

## 2. Lo que sí se rescata de Wix

Copy que suena bien y vale la pena conservar (aunque el PDF tiene variantes):

- Hero: *"El Pacífico más prístino del mundo. A 20 minutos de Pixvae"*
  + *"Explora el Parque Nacional Coiba con expertos PADI."* → CTA `VER VIAJES`
- Los 4 badges de confianza, con mejor redacción que el PDF:
  - **Instructores PADI** — "Certificación internacional y seguridad total."
  - **Equipo Premium** — "Mantenimiento riguroso para tu tranquilidad."
  - **Eco-Dive** — "Compromiso real con la Reserva de Coiba."
  - **Acceso Directo** — "Solo 20 minutos de Pixvae al paraíso submarino."
- Párrafo "Por qué Coiba": *"Explora un ecosistema legendario en Pixvae, el
  secreto mejor guardado de Panamá..."*
- Tagline EN del footer: *"Exclusive dive expeditions to Coiba National Park,
  providing a dynamic and adventurous journey into the world's most pristine
  Pacific waters."*

Los precios y fechas de las cards de Wix **coinciden** con el PDF
(15–19 oct / $1,650 y 5–11 nov / $2,450). Eso está confirmado por dos fuentes.

## 3. Contradicciones Wix vs. PDF — manda el PDF

| # | Wix dice | PDF dice | Resolución |
| --- | --- | --- | --- |
| C1 | `/our-trips`: grupos máx. **6** y máx. **8** | Grupos máx. **12** | **12** (PDF). Wix es plantilla. |
| C2 | `/our-trips`: viaje "Coastal Wilderness, 3 días" | No existe | **Se elimina.** Solo hay 2 planes. |
| C3 | `/book-online`: kayak y surf con precios | MCDiver solo vende buceo | **Se elimina** toda esa página. |
| C4 | Email `info@mcdiver.com` | Email `jjtorresv@gmail.com` | ⚠️ Ver Q2 — necesita decisión. |
| C5 | Dirección: "Pixvae, Veraguas, Panama" | "Miami, FL, USA" + "Operaciones: Pixvae, Panamá" | **Ambas** (PDF). Miami es la cara comercial. |
| C6 | Footer "© 2024" | 2026 | **© 2026**. |
| C7 | Sin toggle ES/EN; mezcla ES y EN en la misma página | Bilingüe real con URLs separadas | **Bilingüe real** (PDF §3, §9). |
| C8 | Blog: 3 artículos genéricos de turismo | 2 artículos específicos de Coiba/Pixvae | **Se descartan** los de Wix; se escriben los 2 del PDF. |
| C9 | Testimonios firmados Carlos Ruiz / Elena Méndez / Ricardo Gómez | "Jhon los conseguirá y los entregará" (pendientes) | 🚨 **BLOQUEANTE — ver Q1.** |

## 4. 🚨 Hallazgo crítico: los testimonios de Wix parecen inventados

El sitio Wix publica hoy tres testimonios con nombre y apellido:

> *«Pixvae es un tesoro escondido. Bucear en Coiba con MCDiver fue la mejor
> experiencia de mi vida. ¡Totalmente prístino!»* — **Carlos Ruiz**
>
> *«La atención personalizada desde Miami hasta Panamá fue impecable. Ver
> tiburones galápagos tan cerca fue increíble.»* — **Elena Méndez**
>
> *«Francisco y Sebastián son instructores de primer nivel. Me sentí seguro y
> asombrado en todo momento en Coiba.»* — **Ricardo Gómez**

El PDF §5.8 y §10 dicen lo contrario: *"Al lanzar, colocar 3 testimonios de
clientes anteriores de Pacho y Sebastián"* y *"Jhon los conseguirá y los
entregará como texto + foto. El desarrollador deja el módulo de testimonios
listo para insertar."*

Es decir: al escribir el PDF, los testimonios reales **todavía no existían**.
Los de Wix son casi con certeza texto de relleno de plantilla.

**No los vamos a migrar.** El módulo de testimonios se construye vacío y se
llena cuando Jhon entregue reseñas reales y atribuibles. Reseñas inventadas
con nombre propio en un sitio comercial son publicidad engañosa —
en USA caen bajo las FTC Endorsement Guides. No es un riesgo que valga
$1,650 por cabeza.

Ver `05-open-questions.md` **Q1**.

## 5. Estado del dominio mcdiver.co

Verificado el 20/08/2026:

```
mcdiver.co → 15.197.148.33 / 3.33.130.190   (AWS — parking del registrador)
HTTP 200 → <script>window.location.href="/lander"</script>
```

El dominio **está registrado pero aparcado**. No apunta a Wix ni a ningún
hosting. No hay nada en producción hoy — no hay sitio vivo que romper.
Esto es una ventaja: podemos construir y publicar sin ventana de corte.

Ver `05-open-questions.md` **Q4** (acceso al DNS).
