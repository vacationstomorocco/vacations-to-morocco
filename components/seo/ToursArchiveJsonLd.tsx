// src/components/seo/ToursArchiveJsonLd.tsx
import React from "react";

export interface TourArchiveItem {
  id?: number | string;
  title: string;
  slug: string;
  city?: string;
  duration?: string;
  description?: string;
  image?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviews?: number;
  startLocation?: string;
  endLocation?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToursArchiveJsonLdProps {
  tours: TourArchiveItem[];
  faqs?: FAQItem[];
  seoTitle?: string;
  seoDescription?: string;
  pagePath?: string;
}

export default function ToursArchiveJsonLd({
  tours,
  faqs = [],
  seoTitle = "Private Morocco Trips & Luxury Custom Itineraries | Vacations to Morocco",
  seoDescription = "Discover tailor-made Sahara desert trips, old imperial cities, and Atlas mountain excursions. Private guided trips starting from Marrakech, Casablanca, Tangier, Fes, Agadir, Essaouira, Ouarzazate, Errachidia, and Rabat.",
  pagePath = "/tours",
}: ToursArchiveJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const BRAND_NAME = "Vacations to Morocco";
  const cleanPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  const pageUrl = `${SITE_URL}${cleanPath}`;

  // Deduplicate tours by slug
  const uniqueTours = Array.from(
    new Map(tours.map((t) => [t.slug.toLowerCase().trim(), t])).values()
  );

  const graph: Record<string, unknown>[] = [
    // 1. Organization / Agency Node
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/picture/vacations-to-morocco.png`,
        caption: BRAND_NAME,
      },
      image: `${SITE_URL}/picture/all-morocco-tours.webp`,
      telephone: "+212668422869",
      email: "vacationstomorocco@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Derb Dabachi, Medina",
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

    // 2. Collection Page (Catalog Document with AI & Voice Search)
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: seoTitle,
      description: seoDescription,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
      },
      breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}/#itemlist` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          "h1",
          ".tours-guide-header",
          ".tours-hub-box",
          ".tours-faq-box",
        ],
      },
    },

    // 3. Complete ItemList of Tours
    {
      "@type": "ItemList",
      "@id": `${pageUrl}/#itemlist`,
      name: "All Morocco Private Trip Packages",
      description: seoDescription,
      numberOfItems: uniqueTours.length,
      itemListElement: uniqueTours.map((tour, index) => {
        const cleanSlug = tour.slug.toLowerCase().trim();
        const tourUrl = `${SITE_URL}/tours/${cleanSlug}`;
        const tourPrice = tour.price && tour.price > 0 ? tour.price : 390;
        const tourImage = tour.image
          ? tour.image.startsWith("http")
            ? tour.image
            : `${SITE_URL}${tour.image.startsWith("/") ? tour.image : `/${tour.image}`}`
          : `${SITE_URL}/picture/all-morocco-tours.webp`;

        const locationText =
          tour.startLocation && tour.endLocation
            ? `${tour.startLocation} to ${tour.endLocation}`
            : tour.city || tour.startLocation || "Morocco";

        return {
          "@type": "ListItem",
          position: index + 1,
          url: tourUrl,
          item: {
            "@type": ["Product", "TouristTrip"],
            "@id": `${tourUrl}/#trip`,
            url: tourUrl,
            name: tour.title,
            description:
              tour.description || `Private guided trip in Morocco: ${tour.title}`,
            image: tourImage,
            category: "Private Morocco Trip",
            touristType: "International Travelers",
            itinerary: tour.duration || "Multi-Day Trip",
            subTrip: {
              "@type": "Trip",
              name: tour.title,
              description: `Route: ${locationText}`,
            },
            offers: {
              "@type": "Offer",
              url: tourUrl,
              price: tourPrice,
              priceCurrency: tour.currency || "EUR",
              availability: "https://schema.org/InStock",
              priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
                .toISOString()
                .split("T")[0],
              seller: {
                "@id": `${SITE_URL}/#organization`,
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: tour.rating ?? 4.9,
              reviewCount: tour.reviews ?? 24,
              bestRating: 5,
              worstRating: 1,
            },
          },
        };
      }),
    },

    // 4. Breadcrumb Navigation
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
          name: "All Trips",
          item: pageUrl,
        },
      ],
    },
  ];

  // 5. FAQ Schema (if FAQs provided)
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
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