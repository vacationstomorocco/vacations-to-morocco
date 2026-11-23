// src/app/morocco-tours/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import ToursArchiveJsonLd from "@/components/seo/ToursArchiveJsonLd";
import MoroccoToursClient from "@/components/MoroccoToursClient";
import { getAllTours, ExtendedTourData } from "@/lib/wordpress";

type Tour = {
  id: number;
  title: string;
  slug: string;
  city: string;
  duration: string;
  description: string;
  image: string;
  price: number;
  featured: boolean;
};

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/morocco-tours`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/all-morocco-tours.webp";

export const metadata: Metadata = {
  title: "Private Morocco Trips & Luxury Custom Itineraries | Vacations to Morocco",
  description:
    "Discover tailor-made Sahara desert trips, old imperial cities, and Atlas mountain excursions. Private guided trips starting from Marrakech, Tangier, Casablanca, Fes, and Agadir.",
  keywords: [
    "Morocco trips",
    "private Morocco trips",
    "Sahara desert trips",
    "luxury Morocco itineraries",
    "Marrakech desert trips",
    "Casablanca trips",
    "Fes to Marrakech trips",
    "Morocco trips packages",
    "custom Morocco travel packages",
    "Vacations to Morocco",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Private Morocco Trips & Custom Itineraries | Vacations to Morocco",
    description:
      "Explore handcrafted private guided trips of Morocco starting from major travel hubs. Completely customizable routes, local private guides, and luxury air-conditioned transport.",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Private Morocco Trip Itineraries & Sahara Desert Trips - Vacations to Morocco",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Morocco Trips & Custom Desert Itineraries",
    description:
      "Handcrafted private trips across Morocco. Sahara desert safaris, old imperial cities, and Atlas mountain journeys.",
    images: [HERO_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "MA",
    "geo.placename": "Morocco",
    "geo.position": "31.7917;-7.0926",
    ICBM: "31.7917, -7.0926",
  },
};

const guideFaqs = [
  {
    question: "What Is Included in a Private Morocco Trip?",
    answer:
      "Our Morocco Private Trips can include private air-conditioned transportation, a professional driver, comfortable hotels or traditional riads, local guides, and desert experiences. Depending on your itinerary, you can also enjoy a camel ride in Merzouga, a night in a luxury desert camp, guided visits to Marrakech and Fes, and visits to historic Kasbahs and Berber villages.",
  },
  {
    question: "Can I Customize My Morocco Trip?",
    answer:
      "Yes. Our private Morocco trips are fully customizable. You can choose the number of days, destinations, hotels, activities, and travel style. We can create your trip based on your budget, travel dates, and interests. Whether you want a short Morocco Desert Trip, a family holiday, a luxury trip, or a complete 7 to 14-day Morocco Trip, we can create an itinerary for you.",
  },
  {
    question: "What Is the Best Time to Visit Morocco?",
    answer:
      "The best time to visit Morocco is usually spring from March to May and autumn from September to November. During these months, the weather is comfortable for exploring cities, visiting the Atlas Mountains, and enjoying Sahara Desert Trips. Summer can be hot, especially in Marrakech and the desert. However, Morocco can still be visited during summer if desert activities are planned for the early morning or late afternoon.",
  },
  {
    question: "Why Choose a Private Morocco Trip?",
    answer:
      "A Morocco Private Trip gives you more freedom and flexibility. You can travel at your own pace, spend more time at the places you enjoy, and change parts of your itinerary when needed. From Marrakech and Fes to Merzouga and the Sahara Desert, we can help you plan a comfortable and memorable Morocco holiday.",
  },
];

const hubCities = [
  {
    name: "Marrakech",
    url: "/morocco-tours-from-marrakech",
    desc: "A great starting point for the Atlas Mountains, Ait Ben Haddou, and Sahara desert.",
  },
  {
    name: "Tangier",
    url: "/morocco-tours-from-tangier",
    desc: "Perfect for discovering northern Morocco, Chefchaouen, and the Rif Mountains.",
  },
  {
    name: "Casablanca",
    url: "/morocco-tours-from-casablanca",
    desc: "Convenient for exploring Rabat, Fes, Chefchaouen, and the old imperial cities.",
  },
  {
    name: "Fes",
    url: "/morocco-tours-from-fes",
    desc: "An excellent launchpad for Merzouga, Erg Chebbi, and deep Sahara trips.",
  },
  {
    name: "Agadir",
    url: "/morocco-tours-from-agadir",
    desc: "Ideal for the Atlantic coast, Anti-Atlas, and southern kasbah routes.",
  },
];

function cleanText(str?: string) {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

function mapWpTourToClientTour(wpTour: ExtendedTourData, index: number): Tour {
  return {
    id: index + 1,
    title: wpTour.title,
    slug: wpTour.slug,
    city: wpTour.startLocation || "Morocco",
    duration: wpTour.duration || "Custom Duration",
    description: cleanText(wpTour.seoDescription || wpTour.quickAnswer || ""),
    image: wpTour.images[0] || HERO_IMAGE,
    price: wpTour.tourPrice || 0,
    featured: wpTour.badges
      ? wpTour.badges.some((badge) =>
          badge.text.toLowerCase().includes("featured")
        )
      : false,
  };
}

export default async function MoroccoToursPage() {
  let tours: Tour[] = [];

  try {
    const wpToursData: ExtendedTourData[] = await getAllTours();
    if (wpToursData && wpToursData.length > 0) {
      tours = wpToursData.map((tour, index) =>
        mapWpTourToClientTour(tour, index)
      );
    }
  } catch (error) {
    console.error("Failed to load live dynamic tours from WordPress:", error);
    tours = [];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        sameAs: [
          "https://en.wikipedia.org/wiki/Tourism_in_Morocco",
          "https://en.wikipedia.org/wiki/Morocco",
        ],
        areaServed: { "@type": "Country", name: "Morocco" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: `${SITE_URL}/contact`,
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        name: "Private Morocco Trips & Custom Itineraries",
        description:
          "Browse private guided trips in Morocco including Sahara desert expeditions, old imperial city circuits, and Atlas mountain adventures.",
        url: PAGE_URL,
        sameAs: ["https://en.wikipedia.org/wiki/Tourism_in_Morocco"],
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        name: "Morocco Private Trip Packages",
        description: "List of private curated trip packages across Morocco.",
        numberOfItems: tours.length,
        itemListElement: tours.map((tour, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tour.title,
          url: `${SITE_URL}/tours/${tour.slug}`,
          description: tour.description,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: guideFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Trips", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hub-card {
              display: block;
              padding: 24px;
              background: #f8f7f3;
              border-radius: 16px;
              text-decoration: none;
              color: #1a1a1a;
              border: 1px solid #e8e6e0;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .hub-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            }
          `,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToursArchiveJsonLd tours={tours} />

      <main style={{ background: "#f8f7f3", minHeight: "100vh" }}>
        {/* ── FULL-BLEED BACKGROUND HERO ── */}
        <header
          style={{
            position: "relative",
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* Background image — full bleed */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
          {/* Dark left → right gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.22) 100%)",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
              padding: "80px 24px 56px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.8rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                margin: "0 0 18px",
              }}
            >
              Private Morocco Experiences
            </p>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.08,
                margin: "0 0 22px",
                maxWidth: 780,
              }}
            >
              Private Morocco{" "}
              <em style={{ fontStyle: "italic", color: "#e07a5f" }}>Trips</em>
              <br />
              &amp; Travel Itineraries
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.08rem",
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 0 28px",
              }}
            >
              Discover the best of Morocco with private desert expeditions and
              custom itineraries. Begin from{" "}
              <strong style={{ color: "#fff" }}>Marrakech</strong>,{" "}
              <strong style={{ color: "#fff" }}>Tangier</strong>,{" "}
              <strong style={{ color: "#fff" }}>Casablanca</strong>,{" "}
              <strong style={{ color: "#fff" }}>Fes</strong>, or{" "}
              <strong style={{ color: "#fff" }}>Agadir</strong> — old imperial
              cities, Atlas passes, and golden Sahara dunes.
            </p>

            {/* Perks */}
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px 28px",
                listStyle: "none",
                margin: "0 0 36px",
                padding: 0,
              }}
            >
              {["Private transportation", "Local team guides"].map((label) => (
                <li
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    color: "rgba(255,255,255,0.92)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#e07a5f",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 48 }}>
              <a
                href="#explore"
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "15px 30px",
                  borderRadius: 100,
                  textDecoration: "none",
                }}
              >
                Explore all itineraries
              </a>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  padding: "15px 30px",
                  borderRadius: 100,
                  textDecoration: "none",
                  border: "1.5px solid rgba(255,255,255,0.55)",
                }}
              >
                Request a custom route
              </Link>
            </div>

            {/* Frosted stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                maxWidth: 560,
              }}
            >
              {[
                { value: tours.length || "—", label: "Live trips" },
                { value: "5", label: "Departure cities" },
                { value: "100%", label: "Private only" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: 16,
                    padding: "18px 16px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "1.7rem",
                      color: "#1a1a1a",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#6b6b6b",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── TOURS GRID (client filters + premium cards) ── */}
        <section id="explore" style={{ padding: "0 0 20px" }}>
          <MoroccoToursClient tours={tours} />
        </section>

        {/* ── PLANNING INTRO ── */}
        <section
          style={{
            padding: "60px 24px 40px",
            textAlign: "center",
            background: "#fff",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                color: "#1a1a1a",
                lineHeight: 1.25,
                margin: "0 0 24px",
              }}
            >
              Planning Your Private Trip
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#4a4a4a",
                margin: "0 0 18px",
              }}
            >
              Morocco is full of colorful cities, historic medinas, mountain
              passes, Berber villages, and the golden dunes of the Sahara. With
              our <strong>Morocco Private Trips</strong>, you travel at your own
              pace on an itinerary built around your interests.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#4a4a4a",
                margin: 0,
              }}
            >
              Whether you want old imperial cities, the High Atlas, ancient kasbahs,
              or a camel trek into Erg Chebbi — we design the route exclusively
              for your group.
            </p>
          </div>
        </section>

        {/* ── 5 DEPARTURE HUBS ONLY ── */}
        <section style={{ padding: "40px 24px 80px", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h3
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "1.8rem",
                  color: "#1a1a1a",
                  margin: "0 0 12px",
                  fontWeight: 400,
                }}
              >
                Where Should I Start?
              </h3>
              <p
                style={{
                  color: "#6b6b6b",
                  fontSize: "1.05rem",
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                Private packages depart from our five primary hubs across
                Morocco:
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {hubCities.map((hub) => (
                <Link key={hub.name} href={hub.url} className="hub-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#1a1a1a",
                      }}
                    >
                      {hub.name}
                    </span>
                    <span style={{ color: "#e07a5f", fontSize: "1.2rem" }}>
                      →
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      color: "#6b6b6b",
                      lineHeight: 1.6,
                    }}
                  >
                    {hub.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          aria-labelledby="faq-title"
          style={{ padding: "80px 24px", background: "#f8f7f3" }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p
              style={{
                color: "#e07a5f",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                margin: "0 0 10px",
                textAlign: "center",
              }}
            >
              General Info
            </p>
            <h2
              id="faq-title"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                color: "#1a1a1a",
                textAlign: "center",
                margin: "0 0 40px",
              }}
            >
              Frequently Asked Questions
            </h2>

            <div>
              {guideFaqs.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 0",
                    borderBottom: "1px solid #e8e6e0",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                    }}
                  >
                    {f.question}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "#6b6b6b",
                      fontSize: "1rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: "80px 24px", background: "#fff" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(2rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  color: "#1a1a1a",
                  lineHeight: 1.2,
                  margin: "0 0 20px",
                }}
              >
                Ready to Plan Your Custom Moroccan Trip?
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "#6b6b6b",
                  margin: "0 0 32px",
                  maxWidth: 480,
                }}
              >
                Tell us your travel dates, group size, and preferred
                destinations. Our local team will put together a bespoke plan
                just for you.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#956b3b",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  padding: "14px 32px",
                  borderRadius: 100,
                  textDecoration: "none",
                }}
              >
                Get in Touch
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </Link>
            </div>

            <div
              style={{
                flex: "1 1 300px",
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}
            >
              <a
                href="mailto:vacationstomorocco@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                  >
                    Email us
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      color: "#6b6b6b",
                    }}
                  >
                    vacationstomorocco@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+212668422869"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </span>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                  >
                    Call us
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      color: "#6b6b6b",
                    }}
                  >
                    +212 668 422 869
                  </span>
                </div>
              </a>

              <a
                href="https://instagram.com/vacationstomorocco"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                  >
                    Follow us
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      color: "#6b6b6b",
                    }}
                  >
                    @vacationstomorocco
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}