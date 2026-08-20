# 13 — Semántica de interacción: modal, acordeón, lightbox, menú móvil

`docs/10` cubre botones, formularios, cards y el FAB. `docs/09` establece el
acordeón como un componente (`slice(0,4)`) — su **identidad**, no su
**comportamiento**. Cuatro widgets interactivos no tenían especificación de
comportamiento en ninguno de los doce documentos anteriores, y los cuatro
tienen modos de fallo conocidos.

Hallazgo de Scuba Web Designer. Afirmaciones técnicas verificadas contra MDN.

> **Regla compartida:** los cuatro son la misma familia — *disclosure* o
> *dialog* con contenido distinto. Una sola regla de foco/teclado, aplicada
> cuatro veces, en vez de cuatro implementaciones que divergen.

---

## 1. El modal de reserva — el de más riesgo, porque es la ruta de conversión

§7 dice que el formulario aparece *"como modal al hacer clic en 'Reservar mi
lugar'"*. La ruta de conversión principal del sitio es un diálogo, y el manejo
de foco en modales es el lugar clásico donde se rompe específicamente para
usuarios de teclado.

- **`<dialog>` nativo con `showModal()`.** Trampa de foco, `Escape`, fondo
  inerte y capa superior vienen correctos de fábrica. Soporte de base amplio
  (Chrome/Edge/Firefox, Safari 15.4+). Un modal hecho a mano casi siempre
  falla la trampa de foco de forma sutil; es de los pocos casos donde el
  primitivo de la plataforma es estrictamente mejor que construirlo.
- El foco entra al diálogo al abrir y **vuelve al botón que lo abrió** al
  cerrar. Sin esto, cerrar el modal deja al usuario de teclado en la parte de
  arriba del documento, obligado a recorrer toda la página de nuevo.
- **Bloqueo de scroll del fondo.** En iOS Safari, la página detrás de un modal
  se desplaza por debajo si el `body` no queda fijo — el modal parece flotar
  mientras se hace scroll del formulario.
- Etiquetado por su propio encabezado vía `aria-labelledby`, nunca un
  "Dialog" genérico.

### 1.1 El mensaje de confirmación necesita ser anunciado

§7 especifica: *"Mensaje de confirmación en pantalla: ¡Gracias! Te
contactamos en menos de 24 horas."* Si eso se renderiza como texto normal, un
usuario de lector de pantalla **envía el formulario de reserva y no escucha
nada**: ni error, ni éxito, ninguna señal de que el envío hizo algo. No tiene
forma de saber si acaba de reservar un viaje.

```html
<div role="status" aria-live="polite">¡Gracias! Te contactamos en menos de 24 horas.</div>
```

Foco movido al mensaje al confirmar. El error usa `role="alert"`.

Esto no es un caso extremo: es la diferencia entre que un usuario ciego pueda
reservar o no.

### 1.2 El FAB flota encima del modal hecho a mano — nunca del nativo

El FAB de WhatsApp es `position: fixed` en todas las páginas. `<dialog>`
nativo se renderiza en la **capa superior (top layer)** del navegador y gana
siempre. Un modal construido a mano con `z-index` puede terminar con el
círculo verde encima del formulario. Otra razón para el primitivo nativo: la
colisión con el FAB (docs/10 §6.2) **no puede ocurrir**.

---

## 2. Acordeón de FAQ

- `<button aria-expanded>` dentro de un elemento de encabezado, no un `div`
  con `onClick`. Los botones traen Enter/Espacio, foco y semántica de lector
  de pantalla gratis.
- **No** atrapar las flechas del teclado. Una lista de disclosure no es una
  lista de tabs; sobrescribir las flechas rompe el scroll normal de la página.

### 2.1 El problema específico de tener 15 preguntas

**El contenido colapsado de un acordeón es invisible para "buscar en la
página" del navegador.** Un visitante que presiona Cmd+F buscando "seguro" en
una FAQ de 15 preguntas no obtiene resultado aunque la pregunta 6 responda
justo eso — y concluye que el sitio no lo dice. Es un fallo de búsqueda en la
página cuyo único trabajo es responder preguntas.

```html
<div hidden="until-found">...</div>
```

**Verificado contra MDN:** en navegadores que no reconocen el valor
`until-found`, el atributo cae al estado `hidden` normal — el contenido sigue
oculto, simplemente sin la función de revelado al buscar. **No hay riesgo de
que el contenido quede visible por accidente en un navegador antiguo.** Por
eso es gratis añadirlo: mejora en Chromium, degrada con seguridad en el resto.

---

## 3. Lightbox de galería

Mismas reglas de diálogo que el modal, más:

- Flechas para anterior/siguiente, `Escape` para cerrar, el foco vuelve al
  **thumbnail que lo abrió** — no al principio de la rejilla.
- Los botones anterior/siguiente necesitan nombre accesible. Un botón solo
  con ícono se anuncia como "botón", sin más.
- El alt de la imagen del lightbox describe **la fotografía**, no el destino
  — la misma regla del stock (D12/D24) aplica aquí también.
- Los filtros (§8.5) cambian el contenido de la rejilla: el conteo de
  resultados se anuncia en una región viva, o filtrar es silencioso para
  quien no está mirando la rejilla.

---

## 4. Menú hamburguesa móvil (§4)

`aria-expanded` en el disparador, foco hacia el panel al abrir, `Escape`
cierra, el foco vuelve al disparador al cerrar. Misma forma que el modal, y el
mismo fallo si se omite.

---

## Resumen — una regla, cuatro widgets

| Widget | Abre foco hacia | Cierra foco hacia | Tecla de cierre |
| --- | --- | --- | --- |
| Modal de reserva | Primer campo del formulario | Botón "Reservar" que lo abrió | `Escape` |
| Acordeón FAQ | — (no es diálogo) | — | — |
| Lightbox | Imagen / controles | Thumbnail que lo abrió | `Escape` |
| Menú móvil | Primer enlace del panel | Botón hamburguesa | `Escape` |

El acordeón es la excepción deliberada: es *disclosure*, no *dialog* — vive
en el flujo de la página y no debe atrapar el foco ni el teclado.
