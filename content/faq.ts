/**
 * Las 15 FAQ del PDF §8.6. Preguntas #1, #2, #3, #4, #8, #9, #10, #11, #12,
 * #13, #14, #15 traducidas fielmente. Preguntas #5, #6, #7 reescritas por
 * Scuba Web Designer bajo el mandato "estandarizar, no garantizar" (D24):
 *
 *   #6 CI-4 — se elimina "Completamente"; se añade una frase que nombra el
 *      riesgo real en vez de negarlo.
 *   #7 CI-2 — de lista de avistamientos a descripción de hábitat y temporada,
 *      abre con el propio marco estacional de la #8. Sin promesa de avistamiento.
 *   #5 CI-3 — los 25+ años y "fundador" quedan solo en Pacho, que es lo que
 *      sostiene su propia ficha (§5.6). Sebastián: [pendiente] hasta que
 *      Jhon entregue sus años reales. Ver docs/08-content-integrity.md CI-3.
 *
 * Las 4 primeras alimentan el preview de la homepage (§5.9 = §8.6 1–4,
 * palabra por palabra — D16, ver docs/09 §1.1). SIEMPRE `faqs.slice(0, 4)`.
 */
export type FaqItem = { es: { q: string; a: string }; en: { q: string; a: string } };

export const faqs: FaqItem[] = [
  {
    es: {
      q: "¿Qué nivel de buceo necesito para ir a Coiba?",
      a: "Mínimo Open Water Diver (certificación básica). El plan de 7 días tiene algunas inmersiones que recomiendan Advanced Open Water.",
    },
    en: {
      q: "What diving level do I need for Coiba?",
      a: "Minimum Open Water Diver certification. The 7-day plan includes some dives where Advanced Open Water is recommended.",
    },
  },
  {
    es: {
      q: "¿Qué pasa si el grupo no se llena?",
      a: "Si el viaje no alcanza el mínimo de 10 personas, te devolvemos el 100% de tu anticipo. Sin complicaciones.",
    },
    en: {
      q: "What happens if the group doesn't fill up?",
      a: "If the trip doesn't reach the minimum of 10 people, we refund 100% of your deposit. No complications.",
    },
  },
  {
    es: {
      q: "¿Cuánto tiempo hay desde Pixvae a los sitios de buceo?",
      a: "Entre 20 y 30 minutos en lancha rápida. Una de las ventajas principales de salir desde Pixvae vs. Santa Catalina (60-90 min).",
    },
    en: {
      q: "How long is the trip from Pixvae to the dive sites?",
      a: "Between 20 and 30 minutes by speedboat. One of the main advantages of departing from Pixvae vs. Santa Catalina (60-90 min).",
    },
  },
  {
    es: {
      q: "¿Cómo hago la reserva y cuándo pago?",
      a: "Llenas el formulario o nos escribes por WhatsApp. Pagas el 50% de anticipo para confirmar tu cupo, y el 50% restante 15 días antes del viaje.",
    },
    en: {
      q: "How do I book and when do I pay?",
      a: "Fill out the form or message us on WhatsApp. You pay a 50% deposit to confirm your spot, and the remaining 50% 15 days before the trip.",
    },
  },
  {
    // CI-3 — pendiente de dato real (docs/00-brief.md §8, docs/08 CI-3)
    es: {
      q: "¿Quiénes son los instructores? ¿Están certificados PADI?",
      a: "Sí. Francisco \"Pacho\" Martínez, instructor PADI con más de 25 años de experiencia y fundador de La Tienda de Buceo El Rodadero en Santa Marta, lidera el equipo. Lo acompaña Sebastián Martínez, instructor PADI [pendiente: años/especialidad], formado en el buceo desde niño.",
    },
    en: {
      q: "Who are the instructors? Are they PADI certified?",
      a: "Yes. Francisco \"Pacho\" Martínez, a PADI instructor with 25+ years of experience and founder of La Tienda de Buceo El Rodadero in Santa Marta, leads the team. He's joined by Sebastián Martínez, PADI instructor [pending: years/specialty], who grew up diving alongside his father.",
    },
  },
  {
    // CI-4 — "Completamente" eliminado, D15/D32
    es: {
      q: "¿Es seguro bucear en Coiba?",
      a: "Operamos en el PNN Coiba con protocolos regulados: briefing completo antes de cada inmersión y un divemaster siempre en el agua. El plan de 7 días incluye seguro de buceo. Como en todo buceo, el riesgo nunca es cero — por eso exigimos certificación mínima y limitamos el grupo a 12 personas.",
    },
    en: {
      q: "Is it safe to dive in Coiba?",
      a: "We operate in PNN Coiba under regulated protocols: a full briefing before every dive and a divemaster always in the water. The 7-day plan includes dive insurance. As with any diving, risk is never zero — which is why we require minimum certification and cap the group at 12.",
    },
  },
  {
    // CI-2 — de lista de avistamientos a hábitat + temporada, D24
    es: {
      q: "¿Qué animales voy a ver?",
      a: "Coiba es uno de los lugares con mayor biodiversidad del Pacífico, y lo que encuentres depende de la temporada y del sitio. De diciembre a mayo el agua está más clara; de junio a noviembre es la ventana en que se avistan con más frecuencia tiburones ballena y ballenas jorobadas en la región. Todo el año hay tiburones de arrecife, mantarrayas, tortugas, bancos de miles de peces, morenas y peces loro — la vida que define cada inmersión, esté o no de temporada lo más buscado.",
    },
    en: {
      q: "What animals will I see?",
      a: "Coiba is one of the most biodiverse places in the Pacific, and what you find depends on season and site. December through May the water runs clearer; June through November is when whale sharks and humpback whales are most often sighted in the region. Reef sharks, manta rays, turtles, schools of thousands of fish, moray eels and parrotfish are there year-round — the life that defines every dive, whale-shark season or not.",
    },
  },
  {
    es: {
      q: "¿Cuándo es la mejor época para visitar?",
      a: "Diciembre a mayo: mejor visibilidad (hasta 30m), aguas más calmadas. Junio a noviembre: temporada de tiburones ballena y ballenas jorobadas, aunque puede haber lluvia. Todo el año hay buceo excepcional.",
    },
    en: {
      q: "When is the best time to visit?",
      a: "December to May: best visibility (up to 30m), calmer waters. June to November: whale shark and humpback whale season, though there can be rain. Diving is exceptional year-round.",
    },
  },
  {
    es: {
      q: "¿El precio incluye el tiquete aéreo?",
      a: "No. El precio incluye todo desde Ciudad de Panamá. El tiquete aéreo lo compras por tu cuenta. Miami a Ciudad de Panamá hay vuelos directos desde $200-350 USD en Copa, American y United.",
    },
    en: {
      q: "Does the price include airfare?",
      a: "No. The price includes everything from Panama City onward. You book your own flight. Miami to Panama City has direct flights from $200-350 USD on Copa, American and United.",
    },
  },
  {
    es: {
      q: "¿Qué equipo debo llevar?",
      a: "Traje de buceo (agua entre 27-29°C, 3mm suficiente), computadora de buceo, máscara y aletas propias si las tienes. BCD y regulador están incluidos en ambos planes.",
    },
    en: {
      q: "What gear should I bring?",
      a: "A wetsuit (water is 27-29°C, 3mm is enough), dive computer, and your own mask and fins if you have them. BCD and regulator are included in both plans.",
    },
  },
  {
    es: {
      q: "¿Puedo ir si es mi primer viaje de buceo?",
      a: "Sí, siempre que tengas certificación Open Water. Si recién te certificaste, el plan de 5 días es ideal para empezar.",
    },
    en: {
      q: "Can I go if this is my first dive trip?",
      a: "Yes, as long as you have Open Water certification. If you just got certified, the 5-day plan is ideal to start.",
    },
  },
  {
    es: {
      q: "¿Hay cobertura de celular en Pixvae?",
      a: "Señal limitada. Es parte de la experiencia de desconectarse. Hay WiFi en el alojamiento para estar en contacto con la familia.",
    },
    en: {
      q: "Is there cell coverage in Pixvae?",
      a: "Signal is limited — part of the experience of disconnecting. There's WiFi at the lodging to stay in touch with family.",
    },
  },
  {
    es: {
      q: "¿Qué pasa si el clima está malo?",
      a: "El Parque Nacional Coiba tiene sitios protegidos aptos para cualquier condición. Nuestros instructores deciden el sitio según las condiciones del día para garantizar tu seguridad.",
    },
    en: {
      q: "What happens if the weather is bad?",
      a: "Coiba National Park has protected sites suited to any condition. Our instructors choose the site based on the day's conditions to keep you safe.",
    },
  },
  {
    es: {
      q: "¿Puedo cancelar mi reserva?",
      a: "Con más de 30 días de anticipación: devolución del 80% del anticipo. Con menos de 15 días: el anticipo no es reembolsable. Cambios de fecha sujetos a disponibilidad sin costo adicional.",
    },
    en: {
      q: "Can I cancel my reservation?",
      a: "More than 30 days out: 80% deposit refund. Less than 15 days out: the deposit is non-refundable. Date changes subject to availability at no extra cost.",
    },
  },
  {
    es: {
      q: "¿Cómo llego a Pixvae desde Miami?",
      a: "Vuelo Miami → Ciudad de Panamá (3.5 hrs). Nosotros coordinamos el traslado terrestre Ciudad de Panamá → Pixvae (aprox. 4-5 hrs) incluido en el precio del plan.",
    },
    en: {
      q: "How do I get to Pixvae from Miami?",
      a: "Fly Miami → Panama City (3.5 hrs). We coordinate the ground transfer Panama City → Pixvae (approx. 4-5 hrs), included in the plan price.",
    },
  },
];

/** §5.9: el preview de la homepage son las preguntas 1–4, sin excepción (D16). */
export const faqPreview = faqs.slice(0, 4);
