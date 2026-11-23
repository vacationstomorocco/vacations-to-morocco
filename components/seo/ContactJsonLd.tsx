export default function ContactJsonLd() {
  const SITE_URL = "https://vacationstomorocco.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact/#webpage`,
        "url": `${SITE_URL}/contact`,
        "name": "Contact Vacations to Morocco | Plan Your Morocco Trip",
        "description":
          "Contact Vacations to Morocco to plan your private Morocco trips, Sahara Desert adventures, Marrakech journeys, and personalized travel experiences.",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`
        }
      },
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        "name": "Vacations to Morocco",
        "url": SITE_URL,
        "telephone": "+212668422869",
        "email": "vacationstomorocco@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "MA"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+212668422869",
          "email": "vacationstomorocco@gmail.com",
          "contactType": "customer service",
          "availableLanguage": ["English", "French", "Arabic"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        }
      }
    ]
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