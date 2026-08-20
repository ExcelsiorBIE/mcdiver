import { site } from "@/content/site";
import { trips } from "@/content/trips";
import { faqs } from "@/content/faq";

export function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.brand,
    url: `https://${site.domain}`,
    email: site.email,
    telephone: site.whatsapp.e164,
    address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
  };
  const products = trips.map((t) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.name.es,
    description: t.name.en,
    offers: {
      "@type": "Offer",
      price: t.priceUsd,
      priceCurrency: "USD",
      availability: t.seats === "open" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
  }));
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.es.q,
      acceptedAnswer: { "@type": "Answer", text: f.es.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      {products.map((p) => (
        <script key={p.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
