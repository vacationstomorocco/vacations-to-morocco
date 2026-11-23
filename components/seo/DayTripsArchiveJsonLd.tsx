import { DayTrip } from "@/components/DayTripsClient";

interface FAQItem {
  question: string;
  answer: string;
}

interface DayTripsArchiveJsonLdProps {
  dayTrips: DayTrip[];
  faqs: FAQItem[];
}

export default function DayTripsArchiveJsonLd({ dayTrips, faqs }: DayTripsArchiveJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const PAGE_URL = `${SITE_URL}/trips`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Collection Page Schema
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}/#webpage`,
        "url": PAGE_URL,
        "name": "Morocco Day Trips | Same-Day Private Excursions",
        "description": "Book private one-day excursions in Morocco. Leave in the morning and return the same evening.",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
      },
      // 2. Travel Agency representation
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        "name": "Vacations to Morocco",
        "url": SITE_URL,
        "telephone": "+212668422869",
        "email": "vacationstomorocco@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marrakech",
          "addressCountry": "MA",
        },
      },
      // 3. List of Excursions (TouristTrips)
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}/#itemlist`,
        "numberOfItems": dayTrips.length,
        "itemListElement": dayTrips.map((trip, index) => {
          const tripUrl = `${SITE_URL}/trips/${trip.slug}`;
          const fullImageUrl = trip.image.startsWith("http")
            ? trip.image
            : `${SITE_URL}${trip.image.startsWith("/") ? "" : "/"}${trip.image}`;

          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "TouristTrip",
              "@id": `${tripUrl}/#trip`,
              "name": trip.title,
              "description": trip.description,
              "image": fullImageUrl,
              "url": tripUrl,
              "duration": "PT12H", // ISO 8601 representing standard ~12 hour day-trips
              "provider": {
                "@id": `${SITE_URL}/#travel-agency`,
              },
            },
          };
        }),
      },
      // 4. FAQ Schema
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}/#faq`,
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}