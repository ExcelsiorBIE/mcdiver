/**
 * Guest-facing terms. Numbers from the PDF / FAQ, not from another operator.
 * Structure inspired by destinosentreazules.com/condiciones-generales/
 * (definitions, price, payment, min group, cancel, nature risk) — not a copy
 * of Spanish package-travel law. DRAFT until counsel. D24 honesty applies.
 */
export type LegalBlock = { heading: { es: string; en: string }; body: { es: string; en: string } };

export const termsIntro = {
  es: "Borrador para lectura del viajero. No es un contrato firmado ni asesoría legal. Los importes y plazos coinciden con lo publicado en el sitio (FAQ y fichas de viaje). Un abogado debe revisarlo antes de tratarlo como definitivo.",
  en: "Draft for the traveler to read. Not a signed contract or legal advice. Amounts and deadlines match what the site already publishes (FAQ and trip cards). Counsel should review before treating this as final.",
};

export const termsBlocks: LegalBlock[] = [
  {
    heading: { es: "1. Quién organiza", en: "1. Who organizes" },
    body: {
      es: "MCDiver lo organiza Jhon Torres desde Miami (Rescue Diver, no instructor). Las inmersiones en el PNN Coiba las ejecuta el equipo de instructores PADI en Pixvae / Bahía Honda. El sitio web informa y capta el lead; el cierre de cupo y el cobro se hacen por WhatsApp y transferencia / Zelle / PayPal, no con pasarela en esta etapa.",
      en: "MCDiver is organized by Jhon Torres from Miami (Rescue Diver, not an instructor). Dives in Coiba National Park are run by the PADI instructor team in Pixvae / Bahía Honda. The website informs and captures the lead; confirming a spot and payment happen on WhatsApp and bank transfer / Zelle / PayPal — no payment gateway at this stage.",
    },
  },
  {
    heading: { es: "2. Qué es el viaje", en: "2. What the trip is" },
    body: {
      es: "Vendemos grupos cerrados de buceo con tanque: Plan Coiba Esencial (5 días / 8 inmersiones) y Plan Coiba Completo (7 días / 14 inmersiones), máximo 12 personas. El tiquete aéreo no forma parte del precio. El detalle de incluye / no incluye está en cada ficha de viaje; si hay duda, manda esa ficha por WhatsApp y la confirmamos por escrito.",
      en: "We sell closed-group tank diving: Coiba Essential (5 days / 8 dives) and Coiba Complete (7 days / 14 dives), 12 people maximum. Airfare is not in the price. Includes / excludes live on each trip card; if anything is unclear, send that card on WhatsApp and we confirm in writing.",
    },
  },
  {
    heading: { es: "3. Precio", en: "3. Price" },
    body: {
      es: "El precio publicado en el sitio es por persona, en USD. Incluye lo listado en la ficha (transporte terrestre Ciudad de Panamá ↔ Pixvae, alojamiento del plan, inmersiones, entrada al parque, BCD y regulador, instructor/divemaster, comidas según el plan). No incluye tiquete aéreo, bebidas personales, buceo nocturno (salvo que se pague aparte), neopreno si no está en el plan, ni extras. El Plan Completo incluye seguro de buceo; el Esencial no.",
      en: "The price on the site is per person, in USD. It includes what the trip card lists (ground transfer Panama City ↔ Pixvae, lodging for the plan, dives, park fee, BCD and regulator, instructor/divemaster, meals as stated). It does not include airfare, personal drinks, night dives (unless paid extra), a wetsuit if the plan doesn't include it, or extras. The Complete plan includes dive insurance; Essential does not.",
    },
  },
  {
    heading: { es: "4. Cómo se paga", en: "4. How you pay" },
    body: {
      es: "50% de anticipo para confirmar el cupo. El 50% restante, 15 días antes de la salida. Si no llega el saldo a tiempo, el cupo puede liberarse. Te indicamos el método (transferencia / Zelle / PayPal) por WhatsApp.",
      en: "50% deposit to hold the spot. Remaining 50% 15 days before departure. If the balance doesn't arrive on time, the spot may be released. We send the method (transfer / Zelle / PayPal) on WhatsApp.",
    },
  },
  {
    heading: { es: "5. Mínimo de grupo", en: "5. Group minimum" },
    body: {
      es: "Si el viaje no llega a 10 personas, te devolvemos el 100% del anticipo. Sin penalización. Es la regla que ya está en la FAQ.",
      en: "If the trip doesn't reach 10 people, we refund 100% of the deposit. No penalty. Same rule as the FAQ.",
    },
  },
  {
    heading: { es: "6. Si cancelas tú", en: "6. If you cancel" },
    body: {
      es: "Más de 30 días antes de la salida: devolución del 80% del anticipo. Menos de 15 días: el anticipo no se reembolsa. Cambios de fecha, si hay cupo, sin cargo extra. Entre 15 y 30 días: escríbenos y lo vemos caso por caso — el PDF no fija un tercer tramo y no lo inventamos aquí.",
      en: "More than 30 days before departure: 80% of the deposit back. Less than 15 days: the deposit is not refundable. Date changes, if there's space, at no extra fee. Between 15 and 30 days: write us and we take it case by case — the source sheet doesn't set a third band and we don't invent one here.",
    },
  },
  {
    heading: { es: "7. Naturaleza y buceo", en: "7. Nature and diving" },
    body: {
      es: "Coiba es un parque, no un acuario. No prometemos tiburón ballena, visibilidad fija ni un sitio concreto. Los instructores eligen el sitio según el mar del día. Hace falta certificación Open Water (Advanced recomendado en algunas inmersiones del plan de 7 días). El riesgo de bucear no es cero; por eso el grupo es pequeño y hay briefing y divemaster en el agua.",
      en: "Coiba is a park, not an aquarium. We don't promise whale sharks, a set visibility, or a specific site. Instructors pick the site from that day's sea. Open Water certification is required (Advanced recommended on some 7-day dives). Diving risk is not zero; that's why the group is small and there is a briefing and a divemaster in the water.",
    },
  },
  {
    heading: { es: "8. Confirmación", en: "8. Confirmation" },
    body: {
      es: "El cupo queda en firme cuando llega el anticipo y te lo confirmamos por WhatsApp. Hasta entonces la fecha puede llenarse. Si un servicio en destino no se puede confirmar, te proponemos una alternativa o devolvemos lo pagado de ese servicio.",
      en: "The spot is firm when the deposit arrives and we confirm on WhatsApp. Until then the date can fill. If a service in destination can't be confirmed, we offer an alternative or refund what you paid for that service.",
    },
  },
];

export const privacyBlocks: LegalBlock[] = [
  {
    heading: { es: "Qué datos pedimos", en: "What we ask for" },
    body: {
      es: "Si nos escribes por WhatsApp o correo: nombre, teléfono, y lo que nos cuentes del viaje (plan, fechas, certificación). No hay cuenta de usuario en el sitio. No vendemos listas.",
      en: "If you write on WhatsApp or email: name, phone, and what you tell us about the trip (plan, dates, certification). There is no user account on the site. We don't sell lists.",
    },
  },
  {
    heading: { es: "Para qué", en: "What for" },
    body: {
      es: "Solo para cotizar, confirmar cupo y coordinar el viaje. El correo de leads es jjtorresv@gmail.com. WhatsApp: +1 305 904 3587.",
      en: "Only to quote, confirm a spot and coordinate the trip. Lead email is jjtorresv@gmail.com. WhatsApp: +1 305 904 3587.",
    },
  },
  {
    heading: { es: "Tus derechos", en: "Your rights" },
    body: {
      es: "Puedes pedir que borremos tu conversación o tus datos escribiendo al mismo WhatsApp o correo. Este texto es un aviso corto, no un dictamen de privacidad de un abogado.",
      en: "You can ask us to delete your thread or data on the same WhatsApp or email. This is a short notice, not a lawyer's privacy opinion.",
    },
  },
];
