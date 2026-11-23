// src/components/seo/CityToursJsonLd.tsx
import React from "react";

export interface TourItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  duration?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviews?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PlaceEntity {
  name: string;
  sameAs: string;
}

export interface CityToursJsonLdProps {
  cityName: string; // e.g. "Marrakech", "Casablanca", "Fes", "Tangier", "Agadir", "Errachidia", "Ouarzazate", "Essaouira", "Rabat"
  pagePath: string; // e.g. "/Morocco-tours-from-marrakech"
  seoTitle: string;
  seoDescription: string;
  tours: TourItem[];
  faqs?: FAQItem[];
  aboutPlaces?: PlaceEntity[];
  mentionPlaces?: PlaceEntity[];
  datePublished?: string;
  dateModified?: string;
}

// Built-in Knowledge Graph entities for Moroccan Gateway Cities
const MOROCCAN_CITIES_WIKI: Record<string, string> = {
  marrakech: "https://en.wikipedia.org/wiki/Marrakesh",
  casablanca: "https://en.wikipedia.org/wiki/Casablanca",
  fes: "https://en.wikipedia.org/wiki/Fez,_Morocco",
  tangier: "https://en.wikipedia.org/wiki/Tangier",
  agadir: "https://en.wikipedia.org/wiki/Agadir",
  errachidia: "https://en.wikipedia.org/wiki/Errachidia",
  ouarzazate: "https://en.wikipedia.org/wiki/Ouarzazate",
  essaouira: "https://en.wikipedia.org/wiki/Essaouira",
  rabat: "https://en.wikipedia.org/wiki/Rabat",
  chefchaouen: "https://en.wikipedia.org/wiki/Chefchaouen",
  merzouga: "https://en.wikipedia.org/wiki/Merzouga",
};

export default function CityToursJsonLd({
  cityName,
  pagePath,
  seoTitle,
  seoDescription,
  tours,
  faqs = [],
  aboutPlaces = [],
  mentionPlaces = [],
  datePublished = "2025-01-01",
  dateModified = "2025-01-15",
}: CityToursJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const BRAND_NAME = "Vacations to Morocco";
  const cleanPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  const pageUrl = `${SITE_URL}${cleanPath}`;

  // Get canonical Wikipedia URL for the city
  const cityKey = cityName.toLowerCase().trim();
  const cityWikiUrl =
    MOROCCAN_CITIES_WIKI[cityKey] ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(cityName)}`;

  const defaultAbout: PlaceEntity[] = [
    {
      name: cityName,
      sameAs: cityWikiUrl,
    },
    {
      name: "Morocco",
      sameAs: "https://en.wikipedia.org/wiki/Morocco",
    },
    ...aboutPlaces,
  ];

  const graph: Record<string, unknown>[] = [
    // 1. Organization Schema
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/picture/vacations-to-morocco.png`,
      telephone: "+212668422869",
      email: "vacationstomorocco@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marrakech",
        addressRegion: "Marrakech-Safi",
        postalCode: "40000",
        addressCountry: "MA",
      },
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
    },

    // 2. Collection Page / WebPage
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: seoTitle,
      description: seoDescription,
      inLanguage: "en-US",
      datePublished,
      dateModified,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      // AI & Voice Search capability embedded in WebPage
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".hero-description", ".city-tour-intro", ".faq-section"],
      },
      about: defaultAbout.map((place) => ({
        "@type": "Place",
        name: place.name,
        sameAs: place.sameAs,
      })),
      ...(mentionPlaces.length > 0
        ? {
            mentions: mentionPlaces.map((place) => ({
              "@type": "Place",
              name: place.name,
              sameAs: place.sameAs,
            })),
          }
        : {}),
      mainEntity: {
        "@type": "ItemList",
        name: `Private Morocco Trips starting from ${cityName}`,
        numberOfItems: tours.length,
        itemListElement: tours.map((tour, index) => {
          const tourUrl = `${SITE_URL}/tours/${tour.slug.toLowerCase()}`;
          const tourPrice = tour.price && tour.price > 0 ? tour.price : 390;

          return {
            "@type": "ListItem",
            position: index + 1,
            url: tourUrl,
            item: {
              "@type": ["Product", "TouristTrip"],
              "@id": `${tourUrl}/#trip`,
              name: tour.title,
              description: tour.description,
              image: tour.image.startsWith("http")
                ? tour.image
                : `${SITE_URL}${tour.image}`,
              touristType: tour.category || "Private Trip",
              itinerary: tour.duration || "Multi-Day Trip",
              offers: {
                "@type": "Offer",
                url: tourUrl,
                priceCurrency: tour.currency || "EUR",
                price: tourPrice,
                availability: "https://schema.org/InStock",
                seller: {
                  "@id": `${SITE_URL}/#organization`,
                },
              },
              ...(tour.rating && tour.reviews
                ? {
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: tour.rating,
                      reviewCount: tour.reviews,
                      bestRating: 5,
                      worstRating: 1,
                    },
                  }
                : {}),
            },
          };
        }),
      },
    },

    // 3. Breadcrumbs
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Morocco Trips Packages",
          item: `${SITE_URL}/Morocco-tours-packages`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Trips from ${cityName}`,
          item: pageUrl,
        },
      ],
    },
  ];

  // 4. FAQ Schema
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
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