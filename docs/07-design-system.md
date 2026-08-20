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

El PDF fija px exactos con un salto de **52px → 32px** y nada en medio. La
tablet cae justo en ese hueco.

Solución: `clamp()` fluido entre los dos extremos que el PDF ya declara.

```css
--fs-hero: clamp(2rem, 5vw + 0.5rem, 3.25rem);   /* 32px ↔ 52px */
--fs-sub:  clamp(1.25rem, 2vw + 0.5rem, 1.75rem); /* 20px ↔ 28px */
```

Da exactamente 32px en mobile y 52px en desktop — **honra los números del PDF
en ambos extremos** en lugar de contradecirlos — y llena el intermedio.

## 4. Reglas que se convierten en gate

Se implementan en `verify:a11y` dentro de `verify:all` (fase 0):

1. Ningún par fondo/texto por debajo de **4.5:1** (3:1 para texto ≥24px).
2. `#00B4CC` como color de texto **prohibido** sobre fondos claros.
3. Todo `<img>` con `alt` (requisito del PDF §9).
4. Foco visible en todo elemento interactivo — el CTA turquesa necesita un
   anillo de foco que se vea contra el turquesa.

Un gate automático porque esto reaparece cada vez que se añade un componente.
Detectarlo a mano una vez no sirve de nada.
