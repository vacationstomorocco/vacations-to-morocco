// src/app/morocco-tours-from-casablanca/page.tsx

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { getToursByStartLocation } from "@/lib/wordpress";
import CityToursJsonLd from "@/components/seo/CityToursJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_PATH = "/morocco-tours-from-casablanca";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/Morocco-tours-from-casablanca.webp";

// Casablanca coordinates
const GEO_LAT = 33.5731;
const GEO_LNG = -7.5898;

const seoTitle =
  "Morocco Tours from Casablanca | Private Desert & Imperial Cities Circuits";
const seoDescription =
  "Book 100% private tours from Casablanca to the Sahara Desert, Marrakech, Fes, and Chefchaouen. Custom 7 to 14-day itineraries with CMN airport pickup and English-speaking drivers.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [
    "tours from Casablanca",
    "Casablanca desert tours",
    "Sahara tour from Casablanca",
    "Casablanca to Marrakech tour",
    "private Morocco tours from Casablanca",
    "Merzouga tour from Casablanca",
    "7 days Morocco tour from Casablanca",
    "10 days Morocco itinerary from Casablanca",
    "CMN airport private tours",
    "Vacations to Morocco",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Private Morocco tours starting from Casablanca - Vacations to Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Tours from Casablanca | Private Desert & Imperial Circuits",
    description: seoDescription,
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
    "geo.region": "MA-06",
    "geo.placename": "Casablanca, Morocco",
    "geo.position": `${GEO_LAT};${GEO_LNG}`,
    ICBM: `${GEO_LAT}, ${GEO_LNG}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

const whyChooseCasablanca = [
  {
    title: "Main International Gateway",
    description:
      "Casablanca (CMN) offers the most international flight connections. Start your Moroccan journey comfortably the moment you land.",
    icon: "✈️",
  },
  {
    title: "Free Airport & Hotel Pickup",
    description:
      "Your private driver meets you at Mohammed V Airport (CMN) with flight tracking or picks you up directly at your Casablanca hotel.",
    icon: "🛬",
  },
  {
    title: "Best for Grand Morocco Circuits",
    description:
      "Starting here lets you seamlessly visit Rabat, Chefchaouen, Fes, the Sahara Desert, and Marrakech without backtracking.",
    icon: "🗺️",
  },
  {
    title: "100% Private & Flexible",
    description:
      "Enjoy a modern air-conditioned vehicle and an experienced English-speaking driver. Travel entirely at your own pace.",
    icon: "✨",
  },
];

const faqs = [
  {
    question: "What are the best tours starting from Casablanca?",
    answer:
      "Our most popular routes are 7 to 14-day grand tours. They connect Casablanca with Rabat, the blue streets of Chefchaouen, Fes, the Merzouga Sahara Desert dunes, and Marrakech.",
  },
  {
    question: "How many days do I need for a desert trip from Casablanca?",
    answer:
      "We recommend at least 7 days to visit the Sahara Desert comfortably and conclude in Marrakech or Fes. For a comprehensive grand circuit that includes Chefchaouen and the north, 10 to 14 days is ideal.",
  },
  {
    question: "Can you pick us up directly at Casablanca Airport (CMN)?",
    answer:
      "Yes! Your private driver will meet you inside Mohammed V International Airport (CMN) holding a sign with your name, or pick you up from any Casablanca hotel.",
  },
  {
    question: "Can our tour finish in a different city like Marrakech or Tangier?",
    answer:
      "Yes. One-way routes are very popular. You can land in Casablanca and end your tour in Marrakech, Fes, or Tangier to make the most of your travel time.",
  },
  {
    question: "Are tours from Casablanca 100% private?",
    answer:
      "Yes. All our tours are completely private. You will have a dedicated vehicle and a professional English-speaking driver exclusively for your party.",
  },
  {
    question: "When is the best time to tour Morocco from Casablanca?",
    answer:
      "Spring (March to May) and autumn (September to November) offer the best weather across all regions. Winter is also pleasant for city and desert exploration.",
  },
];

export default async function ToursFromCasablancaPage() {
  const wpTours = await getToursByStartLocation("casablanca");

  const tours = (wpTours || []).map((tour) => {
    const description =
      tour.quickAnswer ||
      tour.seoDescription ||
      tour.overviewParagraphs?.[0] ||
      `Private multi-day Morocco tour starting in Casablanca: ${tour.title}.`;

    return {
      slug: tour.slug,
      title: tour.title,
      description,
      duration: tour.duration || "Multi-day private tour",
      location: tour.startLocation || "Casablanca",
      endLocation: tour.endLocation || "",
      image: tour.images?.[0] || tour.socialImage || HERO_IMAGE,
      imageAlt: tour.imageAlts?.[0] || tour.title,
      price: tour.tourPrice || 0,
      currency: tour.tourCurrency || "EUR",
    };
  });

  const schemaTours = tours.map((t) => ({
    slug: t.slug,
    title: t.title,
    description: t.description,
    image: t.image,
    duration: t.duration,
    price: t.price,
    currency: t.currency,
    rating: 4.9,
    reviews: 32,
  }));

  const tourCount = tours.length > 0 ? tours.length : 10;

  return (
    <>
      <CityToursJsonLd
        cityName="Casablanca"
        pagePath={PAGE_PATH}
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        tours={schemaTours}
        faqs={faqs}
      />

      <main className={styles.page} suppressHydrationWarning>
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.wrap}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/destinations/casablanca">Casablanca</Link>
              <span>/</span>
              <span>Tours</span>
            </nav>
            <Link href="/contact" className={styles.topCta}>
              Plan my trip
            </Link>
          </div>
        </div>

        {/* ========== HERO WITH FULL BACKGROUND IMAGE ========== */}
        <header
          style={{
            position: "relative",
            width: "100%",
            minHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src={HERO_IMAGE}
              alt="Morocco private tours starting from Casablanca"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              fetchPriority="high"
            />
            {/* Dark gradient for text readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.25) 100%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              padding: "60px 24px 30px",
            }}
          >
            <p
              style={{
                color: "#e8a090",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: "14px",
              }}
            >
              Casablanca Departures · 100% Private Tours
            </p>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                color: "#ffffff",
                margin: "0 0 18px 0",
                lineHeight: 1.1,
                fontWeight: 400,
                maxWidth: "720px",
              }}
            >
              Morocco tours from{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "#e07a5f",
                  fontWeight: 600,
                }}
              >
                Casablanca
              </em>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginBottom: "30px",
                maxWidth: "560px",
              }}
            >
              Start at Mohammed V Airport (CMN) or your hotel and explore all of
              Morocco. Visit the Hassan II Mosque, Chefchaouen, Fes, the Sahara
              dunes, and Marrakech on a flexible private tour from 7 to 14 days.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#tours"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#111",
                  padding: "13px 28px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                View all tours
              </a>
              <Link
                href="/contact"
                style={{
                  backgroundColor: "transparent",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  color: "#ffffff",
                  padding: "13px 28px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  backdropFilter: "blur(4px)",
                }}
              >
                Customize my route
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              padding: "0 24px 32px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {tourCount}
              </div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>
                Routes starting in Casablanca
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                CMN
              </div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>
                Airport & Hotel pickup
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                100%
              </div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>
                Private vehicle & driver
              </div>
            </div>
          </div>
        </header>

        {/* ========== INTRO SECTION ========== */}
        <section
          style={{
            padding: "44px 24px",
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.7rem, 2.8vw, 2.2rem)",
                fontWeight: 400,
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Private Morocco Tours Starting from Casablanca
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#4a4a4a",
                margin: "0 0 12px 0",
              }}
            >
              Casablanca is the most convenient starting point for discovering
              Morocco. After visiting the famous Hassan II Mosque on the Atlantic
              coast, you will travel inland to imperial cities, mountain passes,
              and the Sahara Desert.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#4a4a4a",
                margin: 0,
              }}
            >
              Whether you want a 7-day desert trip ending in Marrakech or an
              extended 14-day grand circuit covering every region, our itineraries
              are 100% private and customized around your schedule.
            </p>
          </div>
        </section>

        {/* ========== TOURS GRID ========== */}
        <section
          id="tours"
          style={{ padding: "48px 24px", backgroundColor: "#f8f7f3" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p
                style={{
                  color: "#c75c40",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                Available Itineraries
              </p>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)",
                  fontWeight: 400,
                  color: "#111",
                  margin: "0 0 10px 0",
                }}
              >
                Featured Tours from Casablanca
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                All tours include private transportation, dedicated English-speaking
                driver, hand-picked accommodations, and complete schedule
                flexibility.
              </p>
            </div>

            {tours.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.4rem",
                    marginBottom: "10px",
                  }}
                >
                  Custom Tours Available
                </h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>
                  Tell us your travel dates and we will create a private route
                  starting right from Casablanca (CMN).
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#111",
                    color: "#fff",
                    padding: "12px 26px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Plan my Casablanca tour
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {tours.map((tour, index) => {
                  const num = String(index + 1).padStart(2, "0");

                  return (
                    <article
                      key={tour.slug}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Image + duration badge */}
                      <Link
                        href={`/tours/${tour.slug}`}
                        style={{
                          position: "relative",
                          display: "block",
                          aspectRatio: "4/3",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={tour.image}
                          alt={tour.imageAlt}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          loading="lazy"
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "14px",
                            left: "16px",
                            color: "#fff",
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            fontFamily: "Georgia, serif",
                            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                          }}
                        >
                          {num}
                        </span>
                        {tour.duration && (
                          <span
                            style={{
                              position: "absolute",
                              top: "14px",
                              right: "16px",
                              backgroundColor: "#ffffff",
                              color: "#111",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              padding: "5px 10px",
                              borderRadius: "4px",
                            }}
                          >
                            {tour.duration}
                          </span>
                        )}
                      </Link>

                      {/* Card body */}
                      <div
                        style={{
                          padding: "22px 20px 20px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <p
                          style={{
                            color: "#c75c40",
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            margin: "0 0 8px 0",
                          }}
                        >
                          Start: Casablanca
                        </p>

                        <h3
                          style={{
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            color: "#111",
                            margin: "0 0 12px 0",
                            lineHeight: 1.25,
                          }}
                        >
                          <Link
                            href={`/tours/${tour.slug}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {tour.title}
                          </Link>
                        </h3>

                        <p
                          style={{
                            color: "#666",
                            fontSize: "0.95rem",
                            lineHeight: 1.55,
                            margin: "0 0 20px 0",
                            flex: 1,
                          }}
                        >
                          {tour.description.length > 120
                            ? tour.description.slice(0, 120).trim() + "…"
                            : tour.description}
                        </p>

                        <div
                          style={{
                            borderTop: "1px solid #eeeeee",
                            paddingTop: "14px",
                            marginTop: "auto",
                          }}
                        >
                          <Link
                            href={`/tours/${tour.slug}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              color: "#111",
                              textDecoration: "none",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                            }}
                          >
                            <span>View itinerary</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="19" x2="19" y2="5"></line>
                              <polyline points="9 5 19 5 19 15"></polyline>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ========== WHY CHOOSE CASABLANCA SECTION ========== */}
        <section
          style={{
            padding: "50px 24px 30px",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p
                style={{
                  color: "#c75c40",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                Why Start in Casablanca
              </p>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)",
                  fontWeight: 400,
                  color: "#111",
                  margin: "0 0 10px 0",
                }}
              >
                Why Book a Tour Starting from Casablanca?
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  maxWidth: "620px",
                  margin: "0 auto",
                }}
              >
                Casablanca is the central gateway to Morocco, connecting directly
                with every major region across the kingdom.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {whyChooseCasablanca.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f9f8f5",
                    borderRadius: "12px",
                    padding: "24px 20px",
                    border: "1px solid #eee8df",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "12px",
                      lineHeight: 1,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#111",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.92rem",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section
          className={styles.faq}
          aria-labelledby="faq-title"
          style={{ padding: "48px 0", backgroundColor: "#ffffff" }}
        >
          <div className={styles.wrapNarrow}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p className={styles.kicker}>FAQ</p>
              <h2 id="faq-title" style={{ margin: "0 0 8px 0" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
                Everything you need to know about our private tours starting in Casablanca.
              </p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "18px 0",
                    borderBottom: "1px solid #e0dfd8",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#111",
                    }}
                  >
                    {f.question}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA CONTACT SECTION ========== */}
        <section
          style={{ padding: "60px 24px", backgroundColor: "#f8f7f3" }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div style={{ flex: "1 1 420px" }}>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  color: "#111",
                  marginBottom: "12px",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Ready to explore from Casablanca?
              </h2>
              <p
                style={{
                  color: "#555",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                  maxWidth: "480px",
                }}
              >
                Tell us your travel dates, group size, and preferred destinations.
                Our local Moroccan team will design a custom itinerary for you
                within 24 hours.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#956b3b",
                  color: "#fff",
                  padding: "14px 30px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Contact our local team
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </Link>
            </div>

            {/* Right - Contact info */}
            <div
              style={{
                flex: "1 1 320px",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              {/* Email */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      color: "#111",
                      marginBottom: "2px",
                    }}
                  >
                    Email us
                  </div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>
                    vacationstomorocco@gmail.com
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      color: "#111",
                      marginBottom: "2px",
                    }}
                  >
                    Call / WhatsApp
                  </div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>
                    +212 668 422 869
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#956b3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      color: "#111",
                      marginBottom: "2px",
                    }}
                  >
                    Follow us
                  </div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>
                    @vacationstomorocco
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}