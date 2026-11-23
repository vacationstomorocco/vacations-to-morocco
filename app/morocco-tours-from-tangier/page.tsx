// src/app/morocco-tours-from-tangier/page.tsx

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { getToursByStartLocation } from "@/lib/wordpress";
import CityToursJsonLd from "@/components/seo/CityToursJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_PATH = "/morocco-tours-from-tangier";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/Morocco-tours-from-tangier.webp";

// Tangier coordinates
const GEO_LAT = 35.7595;
const GEO_LNG = -5.834;

const seoTitle =
  "Trips from Tangier | Private Sahara Desert & Morocco Circuits | Vacations to Morocco";
const seoDescription =
  "Book private trips from Tangier to Chefchaouen, Fes, the Merzouga Sahara Desert, and Marrakech. Custom 3–14 day Morocco itineraries with TNG airport and ferry port pickup.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    title: seoTitle,
    description: seoDescription,
    images: [{ url: HERO_IMAGE, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

const whyChooseTangier = [
  {
    title: "Quick Access to Chefchaouen",
    desc: "The famous Blue City is only a short 2.5-hour scenic drive through the Rif Mountains from Tangier.",
    icon: "🏙️",
  },
  {
    title: "Port & Airport Pickup",
    desc: "Arriving by ferry from Spain or landing at Tangier Airport (TNG)? Your driver meets you on arrival with a sign.",
    icon: "⛴️",
  },
  {
    title: "Full North-to-South Route",
    desc: "Start at the Mediterranean sea and travel through Fes and the Sahara dunes, finishing in Marrakech.",
    icon: "🗺️",
  },
  {
    title: "100% Private & Flexible",
    desc: "Travel comfortably at your own pace. Stop anytime for photos, mint tea, scenic viewpoints, or rest.",
    icon: "🚗",
  },
];

const faqs = [
  {
    question: "What are the best trips starting from Tangier?",
    answer: "Our most popular tour starts in Tangier, visits the blue city of Chefchaouen, explores the ancient medina of Fes, crosses the dunes of Merzouga, and finishes in Marrakech.",
  },
  {
    question: "Can you pick us up at Tangier Ferry Port or Airport (TNG)?",
    answer: "Yes! Your private driver will meet you directly at Tangier Ville Port, Tangier Med Port, Ibn Battouta Airport (TNG), or your hotel lobby.",
  },
  {
    question: "Is it possible to visit Chefchaouen on day one?",
    answer: "Yes! Chefchaouen is just a 2.5-hour drive through the Rif Mountains, making it the perfect first stop on your trip.",
  },
];

export default async function ToursFromTangierPage() {
  const wpTours = await getToursByStartLocation("tangier");

  const tours = (wpTours || []).map((tour) => {
    return {
      slug: tour.slug,
      title: tour.title,
      description: tour.quickAnswer || tour.seoDescription || `Private multi-day Morocco trip starting in Tangier: ${tour.title}.`,
      duration: tour.duration || "Multi-day private trip",
      location: tour.startLocation || "Tangier",
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
    reviews: 12,
  }));

  const tourCount = tours.length > 0 ? tours.length : 8;

  return (
    <>
      <CityToursJsonLd cityName="Tangier" pagePath={PAGE_PATH} seoTitle={seoTitle} seoDescription={seoDescription} tours={schemaTours} faqs={faqs} />

      <main className={styles.page} suppressHydrationWarning>
        
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.wrap}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/destinations/tangier">Tangier</Link><span>/</span><span>Trips</span>
            </nav>
            <Link href="/contact" className={styles.topCta}>Plan my trip</Link>
          </div>
        </div>

        {/* HERO */}
        <header style={{ position: "relative", width: "100%", minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={HERO_IMAGE} alt="Morocco trips from Tangier" style={{ width: "100%", height: "100%", objectFit: "cover" }} fetchPriority="high" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.2) 100%)" }} />
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "80px 24px 50px" }}>
            <p style={{ color: "#e8a090", textTransform: "uppercase", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "16px" }}>
              Tangier Departures · 100% Private
            </p>
            <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.8rem, 6vw, 4.6rem)", color: "#ffffff", margin: "0 0 20px 0", lineHeight: 1.08, fontWeight: 400, maxWidth: "700px" }}>
              Morocco trips from <em style={{ fontStyle: "italic", color: "#e07a5f", fontWeight: 600 }}>Tangier</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.12rem", lineHeight: 1.6, marginBottom: "32px", maxWidth: "540px" }}>
              Start your journey at the northern gateway of Morocco. Explore the blue town of Chefchaouen, old imperial cities, and the Sahara Desert on a private trip tailored for you.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
              <a href="#tours" style={{ backgroundColor: "#ffffff", color: "#111", padding: "14px 28px", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}>See live trips</a>
              <Link href="/contact" style={{ backgroundColor: "transparent", border: "1.5px solid rgba(255,255,255,0.55)", color: "#ffffff", padding: "14px 28px", borderRadius: "999px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", backdropFilter: "blur(4px)" }}>Request a custom route</Link>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "0 24px 35px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderRadius: "14px", padding: "18px 24px" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: "2px" }}>{tourCount}</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>Trips starting here</div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderRadius: "14px", padding: "18px 24px" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: "2px" }}>TNG</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>Port & Airport pickup included</div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderRadius: "14px", padding: "18px 24px" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: "2px" }}>100%</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>Private comfortable cars</div>
            </div>
          </div>
        </header>

        {/* INTRO */}
        <section style={{ padding: "40px 24px 30px", backgroundColor: "#ffffff", textAlign: "center" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.3rem)", fontWeight: 400, color: "#1a1a1a", marginBottom: "14px" }}>
              Morocco Trips From Tangier
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#4a4a4a", margin: "0 0 12px 0" }}>
              Tangier is the ideal northern gateway to Morocco, whether you arrive by ferry from Spain or fly directly into Tangier Airport (TNG). From here, you can easily explore the Rif Mountains, the blue town of Chefchaouen, the historic medina of Fes, and travel all the way south to the Sahara Desert and Marrakech.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#4a4a4a", margin: 0 }}>
              All of our tours from Tangier are <strong>100% private</strong>. You travel at your own comfortable pace with a modern vehicle and a friendly, English-speaking local driver.
            </p>
          </div>
        </section>

        {/* TOURS GRID */}
        <section id="tours" style={{ padding: "40px 24px 60px", backgroundColor: "#f8f7f3" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ color: "#c75c40", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "8px" }}>
                Live from our tour desk
              </p>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111", margin: "0 0 12px 0" }}>
                Private trips from Tangier
              </h2>
              <p style={{ color: "#666", fontSize: "1.02rem", lineHeight: 1.5, maxWidth: "680px", margin: "0 auto" }}>
                Handcrafted private circuits starting directly from Tangier Port or TNG airport. Travel through Chefchaouen, Fes, and the Sahara with friendly local drivers.
              </p>
            </div>

            {tours.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", marginBottom: "12px" }}>No Tangier departures published yet</h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>Tell us your ferry or flight details and we will build a private route for you.</p>
                <Link href="/contact" style={{ display: "inline-block", backgroundColor: "#111", color: "#fff", padding: "12px 26px", borderRadius: "999px", textDecoration: "none", fontWeight: 600 }}>
                  Plan my itinerary
                </Link>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "28px",
              }}>
                {tours.map((tour, index) => {
                  const num = String(index + 1).padStart(2, "0");

                  return (
                    <article
                      key={tour.slug}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "0",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link href={`/tours/${tour.slug}`} style={{ position: "relative", display: "block", aspectRatio: "4/3", overflow: "hidden" }}>
                        <img
                          src={tour.image}
                          alt={tour.imageAlt}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          loading="lazy"
                        />
                        <span style={{
                          position: "absolute", top: "16px", left: "20px",
                          color: "#fff", fontSize: "1.5rem", fontWeight: 700,
                          fontFamily: "Georgia, serif", textShadow: "0 2px 8px rgba(0,0,0,0.4)"
                        }}>
                          {num}
                        </span>
                        {tour.duration && (
                          <span style={{
                            position: "absolute", top: "16px", right: "20px",
                            backgroundColor: "#ffffff", color: "#111",
                            fontSize: "0.85rem", fontWeight: 700,
                            padding: "6px 12px"
                          }}>
                            {tour.duration}
                          </span>
                        )}
                      </Link>

                      <div style={{ padding: "26px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <p style={{
                          color: "#c75c40", textTransform: "uppercase",
                          fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 10px 0",
                        }}>
                          From Tangier
                        </p>

                        <h3 style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "1.5rem", fontWeight: 400, color: "#111",
                          margin: "0 0 14px 0", lineHeight: 1.25,
                        }}>
                          <Link href={`/tours/${tour.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {tour.title}
                          </Link>
                        </h3>

                        <p style={{
                          color: "#666", fontSize: "0.98rem", lineHeight: 1.6,
                          margin: "0 0 24px 0", flex: 1,
                        }}>
                          {tour.description.length > 130
                            ? tour.description.slice(0, 130).trim() + "…"
                            : tour.description}
                        </p>

                        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "18px", marginTop: "auto" }}>
                          <Link
                            href={`/tours/${tour.slug}`}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              color: "#111", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
                            }}
                          >
                            <span>See this trip</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

        {/* WHY CHOOSE TOURS FROM TANGIER (BETWEEN TOURS & FAQ) */}
        <section style={{ padding: "50px 24px", backgroundColor: "#ffffff", borderTop: "1px solid #edebe4" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{ color: "#c75c40", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "8px" }}>
                Key Benefits
              </p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.3rem)", color: "#111", margin: 0, fontWeight: 400 }}>
                Why choose a tour from Tangier?
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {whyChooseTangier.map((item) => (
                <div key={item.title} style={{ backgroundColor: "#f9f8f5", borderRadius: "12px", padding: "24px 20px", border: "1px solid #ebe7df" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "#555", margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq} aria-labelledby="faq-title" style={{ padding: "50px 0", backgroundColor: "#f8f7f3" }}>
          <div className={styles.wrapNarrow}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p className={styles.kicker}>FAQ</p>
              <h2 id="faq-title">Trips from Tangier — Essential Questions</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid #e0dfd8" }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", fontWeight: 600, color: "#111" }}>{f.question}</h3>
                  <p style={{ margin: 0, color: "#555", fontSize: "0.98rem", lineHeight: 1.65 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADVENTURE CTA CONTACT */}
        <section style={{ padding: "70px 24px", backgroundColor: "#ffffff", borderTop: "1px solid #edebe4" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "50px", justifyContent: "space-between", alignItems: "center" }}>
            
            <div style={{ flex: "1 1 450px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#111", marginBottom: "16px", fontWeight: 400, lineHeight: 1.2 }}>
                Ready for a Tangier Adventure?
              </h2>
              <p style={{ color: "#555", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "30px", maxWidth: "500px" }}>
                Have questions about our Tangier trips, ferry connections, or custom itineraries? Send our local team a message and we will help you plan your journey.
              </p>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "#956b3b", color: "#fff", padding: "15px 30px", borderRadius: "999px", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
                Get in Touch
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </Link>
            </div>

            <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#956b3b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111", marginBottom: "2px" }}>Email us</div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>vacationstomorocco@gmail.com</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#956b3b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111", marginBottom: "2px" }}>Call or WhatsApp</div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>+212 668 422 869</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#956b3b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "#111", marginBottom: "2px" }}>Follow us</div>
                  <div style={{ color: "#666", fontSize: "0.95rem" }}>@vacationstomorocco</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}