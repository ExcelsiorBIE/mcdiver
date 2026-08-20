# 06 — Registro de decisiones

## 2026-08-20

### D1 — Abandonar Wix y desarrollar a medida
**Decidió:** Jhon (fundador).
**Razón:** *"queda muy cerrado"*. Wix no permite el pipeline de despliegue
automático que quiere, ni control real sobre rendimiento y SEO.

### D2 — Repo nuevo desde cero, no continuar `Scuba-Panama`
**Decidió:** Jhon.
**Razón:** instrucción explícita — *"vamos a abandonar totalmente el desarrollo
actual y repo actual, vamos a arrancar de cero"*.
**Consecuencia:** `Scuba-Panama` (marca "Coiba Expeditions") queda archivado.
Sus ~69 cambios sin commitear no se migran. Este repo parte del PDF.

### D3 — El PDF es la fuente de verdad; Wix es referencia
**Decidió:** el equipo, dentro del encargo de Jhon.
**Razón:** el capture mostró que Wix está en ~15% y buena parte de lo que hay
es plantilla ajena al negocio (kayak, surf, "Coastal Wilderness"). El PDF
describe el sitio completo y es más reciente.
**Ver:** `01-wix-capture.md` §3.

### D4 — No migrar los testimonios de Wix
**Decidió:** el equipo. **Pendiente de confirmación del fundador (Q1).**
**Razón:** el PDF dice que los testimonios están pendientes de conseguir, así
que los tres firmados que aparecen en Wix son casi con certeza relleno de
plantilla. Publicar reseñas inventadas con nombre propio en un sitio comercial
dirigido a clientes en USA es publicidad engañosa (FTC Endorsement Guides).
**Reversible:** si Jhon confirma que son reales, entran sin más.

### D5 — Next.js 16 + Vercel
**Decidió:** el equipo.
**Razón:** el requisito de despliegue automático se resuelve nativo (push a
`main` → producción) y el objetivo de PageSpeed >90 es alcanzable con SSG +
`next/image` sin trabajo extra.
**Nota:** Next 16 renombró `middleware.ts` a `proxy.ts` y `params` ahora es
Promise. Verificado contra `node_modules/next/dist/docs/`.

### D6 — Español sin prefijo, inglés bajo `/en`, con slugs traducidos
**Decidió:** lo fija el PDF §3.
**Consecuencia:** no sirve el i18n por defecto de Next. Requiere `proxy.ts` con
rewrite y un mapa canónico de rutas (`content/routes.ts`) del que se generan
sitemap, hreflang y el toggle de idioma.

### D7 — Push directo a `main` para contenido; preview para estructura
**Decidió:** el equipo, derivado del requisito de Jhon.
**Razón:** *"cualquier cambio → deploy automático"* es incompatible con
aprobación por PR. La seguridad la dan los gates de CI, no la revisión humana.
**Ver:** `03-deploy-automation.md` §3.

### D8 — Sin pasarela de pagos en el lanzamiento
**Decidió:** lo fija el PDF §10.
**Razón:** el objetivo del sitio es capturar el lead; Jhon cobra manualmente
por transferencia/Zelle/PayPal. Stripe/PayPal es fase 2.

### D9 — Texto oscuro sobre los fondos turquesa y dorado
**Decidió:** el equipo. **Pendiente de confirmación del fundador (Q7).**
**Razón:** blanco sobre `#00B4CC` da 2.50:1 y sobre `#C9A96E` da 2.24:1, contra
el mínimo WCAG AA de 4.5:1. Con texto `#1A1A2E` suben a 6.82:1 y 7.62:1.
Corrige el CTA principal del sitio sin tocar ni uno de los cinco colores del PDF.
**Hallazgo de:** Scuba Web Designer. Ratios recalculados y confirmados.
**Ver:** `07-design-system.md`.

### D10 — Escala tipográfica fluida entre los extremos del PDF
**Decidió:** el equipo.
**Razón:** el PDF fija 52px desktop / 32px mobile y no dice nada del intermedio,
donde cae la tablet. Un `clamp()` entre esos dos valores da exactamente los
números del PDF en ambos extremos y resuelve el hueco.

### D11 — El número de WhatsApp vive en `content/site.ts`, no en una variable de entorno
**Decidió:** el equipo, **corrigiendo** una propuesta de Scuba Web Designer.
**Razón:** el objetivo correcto es que el número exista escrito una sola vez, y
eso lo cumple `content/site.ts`. Pero una variable de entorno es para *secretos*,
y este número es información pública de contacto: aparece en el HTML servido y
en el enlace `wa.me` pase lo que pase. Meterlo en `.env` no lo protege de nada y
sí añade una forma de que el build salga sin número de teléfono.

### D12 — Ninguna cifra sin fuente en copy de cara al cliente
**Decidió:** el equipo. **Q8 pendiente con el fundador.**
**Razón:** el PDF se contradice a sí mismo — §5.4 anuncia "30m+ visibilidad
promedio" mientras su propia FAQ #8 dice "hasta 30m" y solo de diciembre a mayo.
Las dos frases van publicadas en el mismo sitio. Regla general: toda cifra en
copy de cara al cliente necesita fuente o se reemplaza por un dato verificable.
Aplica también a los números PADI y a los testimonios (D4).
**Catálogo completo de las cinco contradicciones:** `08-content-integrity.md`.

### D13 — Un solo tamaño para los títulos de sección
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** el PDF los especifica a 40px, 38px, 38px y 36px. Tres tamaños para
un mismo nivel jerárquico; a esas diferencias no se percibe jerarquía, se
percibe descuido. Jerarquía por espacio o por color de fondo, no por 2px.

### D14 — Dos tokens de ritmo vertical para todo el sitio
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** en 779 líneas el PDF da **un** valor de espaciado (`gap: 16px` entre
dos botones) mientras declara "mucho espacio en blanco" como el centro de la
estética. Sin especificar significa inventado en cada una de las 19 secciones.
`--section-y` y `--section-y-tight`, sin tercera opción.

### D15 — Se elimina "Completamente" de la respuesta sobre seguridad
**Decidió:** el equipo. **Se le informa a Jhon, no se le pregunta.**
**Razón:** afirmación de seguridad absoluta sobre buceo recreativo, por escrito,
en el sitio que vendió el viaje. El resto de la respuesta (operaciones
reguladas, briefing, divemaster en el agua) es cierto y suficiente. No existe
versión defendible de la alternativa, así que no es una decisión del fundador.
**Ver:** `08-content-integrity.md` CI-4.

### D16 — Un módulo nombrado dos veces es un componente con variante
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** el PDF describe cada sección de forma independiente, así que seis
módulos aparecen especificados dos veces en vocabularios distintos y solo dos
vienen marcados como compartidos. Dos de ellos llevan datos: el preview de FAQ
de §5.9 son las preguntas 1–4 de §8.6 **palabra por palabra**, y §8.3 es
superconjunto de §5.5 con los tiempos de travesía. Autorados por separado,
divergen en silencio y nada falla.
**Corolario:** toda cifra presente en dos páginas se deriva de una fuente.
**Ver:** `09-component-vocabulary.md`.

### D17 — Se elimina la fila "Costo del combustible" de la comparativa
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** es coste operativo nuestro publicado al huésped, en una tabla que
existe para justificar nuestro itinerario. Invita a *"¿por qué no es más
barato entonces?"* y le muestra el margen a un competidor. Las otras cuatro
filas ya cargan el beneficio para el huésped. Existe una versión defendible
como argumento ambiental (combustible quemado, no dinero), pero habría que
reescribirla; tal como está, se cae.

### D18 — Límites: qué decidimos nosotros y qué le toca a Jhon
**Decidió:** el equipo, a raíz de una propuesta sobre los fondos de sección.
**Razón:** donde el PDF calla decidimos nosotros (espaciado, componentes);
donde se contradice elegimos la versión honesta; donde viola un estándar
medible corregimos. Pero donde el PDF es **explícito** y nuestra objeción es
**estética**, decide Jhon. La alternancia de fondos es de esta última clase:
está especificada sección por sección y "parecen rayas" es criterio, no una
violación como el contraste. Se implementa como pide el PDF y se le propone
la alternativa con capturas después de la aprobación.
**Ver:** `AGENTS.md` § "Dónde podemos decidir".

### D19 — Anillo de foco de dos tonos, y `outline: none` prohibido
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** verificado que **ningún** color sólido pasa 3:1 (WCAG 1.4.11) contra
los cuatro fondos del sitio. `#1A1A2E` falla sobre azul profundo (1.51), blanco
falla sobre los tres fondos claros, el dorado falla sobre todos menos el azul.
El fallo cae en la banda CTA de §5.10, el clic de mayor intención. Un anillo
`#1A1A2E` interior + `#FFFFFF` exterior deja siempre un borde por encima de 3:1.
**Ver:** `10-component-states.md` §1.

### D20 — `disabled` con tokens propios, nunca con `opacity`
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** `opacity: .5` sobre el botón turquesa deja el texto en **2.08:1**
(y 2.58 si el alpha va solo al texto). El alfa no sobrevive a un requisito de
contraste: no atenúa, hace ilegible.

### D21 — El dorado NO sirve como color de aviso
**Decidió:** el equipo, **corrigiendo** una propuesta de Scuba Web Designer.
**Razón:** se propuso reutilizar `#C9A96E` como color de warning por cercanía
cromática. Da **2.24:1** sobre blanco y 2.12 sobre `#F8F9FA` — falla justo en
los fondos donde vive el formulario. Solo pasa sobre azul profundo. Se añaden
tres tokens semánticos contrastados (`#C0392B`, `#1E7A4F`, `#8A6D1F`), y todo
estado lleva icono y texto además de color: el color confirma, nunca informa
por sí solo.

---

## 2026-08-20 — Respuestas del fundador

### D22 — El repo vive en la organización `ExcelsiorBIE`
**Decidió:** Jhon. *"migralo totalmente a mi organización ExcelsiorBIE, tal
como teníamos el anterior, nada debe quedar bajo el de Christian."*
**Consecuencia:** el proyecto es suyo desde el primer día, no de un colaborador.
El proyecto de Vercel se conecta a su cuenta `jjtorresv@gmail.com`.

### D23 — Fuera la barra de cupos (Q9 = B)
**Decidió:** Jhon.
**Razón:** prefiere no mantener el número al día, y una barra congelada es
escasez fabricada. Las cards llevan solo "Grupos máx. 12 personas", que es
cierto y no envejece. Resuelve CI-5 entero — desaparecen de una vez la etiqueta
ambigua, la barra invertida y el choque con el mínimo de 10.

### D24 — "Estandarizar, no garantizar" (Q8) — mandato de alcance total
**Decidió:** Jhon.
**Razón:** *"no vamos a prometer nada que nos reclamen luego... la naturaleza
no es predecible."* Es una autorización general, no la respuesta a una pregunta.
**Consecuencia:** ninguna afirmación sobre fauna, visibilidad, clima o
condiciones se escribe en indicativo de certeza. Se describe lo que **habita**
Coiba y **cuándo es más probable**, nunca lo que el huésped **verá**. Vuelve
aplicables CI-1, CI-2, CI-4, CI-6 y la regla de alt text sin volver a preguntar.

### D25 — Botón CTA con texto oscuro (Q7 = A)
**Decidió:** Jhon. La paleta de cinco colores queda intacta; solo cambia el
color del texto encima. Confirma D9.

### D26 — Lanzamiento en dos etapas: `.vercel.app` primero, dominio al final
**Decidió:** Jhon, y es la propuesta correcta.
**Razón:** el sitio se construye y se aprueba sobre una URL gratuita de Vercel
con `noindex`; `mcdiver.co` no se toca hasta que haya algo que merezca vivir
ahí. Aprueba mirando el sitio real, no capturas, y el DNS pasa de ser un
bloqueo inicial a un paso de cinco minutos al final.
**Consecuencia:** **la Fase 1 deja de estar bloqueada.**
**Ver:** `03-deploy-automation.md` §8.

### D27 — Los testimonios de Wix eran falsos: confirmado (Q1)
**Decidió:** Jhon. *"No son testimonios reales."* Confirma D4. Módulo vacío
hasta que entregue reseñas reales.

### D28 — El `src` del video no existe en el HTML inicial
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** `autoplay` **anula** `preload="none"` — un `<video autoplay muted
loop preload="none">` se descarga igual. La combinación se lee correcta y no
hace nada. El poster `<img>` es el LCP; el `<source>` se adjunta después del
`load`, y no se adjunta en absoluto bajo reduced-motion, ahorro de datos, red
lenta o viewport < 768px.
**Ver:** `12-loading-empty-error.md` §1.

### D29 — `100svh` en el hero, no `100vh`
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** en móvil, `100vh` es el viewport **sin** la barra del navegador, así
que el hero de §5.1 renderiza más alto de lo visible y el indicador de scroll
cae bajo el pliegue en la primera pantalla del sitio. Se conserva su número;
se corrige la unidad.

### D30 — Una sección sin contenido no se renderiza, y los fondos se derivan
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** un título de testimonios sobre un contenedor vacío anuncia la
ausencia justo donde el comprador busca prueba social, y "próximamente" es una
promesa que D24 prohíbe. Cero testimonios → la sección no existe en el DOM.
**Corolario:** al desaparecer §5.8 (`#F8F9FA`), la galería y la FAQ (ambas
blancas) quedan adyacentes y la alternancia se rompe sola. Por eso el fondo se
deriva de la **secuencia renderizada**, no del número de sección.
**No contradice D18:** el PDF especifica fondos asumiendo que todas las
secciones existen; sobre la ausencia calla, y el silencio es nuestro.

### D31 — El modal de reserva usa `<dialog>` nativo, no uno hecho a mano
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** §7 pone el formulario en un modal que se abre desde "Reservar mi
lugar" — la ruta de conversión principal. `<dialog>` con `showModal()` trae
trampa de foco, `Escape`, fondo inerte y capa superior correctos de fábrica;
un modal a mano casi siempre falla la trampa de foco de forma sutil. Además,
al renderizar en la capa superior, el FAB de WhatsApp **no puede** quedar
encima del formulario — la colisión de docs/10 §6.2 se vuelve imposible en
vez de evitada.

### D32 — El mensaje de confirmación del formulario es una región viva
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** sin `role="status"` (éxito) o `role="alert"` (error) y el foco
movido a él, un usuario de lector de pantalla envía el formulario de reserva
y no escucha ninguna confirmación — no sabe si acaba de reservar un viaje.

### D33 — `hidden="until-found"` en los paneles de la FAQ
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer. **Verificado
contra MDN.**
**Razón:** el contenido colapsado de un acordeón es invisible para "buscar en
la página" del navegador; con 15 preguntas, alguien busca "seguro" y no
encuentra la pregunta 6 aunque la responda. En navegadores que no reconocen
`until-found`, el atributo degrada al `hidden` normal — el contenido sigue
oculto, sin riesgo de quedar visible por accidente. Mejora gratis.

### D34 — Modal, lightbox y menú móvil comparten una regla de foco
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** los tres son *dialog*; el acordeón es *disclosure* y se excluye a
propósito — no debe atrapar el teclado. Una regla de apertura/cierre de foco
aplicada tres veces, no tres implementaciones que divergen.
**Ver:** `13-interaction-patterns.md`.

### D35 — El header nunca se oculta al hacer scroll
**Decidió:** el equipo, leyendo el PDF literalmente. **Hallazgo de:** Scuba
Web Designer.
**Razón:** §4 dice *"siempre visible al hacer scroll"* — no es silencio sobre
"ocultar al bajar", es una prohibición explícita del patrón más común en
headers actuales. Se documenta como regla dura para que no se añada como
default "de buen gusto" en seis semanas.

### D36 — El disparador del header se lee de la posición del hero, no de un píxel fijo
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer.
**Razón:** *"transparente sobre el hero"* implica una comprobación de
posición; un scroll-Y fijo queda mal en cada altura de hero (100vh/60vh/40vh)
y en cualquier hero futuro. `IntersectionObserver` contra el propio
`boundingClientRect` del hero — una implementación, correcta en todas las
alturas.

### D37 — El header interior arranca sólido, no transparente, donde no hay overlay garantizado
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer (con corrección
de cita — el 70% de overlay citado para `/isla-coiba` §8.2 pertenece en
realidad a §5.4, una sección del homepage; el hero real de §8.2 no tiene
overlay especificado, sumando tres páginas interiores sin overlay:
isla-coiba, por-que-pixvae, nuestro-equipo).
**Razón:** el header ya pasa a sólido `#1B3A6B` al hacer scroll (§4); en las
páginas cuyo hero no tiene overlay garantizado, arranca sólido desde
`scroll=0` en vez de apostar la legibilidad del logo/menú a una foto de stock
que todavía no se ha elegido (§10). No añade tokens nuevos.
**No es pregunta al fundador (D18):** no es un cambio estético a algo que el
PDF fija explícitamente — es negarnos a depender de una foto sin elegir para
un requisito de legibilidad. Misma clase que D9, no la alternancia de fondos.

### D38 — El toggle de idioma es dos `<a>` con `aria-current`, más señal visual
**Decidió:** el equipo. **Hallazgo de:** Scuba Web Designer (semántica ya
implementada correctamente en `components/LanguageToggle.tsx`; se añadió el
subrayado que faltaba para usuarios videntes).
**Razón:** D6 hace del toggle navegación real a una URL traducida, no un
cambio de estado del lado del cliente — un `role="switch"` implicaría un
comportamiento que no ocurre. Dos enlaces simples dan Tab/Enter correctos
gratis. `aria-current="page"` marca el idioma activo estructuralmente; el
subrayado se lo confirma a quien ve la pantalla — color/peso nunca informa
solo (misma regla que D21, aplicada a navegación).
**Pendiente para Fase 3/4:** posición del toggle dentro del menú móvil — cerca
de arriba del panel, porque el idioma es precondición para leer el resto del
menú. La línea móvil de §4 no lo menciona; se documenta para que no quede a
criterio de quien construya el hamburguesa.
