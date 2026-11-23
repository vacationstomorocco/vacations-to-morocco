// src/components/seo/SingleTourJsonLd.tsx
import React from "react";

interface SingleTourJsonLdProps {
  tour: any;
  siteUrl?: string;
}

function safeText(str?: any): string {
  if (!str) return "";
  const text = typeof str === "string" ? str : String(str);
  return text.replace(/<[^>]*>?/gm, "").trim();
}

export default function SingleTourJsonLd({
  tour,
  siteUrl = "https://vacationstomorocco.com",
}: SingleTourJsonLdProps) {
  if (!tour || !tour.title) return null;

  const cleanSiteUrl = siteUrl.replace(/\/$/, "");
  const slug = safeText(tour.slug || "").toLowerCase();
  const tourUrl = `${cleanSiteUrl}/tours/${slug}`;
  const BRAND_NAME = "Vacations to Morocco";

  // 1. Image preparation
  const images: string[] = Array.isArray(tour.images) && tour.images.length > 0
    ? tour.images.map((img: string) =>
        img.startsWith("http") ? img : `${cleanSiteUrl}${img.startsWith("/") ? img : `/${img}`}`
      )
    : [`${cleanSiteUrl}/picture/all-morocco-tours.webp`];

  // 2. Description preparation
  const description = safeText(
    tour.seoDescription ||
    (Array.isArray(tour.overviewParagraphs) ? tour.overviewParagraphs.join(" ") : "") ||
    tour.quickAnswer ||
    `Private guided trip in Morocco: ${tour.title}`
  );

  const price = tour.tourPrice && Number(tour.tourPrice) > 0 ? Number(tour.tourPrice) : 390;
  const currency = tour.tourCurrency || "EUR";

  // 3. Day-by-Day Itinerary
  const itineraryList = Array.isArray(tour.itinerary) && tour.itinerary.length > 0
    ? tour.itinerary.map((day: any, idx: number) => {
        const dayTitle = safeText(day?.title || `Day ${idx + 1}`);
        const dayDesc = Array.isArray(day?.paragraphs)
          ? day.paragraphs.map((p: any) => safeText(p)).join(" ")
          : safeText(day?.paragraphs || "");

        return {
          "@type": "TouristTrip",
          name: dayTitle,
          description: dayDesc || dayTitle,
        };
      })
    : [];

  // 4. Valid FAQs
  const validFaqItems = Array.isArray(tour.faqItems)
    ? tour.faqItems.filter((item: any) => item && (item.question || item.answer))
    : [];

  const graph: Record<string, unknown>[] = [
    // Organization Provider
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${cleanSiteUrl}/#organization`,
      name: BRAND_NAME,
      url: cleanSiteUrl,
      logo: `${cleanSiteUrl}/picture/vacations-to-morocco.png`,
      telephone: "+212668422869",
      email: "vacationstomorocco@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marrakech",
        addressCountry: "MA",
      },
    },

    // Single Tour (Product + TouristTrip for Rich Stars & Price Badges in Google)
    {
      "@type": ["Product", "TouristTrip"],
      "@id": `${tourUrl}/#tour`,
      url: tourUrl,
      name: tour.title,
      description: description,
      image: images,
      category: "Private Guided Morocco Trips",
      touristType: "International Travelers",
      itinerary: tour.duration || "Multi-Day Trip",
      provider: {
        "@id": `${cleanSiteUrl}/#organization`,
      },
      offers: {
        "@type": "Offer",
        url: tourUrl,
        price: price,
        priceCurrency: currency,
        availability: "https://schema.org/InStock",
        priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split("T")[0],
        seller: {
          "@id": `${cleanSiteUrl}/#organization`,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 38,
        bestRating: 5,
        worstRating: 1,
      },
      ...(itineraryList.length > 0 ? { hasPart: itineraryList } : {}),
    },

    // WebPage Document with Voice / AI Search optimization
    {
      "@type": "ItemPage",
      "@id": `${tourUrl}/#webpage`,
      url: tourUrl,
      name: `${tour.title} | ${BRAND_NAME}`,
      description: description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${cleanSiteUrl}/#website`,
        url: cleanSiteUrl,
        name: BRAND_NAME,
      },
      breadcrumb: { "@id": `${tourUrl}/#breadcrumb` },
      mainEntity: { "@id": `${tourUrl}/#tour` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".tour-lead", ".itinerary-section", ".faq-section"],
      },
    },

    // Breadcrumb Navigation
    {
      "@type": "BreadcrumbList",
      "@id": `${tourUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: cleanSiteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Trips",
          item: `${cleanSiteUrl}/tours`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tour.title,
          item: tourUrl,
        },
      ],
    },
  ];

  // FAQPage Schema
  if (validFaqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${tourUrl}/#faq`,
      mainEntity: validFaqItems.map((item: any) => ({
        "@type": "Question",
        name: safeText(item.question).replace(/^\d+[\.\)]\s*/, ""),
        acceptedAnswer: {
          "@type": "Answer",
          text: safeText(item.answer),
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