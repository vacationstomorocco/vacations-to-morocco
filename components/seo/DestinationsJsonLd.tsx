// src/components/seo/DestinationsJsonLd.tsx
import React from "react";

export interface DestinationListItem {
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTour {
  name: string;
  url: string;
  description?: string;
  price?: number;
  currency?: string;
}

export interface PlaceEntity {
  name: string;
  sameAs: string;
}

export interface DestinationsJsonLdProps {
  // Archive/List Page Props
  destinationsList?: DestinationListItem[];

  // Single Destination Page Props
  name?: string;
  description?: string;
  slug?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  tourHighlights?: string[];
  faqs?: FAQItem[];
  relatedTours?: RelatedTour[];
  aboutPlaces?: PlaceEntity[];
  mentionPlaces?: PlaceEntity[];
}

const MOROCCAN_CITIES_WIKI: Record<string, string> = {
  marrakech: "https://en.wikipedia.org/wiki/Marrakesh",
  casablanca: "https://en.wikipedia.org/wiki/Casablanca",
  fes: "https://en.wikipedia.org/wiki/Fez,_Morocco",
  fez: "https://en.wikipedia.org/wiki/Fez,_Morocco",
  tangier: "https://en.wikipedia.org/wiki/Tangier",
  agadir: "https://en.wikipedia.org/wiki/Agadir",
  errachidia: "https://en.wikipedia.org/wiki/Errachidia",
  ouarzazate: "https://en.wikipedia.org/wiki/Ouarzazate",
  essaouira: "https://en.wikipedia.org/wiki/Essaouira",
  rabat: "https://en.wikipedia.org/wiki/Rabat",
  chefchaouen: "https://en.wikipedia.org/wiki/Chefchaouen",
  merzouga: "https://en.wikipedia.org/wiki/Merzouga",
  zagora: "https://en.wikipedia.org/wiki/Zagora,_Morocco",
};

export default function DestinationsJsonLd({
  destinationsList,
  name,
  description,
  slug,
  image,
  latitude,
  longitude,
  region,
  tourHighlights = [],
  faqs = [],
  relatedTours = [],
  aboutPlaces = [],
  mentionPlaces = [],
}: DestinationsJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const BRAND_NAME = "Vacations to Morocco";

  // ============================================================
  // CASE 1: DESTINATIONS ARCHIVE / LIST PAGE (/destinations)
  // ============================================================
  if (destinationsList && destinationsList.length > 0) {
    const pageUrl = `${SITE_URL}/destinations`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}/#webpage`,
          url: pageUrl,
          name: "Top Travel Destinations in Morocco | Vacations to Morocco",
          description:
            "Explore Marrakech, Sahara Desert Merzouga, Fes, Chefchaouen, Essaouira, Casablanca, Agadir, Tangier and more authentic Morocco destinations.",
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: BRAND_NAME,
          },
          breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".lead", ".destinations-grid"],
          },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}/#itemlist`,
          name: "Top Travel Destinations in Morocco",
          numberOfItems: destinationsList.length,
          itemListElement: destinationsList.map((item, index) => {
            const destUrl = `${SITE_URL}/destinations/${item.slug.toLowerCase()}`;
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristDestination",
                "@id": `${destUrl}/#destination`,
                url: destUrl,
                name: item.name,
                description: item.description,
                image: item.image.startsWith("http")
                  ? item.image
                  : `${SITE_URL}${item.image}`,
              },
            };
          }),
        },
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
              name: "Destinations",
              item: pageUrl,
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

  // ============================================================
  // CASE 2: SINGLE DESTINATION PAGE (/destinations/[slug])
  // ============================================================
  if (!name || !slug) return null;

  const cleanSlug = slug.toLowerCase().trim();
  const destUrl = `${SITE_URL}/destinations/${cleanSlug}`;
  const cityWikiUrl =
    MOROCCAN_CITIES_WIKI[cleanSlug] ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;

  const defaultAbout: PlaceEntity[] = [
    { name: name, sameAs: cityWikiUrl },
    { name: "Morocco", sameAs: "https://en.wikipedia.org/wiki/Morocco" },
    ...aboutPlaces,
  ];

  const graph: Record<string, unknown>[] = [
    // 1. WebPage Document
    {
      "@type": "ItemPage",
      "@id": `${destUrl}/#webpage`,
      url: destUrl,
      name: `Visit ${name} Morocco | Travel Guide & Trips`,
      description: description || "",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
      },
      mainEntity: { "@id": `${destUrl}/#destination` },
      breadcrumb: { "@id": `${destUrl}/#breadcrumb` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".lead", ".guide-content", ".faq-section"],
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
      ...(image
        ? {
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
            },
          }
        : {}),
      inLanguage: "en-US",
    },

    // 2. Tourist Destination Schema
    {
      "@type": "TouristDestination",
      "@id": `${destUrl}/#destination`,
      name: `${name}, Morocco`,
      description: description || "",
      url: destUrl,
      sameAs: cityWikiUrl,
      ...(image
        ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` }
        : {}),
      touristType: [
        "Cultural tourism",
        "Adventure tourism",
        "Sightseeing",
        "Desert Expeditions",
      ],
      containedInPlace: {
        "@type": "Country",
        name: "Morocco",
        sameAs: "https://en.wikipedia.org/wiki/Morocco",
      },
      ...(region
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: name,
              addressRegion: region,
              addressCountry: "MA",
            },
          }
        : {}),
      ...(latitude && longitude
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude,
              longitude,
            },
          }
        : {}),
      ...(tourHighlights.length > 0
        ? {
            includesAttraction: tourHighlights.map((item) => ({
              "@type": "TouristAttraction",
              name: item,
            })),
          }
        : {}),
      provider: {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        url: SITE_URL,
      },
    },

    // 3. Breadcrumbs
    {
      "@type": "BreadcrumbList",
      "@id": `${destUrl}/#breadcrumb`,
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
          name: "Destinations",
          item: `${SITE_URL}/destinations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: name,
          item: destUrl,
        },
      ],
    },
  ];

  // 4. Related Tours
  if (relatedTours.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${destUrl}/#related-tours`,
      name: `Popular Private Trips in & from ${name}`,
      numberOfItems: relatedTours.length,
      itemListElement: relatedTours.map((tour, index) => {
        const fullTourUrl = tour.url.startsWith("http")
          ? tour.url
          : `${SITE_URL}${tour.url.startsWith("/") ? tour.url : `/${tour.url}`}`;

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "TouristTrip",
            name: tour.name,
            url: fullTourUrl,
            description: tour.description,
            offers: {
              "@type": "Offer",
              price: tour.price || 390,
              priceCurrency: tour.currency || "EUR",
              availability: "https://schema.org/InStock",
            },
          },
        };
      }),
    });
  }

  // 5. FAQ Schema
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${destUrl}/#faq`,
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