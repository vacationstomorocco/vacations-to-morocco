// src/app/morocco-tours-from-fes/page.tsx

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { getToursByStartLocation } from "@/lib/wordpress";
import CityToursJsonLd from "@/components/seo/CityToursJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_PATH = "/morocco-tours-from-fes";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/Morocco-tours-from-fes.webp";

// Fes coordinates
const GEO_LAT = 34.0608;
const GEO_LNG = -4.9742;

const seoTitle =
  "Morocco Tours from Fes | Private Sahara Desert & Imperial Cities Circuits";
const seoDescription =
  "Book 100% private tours from Fes to the Merzouga Sahara Desert, Chefchaouen, and Marrakech. Custom 3 to 14-day itineraries with FEZ airport pickup and English-speaking drivers.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [
    "tours from Fes",
    "Fes desert tours",
    "Sahara tour from Fes",
    "Fes to Marrakech desert tour",
    "private Morocco tours from Fes",
    "Chefchaouen tour from Fes",
    "3 days desert tour from Fes",
    "FEZ airport private transfers",
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
        alt: "Private Morocco tours starting from Fes - Vacations to Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Tours from Fes | Private Desert & Imperial City Routes",
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
    "geo.region": "MA-03",
    "geo.placename": "Fes, Morocco",
    "geo.position": `${GEO_LAT};${GEO_LNG}`,
    ICBM: `${GEO_LAT}, ${GEO_LNG}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

const whyChooseFes = [
  {
    title: "Fastest Route to the Sahara",
    description:
      "Fes is the closest imperial city to Erg Chebbi. You reach the towering dunes of Merzouga in a single day through the cedar forests.",
    icon: "🏜️",
  },
  {
    title: "Free Airport & Riad Pickup",
    description:
      "Your private driver meets you directly at Fes-Saïss Airport (FEZ) or right at your riad gate inside the pedestrian medina.",
    icon: "🛬",
  },
  {
    title: "Iconic Fes to Marrakech Route",
    description:
      "Travel one-way across Morocco: leave Fes, cross the desert dunes and Atlas Mountains, and finish right at your hotel in Marrakech.",
    icon: "🗺️",
  },
  {
    title: "100% Private & Flexible",
    description:
      "Private modern transport with an experienced driver. You set the daily pace and decide where and when to stop along the road.",
    icon: "✨",
  },
];

const faqs = [
  {
    question: "What are the most popular tours starting from Fes?",
    answer:
      "The 3-day and 4-day desert tours from Fes to Marrakech are our top choices. We also offer northern tours to Chefchaouen and Tangier, as well as multi-day grand Morocco circuits.",
  },
  {
    question: "How many days do I need for a desert trip from Fes?",
    answer:
      "We recommend at least 3 days. Day 1 takes you from Fes to Merzouga for a sunset camel ride and luxury tent stay. Days 2 and 3 continue through Todra Gorge, Dades Valley, and Ait Ben Haddou to Marrakech.",
  },
  {
    question: "Can you pick us up at Fes Airport (FEZ) or our Riad?",
    answer:
      "Yes. We pick you up directly from Fes-Saïss Airport (FEZ) or at the closest accessible gate to your riad inside the Fes el-Bali medina, with full luggage assistance.",
  },
  {
    question: "Can a tour start in Fes and finish in Marrakech?",
    answer:
      "Yes! The one-way Fes to Marrakech desert route is one of the most famous road trips in Morocco. It connects both imperial cities through the Sahara Desert and High Atlas Mountains.",
  },
  {
    question: "Are these tours private or shared with strangers?",
    answer:
      "All our tours are 100% private. You travel in your own dedicated, air-conditioned vehicle with a professional English-speaking driver just for you and your group.",
  },
];

export default async function ToursFromFesPage() {
  const wpTours = await getToursByStartLocation("fes");

  const tours = (wpTours || []).map((tour) => {
    const description =
      tour.quickAnswer ||
      tour.seoDescription ||
      tour.overviewParagraphs?.[0] ||
      `Private multi-day Morocco tour starting from Fes: ${tour.title}.`;

    return {
      slug: tour.slug,
      title: tour.title,
      description,
      duration: tour.duration || "Multi-day private tour",
      location: tour.startLocation || "Fes",
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
    reviews: 24,
  }));

  const tourCount = tours.length > 0 ? tours.length : 8;

  return (
    <>
      <CityToursJsonLd
        cityName="Fes"
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
              <Link href="/destinations/fes">Fes</Link>
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
              alt="Morocco private tours starting from Fes"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              fetchPriority="high"
            />
            {/* Dark gradient overlay for text readability */}
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
              Fes Departures · 100% Private Tours
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
                Fes
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
              Leave the medieval medina behind and explore Morocco in comfort.
              Travel south to the Merzouga Sahara dunes and Marrakech, or north
              to Chefchaouen — fully private with your own expert driver.
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
                Routes starting in Fes
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
                FEZ
              </div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>
                Airport & Riad pickup
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
              Private Morocco Tours Starting from Fes
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#4a4a4a",
                margin: "0 0 12px 0",
              }}
            >
              Fes is the cultural heart of Morocco and the perfect gateway to the
              Sahara Desert. Our private tours let you explore ancient medina
              streets, cedar forests, dramatic river valleys, and golden dunes at
              your own relaxed pace.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#4a4a4a",
                margin: 0,
              }}
            >
              Whether you want a quick 3-day desert crossing from Fes to Marrakech
              or a grand two-week tour of Morocco, every itinerary is fully private
              and tailored to your group.
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
                Featured Tours from Fes
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
                driver, accommodations, and flexible daily schedules.
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
                  starting right from Fes.
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
                  Plan my Fes tour
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
                          Start: Fes
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

        {/* ========== WHY CHOOSE FES SECTION ========== */}
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
                Why Start in Fes
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
                Why Book a Tour Starting from Fes?
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
                Fes gives you a direct, scenic route to the Sahara Desert, the
                Atlas Mountains, and the imperial highlights of Morocco.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {whyChooseFes.map((item, idx) => (
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
                Everything you need to know about our private tours starting in Fes.
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
                Ready to explore from Fes?
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
                Tell us your travel dates, group size, and must-see destinations.
                Our local Moroccan team will craft your custom itinerary within 24
                hours.
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