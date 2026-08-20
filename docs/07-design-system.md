# 07 — Sistema de diseño: accesibilidad y escala tipográfica

Auditoría de la paleta del PDF §2 antes de escribir una línea de CSS.
Hallazgo original de Scuba Web Designer; ratios recalculados y **confirmados**
de forma independiente con la fórmula de luminancia relativa de la WCAG 2.1.

## 1. La paleta está bien. Tres combinaciones no lo están.

| Ratio | AA (4.5:1) | Combinación | Dónde lo pide el PDF |
| ---: | :---: | --- | --- |
| **2.50:1** | ❌ **FALLA** | `#00B4CC` con texto **blanco** | §5.1 — botón CTA "fondo turquesa, texto blanco" |
| **2.24:1** | ❌ **FALLA** | `#C9A96E` con texto **blanco** | Badge dorado del Plan Completo |
| **2.50:1** | ❌ **FALLA** | Texto `#00B4CC` sobre **blanco** | §5.3 — fechas de las cards |
| 6.82:1 | ✅ | `#00B4CC` con texto `#1A1A2E` | — |
| 7.62:1 | ✅ | `#C9A96E` con texto `#1A1A2E` | — |
| 4.51:1 | ⚠️ justo | Texto `#00B4CC` sobre `#1B3A6B` | §5.2 barra de confianza |
| 11.27:1 | ✅ | `#1B3A6B` con blanco | Navbar, secciones oscuras |
| 16.43:1 | ✅ | `#0D1F3C` con blanco | Footer |
| 16.18:1 | ✅ | `#F8F9FA` con `#1A1A2E` | Secciones claras |

El turquesa `#00B4CC` es un tono medio **brillante**: se comporta como un
color claro, así que necesita texto **oscuro** encima, no blanco. Blanco sobre
turquesa da 2.50:1 cuando la norma pide 4.5:1 — casi la mitad.

**Por qué importa más de lo que parece:** afecta al CTA principal de todas las
páginas — "RESERVAR MI LUGAR", "Ver fechas disponibles". Es el texto más leído
del sitio y el único que produce ingresos.

## 2. La corrección (sin cambiar la paleta)

```
Botón turquesa  #00B4CC  → texto #1A1A2E   6.82:1  ✅
Badge dorado    #C9A96E  → texto #1A1A2E   7.62:1  ✅
Botón azul      #1B3A6B  → texto #FFFFFF  11.27:1  ✅  (sin cambio)
Fechas de card sobre blanco → #1B3A6B en vez de #00B4CC
```

Los cinco colores del PDF se respetan tal cual. Lo único que cambia es **qué
color de texto va encima**. Es la corrección más barata posible.

**El turquesa como texto** solo es legal sobre fondo oscuro: pasa a 4.51:1
sobre `#1B3A6B`, un aprobado sin margen. Regla: nunca sobre blanco, y nunca en
tipografía pequeña — solo en números grandes como los de la barra de confianza
(§5.2), donde el umbral AA para texto grande es 3:1.

**Alternativa, si Jhon quiere blanco sobre turquesa específicamente:** exige un
turquesa más oscuro, `#007A8A` → 5.06:1 con blanco. Eso **sí** es un cambio de
paleta y es decisión suya. Ver `05-open-questions.md` Q7.
*(Verificado: el mínimo que aprueba conservando el matiz es `#008293` a 4.55:1;
`#007A8A` se recomienda sobre ese porque deja margen real.)*

## 3. Escala tipográfica — el hueco de la tablet

El PDF fija px exactos en **dos** viewports (52/32, 28/20) y nada en medio. La
tablet cae justo en ese hueco.

Solución: `clamp()` fluido entre los dos extremos que el PDF ya declara. No
sobrescribe nada — da 52px exactos en desktop y 32px exactos en mobile, e
interpola en vez de saltar.

```css
--fs-display: clamp(2rem,    1.2rem  + 2.8vw,  3.25rem);  /* 32 → 52  tagline hero */
--fs-lead:    clamp(1.25rem, 1.05rem + 0.9vw,  1.75rem);  /* 20 → 28  subtítulo hero */
--fs-h2:      clamp(1.75rem, 1.3rem  + 1.9vw,  2.5rem);   /* 28 → 40  títulos de sección */
--fs-h3:      clamp(1.25rem, 1.15rem + 0.5vw,  1.5rem);   /* 20 → 24  títulos de card */
--fs-price:   clamp(1.75rem, 1.4rem  + 1.5vw,  2.25rem);  /* 28 → 36  precio */
--fs-body:    clamp(1rem,    0.95rem + 0.25vw, 1.125rem); /* 16 → 18  cuerpo */
--fs-small:   0.875rem;                                    /* 14      pies, badges */
```

### 3.1 Una sola medida para los títulos de sección

El PDF especifica los títulos de sección en **tres tamaños distintos**:

| Sección | Tamaño |
| --- | --- |
| §5.3 Próximas Salidas | 40px |
| §5.4 Por qué Coiba | 38px |
| §5.6 Nuestro Equipo | 38px |
| §5.5 Ventaja Pixvae | 36px |

40, 38 y 36 hacen el mismo trabajo. A esas diferencias nadie percibe jerarquía:
38 junto a 40 no se lee como un nivel distinto, se lee como descuido.

**Decisión:** un solo `--fs-h2` para todos. Si una sección tiene que destacar
sobre otra, se hace con **espacio** o con **color de fondo**, no con 2px.

## 4. Ritmo vertical — lo que el PDF nombra pero no numera

Hallazgo verificado: en las 779 líneas del PDF hay **un solo valor de
espaciado**, `gap: 16px` entre los dos botones del hero. Ni un padding, ni un
margin, ni una separación entre secciones. Todo lo demás en px son tamaños de
fuente, dimensiones de foto o el `max-width: 600px` de un párrafo.

Y sin embargo §2 define la estética como *"Simple, limpio, impactante. **Mucho
espacio en blanco**"* y *"Las imágenes son las protagonistas"*.

El espacio en blanco es el corazón declarado del diseño y es la única propiedad
sin número. Con 11 secciones de home y 9 páginas interiores, "sin especificar"
significa **inventado 19 veces**, que es exactamente como se termina con un
py-16 aquí, un py-20 allá y ningún ritmo.

```css
--section-y:       clamp(4rem,   2.5rem + 6vw, 8rem);  /*  64 → 128  separación estándar */
--section-y-tight: clamp(2.5rem, 2rem   + 2vw, 4rem);  /*  40 →  64  bandas acopladas */
--stack-lg: 3rem;     /* entre bloques dentro de una sección */
--stack-md: 1.5rem;   /* entre párrafos */
--stack-sm: 0.75rem;  /* entre etiqueta y valor */
--measure:  62ch;     /* los 600px del PDF, en ch */
```

- **Toda** sección usa `--section-y` o `--section-y-tight`. No hay una tercera.
- `--section-y-tight` es para bandas que pertenecen visualmente a la sección de
  arriba — el caso claro es la barra de confianza (§5.2) bajo el hero.
- `--measure` en `ch` y no en px: el español ocupa ~20% más que el inglés, así
  que 600px fijos dan dos longitudes de línea distintas. En `ch` ambos idiomas
  reciben la misma medida.

Esto es lo que convierte "mucho espacio en blanco" en un sistema en vez de un
estado de ánimo.

## 4. Reglas que se convierten en gate

Se implementan en `verify:a11y` dentro de `verify:all` (fase 0):

1. Ningún par fondo/texto por debajo de **4.5:1** (3:1 para texto ≥24px).
2. `#00B4CC` como color de texto **prohibido** sobre fondos claros.
3. Todo `<img>` con `alt` (requisito del PDF §9).
4. Foco visible en todo elemento interactivo — el CTA turquesa necesita un
   anillo de foco que se vea contra el turquesa.

Un gate automático porque esto reaparece cada vez que se añade un componente.
Detectarlo a mano una vez no sirve de nada.
