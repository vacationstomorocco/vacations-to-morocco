interface FAQItem {
  question: string;
  answer: string;
}

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  authorName?: string;
  faqs?: FAQItem[];
}

export default function BlogPostJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
  authorName = "Vacations to Morocco",
  faqs = [],
}: BlogPostJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  const graphItems: any[] = [
    // 1. Article / BlogPosting Schema
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}/#article`,
      "isPartOf": {
        "@type": "WebPage",
        "@id": postUrl,
        "url": postUrl,
        "name": title,
      },
      "headline": title,
      "description": description,
      "image": imageUrl,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl,
      },
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": `${SITE_URL}/About-us`,
      },
      "publisher": {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        "name": "Vacations to Morocco",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/picture/vacations-to-morocco.png`,
        },
      },
      "inLanguage": "en-US",
    },

    // 2. Breadcrumb Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}/#breadcrumb`,
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
          "name": "Blog",
          "item": `${SITE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": postUrl,
        },
      ],
    },
  ];

  // 3. FAQ Schema (if FAQs are passed)
  if (faqs.length > 0) {
    graphItems.push({
      "@type": "FAQPage",
      "@id": `${postUrl}/#faq`,
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