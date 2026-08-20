/** Human booking flow — inspired by Entre Azules, our numbers. */
export const bookingSteps = [
  {
    n: "01",
    es: { t: "WhatsApp", d: "Pides plaza en la fecha que te interesa. Te confirmamos si hay lugar." },
    en: { t: "WhatsApp", d: "Ask for a spot on the date you want. We confirm if it's open." },
  },
  {
    n: "02",
    es: { t: "Anticipo 50%", d: "Con la plaza confirmada, pagas el 50% (transferencia / Zelle / PayPal). Ahí el cupo es tuyo." },
    en: { t: "50% deposit", d: "Once the spot is confirmed, you pay 50% (transfer / Zelle / PayPal). The seat is yours." },
  },
  {
    n: "03",
    es: {
      t: "Seguro de anulación",
      d: "Recomendado, lo contratas tú. Cubre imprevistos tuyos. Si cancelamos nosotros (menos de 10 personas), te devolvemos el 100% sin póliza.",
    },
    en: {
      t: "Cancellation insurance",
      d: "Recommended; you buy it. It covers your own surprises. If we cancel (fewer than 10 people), you get 100% back without a policy.",
    },
  },
  {
    n: "04",
    es: { t: "Grupo WhatsApp", d: "Desde 6 personas en esa salida abrimos el grupo para coordinar. El viaje se confirma al llegar a 10." },
    en: { t: "WhatsApp group", d: "From 6 people on that departure we open the group. The trip confirms at 10." },
  },
  {
    n: "05",
    es: { t: "Saldo 50%", d: "El resto, 15 días antes de la salida." },
    en: { t: "Balance 50%", d: "The rest, 15 days before departure." },
  },
] as const;
