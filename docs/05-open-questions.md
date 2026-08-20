# 05 — Preguntas al fundador — ✅ TODAS RESUELTAS

**Respondidas por Jhon el 20 de agosto de 2026.** Ninguna queda abierta.
Los cuerpos de abajo se conservan como registro del razonamiento.

| # | Pregunta | Respuesta de Jhon |
| --- | --- | --- |
| **Q1** | ¿Los testimonios de Wix son reales? | **NO son reales.** → se eliminan; módulo vacío hasta tener reseñas reales |
| **Q2** | ¿Correo de los leads? | **jjtorresv@gmail.com** "por ahora" |
| **Q3** | ¿Cómo editas los cupos? | **A** — nos lo pide por DM; sin CMS |
| **Q4** | ¿DNS? | **GoDaddy**, él es dueño y admin; ejecuta los cambios que le indiquemos o nos da acceso |
| **Q5** | ¿Cuenta de Vercel? | **La suya**, ya creada, `jjtorresv@gmail.com` |
| **Q6** | ¿Nombre del repo? | Se mantiene `mcdiver`, **pero migrado a la organización `ExcelsiorBIE`** |
| **Q7** | ¿Botón CTA? | **A** — texto oscuro `#1A1A2E` sobre turquesa; paleta intacta |
| **Q8** | ¿Fuente del "30m+ promedio"? | **Sin fuente → se corrige.** Ver mandato abajo |
| **Q9** | ¿Barra de cupos? | **B** — **sin barra**; solo "Grupos máx. 12 personas" |

## 🔑 Mandato de honestidad (Q8) — aplica a todo el sitio

Instrucción literal del fundador:

> *"Por favor todo lo que encuentres contradictorio corrígelo a lo real, no vamos
> a prometer nada que nos reclamen luego, como asegurar que van a ver tiburón
> ballena y ese tipo de cosas, hay que estandarizar todos los textos a nada que
> nos comprometa y nos veamos demandados, la naturaleza no es predecible, así
> que acomoda todo a **estandarizar, no garantizar**."*

Esto es una **autorización general**, no una respuesta a una sola pregunta.
Convierte en aplicables sin volver a preguntar: CI-1, CI-2, CI-3, CI-4, CI-5,
CI-6, la regla de alt text de D12 y cualquier contradicción futura.

**Regla operativa:** *estandarizar, no garantizar.* Ninguna afirmación sobre
fauna, visibilidad, clima o condiciones se escribe en indicativo de certeza.
Se describe lo que **habita** Coiba y **cuándo es más probable**, nunca lo que
el huésped **verá**.

---

## Nueva decisión: lanzamiento en dos etapas *(propuesta del fundador)*

> *"¿no podemos hacer un sitio temporal free en Vercel hasta que yo apruebe
> versión final para salir a productivo y en ese momento sí montamos el DNS al
> dominio mcdiver.co?"*

**Sí, y es exactamente como debe hacerse.** Ver `03-deploy-automation.md` §8.
Adoptado como **D26**.

---

## Registro original de las preguntas

Se conserva el razonamiento de cada una.

---

## 🚨 Q1 — Los testimonios de Wix, ¿son de clientes reales?

**Bloquea:** Fase 2 (contenido) y la sección de testimonios del home.

En el sitio Wix hay tres reseñas firmadas por **Carlos Ruiz**, **Elena Méndez**
y **Ricardo Gómez**. Pero el PDF de especificaciones dice que los testimonios
todavía están pendientes y que *"Jhon los conseguirá y los entregará"*.

Si esos nombres son texto de relleno de la plantilla de Wix, **no podemos
publicarlos**: son reseñas falsas con nombre propio en un sitio que vende
viajes de $1,650 a clientes en Estados Unidos, y eso cae bajo las FTC
Endorsement Guides.

**Nuestra decisión por defecto, si no hay respuesta:** el módulo de
testimonios se construye pero queda **vacío** hasta que lleguen reseñas reales
y atribuibles.

**Lo que necesitamos:** ¿son reales o de relleno? Si son reales, mándanos la
autorización. Si no, mándanos las de los clientes de Pacho en Santa Marta
cuando las tengas.

---

## Q2 — ¿A qué correo llegan los leads?

**Bloquea:** Fase 5 (formulario).

Hay dos correos en circulación y se contradicen:

- PDF §7 y §9: **jjtorresv@gmail.com**
- Footer de Wix: **info@mcdiver.com** — ojo, `.com`, no `.co`

Si `info@mcdiver.com` no existe como buzón real, publicarlo significa perder
todo lead que escriba a esa dirección.

**Lo que necesitamos:** el correo exacto donde quieres recibir las consultas, y
si quieres que además se muestre uno distinto en el sitio de cara al público.

---

## Q3 — La barra de cupos: ¿cómo la editas tú?

**Bloquea:** Fase 2 y el diseño del panel (si lo hay).

El PDF dice que el campo de cupos debe ser *"editable manualmente por Jhon
(sin código)"*. Pero tú también nos pediste que cualquier cambio te lo hagamos
nosotros por DM y se despliegue solo. Son dos interfaces distintas y conviene
elegir una:

- **A —** Nos lo pides por mensaje (*"quedan 6 cupos en el de octubre"*) y en
  minutos está en el sitio. **Cero infraestructura extra.** *(Recomendada.)*
- **B —** Un CMS con panel web donde tú entras y editas cupos, precios, fechas
  y fotos sin pedírnoslo. Cuesta ~1 semana más de desarrollo y una suscripción
  mensual, pero no dependes de nadie.

**Nuestra decisión por defecto, si no hay respuesta:** opción **A**.

---

## Q4 — ¿Quién controla el DNS de mcdiver.co?

**Bloquea:** Fase 1 — sin esto el sitio existe pero no vive en tu dominio.

Verificamos el dominio hoy: **está registrado pero aparcado** en la página del
registrador. No apunta a Wix ni a ningún hosting. No hay nada en producción
que se pueda romper.

**Lo que necesitamos:** en qué registrador está (GoDaddy, Namecheap,
Cloudflare…) y acceso para cambiar los registros DNS — o que tú los cambies
cuando te pasemos los valores exactos.

---

## Q5 — ¿Cuenta de Vercel?

**Bloquea:** Fase 1.

El plan gratuito alcanza de sobra para este sitio. El de pago ($20/mes) da
analítica de verdad y mejores tiempos de build.

**Lo que necesitamos:** ¿usamos una cuenta tuya, o creamos una nueva a nombre
de MCDiver? Preferimos que el proyecto viva en una cuenta que sea tuya, para
que nunca dependas de nosotros para acceder a tu propio sitio.

---

## Q6 — Nombre del repositorio *(menor)*

Creamos el repo local como **`mcdiver`**. Si prefieres otro nombre, se cambia
en un comando. No bloquea nada.

---

## Q7 — El botón turquesa: ¿texto oscuro, o turquesa más oscuro?

**Bloquea:** Fase 0 — define el CTA de todas las páginas. Barato ahora, caro
después de 10 páginas construidas.

El PDF §5.1 pide el botón CTA con **fondo turquesa `#00B4CC` y texto blanco**.
Esa combinación da **2.50:1** de contraste cuando el estándar de accesibilidad
(WCAG AA) exige 4.5:1. Es casi la mitad. El turquesa es un tono brillante: se
comporta como color claro y necesita texto oscuro encima.

Afecta al botón "RESERVAR MI LUGAR" — el texto más leído y el único que
genera ingresos.

- **A —** El botón turquesa lleva **texto oscuro** (`#1A1A2E`) → 6.82:1.
  Tu paleta no cambia en nada, solo el color del texto encima. *(Recomendada.)*
- **B —** Se mantiene el texto blanco pero el turquesa se oscurece a
  `#007A8A` → 5.06:1. Esto **sí** cambia tu paleta y se nota en todo el sitio.

**Nuestra decisión por defecto, si no hay respuesta:** opción **A**.

Detalle completo en `07-design-system.md`.

---

## Q8 — "30m+ de visibilidad promedio": ¿de dónde sale ese número?

**Bloquea:** Fase 3 (sección "Por qué Coiba").

Tu propio PDF se contradice en este dato:

- §5.4, estadística grande en turquesa: **"30m+ / visibilidad / promedio"**
- §8.6, FAQ #8: *"Diciembre a mayo: mejor visibilidad **(hasta 30m)**"*

"Hasta 30m en la mejor temporada" y "30m+ de promedio" no son la misma
afirmación. Y ambas van a estar publicadas en el mismo sitio, donde cualquier
visitante puede compararlas.

Un buzo que llegue en temporada de aguas verdes y encuentre 10m de visibilidad
va a saber que el número era falso. "760+ especies" y el Patrimonio UNESCO son
citables; este no.

→ ¿Tienes una fuente para el promedio? Si no, la tercera estadística puede ser
**"jun–nov / temporada de / tiburón ballena"**, que es verdad, es tuya, y vende
igual o mejor.

**Nuestra decisión por defecto, si no hay respuesta:** usamos el número de tu
propia FAQ — *"hasta 30m, dic–may"* — en lugar del promedio.

---

## Q9 — La barra de cupos, ¿reflejará reservas reales?

Depende de Q3, pero merece decirse aparte porque el riesgo es distinto.

Mostrar "8 de 12 cupos disponibles" con barra de progreso está bien **si el
número es real y lo mantienes al día**. Si se queda congelado en 8 durante
meses, se convierte en escasez fabricada: es falso, y además es de los patrones
que queman la confianza cuando el cliente lo nota.

No hace falta que sea automático — tu PDF dice que tú lo editas manualmente y
eso es perfectamente válido. Lo que hace falta es que lo actualices cuando
entren reservas.

→ Si prefieres no mantenerlo, construimos las cards **sin la barra** y dejamos
solo "Grupos máx. 12 personas", que es igual de cierto y no envejece.

---

## Cosas que ya sabemos que faltan (no son preguntas, son insumos)

El PDF §10 ya las declara. Las anotamos para que no se pierdan:

- Fotos reales de Coiba → mientras tanto usamos stock de Unsplash/Pexels.
- Fotos y bios definitivas de Pacho y Sebastián.
- Números de certificación PADI de ambos → placeholder `PADI #XXXXX`.
- Videos para la galería (2–3 embeds de YouTube).
- Logos PADI y SSI en PNG transparente para el footer.
- Redes sociales: Instagram, Facebook, TikTok, YouTube — faltan las URLs.
