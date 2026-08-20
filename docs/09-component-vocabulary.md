# 09 — Vocabulario de componentes

El PDF describe cada sección **de forma independiente**. Por eso el mismo
módulo aparece descrito dos veces, con palabras distintas, en sitios distintos
— y casi nunca dice "esto es el mismo componente".

Construido así, cada pareja se separa en cuanto alguien edita una de las dos.

> **Regla (D16):** un módulo nombrado dos veces es **un** componente con una
> prop de variante. Toda cifra que aparezca en dos páginas se **deriva de una
> sola fuente**, nunca se vuelve a teclear.

Hallazgo de Scuba Web Designer. Verificado línea por línea contra el PDF.

## 1. Los seis módulos duplicados

| Módulo | Homepage | Interior | ¿El PDF dice que son el mismo? |
| --- | --- | --- | --- |
| Card de viaje | §5.3 | §8.1 "expandidas" | ✅ **Sí** — *"igual que homepage"* (l. 488) |
| Card de equipo | §5.6, 3 cards | §8.4 "expandidas" | ✅ **Sí** — *"más info que en homepage"* (l. 528) |
| Acordeón FAQ | §5.9, 4 preguntas | §8.6, 15 preguntas | ❌ No |
| Grid de galería | §5.7, 6 fotos | §8.5, todas + filtros | ❌ No |
| Comparativa Pixvae | §5.5, infografía | §8.3, tabla | ❌ No |
| Banda CTA | §5.10 | §8.2 / §8.4 / §8.5 | ❌ No |

Dos de seis vienen marcados. Los otros cuatro se leen como trabajo nuevo cada
vez. **Dos de esos cuatro llevan datos**, así que la divergencia no sería
cosmética:

### 1.1 Preview de FAQ — cadenas idénticas, no paráfrasis

Las cuatro preguntas de §5.9 son, **palabra por palabra y en el mismo orden**,
las preguntas 1 a 4 de las quince de §8.6:

```
1. ¿Qué nivel de buceo necesito para ir a Coiba?
2. ¿Qué pasa si el grupo no se llena?
3. ¿Cuánto tiempo hay desde Pixvae a los sitios de buceo?
4. ¿Cómo hago la reserva y cuándo pago?
```

Tiene que ser `faqs.slice(0, 4)` desde `content/faq.ts`. Si el preview se
escribe aparte, editar una respuesta en `/faq` deja una copia obsoleta en la
homepage — en la posición de más tráfico del sitio, y sin que nada falle.

### 1.2 Comparativa Pixvae — §8.3 es superconjunto de §5.5

| | §5.5 (home) | §8.3 (interior) |
| --- | --- | --- |
| Tiempo al sitio | 20–30 vs 60–90 min | 20–30 vs 60–90 min |
| Inmersiones/día | *"más inmersiones"* | 3–4 vs 2–3 |
| Desgaste | *"menos cansancio"* | Mínimo vs Alto |
| Acceso exclusivo | — | Sí vs Limitado |

Un solo dataset, dos vistas: la home toma las primeras filas en versión
cualitativa, el interior las muestra todas con cifras. Tecleado dos veces, las
dos páginas acabarán citando tiempos distintos **para el mismo trayecto en
lancha** — y ese número es sobre el que descansa todo el argumento de Pixvae.

## 2. El hero: ocho descripciones, tres alturas

| Página | Qué dice el PDF | Altura |
| --- | --- | --- |
| `/` §5.1 | Video loop, overlay 0.45 | **100vh** |
| `/nuestros-viajes` §8.1 | Foto, overlay azul | **60vh** |
| `/contacto` §8.8 | Fondo azul sólido | **40vh** |
| `/isla-coiba` §8.2 | Foto full-width | ⚠️ *sin especificar* |
| `/por-que-pixvae` §8.3 | Foto desde el mar | ⚠️ *sin especificar* |
| `/nuestro-equipo` §8.4 | Foto grupal | ⚠️ *sin especificar* |
| `/faq` §8.6 | Azul profundo sólido | ⚠️ *sin especificar* |
| `/galeria` §8.5 | Mosaico, sin texto encima | ⚠️ *sin especificar* |
| `/blog` §8.7 | — | 🔴 **no menciona hero** |

Cinco páginas sin altura y una sin hero: seis oportunidades de inventar un
número, en el componente que el visitante ve primero en cada página.

**Un solo `<PageHero>` con cuatro variantes** cubre las ocho y no deja nada
que inventar:

| Variante | Altura | Uso |
| --- | --- | --- |
| `cinematic` | 100vh | Home — video + poster mobile |
| `standard` | 60vh | Páginas con foto: viajes, coiba, pixvae, equipo |
| `compact` | 40vh | Fondo sólido: faq, contacto, blog |
| `plain` | auto | Galería — mosaico, sin texto superpuesto |

## 3. Los otros cuatro

- **Acordeón FAQ** — un `<FaqAccordion items>`; la home le pasa `slice(0,4)`.
- **Grid de galería** — un `<GalleryGrid>`; la home sin filtros y con 6 fotos,
  `/galeria` con filtros y todas.
- **Comparativa** — un `<PixvaeCompare>` sobre `content/pixvae-compare.ts`;
  variante `visual` en la home, `table` en el interior.
- **Banda CTA** — una `<CtaBand>` con título y botones por prop.

## 4. Hallazgo de contenido: la fila del combustible

La tabla de §8.3 incluye:

```
Costo del combustible     Menor          Mayor
```

Es **nuestro coste operativo, publicado al cliente**, dentro de una tabla cuyo
propósito es justificar nuestro itinerario.

Responde a una pregunta que nadie hizo e invita a la que no queremos: *"si tu
combustible cuesta menos, ¿por qué el viaje cuesta igual que desde Santa
Catalina?"*. Y le enseña a un competidor la forma de nuestro margen.

Las otras cuatro filas ya cargan el beneficio **para el huésped**: tiempo,
inmersiones por día, cansancio, acceso exclusivo. Quitarla no le cuesta nada
al argumento.

**Por defecto (D17):** se elimina la fila.

*Matiz:* existe una versión defendible del mismo dato — **menos combustible
quemado = menos huella**, que encaja con el posicionamiento "Eco-Dive" del
material de Wix. Pero eso es un argumento ambiental, no de costes, y habría
que redactarlo como litros quemados y no como dinero ahorrado. Si Jhon quiere
el ángulo ecológico, se reescribe así. Tal como está en el PDF, se cae.

## 5. Ritmo de fondos — **propuesta, no decisión nuestra**

Los fondos de las diez secciones alternan así:

```
oscuro → azul → blanco → oscuro → #F8F9FA → azul → blanco → #F8F9FA → blanco → azul
```

Diez alternancias seguidas se leen como **rayas**, no como ritmo. La
referencia que el propio Jhon dio (`destinosentreazules.com`) no hace esto:
separa con espacio y deja que mande la fotografía.

**Pero esto no lo decidimos nosotros.** Ver `AGENTS.md` § "Dónde podemos
decidir": el PDF especifica el fondo de cada sección de forma explícita, uno
por uno. El espaciado era nuestro porque el PDF callaba; los fondos no callan.

Y esto no es un fallo de estándar como el contraste — es criterio estético.
"Diez alternancias parecen muchas" es una opinión, no una violación.

**Por defecto:** se implementan los fondos **tal como los pide el PDF**. La
reducción de alternancias se le presenta a Jhon como propuesta visual
**después** de que apruebe el plan, con capturas de las dos versiones para que
compare. No se aplica en silencio.
