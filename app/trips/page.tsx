import type { Metadata } from "next";
import Link from "next/link";
import { getAllDayTrips, ExtendedTourData } from "@/lib/wordpress";
import DayTripsClient, { DayTrip } from "@/components/DayTripsClient";
import DayTripsArchiveJsonLd from "@/components/seo/DayTripsArchiveJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/trips`;
const BRAND_NAME = "Vacations to Morocco";

export const metadata: Metadata = {
  title: "Morocco Day Trips | Same-Day Private Excursions",
  description:
    "Book private one-day excursions in Morocco. Leave your hotel in the morning and return the same evening with a local private driver.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Morocco Day Trips | Same-Day Private Excursions",
    description:
      "Leave in the morning, explore mountains, coastal spots, or gorges, and return by dinner time. Private vehicles with local professional guides.",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/picture/all-morocco-tours.webp`,
        width: 1200,
        height: 630,
        alt: "Private Morocco Day Trips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Day Trips | Same-Day Private Excursions",
    description:
      "Leave your hotel in the morning and return the same evening with a private driver.",
    images: [`${SITE_URL}/picture/all-morocco-tours.webp`],
  },
};

function cleanText(str?: string) {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

function isDayTrip(wp: ExtendedTourData): boolean {
  if (!wp) return false;
  const dur = (wp.duration || "").toLowerCase();
  const title = (wp.title || "").toLowerCase();
  const slug = (wp.slug || "").toLowerCase();

  const durMatch = dur.match(/(\d+)\s*day/i);
  if (durMatch && parseInt(durMatch[1], 10) > 1) return false;

  const textMatch = (title + " " + slug).match(
    /(\d+)[\s-]*(?:days?|nights?)/i
  );
  if (textMatch && parseInt(textMatch[1], 10) > 1) return false;

  return true;
}

function mapToDayTrip(wp: ExtendedTourData, index: number): DayTrip {
  const city =
    wp.startLocation ||
    (wp.title || "").match(/from\s+([A-Za-z\s-]+)/i)?.[1] ||
    "Morocco";

  return {
    id: wp.slug || index + 1,
    title: wp.title,
    slug: wp.slug,
    city: city.trim(),
    location: wp.location || city.trim(),
    duration: wp.duration || "1 Day",
    description: cleanText(wp.seoDescription || wp.quickAnswer || ""),
    image: wp.images?.[0] || "/picture/all-morocco-tours.webp",
    price: wp.tourPrice || 0,
  };
}

const faqs = [
  {
    question: "What exactly is a Morocco day trip?",
    answer:
      "A Morocco day trip is a single-day private excursion. You leave your hotel in the morning and return the same evening.",
  },
  {
    question: "What's included in the day trip price?",
    answer:
      "Includes hotel pick-up and drop-off, a modern air-conditioned vehicle, professional English-speaking driver, and fuel.",
  },
  {
    question: "What time do day trips start and end?",
    answer:
      "Most day trips begin between 8:00 AM and 9:00 AM and return between 6:00 PM and 8:00 PM the same day.",
  },
];

// Clean text-only city filters (emojis removed)
const cities = [
  { name: "Marrakech", slug: "marrakech" },
  { name: "Fes", slug: "fes" },
  { name: "Agadir", slug: "agadir" },
  { name: "Tangier", slug: "tangier" },
];

export default async function DayTripsPage() {
  let dayTrips: DayTrip[] = [];

  try {
    const wpData: ExtendedTourData[] = await getAllDayTrips();
    dayTrips = (wpData || []).filter(isDayTrip).map(mapToDayTrip);
  } catch (error) {
    console.error("Failed to load day trips:", error);
    dayTrips = [];
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <DayTripsArchiveJsonLd dayTrips={dayTrips} faqs={faqs} />

      {/* ── HERO ── */}
      <section className="dt2-hero">
        <div className="dt2-hero-motif" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" />
            <rect x="60" y="60" width="80" height="80" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" />
            <rect x="80" y="80" width="40" height="40" stroke="currentColor" strokeWidth="1" transform="rotate(45 100 100)" />
            <circle cx="100" cy="100" r="6" fill="currentColor" />
          </svg>
        </div>

        <div className="dt2-wrap">
          <p className="dt2-hero-kicker">Private Excursions · Single Day</p>

          <h1 className="dt2-hero-title">
            Morocco
            <br />
            <span className="dt2-hero-gold">Day Trips</span>
          </h1>

          <p className="dt2-hero-desc">
            Depart at dawn. Traverse the Atlas, the coast, or ancient gorges.
            Be back at your hotel before dinner — every mile curated by a local
            private driver.
          </p>

          <a href="#excursions" className="dt2-hero-cta">
            Explore Excursions
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── STATS RIBBON ── */}
      <section className="dt2-stats">
        <div className="dt2-wrap dt2-stats-grid">
          <div className="dt2-stat">
            <strong>1</strong>
            <span>Day Round-Trip</span>
          </div>
          <div className="dt2-stat-divider" />
          <div className="dt2-stat">
            <strong>100%</strong>
            <span>Private Vehicle</span>
          </div>
          <div className="dt2-stat-divider" />
          <div className="dt2-stat">
            <strong>4+</strong>
            <span>Departure Cities</span>
          </div>
          <div className="dt2-stat-divider" />
          <div className="dt2-stat">
            <strong>∞</strong>
            <span>Memories Made</span>
          </div>
        </div>
      </section>

      {/* ── EXCURSIONS GRID ── */}
      <section className="dt2-excursions" id="excursions">
        <div className="dt2-wrap">
          <header className="dt2-section-head">
            <span className="dt2-label">01 — Excursions</span>
            <h2>Choose Your Departure City</h2>
            <p>
              Every trip starts and ends the same day. Pick the city you are
              staying in, or browse the full collection.
            </p>
          </header>

          <DayTripsClient dayTrips={dayTrips} cities={cities} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="dt2-faq">
        <div className="dt2-wrap">
          <header className="dt2-section-head dt2-section-head--light">
            <span className="dt2-label dt2-label--light">02 — FAQ</span>
            <h2>Questions We Hear Often</h2>
          </header>

          <div className="dt2-faq-grid">
            {faqs.map((f, i) => (
              <div key={i} className="dt2-faq-card">
                <span className="dt2-faq-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="dt2-faq-q">{f.question}</h3>
                <p className="dt2-faq-a">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const pageStyles = `
  .dt2-wrap {
    width: min(1180px, 100% - 48px);
    margin-inline: auto;
  }

  .dt2-hero {
    position: relative;
    overflow: hidden;
    background: #0B1D1A;
    color: #EDE8DF;
    padding: 110px 0 90px;
  }

  .dt2-hero-motif {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    width: 420px;
    height: 420px;
    color: rgba(212, 168, 83, 0.12);
    pointer-events: none;
  }

  .dt2-hero-kicker {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #D4A853;
    margin: 0 0 28px;
  }

  .dt2-hero-title {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: clamp(3rem, 7vw, 5.6rem);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -2px;
    margin: 0 0 28px;
    color: #FFFFFF;
  }

  .dt2-hero-gold {
    color: #D4A853;
  }

  .dt2-hero-desc {
    max-width: 540px;
    font-size: 1.08rem;
    line-height: 1.7;
    color: #A8B5B0;
    margin: 0 0 36px;
  }

  .dt2-hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: #D4A853;
    color: #0B1D1A;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    transition: background 0.25s, transform 0.25s;
  }

  .dt2-hero-cta:hover {
    background: #E2BC6E;
    transform: translateY(-2px);
  }

  .dt2-stats {
    background: #D4A853;
    padding: 28px 0;
  }

  .dt2-stats-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
  }

  .dt2-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 0 36px;
  }

  .dt2-stat strong {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 1.6rem;
    font-weight: 900;
    color: #0B1D1A;
    letter-spacing: -0.5px;
  }

  .dt2-stat span {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #3A2E14;
  }

  .dt2-stat-divider {
    width: 1px;
    height: 36px;
    background: rgba(11, 29, 26, 0.2);
  }

  .dt2-excursions {
    padding: 80px 0 70px;
    background: #F6F3EE;
  }

  .dt2-section-head {
    margin-bottom: 44px;
  }

  .dt2-section-head--light h2 {
    color: #FFFFFF;
  }

  .dt2-section-head--light p {
    color: #A8B5B0;
  }

  .dt2-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #D4A853;
    margin-bottom: 14px;
  }

  .dt2-label--light {
    color: #D4A853;
  }

  .dt2-section-head h2 {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: #0B1D1A;
    letter-spacing: -1px;
    margin: 0 0 12px;
  }

  .dt2-section-head p {
    color: #6B7A74;
    font-size: 1rem;
    line-height: 1.65;
    max-width: 560px;
    margin: 0;
  }

  .dt2-faq {
    background: #0B1D1A;
    padding: 80px 0 100px;
  }

  .dt2-faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .dt2-faq-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(212, 168, 83, 0.15);
    border-radius: 4px;
    padding: 36px 32px;
    transition: border-color 0.3s, background 0.3s;
  }

  .dt2-faq-card:hover {
    border-color: rgba(212, 168, 83, 0.45);
    background: rgba(255, 255, 255, 0.07);
  }

  .dt2-faq-num {
    display: block;
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 2.4rem;
    font-weight: 900;
    color: rgba(212, 168, 83, 0.25);
    line-height: 1;
    margin-bottom: 16px;
    letter-spacing: -1px;
  }

  .dt2-faq-q {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 12px;
    line-height: 1.35;
  }

  .dt2-faq-a {
    color: #8FA39C;
    font-size: 0.92rem;
    line-height: 1.7;
    margin: 0;
  }

  @media (max-width: 700px) {
    .dt2-hero {
      padding: 80px 0 60px;
    }

    .dt2-hero-motif {
      width: 220px;
      height: 220px;
      right: -60px;
      top: 20px;
      transform: none;
    }

    .dt2-stats-grid {
      gap: 20px;
    }

    .dt2-stat {
      padding: 0 18px;
    }

    .dt2-stat-divider {
      display: none;
    }

    .dt2-faq-grid {
      grid-template-columns: 1fr;
    }
  }
`;