# 12 — Carga del video, estados vacíos y páginas de error

Hallazgo de Scuba Web Designer. Cierra el hueco que dejaban `11` §1 (el video)
y `11` §3 (las páginas de error), ahora que Q1 y Q9 confirman que habrá
secciones que **no se rendericen**.

---

## 1. El video del hero — la trampa que invalida el plan obvio

> **`autoplay` anula `preload="none"`.**

Un `<video autoplay muted loop preload="none">` **se descarga igual**, de
inmediato. `preload` es solo una sugerencia y `autoplay` la contradice: el
navegador no puede empezar a reproducir sin cargar. La combinación se lee
correcta y no hace nada.

Por eso el `src` del video **no puede existir en el HTML inicial**.

### 1.1 Secuencia correcta

| # | Paso |
| --- | --- |
| 1 | **El hero es un `<img>`**, no el video. Poster WebP ≤300 KB (tope de §9), `fetchpriority="high"` y `<link rel="preload" as="image">`. Es el elemento **LCP** y pinta en ~0.24 s en el throttle desktop. |
| 2 | Un componente cliente pequeño adjunta el `<source>` **después de `load`** y reproduce. Sin `src` en el SSR, nada compite con el poster por ancho de banda. |
| 3 | **El poster es un fotograma del propio video**, no otra foto. Si no, el cambio es un salto visible en cada carga. |
| 4 | **Nunca se adjunta** si: `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, `effectiveType` 2g/3g, o viewport < 768px (su regla de mobile). No "adjuntar y pausar" — el objetivo es **no descargar** 3 MB. |
| 5 | Codificación: 1280×720, loop de 6–10 s, 2–3 MB, y **se elimina la pista de audio**, no se silencia. Silenciar sigue enviando los bytes. |

> **Precisión sobre el paso 4:** `navigator.connection` es la Network
> Information API — existe en Chrome/Edge/Android, **no** en Safari ni Firefox.
> Es mejora progresiva, no puede ser la única puerta. La regla de viewport
> < 768px sí cubre móvil en todos los navegadores y es la que hace el trabajo.

> **Precisión sobre el paso 5:** se quita la pista de audio **y además se
> mantiene el atributo `muted`**. Chrome permite autoplay si el video está
> muteado *o* no tiene audio, pero Safari ha sido inconsistente históricamente.
> Quitar la pista ahorra bytes; conservar el atributo evita depender de esa
> interpretación.

### 1.2 `100vh` rompe el hero en móvil

§5.1 pide **100vh**. En Safari y Chrome de móvil, `100vh` es la altura del
viewport **sin** la barra del navegador — así que el hero se renderiza **más
alto que lo que se ve**, y el indicador de scroll queda **por debajo del
pliegue**. En la primera pantalla del sitio.

```css
height: 100vh;   /* fallback */
height: 100svh;  /* small viewport height: con la barra visible */
```

Su número, la unidad correcta.

---

## 2. Estados vacíos — ahora son una decisión de diseño con filo de honestidad

Con Q1 (testimonios falsos → fuera) y Q9 (barra de cupos → fuera), el sitio
tiene módulos que **pueden no renderizar nada**. Qué hacen en ese caso importa.

### 2.1 Testimonios: no renderizar nada. Ni placeholder, ni "próximamente".

Un título que diga *"Lo que dicen quienes han buceado con nuestro equipo"*
sobre un contenedor vacío es **peor que no tener la sección**: anuncia la
ausencia justo en el punto donde un comprador busca prueba social.

Y *"próximamente"* es una promesa sobre contenido cuyo calendario no
controlamos — exactamente el tipo de promesa pequeña que el mandato D24 quiere
fuera.

**Cero testimonios → la sección no existe en el DOM.**

### 2.2 Consecuencia arquitectónica: los fondos se derivan del render

Los fondos que especifica el PDF alrededor de esa sección:

| Sección | Fondo |
| --- | --- |
| §5.7 Galería preview | Blanco |
| §5.8 **Testimonios** | `#F8F9FA` |
| §5.9 FAQ preview | Blanco |

Si §5.8 no renderiza, **dos secciones blancas quedan adyacentes** y la
alternancia que el propio PDF especifica se rompe sola.

**Regla:** el fondo de cada sección se **deriva de la secuencia realmente
renderizada**, no se escribe fijo por número de sección. Vale para cualquier
sección que pueda vaciarse.

> **Sobre D18:** esto no contradice "los fondos los decide Jhon". El PDF
> especifica los fondos **asumiendo que todas las secciones existen**; no dice
> nada sobre qué pasa cuando una falta. Ahí el PDF calla, y el silencio es
> nuestro. Derivar la alternancia **honra su intención** en un caso que su
> documento no previó.

### 2.3 `/blog` sin artículos: se oculta del navbar, la ruta sigue respondiendo

§4 pone "Blog" en el navbar. Un enlace de navegación que lleva a una página
vacía es peor primera impresión que un enlace ausente, y un `/blog` vacío e
indexado es *thin content*.

- Entrada de navbar: solo si `posts.length >= 1`.
- **La ruta existe y responde igual** — ocultar el enlace no garantiza que
  nadie llegue.
- Mientras esté vacío: `noindex` y **fuera del `sitemap.xml`**.

Copy útil, no disculpa, y sin prometer nada:

| | |
| --- | --- |
| **ES** | *"Todavía no hay artículos publicados."*<br>*"Mientras tanto, las preguntas frecuentes cubren lo esencial sobre bucear en Coiba."*<br>→ **[Ver preguntas frecuentes]** |
| **EN** | *"No articles published yet."*<br>*"In the meantime, the FAQ covers the essentials about diving Coiba."*<br>→ **[See the FAQ]** |

Deliberadamente **no** se nombran los artículos que pensamos escribir.
*"Estamos preparando guías sobre la temporada de tiburón ballena"* es una
promesa pequeña, y las promesas pequeñas son las que se hacen sin darse cuenta.

---

## 3. Páginas de error

### 3.1 Copy

| | |
| --- | --- |
| **ES 404** | *"Esta página no existe."*<br>*"Puede que el enlace esté roto o que la página haya cambiado de dirección."*<br>→ **[Ir al inicio]** **[Ver nuestros viajes]** |
| **EN 404** | *"This page doesn't exist."*<br>*"The link may be broken, or the page may have moved."*<br>→ **[Go to homepage]** **[See our trips]** |

Dos salidas, no una: inicio para orientarse, viajes porque es lo que venían
buscando. El 500 sigue la misma forma — sin stack trace y sin el código de
error como titular.

### 3.2 Tiene que ser consciente del idioma

Un sitio español-primero cuyo 404 responde en inglés es el framework hablando
en lugar del negocio. Y el 404 es, desproporcionadamente, donde aterriza el
visitante perdido.

**Implementación en Next 16:**

- `app/[lang]/not-found.tsx` y `app/[lang]/error.tsx` — cubren la mayoría,
  porque `proxy.ts` reescribe todo lo que no lleva `/en` hacia `/es/...`, así
  que un `/loquesea` inexistente llega al árbol de idioma con `lang` resuelto.
- `app/not-found.tsx` como **red de seguridad** para las rutas que el `matcher`
  del proxy excluye. En español, que es el idioma principal.

Entra en la aceptación de la Fase 4: las dos páginas de error, en los dos
idiomas, con navegación y marca.
