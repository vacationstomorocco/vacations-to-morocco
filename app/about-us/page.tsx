import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/about`;
const BRAND_NAME = "Vacations to Morocco";
const PHONE_NUMBER = "+212668422869";
const DISPLAY_PHONE = "+212 668 422 869";
const EMAIL_ADDRESS = "vacationstomorocco@gmail.com";

export const metadata: Metadata = {
  title: "About Us | Vacations to Morocco – Local Team & Private Trips",
  description:
    "Meet Vacations to Morocco. We are a local travel team that plans private Sahara desert trips, city tours, and custom Morocco holidays with trusted drivers and guides.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "About Vacations to Morocco | Your Local Morocco Travel Team",
    description:
      "Family-run Morocco travel team. We plan private tours, desert camps, and real cultural trips across the country.",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/picture/Morocco-trips.webp",
        width: 1200,
        height: 630,
        alt: "Vacations to Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vacations to Morocco | Your Local Morocco Travel Team",
    description:
      "Family-run Morocco travel team. We plan private tours, desert camps, and real cultural trips across the country.",
  },
};

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "2,500+", label: "Happy Travelers" },
  { value: "4.9/5", label: "Guest Rating" },
  { value: "24/7", label: "Local Support" },
];

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: "About Us | Vacations to Morocco – Local Team & Private Trips",
        description:
          "Learn about Vacations to Morocco, your trusted local team for private trips in Morocco. We plan tours to Marrakech, the Sahara Desert, old cities, and more.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#travel-agency`,
        },
      },
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travel-agency`,
        name: BRAND_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/picture/vacations-to-morocco.webp`,
        },
        image: `${SITE_URL}/picture/Morocco-trips.webp`,
        description:
          "Vacations to Morocco is a licensed local travel team. We plan private custom trips, Sahara desert camel rides, and real cultural holidays in Morocco.",
        telephone: PHONE_NUMBER,
        email: EMAIL_ADDRESS,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marrakech",
          addressCountry: "MA",
        },
        areaServed: {
          "@type": "Country",
          name: "Morocco",
        },
        knowsAbout: [
          "Morocco Travel",
          "Private Morocco Tours",
          "Sahara Desert Camel Trips",
          "Marrakech Day Trips",
          "Fes and Old City Trips",
          "Custom Morocco Holidays",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}/#breadcrumb`,
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
            name: "About Us",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <main className="pro-about">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .pro-about {
          background-color: #fcfaf8;
          color: #1a1a1a;
          font-family: system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
        }

        /* --- TYPOGRAPHY --- */
        .pro-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a85a3c;
          margin-bottom: 16px;
          display: block;
        }
        .pro-title {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
          color: #0f1b18;
          line-height: 1.15;
          margin: 0;
        }

        /* --- HERO --- */
        .pro-hero {
          position: relative;
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px;
          color: #fff;
          overflow: hidden;
        }
        .pro-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pro-hero-bg img {
          object-fit: cover;
          transform: scale(1.05);
        }
        .pro-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,27,24,0.3) 0%, rgba(15,27,24,0.7) 100%);
          z-index: 1;
        }
        .pro-hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
        }
        .pro-hero-content .pro-title {
          color: #fff;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 24px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .pro-hero-content p {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          margin: 0 auto 40px;
          max-width: 640px;
          font-weight: 300;
        }
        .pro-btn-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .pro-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .pro-btn-primary {
          background: #a85a3c;
          color: #fff;
        }
        .pro-btn-primary:hover {
          background: #8c482e;
          transform: translateY(-2px);
        }
        .pro-btn-outline {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(4px);
        }
        .pro-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        /* --- STATS RIBBON --- */
        .pro-stats {
          background: #0f1b18;
          color: #fff;
          padding: 60px 24px;
          position: relative;
          z-index: 10;
        }
        .pro-stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        .pro-stat-val {
          font-family: Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #e2c09f;
          margin-bottom: 8px;
        }
        .pro-stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.6);
        }

        /* --- THE STORY --- */
        .pro-story {
          padding: 120px 24px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .pro-story-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 24px 24px 0 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .pro-story-image img { object-fit: cover; }
        .pro-story-image::after {
          content: "";
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 60%;
          height: 60%;
          border: 2px solid #e2c09f;
          border-radius: 24px 0 24px 24px;
          z-index: -1;
        }
        .pro-story-text .pro-title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 32px;
        }
        .pro-story-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 24px;
        }

        /* --- VALUES --- */
        .pro-values {
          padding: 100px 24px 120px;
          background: #fff;
        }
        .pro-values-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .pro-values-header {
          text-align: center;
          margin-bottom: 72px;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }
        .pro-values-header .pro-title {
          font-size: clamp(2rem, 4vw, 2.8rem);
        }
        .pro-values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .pro-value-card {
          background: #fcfaf8;
          padding: 48px;
          border-radius: 24px;
          border: 1px solid #eaeaea;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pro-value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.04);
          border-color: #e2c09f;
        }
        .pro-value-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a85a3c;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .pro-value-card h3 {
          font-family: Georgia, serif;
          font-size: 1.4rem;
          color: #0f1b18;
          margin: 0 0 16px;
        }
        .pro-value-card p {
          color: #666;
          line-height: 1.6;
          margin: 0;
          font-size: 1rem;
        }

        /* --- PROCESS --- */
        .pro-process {
          padding: 120px 24px;
          background: #0f1b18;
          color: #fff;
        }
        .pro-process-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
        }
        .pro-process-text .pro-eyebrow { color: #e2c09f; }
        .pro-process-text .pro-title {
          color: #fff;
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 24px;
        }
        .pro-process-text p {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          line-height: 1.7;
        }
        .pro-timeline {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }
        .pro-timeline::before {
          content: '';
          position: absolute;
          left: 24px;
          top: 10px;
          bottom: 20px;
          width: 1px;
          background: rgba(255,255,255,0.15);
        }
        .pro-step {
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 2;
        }
        .pro-step-num {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          background: #0f1b18;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2c09f;
        }
        .pro-step-content h3 {
          font-family: Georgia, serif;
          font-size: 1.3rem;
          margin: 0 0 10px;
          color: #fff;
        }
        .pro-step-content p {
          margin: 0;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        /* --- CTA --- */
        .pro-cta {
          padding: 120px 24px;
          text-align: center;
        }
        .pro-cta-box {
          max-width: 1000px;
          margin: 0 auto;
          background: #e2c09f;
          border-radius: 32px;
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
        }
        .pro-cta-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23916943' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        .pro-cta-content {
          position: relative;
          z-index: 2;
        }
        .pro-cta-content .pro-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 24px;
          color: #0f1b18;
        }
        .pro-cta-content p {
          font-size: 1.1rem;
          color: rgba(15,27,24,0.8);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }
        .pro-cta-btn {
          background: #0f1b18;
          color: #fff;
          padding: 18px 40px;
          border-radius: 100px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .pro-cta-btn:hover {
          transform: translateY(-2px);
          background: #1a2c27;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
          .pro-story {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 80px 24px;
          }
          .pro-story-image { aspect-ratio: 16/10; }
          .pro-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
          }
          .pro-process-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 768px) {
          .pro-values-grid { grid-template-columns: 1fr; }
          .pro-value-card { padding: 32px; }
          .pro-cta-box { padding: 60px 24px; }
        }
      `}} />

      {/* ========== HERO ========== */}
      <section className="pro-hero">
        <div className="pro-hero-bg">
          <Image
            src="/picture/all-morocco-tours.webp"
            alt="Morocco landscape"
            fill
            priority
            sizes="100vw"
          />
          <div className="pro-hero-overlay" />
        </div>
        <div className="pro-hero-content">
          <span className="pro-eyebrow" style={{ color: "#e2c09f" }}>
            About Vacations to Morocco
          </span>
          <h1 className="pro-title">
            Local team. Private trips. Real Morocco.
          </h1>
          <p>
            We plan easy, private trips across Morocco — from old cities to the
            Sahara Desert — made by a team that lives here all year.
          </p>
          <div className="pro-btn-group">
            <Link href="/contact" className="pro-btn pro-btn-primary">
              Plan Your Trip
            </Link>
            <Link href="/morocco-tours" className="pro-btn pro-btn-outline">
              See Our Tours
            </Link>
          </div>
        </div>
      </section>

      {/* ========== STATS RIBBON ========== */}
      <section className="pro-stats">
        <div className="pro-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="pro-stat-val">{stat.value}</div>
              <div className="pro-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== THE STORY ========== */}
      <section className="pro-story">
        <div className="pro-story-image">
          <Image
            src="/picture/Morocco-trips.webp"
            alt="Vacations to Morocco guide"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="pro-story-text">
          <span className="pro-eyebrow">Our Story</span>
          <h2 className="pro-title">
            Made in Morocco, for people who want a real trip.
          </h2>
          <p>
            Vacations to Morocco started with a simple idea: travelers should
            see Morocco with people who really know it — not from a plain
            tour package.
          </p>
          <p>
            Today we plan private and small-group trips from Marrakech,
            Casablanca, Fes, Tangier, Agadir, and more. You can pick a classic
            city route or a full custom family trip. We take care of
            everything so you can just enjoy the ride.
          </p>
          <p>
            Every trip is built around your comfort, your pace, and real local
            moments — old kasbahs, busy markets, mountain roads, desert
            sunsets, and the warm welcome Morocco is famous for.
          </p>
        </div>
      </section>

      {/* ========== VALUES / WHY US ========== */}
      <section className="pro-values">
        <div className="pro-values-inner">
          <div className="pro-values-header">
            <span className="pro-eyebrow">What We Believe</span>
            <h2 className="pro-title">A better way to see Morocco</h2>
          </div>

          <div className="pro-values-grid">
            <article className="pro-value-card">
              <div className="pro-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Private Trips Only</h3>
              <p>
                No big tour buses. Every trip is just for your group, planned
                around what you like and how you want to travel.
              </p>
            </article>

            <article className="pro-value-card">
              <div className="pro-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>Clear and Honest Prices</h3>
              <p>
                Simple routes, fair timing, and no hidden costs. You see
                exactly what you get before you book.
              </p>
            </article>

            <article className="pro-value-card">
              <div className="pro-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <h3>We Live Here</h3>
              <p>
                Our drivers and guides are local. They know the roads, the
                best places to stay, and the quiet spots most tourists miss.
              </p>
            </article>

            <article className="pro-value-card">
              <div className="pro-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a5.5 5.5 0 0 1 10.5-2.5 5.5 5.5 0 0 1 7.5 2.5z"/></svg>
              </div>
              <h3>Comfort First</h3>
              <p>
                Nice cars with air conditioning, good hotels and riads, and a
                relaxed daily pace so you enjoy every day.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========== PROCESS (Timeline) ========== */}
      <section className="pro-process">
        <div className="pro-process-inner">
          <div className="pro-process-text">
            <span className="pro-eyebrow">How It Works</span>
            <h2 className="pro-title">
              From your first message to the last day
            </h2>
            <p>
              Booking with us is easy. Tell us your dates, your pace, and what
              you like. We build a clear plan, book your stays, and stay with
              you the whole trip.
            </p>
          </div>

          <div className="pro-timeline">
            <div className="pro-step">
              <div className="pro-step-num">1</div>
              <div className="pro-step-content">
                <h3>Tell us your ideas</h3>
                <p>
                  Share your dates, how many people, the cities you like, and
                  your travel style.
                </p>
              </div>
            </div>

            <div className="pro-step">
              <div className="pro-step-num">2</div>
              <div className="pro-step-content">
                <h3>Get a clear plan</h3>
                <p>
                  We send you a private trip plan with the route, hotels, and
                  what is included.
                </p>
              </div>
            </div>

            <div className="pro-step">
              <div className="pro-step-num">3</div>
              <div className="pro-step-content">
                <h3>Change it until it's right</h3>
                <p>
                  We change the pace, hotels, or stops until the trip feels
                  perfect for you.
                </p>
              </div>
            </div>

            <div className="pro-step">
              <div className="pro-step-num">4</div>
              <div className="pro-step-content">
                <h3>Travel with help nearby</h3>
                <p>
                  Your driver guides you on the road, and our team is here
                  24/7 if you need anything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="pro-cta">
        <div className="pro-cta-box">
          <div className="pro-cta-content">
            <span className="pro-eyebrow" style={{ color: "#8c482e" }}>
              Ready When You Are
            </span>
            <h2 className="pro-title">Let's plan your Morocco trip</h2>
            <p>
              Tell us your dates and your ideas. We will send back a clear
              private plan with honest prices and real tips from our local
              team.
            </p>
            <Link href="/contact" className="pro-cta-btn">
              Start Planning →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}