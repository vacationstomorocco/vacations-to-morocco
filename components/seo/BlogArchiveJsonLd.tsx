interface BlogItem {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
  category?: string;
}

interface BlogArchiveJsonLdProps {
  blogs: BlogItem[];
}

export default function BlogArchiveJsonLd({ blogs }: BlogArchiveJsonLdProps) {
  const SITE_URL = "https://vacationstomorocco.com";
  const PAGE_URL = `${SITE_URL}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}/#webpage`,
        "url": PAGE_URL,
        "name": "Vacations to Morocco Blog | Morocco Travel Guides & Tips",
        "description":
          "Explore travel advice, Sahara Desert packing guides, old imperial city itineraries, and cultural tips from local Morocco travel planners.",
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
      },
      {
        "@type": "Blog",
        "@id": `${PAGE_URL}/#blog`,
        "name": "Vacations to Morocco Travel Blog",
        "url": PAGE_URL,
        "description":
          "Local advice, packing lists, and custom itinerary tips for traveling across Morocco.",
        "publisher": {
          "@type": "TravelAgency",
          "@id": `${SITE_URL}/#travel-agency`,
          "name": "Vacations to Morocco",
          "url": SITE_URL,
        },
      },
      {
        "@type": "ItemList",
        "numberOfItems": blogs.length,
        "itemListElement": blogs.map((blog, index) => {
          // Handle both external WP CDN URLs and local fallback paths
          const fullImageUrl = blog.image.startsWith("http")
            ? blog.image
            : `${SITE_URL}${blog.image.startsWith("/") ? "" : "/"}${blog.image}`;

          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "BlogPosting",
              "@id": `${PAGE_URL}/${blog.slug}`,
              "url": `${PAGE_URL}/${blog.slug}`,
              "headline": blog.title,
              "description": blog.description,
              "image": fullImageUrl,
              "datePublished": new Date(blog.date).toISOString(),
            },
          };
        }),
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