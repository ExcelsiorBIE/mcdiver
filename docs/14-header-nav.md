# 14 — Header sticky, overlay del hero y toggle de idioma

Hallazgo de Scuba Web Designer. Afirmaciones verificadas contra
`source/especificaciones-mcdiver-v1.0.txt`, con una corrección de cita.

---

## 1. El header **no** puede ocultarse al hacer scroll — es una prohibición, no un silencio

§4: *"Fija en la parte superior, **siempre visible al hacer scroll**."*

Eso no es neutral sobre el patrón "ocultar al bajar, mostrar al subir" — lo
**descarta explícitamente**. El único movimiento que el PDF especifica es la
transición de fondo de 0.3s, transparente → `#1B3A6B`, según posición de
scroll.

**Vale la pena decirlo como prohibición y no dejarlo implícito**, porque
"ocultar al bajar" es el patrón de header más común en sitios actuales, y "el
PDF no lo menciona" se lee muy distinto de "el PDF lo prohíbe" para quien
construya esto en seis semanas.

> **Regla:** el header **siempre** está en el DOM y visible. Ningún
> `transform: translateY()` que lo saque de pantalla al hacer scroll, bajo
> ninguna circunstancia.

### 1.1 El umbral del disparador — lo que el PDF no responde

*"Transparente sobre el hero"* implica una comprobación de **posición**, no un
número de píxeles fijo — si no, el punto de cambio queda mal en cada altura de
hero (100vh home, 60vh viajes, 40vh contacto) y en cualquier página futura con
un hero de otra altura.

**Decisión:** el disparador se lee del propio `boundingClientRect` del
elemento hero vía `IntersectionObserver`, nunca de un scroll-Y fijo. Una sola
implementación, correcta en todas las alturas de hero, incluidas las que
todavía no existen.

---

## 2. Riesgo de contraste: tres heroes interiores no tienen overlay especificado

Revisar el disparador obligó a revisar sobre **qué** se sienta el header
transparente, y el PDF es desigual.

| Página | Hero según el PDF | Overlay |
| --- | --- | --- |
| §5.1 Home | video/foto | Negro 0.45 ✅ |
| §5.10 CTA final | imagen subacuática | 60% ✅ |
| §5.4 "Por qué Coiba" *(sección del home, no un hero de página)* | vida marina | Azul profundo 70% ✅ |
| §8.1 `/nuestros-viajes` | foto de buceadores | "overlay azul", **sin %** ⚠️ |
| §8.2 `/isla-coiba` | foto aérea/subacuática | **sin overlay** ❌ |
| §8.3 `/por-que-pixvae` | foto desde el mar | **sin overlay** ❌ |
| §8.4 `/nuestro-equipo` | foto grupal | **sin overlay** ❌ |

> **Corrección a la cita original:** se atribuyó el 70% de overlay a
> `/isla-coiba` (§8.2). Verificado contra el texto: ese 70% pertenece a
> **§5.4**, la sección "¿Por qué Coiba?" **del homepage**, una sección
> distinta del hero de la página interior `/isla-coiba`. El hero real de
> §8.2 **no tiene overlay especificado en absoluto**.
>
> Con la cita corregida, el conteo real es **tres** páginas interiores sin
> overlay (`isla-coiba`, `por-que-pixvae`, `nuestro-equipo`), no dos.

El riesgo: §10 dice usar fotos de stock de Unsplash/Pexels — **la foto
todavía no está elegida**, así que nadie puede comprobar a ojo si el logo y
menú blancos sobreviven encima de ella. Un cielo brillante, arena blanca o
espuma justo en la franja de 80px del header, y el logo desaparece.

### 2.1 La solución — D18, no pregunta al fundador

Dos opciones:

- **(a)** Overlay mínimo obligatorio en todo hero que lleve texto de header —
  un piso, no una decoración.
- **(b)** Ya que el header pasa a sólido `#1B3A6B` al hacer scroll de todos
  modos (§4), que **empiece sólido desde `scroll=0`** en las páginas
  interiores que no tienen ya un overlay garantizado por su propia sección
  (es decir, se mantiene transparente-al-cargar solo donde el propio overlay
  del PDF ya lo garantiza: home y CTA final).

**Se adopta (b).** No añade ningún token nuevo y elimina el riesgo en vez de
mitigarlo — no hace falta inventar un porcentaje de overlay para una foto que
todavía no existe.

**Por qué esto es nuestro y no del fundador (D18):** no es un cambio estético
a algo que el PDF decide explícitamente — es negarnos a apostar la legibilidad
del logo y el menú a una foto de stock sin elegir. Misma clase que la
corrección de contraste D9, no la alternancia de fondos. Si Jhon quiere el
momento transparente preservado por marca una vez estén las fotos reales, es
un cambio de dos líneas — se le puede ofrecer entonces, no antes.

---

## 3. Toggle de idioma — semántica correcta, ya implementada; falta la posición móvil

### 3.1 Elemento: dos `<a>`, no un widget con estado

**Ya implementado correctamente en `components/LanguageToggle.tsx`.**

D6 hace de ES|EN navegación real hacia una URL traducida —
`/nuestros-viajes` a `/en/our-trips` —, no un cambio de idioma del lado del
cliente. Un `role="switch"` o control segmentado implica *"cambiar un ajuste
booleano"*, con el comportamiento de teclado (Espacio activa) y el anuncio
("activado/desactivado") que corresponden. Ninguno coincide con lo que
realmente pasa, que es **salir de la página**.

Dos enlaces simples dan el comportamiento de teclado correcto (Tab, Enter)
gratis — mismo razonamiento que `<dialog>` nativo en `docs/13`: usar el
primitivo cuyo comportamiento de fábrica ya coincide con la verdad, en vez de
un widget más vistoso al que hay que enseñarle a mentir menos.

### 3.2 El idioma activo se marca estructuralmente, no solo visualmente

**Ya implementado:** `aria-current="page"` en el enlace del idioma actual.

Se añadió además una señal visual (subrayado) para quien sí ve la pantalla —
antes del ajuste, un usuario vidente no tenía ninguna pista de cuál idioma
estaba activo, solo el atributo ARIA. Misma regla que error/éxito (D21):
**el color confirma, nunca informa solo**, aplicada a navegación en vez de
estado de formulario.

### 3.3 El hueco que quedó al revisar esto: dónde vive el toggle en móvil

La línea móvil de §4 es explícita sobre tres cosas: *"Hamburger menu. Logo
centrado. Botón WhatsApp visible."* El toggle **no** es una de ellas.

No está omitido del sitio — §5.11 lo pone también en el footer, así que es
alcanzable — pero el header calla sobre dónde vive ES|EN una vez que el
layout colapsa a móvil.

**Decisión:** si el toggle vive dentro del panel del hamburguesa, va **cerca
de arriba**, no al final. El idioma es una condición previa para leer el
resto del menú, no un ítem más de él. *(Se construye en Fase 3/4 junto con el
menú móvil; documentado aquí para que no quede a criterio de quien lo
implemente.)*
