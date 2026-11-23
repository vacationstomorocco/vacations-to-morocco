import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CustomTripForm from "@/components/CustomTripForm";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/contact`;
const BRAND_NAME = "Vacations to Morocco";
const PHONE_NUMBER = "+212668422869";
const DISPLAY_PHONE = "+212 668 422 869";
const EMAIL_ADDRESS = "vacationstomorocco@gmail.com";
const WHATSAPP = `https://wa.me/212668422869`;
const MAP_EMBED =
  "https://www.google.com/maps?q=Marrakech,+Morocco&output=embed";

export const metadata: Metadata = {
  title: "Contact Us | Plan a Custom Morocco Trip | Vacations to Morocco",
  description:
    "Contact Vacations to Morocco to plan a private trip. WhatsApp or email our local team — we reply within 24 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact Us | Vacations to Morocco",
    description: "Plan your private Morocco trip with our local team.",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
  },
};

const trustItems = [
  {
    title: "Fast Response",
    text: "We reply quickly to every message.",
    icon: "bolt",
  },
  {
    title: "We Live Here",
    text: "Our team lives in Morocco all year.",
    icon: "people",
  },
  {
    title: "Private Trips",
    text: "Every trip is made for your group and pace.",
    icon: "map",
  },
  {
    title: "Clear Prices",
    text: "Clear prices. No hidden fees.",
    icon: "shield",
  },
];

const faqs = [
  {
    q: "How fast do you reply?",
    a: "We usually reply within a few hours, and always within 24 hours — even on weekends.",
  },
  {
    q: "Do I need a full plan before I contact you?",
    a: "No. Just tell us your dates, how many people, and what you like. We build the route for you.",
  },
  {
    q: "Are your trips private?",
    a: "Yes. All our trips are private unless you ask for a shared option.",
  },
  {
    q: "Can you pick us up from the airport?",
    a: "Yes. We can meet you in Marrakech, Casablanca, Fes, Tangier, or Agadir.",
  },
  {
    q: "Is the quote free?",
    a: "Yes. Getting a trip plan and price is free and has no obligation.",
  },
  {
    q: "What languages do you speak?",
    a: "English, French, Spanish, and Arabic.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Contact Vacations to Morocco",
        description: "Contact our local team to plan a private Morocco trip.",
      },
      {
        "@type": "TravelAgency",
        name: BRAND_NAME,
        url: SITE_URL,
        telephone: PHONE_NUMBER,
        email: EMAIL_ADDRESS,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marrakech",
          addressCountry: "MA",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="cp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .cp { background: #f7f3ec; color: #1a1a1a; min-height: 100vh; }

        /* ===== HERO (desert image style) ===== */
        .cp-hero {
          position: relative;
          min-height: 72vh;
          display: flex;
          align-items: center;
          padding: 140px 24px 80px;
          overflow: hidden;
          color: #fff;
        }
        .cp-hero-bg { position: absolute; inset: 0; }
        .cp-hero-bg img { object-fit: cover; object-position: center; }
        .cp-hero-shade {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(20,12,8,.78) 0%, rgba(20,12,8,.45) 55%, rgba(20,12,8,.25) 100%);
        }
        .cp-hero-inner {
          position: relative; z-index: 2;
          max-width: 640px;
          margin-left: max(24px, calc((100vw - 1100px) / 2));
        }
        .cp-hero-eyebrow {
          font-size: .75rem; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          color: #e8b89a; margin: 0 0 16px;
        }
        .cp-hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.15;
          margin: 0 0 18px;
        }
        .cp-hero p {
          font-size: 1.1rem; line-height: 1.65;
          color: rgba(255,255,255,.9);
          margin: 0 0 28px; max-width: 480px;
        }
        .cp-wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #c45c26; color: #fff;
          padding: 14px 26px; border-radius: 100px;
          font-weight: 700; font-size: .95rem;
          text-decoration: none;
          transition: background .2s, transform .15s;
        }
        .cp-wa-btn:hover { background: #a84b1e; transform: translateY(-2px); }

        /* ===== CONTACT + FORM ===== */
        .cp-section { max-width: 1100px; margin: 0 auto; padding: 72px 24px; }
        .cp-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 28px;
          align-items: start;
        }
        .cp-box {
          background: #fff;
          border-radius: 20px;
          padding: 36px 32px;
          border: 1px solid #ebe4da;
          box-shadow: 0 8px 30px rgba(0,0,0,.03);
        }
        .cp-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .72rem; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          color: #c45c26; margin: 0 0 10px;
        }
        .cp-box h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.6rem, 2.5vw, 2rem);
          font-weight: 700; color: #0f1b18;
          margin: 0 0 28px; line-height: 1.25;
        }

        /* contact rows - FIXED GAPS AND ICONS */
        .cp-rows { display: grid; gap: 16px; }
        .cp-row {
          display: flex; gap: 16px; align-items: center;
          padding: 18px 20px;
          border: 1px solid #efe8de;
          border-radius: 16px;
          text-decoration: none; color: inherit;
          transition: border-color .2s, box-shadow .2s;
          background: #fff;
        }
        a.cp-row:hover {
          border-color: #e0d2c0;
          box-shadow: 0 6px 18px rgba(0,0,0,.04);
        }
        .cp-row-ico {
          width: 48px; height: 48px; border-radius: 12px;
          background: #c45c26; color: #fff;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .cp-row strong {
          display: block; font-size: .95rem;
          color: #0f1b18; margin-bottom: 2px;
        }
        .cp-row span, .cp-row small {
          font-size: .85rem; color: #6b6560; line-height: 1.4;
        }

        /* form styles */
        .cf-form { display: grid; gap: 16px; }
        .cf-row-2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }
        .cf-field { display: grid; gap: 6px; }
        .cf-field span {
          font-size: .72rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          color: #5c564e;
        }
        .cf-field span em { font-style: normal; font-weight: 500; color: #9a948c; text-transform: none; letter-spacing: 0; }
        .cf-field input,
        .cf-field textarea {
          width: 100%; box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #e0d6c8;
          border-radius: 12px;
          background: #fff;
          font-size: .95rem;
          font-family: inherit;
          color: #1a1a1a;
          outline: none;
          transition: border-color .2s;
        }
        .cf-field input:focus,
        .cf-field textarea:focus { border-color: #c45c26; }
        .cf-field textarea { resize: vertical; min-height: 130px; }
        .cf-submit {
          width: 100%;
          padding: 15px 20px;
          border: none; border-radius: 12px;
          background: #c45c26; color: #fff;
          font-size: 1rem; font-weight: 700;
          cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          transition: background .2s;
        }
        .cf-submit:hover { background: #a84b1e; }
        .cf-submit:disabled { opacity: .7; cursor: wait; }
        .cf-ok { margin: 0; color: #2a7253; font-size: .9rem; font-weight: 600; padding: 12px; background: #ecfdf5; border-radius: 8px; text-align: center; }
        .cf-err { margin: 0; color: #c62828; font-size: .9rem; font-weight: 600; padding: 12px; background: #fef2f2; border-radius: 8px; text-align: center; }

        /* ===== TRUST CARDS ===== */
        .cp-trust { text-align: center; padding-top: 24px; padding-bottom: 24px; }
        .cp-trust .cp-label { justify-content: center; }
        .cp-trust h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700; color: #0f1b18;
          margin: 0 0 40px;
        }
        .cp-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          text-align: center;
        }
        .cp-trust-card {
          background: #fff;
          border: 1px solid #ebe4da;
          border-radius: 18px;
          padding: 32px 20px;
          box-shadow: 0 6px 20px rgba(0,0,0,.03);
        }
        .cp-trust-ico {
          width: 52px; height: 52px; border-radius: 50%;
          background: #c45c26; color: #fff;
          display: grid; place-items: center;
          margin: 0 auto 16px;
        }
        .cp-trust-card h3 {
          font-size: 1.05rem; font-weight: 700;
          color: #0f1b18; margin: 0 0 8px;
        }
        .cp-trust-card p {
          margin: 0; font-size: .9rem;
          color: #6b6560; line-height: 1.5;
        }

        /* ===== MAP ===== */
        .cp-map-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: center;
        }
        .cp-map-copy h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.7rem, 3vw, 2.3rem);
          font-weight: 700; color: #0f1b18;
          margin: 0 0 16px; line-height: 1.25;
        }
        .cp-map-copy p {
          margin: 0; color: #5c564e;
          font-size: 1.05rem; line-height: 1.7;
          max-width: 420px;
        }
        .cp-map-frame {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #ebe4da;
          box-shadow: 0 10px 30px rgba(0,0,0,.06);
          height: 360px;
          background: #e8e0d4;
        }
        .cp-map-frame iframe {
          width: 100%; height: 100%; border: 0;
        }

        /* ===== FAQ ===== */
        .cp-faq { max-width: 800px; margin: 0 auto; }
        .cp-faq-head { text-align: center; margin-bottom: 36px; }
        .cp-faq-head h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700; color: #0f1b18;
          margin: 0 0 10px;
        }
        .cp-faq-head p { margin: 0; color: #6b6560; }
        .cp-faq-list { display: grid; gap: 12px; }
        .cp-faq-item {
          background: #fff;
          border: 1px solid #ebe4da;
          border-radius: 14px;
          padding: 20px 22px;
        }
        .cp-faq-item h3 {
          font-size: 1.05rem; font-weight: 700;
          color: #0f1b18; margin: 0 0 8px;
        }
        .cp-faq-item p {
          margin: 0; font-size: .95rem;
          color: #5c564e; line-height: 1.6;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .cp-grid, .cp-map-grid { grid-template-columns: 1fr; }
          .cp-trust-grid { grid-template-columns: 1fr 1fr; }
          .cp-hero-inner { margin-left: 0; }
          .cp-hero { min-height: 60vh; padding: 120px 20px 64px; }
        }
        @media (max-width: 600px) {
          .cp-trust-grid { grid-template-columns: 1fr; }
          .cf-row-2 { grid-template-columns: 1fr; }
          .cp-box { padding: 28px 20px; }
          .cp-map-frame { height: 280px; }
        }
      `,
        }}
      />

      {/* ========== 1. HERO ========== */}
      <section className="cp-hero">
        <div className="cp-hero-bg">
          <Image
            src="/picture/4-Days-marrakech-to-merzouga-desert-tour.webp"
            alt="Camel trek in the Sahara Desert at sunset"
            fill
            priority
            sizes="100vw"
          />
          <div className="cp-hero-shade" />
        </div>
        <div className="cp-hero-inner">
          <p className="cp-hero-eyebrow">Contact us</p>
          <h1>Let&apos;s Plan Your Morocco Trip Together</h1>
          <p>
            Want a private trip, a desert night, or a custom route? Our local
            team is ready to help.
          </p>
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent("Hi! I want to plan a trip to Morocco.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-wa-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.55c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.52.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.55 3.02 1.3 3.02.87 3.57.82.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            Get a free quote on WhatsApp
          </a>
        </div>
      </section>

      {/* ========== 2. CONTACT INFO + FORM ========== */}
      <section className="cp-section">
        <div className="cp-grid">
          {/* Left: contact info */}
          <div className="cp-box">
            <p className="cp-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Get in touch
            </p>
            <h2>Contact Information</h2>

            <div className="cp-rows">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cp-row">
                <span className="cp-row-ico" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Z"/></svg>
                </span>
                <span>
                  <strong>WhatsApp</strong>
                  <span style={{ display: "block" }}>{DISPLAY_PHONE}</span>
                  <small style={{ display: "block" }}>Chat with us for a quick reply</small>
                </span>
              </a>

              <a href={`tel:${PHONE_NUMBER}`} className="cp-row">
                <span className="cp-row-ico" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span>
                  <strong>Phone</strong>
                  <span>{DISPLAY_PHONE}</span>
                </span>
              </a>

              <a href={`mailto:${EMAIL_ADDRESS}`} className="cp-row">
                <span className="cp-row-ico" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <span>
                  <strong>Email</strong>
                  <span>{EMAIL_ADDRESS}</span>
                </span>
              </a>

              <div className="cp-row">
                <span className="cp-row-ico" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span>
                  <strong>Location</strong>
                  <span>Marrakech, Morocco</span>
                </span>
              </div>

              <div className="cp-row">
                <span className="cp-row-ico" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span>
                  <strong>Available 7 days a week</strong>
                  <span style={{ display: "block" }}>Monday – Sunday: 24/7</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: simple form card */}
          <div className="cp-box">
            <p className="cp-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              Send us a message
            </p>
            <h2>We&apos;re Here to Help</h2>
            <CustomTripForm />
          </div>
        </div>
      </section>

      {/* ========== 3. TRUST CARDS ========== */}
      <section className="cp-section cp-trust">
        <p className="cp-label">Why contact Vacations to Morocco?</p>
        <h2>Travel with Confidence</h2>
        <div className="cp-trust-grid">
          {trustItems.map((item) => (
            <article key={item.title} className="cp-trust-card">
              <div className="cp-trust-ico" aria-hidden>
                {item.icon === "bolt" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                )}
                {item.icon === "people" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                )}
                {item.icon === "map" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
                )}
                {item.icon === "shield" && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ========== 4. MAP ========== */}
      <section className="cp-section">
        <div className="cp-map-grid">
          <div className="cp-map-copy">
            <p className="cp-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Find us
            </p>
            <h2>Based in Marrakech, Exploring All of Morocco</h2>
            <p>
              Our office is in Marrakech, but our trips go everywhere — from the
              Sahara Desert to Chefchaouen, Fes, Casablanca, and beyond.
            </p>
          </div>
          <div className="cp-map-frame">
            <iframe
              src={MAP_EMBED}
              title="Vacations to Morocco — Marrakech"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ========== 5. FAQ ========== */}
      <section className="cp-section">
        <div className="cp-faq">
          <div className="cp-faq-head">
            <p className="cp-label" style={{ justifyContent: "center" }}>
              Common questions
            </p>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers before you message us.</p>
          </div>
          <div className="cp-faq-list">
            {faqs.map((item) => (
              <div key={item.q} className="cp-faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}