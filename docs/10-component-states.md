# 10 — Estados de componente: foco, botones, formularios, cards

El PDF especifica **estados en reposo**. No define ni un `hover`, ni un
`focus`, ni un `disabled`, ni un color de error. Lo que no se define aquí se
inventa doce veces durante la implementación.

Hallazgo de Scuba Web Designer. Todos los ratios recalculados y confirmados
de forma independiente (WCAG 2.1 §1.4.3 texto, §1.4.11 no-texto).

---

## 1. Anillo de foco — ningún color sólido funciona

WCAG 1.4.11 exige **3:1 contra los dos colores adyacentes**. Contra los cuatro
fondos reales del sitio:

| Anillo | vs turquesa | vs blanco | vs `#F8F9FA` | vs azul profundo |
| --- | ---: | ---: | ---: | ---: |
| `#1A1A2E` | 6.82 ✅ | 17.06 ✅ | 16.18 ✅ | **1.51 ❌** |
| `#FFFFFF` | **2.50 ❌** | **1.00 ❌** | **1.05 ❌** | 11.27 ✅ |
| `#C9A96E` | **1.12 ❌** | **2.24 ❌** | **2.12 ❌** | 5.03 ✅ |

Todo anillo de un solo color falla en algún lado. Y el fallo cae justo en la
**banda CTA de §5.10** — botón turquesa sobre azul profundo, el clic de mayor
intención del sitio.

### La solución: anillo de dos tonos

```css
--focus-ring: 0 0 0 2px #1A1A2E, 0 0 0 4px #FFFFFF;  /* interior oscuro + exterior claro */
```

| Sobre | Interior `#1A1A2E` | Exterior `#FFFFFF` | Resultado |
| --- | ---: | ---: | --- |
| turquesa | 6.82 ✅ | 2.50 | ✅ delimita el interior |
| blanco | 17.06 ✅ | 1.00 | ✅ delimita el interior |
| `#F8F9FA` | 16.18 ✅ | 1.05 | ✅ delimita el interior |
| azul profundo | 1.51 | 11.27 ✅ | ✅ delimita el exterior |

Sea cual sea el fondo, **al menos un borde del anillo supera 3:1**. Un token,
todos los fondos, cero lógica por sección. Es la razón por la que los
navegadores traen anillos de dos tonos por defecto.

> **`outline: none` está prohibido en este repo.** Sin anillo, quien navega con
> teclado pierde la única señal de dónde está. Si molesta estéticamente se
> cambia su forma, nunca su existencia. Entra en `verify:a11y`.

---

## 2. Estados del botón

El PDF solo da el reposo. El set completo:

| Estado | Fondo | Texto | Ratio |
| --- | --- | --- | ---: |
| default | `#00B4CC` | `#1A1A2E` | 6.82 ✅ |
| hover | `#00A3B8` | `#1A1A2E` | 5.63 ✅ |
| active | `#0093A6` | `#1A1A2E` | 4.65 ✅ |
| focus | igual que el estado actual | + `--focus-ring` | — |
| disabled | token propio | token propio | ver §2.1 |

Se **oscurece** al hover, nunca se aclara: aclarar un turquesa que ya es
brillante empuja el texto hacia el fallo. El anillo de foco es **aditivo** —
se suma al hover, no lo reemplaza.

### 2.1 `disabled` nunca con `opacity`

Verificado, y es peor de lo que parece:

```
opacity: .5 sobre el botón entero  →  2.08:1   ❌
alpha .5 solo sobre el texto       →  2.58:1   ❌
```

`opacity` no sobrevive a un requisito de contraste: convierte texto legible en
ilegible en vez de simplemente atenuarlo. `disabled` lleva **sus propios
tokens** de fondo y texto, contrastados como cualquier otro estado.

### 2.2 Tamaño de área táctil

Adoptamos **44×44 px** como mínimo.

*Precisión, porque conviene citarlo bien:* el mínimo **WCAG 2.2 AA** (SC 2.5.8)
es 24×24; los 44×44 son el nivel **AAA** (SC 2.5.5) y la guía de Apple. Los
tomamos como estándar propio porque el PDF declara el sitio *mobile-first*.

Caso concreto que hoy no llega: **"Ver itinerario completo ↓"** (§5.3) es un
enlace de texto de ~20px de alto. Necesita padding vertical hasta 44.
El FAB de WhatsApp a 56/60 ya cumple.

---

## 3. La paleta no tiene colores de estado

§7 especifica un formulario con campos obligatorios y mensaje de éxito. §2
define cinco colores: azul profundo, turquesa, blanco, dorado arena, negro
suave.

**No hay color de error. Ni de éxito. Ni de aviso.** Nada en la paleta dice
"esto salió mal".

Quien construya el formulario primero inventará un rojo. Ese rojo no estará en
la documentación, no habrá pasado por contraste, y no coincidirá con el
siguiente rojo que invente otro.

### Tokens semánticos

| Token | Valor | vs blanco | vs `#F8F9FA` |
| --- | --- | ---: | ---: |
| `--color-error` | `#C0392B` | 5.44 ✅ | 5.16 ✅ |
| `--color-success` | `#1E7A4F` | 5.31 ✅ | 5.04 ✅ |
| `--color-warning` | `#8A6D1F` | 4.90 ✅ | 4.65 ✅ |

> **Corrección a la propuesta original:** se sugirió reutilizar el dorado
> `#C9A96E` como color de aviso. **No funciona.** Sobre blanco da **2.24:1** y
> sobre `#F8F9FA` da 2.12 — falla justo en los fondos claros donde viven los
> formularios. Solo pasa sobre azul profundo (5.03). El dorado se queda como
> acento decorativo; el aviso necesita el tono oscuro `#8A6D1F`, que conserva
> la familia cromática y sí contrasta.

### Nunca solo color

Alrededor del 8% de los hombres tiene alguna deficiencia de visión del color,
mayoritariamente rojo-verde. Un borde rojo y uno verde pueden ser
indistinguibles.

**Todo estado lleva icono + texto además del color.** El color confirma; nunca
informa por sí solo.

---

## 4. Campos de formulario

Nada de esto está en el PDF, y cada punto es un fallo real:

- **Etiquetas visibles y permanentes.** No `placeholder` como etiqueta: el
  placeholder desaparece al enfocar, justo cuando el usuario escribe y más
  necesita saber qué campo es. Los lectores de pantalla los tratan de forma
  inconsistente. §7 lista los nombres de campo pero nunca dice que sean
  `<label>`.
- **Obligatorios:** `*` **más** `aria-required`, y una línea que explique qué
  significa el asterisco. Un asterisco solo es una convención, no un enunciado.
- **"WhatsApp (con código de país)"** — la pista va en la etiqueta, que es lo
  correcto. Se mantiene como texto de ayuda **permanente** bajo el campo, no
  como placeholder que se esfuma.
- **Errores en línea**, junto al campo, **al salir del campo** (`blur`). Ni un
  resumen arriba, ni validación en cada tecla.
- Altura mínima 44px. Mismo `--focus-ring` que los botones.

---

## 5. Anatomía de las cards de viaje

- **Altura igual con el CTA anclado abajo.** Las dos cards llevan distinto
  número de filas de características, y el español ocupa ~20% más que el
  inglés. Sin columna flex y `margin-top: auto` en el CTA, los dos botones
  "RESERVAR MI LUGAR" quedan a alturas distintas — y **a alturas distintas
  distintas en cada idioma**.
- **El badge ("5 días" / "7 días") es un chip sólido sobre la foto**, no texto
  directamente encima. Texto sobre una foto no tiene contraste garantizado: la
  foto es desconocida en tiempo de build. Chip turquesa/dorado según el PDF,
  con texto `#1A1A2E`.
- **`aspect-ratio: 16/9` reservado antes de cargar**, o la card se recompone y
  todo lo que está debajo salta.
- Un solo set de tokens de espaciado interno: `--stack-md` entre bloques,
  `--stack-sm` dentro de un bloque.

---

## 6. FAB de WhatsApp — dos colisiones que el PDF no puede ver

### 6.1 El pulso necesita `prefers-reduced-motion`

§6 pide *"pulso suave cada 4 segundos"*: una animación **infinita**. Para
usuarios con sensibilidad vestibular el movimiento perpetuo en pantalla
provoca mareo real.

```css
@media (prefers-reduced-motion: reduce) { .fab { animation: none; } }
```

El botón se queda; el pulso se detiene para quien lo pidió a nivel de sistema.

### 6.2 El FAB tapa el CTA principal

El FAB es fijo, abajo a la derecha, 24px del borde, 60px en móvil, **en todas
las páginas**. El CTA de la card de viaje es **de ancho completo**.

En móvil, cuando ese botón entra en la esquina inferior derecha, hay un
círculo verde de 60px encima del botón de conversión principal del sitio.

**Solución:** padding inferior en la pila de cards en móvil, y el FAB se
desplaza cuando hay un CTA primario en viewport (`IntersectionObserver`).
Entra en la checklist de QA móvil de la Fase 3.
