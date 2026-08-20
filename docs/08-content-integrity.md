# 08 — Integridad del contenido: el PDF contra sí mismo

El PDF es la fuente de verdad, pero **se contradice a sí mismo en cinco
puntos**, y en todos ellos las dos versiones acaban publicadas en el mismo
sitio. Un visitante abre dos páginas y ve el desacuerdo.

Cada caso: qué dice cada parte, por qué importa, y qué hacemos por defecto.
Todos verificados contra `source/especificaciones-mcdiver-v1.0.txt`.

> Regla general (**D12**): ninguna cifra ni credencial en copy de cara al
> cliente sin fuente. Si falta, se usa el dato verificable o se reemplaza por
> otro que sí lo sea. Nunca un invento plausible.

---

## CI-1 — Visibilidad: "30m+ promedio" vs "hasta 30m, dic–may"

| Dónde | Qué dice |
| --- | --- |
| §5.4, estadística grande | "**30m+** / visibilidad / **promedio**" |
| §8.6 FAQ #8 | "Diciembre a mayo: mejor visibilidad **(hasta 30m)**" |

Un promedio de 30m+ y un máximo de 30m en la mejor temporada son afirmaciones
distintas. La segunda es la honesta.

**Por defecto:** se usa el dato de la FAQ. Propuesta a Jhon para la tercera
estadística: *"jun–nov / temporada de / tiburón ballena"* — verdad, suya, y
vende más. **Q8.**

---

## CI-2 — Fauna: "posibilidad" vs lista definida

| Dónde | Qué dice |
| --- | --- |
| §5.3 Itinerario, Día 3 | "**Posibilidad** de avistamiento de tiburón ballena (temporada)" |
| §8.6 FAQ #7 | *"¿Qué animales voy a ver?"* → "tiburones ballena, mantarrayas gigantes, tiburones martillo, delfines, tortugas..." |

La pregunta es "qué voy a ver" y la respuesta entrega una lista sin
condicional. El itinerario, sobre la misma fauna, dice "posibilidad".

Matiz: la FAQ técnicamente describe la biodiversidad de Coiba, no promete
avistamientos. Pero colocada bajo esa pregunta, se lee como promesa.

**Por defecto:** la FAQ #7 conserva la lista y abre con el marco de la propia
FAQ #8 — la fauna que **habita** Coiba, con la temporada de tiburón ballena
(jun–nov) dicha en la misma respuesta. No se elimina nada; se enmarca.
No requiere decisión de Jhon.

---

## CI-3 — Los años de Sebastián y quién fundó El Rodadero

| Dónde | Qué dice |
| --- | --- |
| §8.6 FAQ #5 | "Francisco 'Pacho' Martínez **y** Sebastián Martínez, instructores PADI con más de **25 años** de experiencia. **Fundadores** de La Tienda de Buceo El Rodadero" |
| §5.6 Card 1 (Pacho) | "Instructor PADI \| **+25 años**" · "**Fundador** de La Tienda de Buceo El Rodadero" |
| §5.6 Card 2 (Sebastián) | "Instructor PADI \| Guía de Inmersiones" — **sin años**, "formado en el buceo desde niño junto a su padre" |
| §5.1 Hero | "Instructor**es** PADI con más de 25 años de experiencia" |

La FAQ atribuye a **ambos** dos cosas que las cards atribuyen **solo a Pacho**:
los 25+ años y la fundación de El Rodadero. El hero repite el plural.

Las credenciales son la categoría donde redondear hacia arriba sale más caro:
son verificables y desmentirlas es trivial.

**Por defecto:** los 25+ años y la fundación quedan atribuidos **solo a Pacho**,
que es lo que su propia ficha sostiene. Sebastián mantiene "Instructor PADI" sin
cifra hasta que Jhon dé sus años reales. El hero pasa a una formulación que es
cierta con un solo instructor veterano.

**Insumo pendiente de Jhon** (junto a los números PADI, ver `00-brief.md` §8):
años reales de Pacho y de Sebastián, por separado.

---

## CI-4 — "¿Es seguro bucear en Coiba?" → "Completamente."

§8.6 FAQ #6. Una afirmación de seguridad **absoluta y sin matiz** sobre buceo
recreativo, por escrito, en el sitio que vendió el viaje.

Todo lo que viene después es bueno y verdadero: operaciones reguladas en el
PNN Coiba, briefing completo antes de cada inmersión, divemaster siempre en el
agua, seguro de buceo incluido en el plan de 7 días.

La palabra "Completamente" no añade información. Convierte detalle operativo
exacto en una garantía que nadie puede dar — y el buceo tiene riesgo
irreducible por definición.

**Por defecto:** se elimina esa palabra. La respuesta arranca directo con las
medidas concretas. Queda **más fuerte**, no más débil: los hechos convencen
más que el adverbio. Se le informa a Jhon; no se le pregunta, porque no hay
versión defendible de la alternativa.

---

## CI-5 — La barra de cupos está invertida y además choca con el mínimo

Tres problemas en un solo elemento (§5.3).

**a) La etiqueta es ambigua.** "8 de 12 cupos **disponibles**" puede leerse
como *8 libres, 4 vendidos* o como *8 vendidos, 4 libres*. Son estados
opuestos del viaje.

**b) La barra contradice su propia etiqueta.** El mock del PDF es:

```
████ ████ ░░░░     ←  "8 de 12 cupos disponibles"
```

Ocho bloques llenos de doce. Si "8 disponibles" significa 8 **libres**, la
barra está pintando la disponibilidad como si fuera ocupación: visualmente
grita *"casi lleno, apúrate"* cuando el dato real es *"queda sitio de sobra"*.
Exactamente al revés.

**c) Choca con el mínimo de 10.** FAQ #2: si el viaje no alcanza **10
personas** se devuelve el 100% del anticipo. Bajo la lectura de "8 vendidos",
ese viaje **todavía no está confirmado** — y la barra lo presenta con el
lenguaje visual de la escasez. El número que significa "puede cancelarse" se
está dibujando como el número que significa "corre".

**Por defecto:** si la barra se construye (**Q9**), lleva estado explícito y no
solo porcentaje:

- `< 10 vendidos` → **"Grupo en formación — N de 10 para confirmar"**
- `≥ 10 vendidos` → **"Viaje confirmado · quedan N cupos"**
- `= 12` → **"Completo — lista de espera"** (el PDF §9 ya pide este)

Convierte el problema en una ventaja: "faltan 2 para confirmar" es un motivo
para reservar más honesto y más urgente que una barra falsa.

---

## Resumen

| # | Necesita a Jhon | Estado |
| --- | --- | --- |
| CI-1 Visibilidad | Sí — **Q8** | Preguntado |
| CI-2 Fauna | No | Regla aplicada |
| CI-3 Credenciales | Sí — dato pendiente | En `00-brief.md` §8 |
| CI-4 "Completamente" | No — se informa | Regla aplicada |
| CI-5 Barra de cupos | Sí — **Q9** | Preguntado |

Solo dos llegaron a la lista de preguntas del fundador. El resto se resuelve
con una regla, y se le informa cuando apruebe. Su atención es un recurso
escaso: se gasta en lo que solo él puede decidir.
