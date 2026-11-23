// src/components/seo/homeSeoJson.ts

export const SITE_URL = "https://vacationstomorocco.com";
export const BRAND_NAME = "Vacations to Morocco";
export const PHONE = "+212668422869";
export const EMAIL = "vacationstomorocco@gmail.com";

export interface HomeSeoData {
  latitude?: number;
  longitude?: number;
  opens?: string;
  closes?: string;
  ratingValue?: number;
  reviewCount?: number;
}

export default function getHomeSeoJson(data?: HomeSeoData) {
  const latitude = data?.latitude ?? 31.6295;
  const longitude = data?.longitude ?? -7.9811;
  const opens = data?.opens ?? "00:00";
  const closes = data?.closes ?? "23:59";

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WEBSITE & SITELINKS SEARCH SCHEMA (Google Rich Snippets)
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        alternateName: [
          "Vacations To Morocco Travel",
          "Morocco Vacations",
          "Vacation to Morocco",
        ],
        description:
          "Official website of Vacations to Morocco. Licensed tour operator offering private Sahara desert trips, old imperial cities trips, and custom Morocco travel itineraries.",
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/tours?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },

      // 2. WEBPAGE & VOICE / AI SEARCH SPECIFICATION (AI Optimization)
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Vacations to Morocco | Private Morocco Trips & Desert Trips",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        description:
          "Book authentic private Morocco trips with licensed local drivers and guides. Desert trips from Marrakech and Fes, Atlas Mountains treks, and custom itineraries.",
        inLanguage: "en-US",
        // Speakable schema allows AI assistants (Siri, Google Assistant, Alexa) to cite this page
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".hero-description", ".why-choose-us"],
        },
      },

      // 3. MAIN ORGANIZATION & LOCAL BUSINESS (Geo-Targeting + Entity Graph)
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
        description:
          "Vacations to Morocco is a fully licensed local Moroccan tour operator offering tailor-made private trips, Sahara Desert luxury glamping, camel trekking, and old imperial cities cultural journeys across Morocco.",
        telephone: PHONE,
        email: EMAIL,
        priceRange: "$$",
        currenciesAccepted: "EUR, USD, GBP, MAD, CAD, AUD",
        paymentAccepted: "Credit Card, Bank Transfer, Cash, PayPal",
        sameAs: [
          "https://www.facebook.com/vacationstomorocco",
          "https://www.instagram.com/vacationstomorocco",
          "https://www.tripadvisor.com/vacationstomorocco",
          "https://www.youtube.com/@vacationstomorocco",
        ],
        // Physical & Geo-targeting details
        address: {
          "@type": "PostalAddress",
          streetAddress: "Derb Dabachi, Medina",
          addressLocality: "Marrakech",
          addressRegion: "Marrakech-Safi",
          postalCode: "40000",
          addressCountry: "MA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: latitude,
          longitude: longitude,
        },
        // AI Entity Knowledge Graph: Tells AI engines (ChatGPT, Perplexity) what topics you specialize in
        knowsAbout: [
          "Morocco Private Trips",
          "Sahara Desert Erg Chebbi Glamping",
          "Marrakech Medina & Souks",
          "Fes el-Bali Cultural Trips",
          "High Atlas Mountains & Mount Toubkal Treks",
          "Ait Benhaddou UNESCO World Heritage Site",
          "Chefchaouen Blue City Excursions",
          "Moroccan Berber Culture and Hospitality",
          "Camel Trekking across Merzouga Dunes",
        ],
        // Geographic Coverage
        areaServed: [
          { "@type": "Country", name: "Morocco" },
          { "@type": "City", name: "Marrakech" },
          { "@type": "City", name: "Casablanca" },
          { "@type": "City", name: "Fes" },
          { "@type": "City", name: "Tangier" },
          { "@type": "City", name: "Chefchaouen" },
          { "@type": "City", name: "Agadir" },
          { "@type": "City", name: "Ouarzazate" },
          { "@type": "City", name: "Essaouira" },
          { "@type": "Place", name: "Merzouga Sahara Desert" },
          { "@type": "Place", name: "Zagora Desert" },
          { "@type": "Place", name: "Dades & Todra Gorges" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: opens,
            closes: closes,
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: PHONE,
            contactType: "customer service",
            availableLanguage: [
              "English",
              "French",
              "Spanish",
              "German",
              "Italian",
              "Arabic",
              "Berber",
            ],
            areaServed: "Worldwide",
          },
          {
            "@type": "ContactPoint",
            telephone: PHONE,
            contactType: "reservations",
            availableLanguage: ["English", "French", "Spanish", "Arabic"],
            contactOption: "HearingImpairedSupported",
          },
        ],
        // Full Service Offer Catalog
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Morocco Trip Packages & Travel Services",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Private Sahara Desert Trips (Merzouga & Zagora)",
            },
            {
              "@type": "OfferCatalog",
              name: "Old Imperial Cities & Cultural Discovery Trips",
            },
            {
              "@type": "OfferCatalog",
              name: "Marrakech & Fes Private Day Trips",
            },
            {
              "@type": "OfferCatalog",
              name: "Atlas Mountains & Berber Villages Excursions",
            },
            {
              "@type": "OfferCatalog",
              name: "Custom Bespoke Morocco Travel Packages",
            },
          ],
        },
        // Social proof & Review Schema
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: data?.ratingValue ?? 4.9,
          reviewCount: data?.reviewCount ?? 184,
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
  };
}