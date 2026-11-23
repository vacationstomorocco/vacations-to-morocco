interface FAQItem {
  question: string;
  answer: string;
}

interface DayTripJsonLdProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  price?: number | string;
  priceCurrency?: string;
  duration?: string; // e.g. "PT10H" (10 Hours)
  itinerary?: Array<{ title: string; description: string }>;
  faqs?: FAQItem[];
}

export default function DayTripJsonLd({
  title,
  description,
  image,
  slug,
  price,
  priceCurrency = "EUR",
  duration = "PT10H",
  itinerary = [],
  faqs = [],
}: DayTripJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const tripUrl = `${SITE_URL}/trips/${slug}`;
  const imageUrl = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image?.startsWith("/") ? "" : "/"}${image || "picture/all-morocco-tours.webp"}`;

  const graphItems: any[] = [
    // 1. TouristTrip Schema (Day Excursion)
    {
      "@type": "TouristTrip",
      "@id": `${tripUrl}/#trip`,
      "name": title,
      "description": description,
      "url": tripUrl,
      "image": imageUrl,
      "touristType": ["Day Trippers", "Couples", "Families", "Private Groups"],
      "duration": duration,
      "provider": {
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
      ...(price && Number(price) > 0
        ? {
            "offers": {
              "@type": "Offer",
              "price": price,
              "priceCurrency": priceCurrency,
              "availability": "https://schema.org/InStock",
              "url": tripUrl,
            },
          }
        : {}),
      ...(itinerary.length > 0
        ? {
            "itinerary": {
              "@type": "ItemList",
              "numberOfItems": itinerary.length,
              "itemListElement": itinerary.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.title,
                "description": item.description,
              })),
            },
          }
        : {}),
    },

    // 2. Breadcrumbs
    {
      "@type": "BreadcrumbList",
      "@id": `${tripUrl}/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Day Trips",
          "item": `${SITE_URL}/trips`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": tripUrl,
        },
      ],
    },
  ];

  // 3. FAQ Schema (if available)
  if (faqs.length > 0) {
    graphItems.push({
      "@type": "FAQPage",
      "@id": `${tripUrl}/#faq`,
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graphItems,
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