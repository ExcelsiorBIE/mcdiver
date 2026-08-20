# 11 — Media, movimiento, páginas de error y SEO

Hallazgo de Scuba Web Designer. Cifras recalculadas y confirmadas.

---

## 1. El video del hero contra el objetivo de PageSpeed — §9 contra §9

Dos requisitos de la **misma sección**, incompatibles tal como están escritos:

> *"Video hero: máx **15MB**, loop sin audio"*
> *"PageSpeed score objetivo: **>80 mobile, >90 desktop**"*

Tiempo de transferencia de 15 MB, **antes** de decodificar un solo fotograma:

| Tiempo | Conexión |
| ---: | --- |
| **75.0 s** | Throttle mobile de Lighthouse (1.6 Mbps) |
| **12.0 s** | Throttle desktop de Lighthouse (10 Mbps) |
| **10.0 s** | 4G real (12 Mbps) |
| **2.4 s** | Banda ancha 50 Mbps — el umbral "bueno" de LCP es 2.5 s |

El presupuesto solo se cumple con banda ancha buena, con 0.1 s de margen, y
antes de decodificar. **El PDF pone un tope de tamaño que hace imposible la
nota que el propio PDF exige.**

Misma clase que CI-1: su documento, dos afirmaciones, las dos se publican.
Registrado como **CI-6** en `08-content-integrity.md`.

### 1.1 El PDF nunca menciona una imagen poster

Sin poster, el hero no pinta nada hasta que el video bufferiza: 100vh de vacío
en la primera pantalla del sitio.

### 1.2 La solución, con los números del propio PDF

| Pieza | Tamaño | Mobile 1.6 Mbps | Desktop 10 Mbps |
| --- | ---: | ---: | ---: |
| Poster WebP | ≤300 KB *(su tope de §9)* | 1.50 s | **0.24 s** |
| Video graduado | ~2.5 MB @720p | *no se carga* | 2.00 s |

- El **poster es el elemento LCP** y pinta de inmediato.
- El video lleva `preload="none"` y se engancha **después** del LCP, con
  `muted playsinline loop`.
- Se gradúa a **2–3 MB** a 1280×720. Los 15 MB son un **techo que nadie debe
  acercarse a tocar**, no una meta.
- En mobile se mantiene la foto estática, como el PDF ya pide con buen criterio.

Los dos requisitos se cumplen y **no se sobrescribe ninguna cifra suya**.

### 1.3 La alternativa que el PDF ofrece es peor

§9 dice *"o embed de YouTube"*. Cuesta ~1 MB de JavaScript de terceros, bloquea
contra un origen ajeno, y **deja cookies antes del consentimiento** — cuestión
de RGPD en un sitio dirigido a Miami con visitantes europeos. Un MP4 propio con
poster gana en todos los ejes, incluida la nota de PageSpeed.

---

## 2. Movimiento: cuatro cosas se animan solas, ninguna tiene condición de parada

Inventario de la homepage tal como está especificada:

| # | Elemento | Origen |
| --- | --- | --- |
| 1 | Video loop del hero | §5.1 |
| 2 | Flecha de scroll animada | §5.1 |
| 3 | **Carrusel automático de testimonios** | §5.8 |
| 4 | Pulso del FAB cada 4 s | §6 |

### 2.1 El carrusel automático es un fallo de conformidad, no una preferencia

**WCAG 2.2.2 (Pause, Stop, Hide) es nivel A** — el más bajo que existe.
Cualquier cosa que se actualice sola durante más de 5 segundos necesita un
control para pausarla.

Un carrusel que auto-avanza sin pausa **falla el nivel A**. No es criterio
estético como la alternancia de fondos: es incumplimiento medible, así que cae
del lado nuestro según `AGENTS.md` § "Dónde podemos decidir".

**Por defecto:** control de pausa visible, y parada bajo
`prefers-reduced-motion`.

### 2.2 Regla general de movimiento

```css
@media (prefers-reduced-motion: reduce) {
  /* las cuatro se detienen; ningún contenido se pierde */
}
```

Entra en `verify:a11y`: ninguna animación infinita sin su consulta de
reducción de movimiento.

---

## 3. Páginas de error — falta una clase entera de página

El PDF define 10 URLs, incluida `/blog/[slug]`, y **nunca menciona una 404**
ni una página de error. Con un blog y un prefijo de idioma, los 404 no son
hipotéticos: son seguros.

Sin `not-found.tsx`, el visitante recibe el default del framework: sin estilo,
en inglés, sin navegación — en un sitio que es español primero.

**Por defecto:**
- `app/[lang]/not-found.tsx` y `error.tsx`, **bilingües**, con la marca, con
  navegación y con un CTA hacia `/nuestros-viajes`.
- `/blog` con cero artículos: estado vacío redactado, no una rejilla en blanco.

### 3.1 Corrección: no hay migración de URLs que hacer

> Se planteó construir un mapa de redirecciones desde las URLs de Wix. **No
> aplica**, y conviene dejar escrito por qué antes de que alguien lo construya.

- El sitio Wix vive en **`jjtorresv4.wixsite.com/mcdiver`** — un subdominio de
  Wix que **nunca vamos a controlar**. No podemos servir una sola redirección
  desde ahí; solo Jhon, desde dentro de Wix.
- **`mcdiver.co` nunca apuntó a Wix.** Está aparcado en el registrador
  (ver `01-wix-capture.md` §5). No hay continuidad de URL que preservar porque
  nunca hubo un sitio vivo en el dominio.
- El sitio Wix se creó el **19–20 de agosto de 2026** — sus artículos decían
  "1 day ago" el día que lo capturamos. Días de antigüedad, sin enlaces
  entrantes ni presencia real en el índice.

**Lo que sí es real, y va a la Fase 8:** si Wix sigue publicado tras el
lanzamiento, queda un sitio obsoleto compitiendo en búsquedas con precios de
plantilla, la página de kayak y surf, y los testimonios inventados (CI/Q1).
**Jhon tiene que despublicarlo.** Es un elemento de checklist de lanzamiento,
no una tarea de ingeniería.

---

## 4. Modo oscuro: no se construye, pero se declara

El diseño es fotográfico sobre fondos de marca fijos. Un modo oscuro real es
un segundo diseño completo y **no se propone**.

Pero hay que **declarar la postura**:

```html
<meta name="color-scheme" content="light">
```
```css
:root { color-scheme: light; }
```

Sin esto, el auto-dark de Chrome en Android y el modo oscuro forzado de Samsung
Internet **invierten los controles de formulario** — y el formulario es la ruta
de conversión. Una inversión no controlada es cómo un campo de texto acaba
oscuro sobre oscuro.

Una línea; cierra toda una clase de incidencias que jamás reproduciríamos en
nuestros propios dispositivos.

### 4.1 Estilos de impresión *(prioridad baja, valor real)*

Los itinerarios de `/nuestros-viajes` son lo único que la gente imprime de
verdad para viajar. Una hoja de impresión que quite navegación, FAB y video y
conserve el itinerario son ~15 líneas.

---

## 5. Meta titles — medidos contra la regla del propio PDF

Regla de §9: *"Meta title único por página (max 60 caracteres)"*.

| Chars | | Ruta |
| ---: | :---: | --- |
| **61** | ❌ **PASADO** | `/` — *"MCDiver \| Buceo Exclusivo en el Parque Nacional Coiba, Panamá"* |
| 56 | ✅ | `/isla-coiba` |
| 53 | ✅ | `/por-que-pixvae` ← el único sin marca en el título |
| 52 | ✅ | `/nuestros-viajes` |
| 52 | ✅ | `/galeria` |
| 51 | ✅ | `/nuestro-equipo` |
| 51 | ✅ | `/faq` |
| 44 | ✅ | `/contacto` |

La homepage — la que más importa — **rompe su propio límite por un carácter**.

**Por defecto:** *"MCDiver | Buceo Exclusivo en el Parque Nacional Coiba"* →
**53 chars**. No pierde nada: "Panamá" ya está en la meta description y en el H1.

### 5.1 Cobertura: 8 títulos para ~20 páginas

- Faltan `/blog` y `/blog/[slug]` → **10 rutas ES, 8 títulos**.
- **Cero títulos para rutas EN**, aunque §9 exige título único por página y §3
  duplica cada URL en inglés.

**Por defecto:** los títulos EN se redactan como originales, **no traducidos
literalmente** — las palabras clave en inglés no son calcos ("dive trips",
"liveaboard", "Coiba National Park"). El gate `verify:i18n` verifica que toda
ruta tenga título y description en ambos idiomas, y que ninguno pase de 60/160.

---

## 6. El alt text también es contenido — y ahí también aplica D12

§9 exige alt text en todas las imágenes. §10 dice usar stock de Unsplash/Pexels
buscando *"whale shark"*, *"manta ray Pacific"* hasta que lleguen las fotos
reales de Jhon.

Entonces el alt de un tiburón ballena de stock **no puede decir** *"tiburón
ballena en Coiba"*. Es una afirmación factual sobre una foto tomada en otro
sitio, escrita en la única capa que nunca capturamos en pantalla y nunca
revisamos a ojo.

**Regla, añadida a D12:** el alt describe **la imagen**, no el destino que nos
gustaría que mostrara. Foto de stock → alt genérico y verdadero (*"tiburón
ballena nadando en aguas abiertas"*). Cuando lleguen las fotos de Jhon, su alt
sí puede nombrar Coiba.

Es el único lugar donde una afirmación falsa puede quedarse permanentemente
sin que nadie la vea.
