export default function AboutJsonLd() {
  const SITE_URL = "https://vacationstomorocco.com";
  const PAGE_URL = `${SITE_URL}/about`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${PAGE_URL}/#webpage`,
        "url": PAGE_URL,
        "name": "About Us | Vacations to Morocco – Local Team & Private Trips",
        "description":
          "Discover Vacations to Morocco, your trusted local partner for private trips in Morocco. Explore Marrakech, Sahara Desert adventures, old imperial cities, and authentic cultural journeys.",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
        "about": {
          "@id": `${SITE_URL}/#travel-agency`,
        },
      },
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        "name": "Vacations to Morocco",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/picture/vacations-to-morocco.png`,
        },
        "image": `${SITE_URL}/picture/all-morocco-tours.webp`,
        "description":
          "Vacations to Morocco is a licensed local tour operator offering private custom Morocco trips, Sahara desert camel treks, and authentic cultural travel experiences.",
        "telephone": "+212668422869",
        "email": "vacationstomorocco@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marrakech",
          "addressCountry": "MA",
        },
        "areaServed": {
          "@type": "Country",
          "name": "Morocco",
        },
        "knowsAbout": [
          "Morocco Tourism",
          "Private Morocco Trips",
          "Sahara Desert Camel Trekking",
          "Marrakech Excursions",
          "Fes & Imperial Cities Itineraries",
          "Custom Tailor-Made Morocco Travel",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}/#breadcrumb`,
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
            "name": "About Us",
            "item": PAGE_URL,
          },
        ],
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