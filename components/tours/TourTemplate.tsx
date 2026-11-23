"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { ExtendedTourData } from "@/lib/wordpress";

interface Props {
  tour: ExtendedTourData;
  siteUrl: string;
}

const BRAND_NAME = "Vacations to Morocco";
const WHATSAPP_NUMBER = "212668422869";

// Universal elegant theme colors
const THEME_GOLD = "#9A723D";
const THEME_TEXT = "#555555";

const money = (c: string) =>
  ({ EUR: "€", USD: "$", GBP: "£", MAD: "MAD " } as Record<string, string>)[c] ||
  `${c} `;

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#fdfaf6",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "0.9rem",
  color: THEME_TEXT,
  fontWeight: 400,
  border: `1px solid #f2ebe1`,
};

function cleanHeadingTitle(title: string, wordToRemove: string): string {
  const regex = new RegExp(`\\b${wordToRemove}\\b`, "gi");
  return title.replace(regex, "").replace(/\s+/g, " ").trim();
}

function cap(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Pulls "Day X Highlights" out of day HTML paragraphs.
 * Handles cases where the heading and the <ul> are split into separate blocks by the CMS.
 */
function extractDayHighlights(paragraphs: string[] = []) {
  const highlights: string[] = [];
  const cleanParagraphs: string[] = [];
  let expectingList = false;

  const headingRe =
    /(?:<p>\s*)?(?:<strong>\s*)?(?:Day\s+\d+\s+)?Highlights\s*:?\s*(?:<\/strong>)?\s*(?:<\/p>)?/i;

  const pullLis = (html: string) => {
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let m: RegExpExecArray | null;
    while ((m = liRe.exec(html)) !== null) {
      const text = m[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&#8217;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&#8211;/g, "–")
        .replace(/&ndash;/g, "–")
        .trim();
      if (text) highlights.push(text);
    }
  };

  for (const raw of paragraphs) {
    const html = (raw || "").trim();
    if (!html) continue;

    const hasHeading = headingRe.test(html);
    const hasLi = /<li[^>]*>/i.test(html);

    // Case A: heading + list together in one block
    if (hasHeading && hasLi) {
      pullLis(html);
      expectingList = false;
      continue; // Skip rendering this block as normal text
    }

    // Case B: only the "Day X Highlights:" heading
    if (hasHeading && !hasLi) {
      expectingList = true;
      continue; // Skip rendering the heading
    }

    // Case C: list that follows a highlights heading
    if (expectingList && hasLi) {
      pullLis(html);
      expectingList = false;
      continue; // Skip rendering the list
    }

    // If it's none of the above, it's normal day text
    expectingList = false;
    cleanParagraphs.push(raw);
  }

  return { highlights, cleanParagraphs };
}

export default function TourTemplate({ tour }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  const sym = money(tour.tourCurrency);
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    tour.whatsappMessage || `Hello, I am interested in: ${tour.title}`
  )}`;

  const qf = Object.fromEntries(tour.quickFacts || []);
  const duration = qf["Duration"] || tour.duration || "";
  const start = qf["Start"] || tour.startLocation || "";
  const end = qf["End"] || tour.endLocation || "";
  const groupSize = qf["Group size"] || tour.groupSize || "";

  const languages =
    qf["Languages"] || qf["Language"] || tour.languages || "English, French, Spanish";
  const tourType =
    qf["Tour type"] || qf["Tour Type"] || tour.tourType || "Private Trip";
  const tourPrice = Number(tour.tourPrice) || 0;

  const baseImages =
    tour.images && tour.images.length > 0
      ? tour.images
      : ["/picture/all-morocco-tours.webp"];
  const galleryImages = [...baseImages];
  while (galleryImages.length < 5) {
    galleryImages.push(baseImages[galleryImages.length % baseImages.length]);
  }

  const defaultWhyChoose = [
    {
      title: "100% Private & Flexible",
      description:
        "Travel comfortably in a private, air-conditioned vehicle. Stop whenever you wish for photo opportunities, coffee, or scenic breaks.",
    },
    {
      title: "Expert Local Drivers & Guides",
      description:
        "Experienced, English-speaking professional drivers and certified local guides to bring Morocco's history and culture to life.",
    },
    {
      title: "Handpicked Accommodations",
      description:
        "Stay in authentic Moroccan Riads, comfortable hotels, and luxury Saharan desert camps equipped with private facilities.",
    },
    {
      title: "Clear Prices & 24/7 Support",
      description:
        "No hidden fees, honest guidance, and continuous local assistance from your first inquiry until the end of your trip.",
    },
  ];

  const whyChooseItems =
    tour.whyChooseThisTour && tour.whyChooseThisTour.length > 0
      ? tour.whyChooseThisTour
      : defaultWhyChoose;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Travel dates, number of travelers and any special requests..."
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function onInquiry(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      name: email.split("@")[0] || "Trip Inquiry Customer",
      email: email,
      dates: "Specified in message",
      travelers: groupSize || "Private Group",
      duration: duration || "Flexible",
      interests: `Specific Trip Request: ${tour.title}`,
      message: message,
    };

    try {
      const res = await fetch(
        "https://cms.vacationstomorocco.com/wp-json/custom-api/v1/send-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        setEmail("");
        setMessage(
          "Travel dates, number of travelers and any special requests..."
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const standardH2Style: React.CSSProperties = {
    fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
    fontWeight: 400,
    lineHeight: "1.3",
    color: THEME_GOLD,
    marginBottom: "14px",
    fontFamily: "Georgia, serif",
  };

  const dynamicH2Style: React.CSSProperties = {
    fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)",
    fontWeight: 400,
    lineHeight: "1.3",
    color: THEME_GOLD,
    marginBottom: "16px",
    fontFamily: "Georgia, serif",
  };

  const dynamicH3Style: React.CSSProperties = {
    fontSize: "clamp(1.2rem, 2.2vw, 1.55rem)",
    fontWeight: 400,
    lineHeight: "1.35",
    color: THEME_GOLD,
    margin: "0 0 20px 0",
    fontFamily: "Georgia, serif",
  };

  const eyebrowStyle: React.CSSProperties = {
    color: THEME_GOLD,
    fontWeight: 400,
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "8px",
  };

  const bodyTextStyle: React.CSSProperties = {
    color: THEME_TEXT,
    fontWeight: 300,
    lineHeight: "1.75",
    fontSize: "1.05rem",
  };

  return (
    <div style={{ background: "#fcfaf8", minHeight: "100vh" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tour-header-wrap {
          padding-top: 140px;
          padding-bottom: 24px;
        }

        .pro-tour-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .pro-tour-layout { grid-template-columns: 1fr; }
        }
        
        .pro-card {
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        @media (max-width: 768px) {
          .pro-card { padding: 24px; border-radius: 16px; margin-bottom: 16px; }
        }

        .pro-sidebar { position: sticky; top: 120px; }
        .pro-card .eyebrow { margin-top: 0 !important; }
        .pro-card > *:first-child { margin-top: 0; }
        .pro-card > *:last-child { margin-bottom: 0; }

        /* HERO BENTO GALLERY */
        .hero-gallery {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 460px;
          border-radius: 24px;
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 32px;
        }
        .hero-main { grid-row: 1 / -1; }
        .hero-gallery img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .hero-gallery > div { overflow: hidden; position: relative; }
        .hero-gallery > div:hover img { transform: scale(1.03); }
        @media (max-width: 768px) {
          .hero-gallery { grid-template-columns: 1fr; grid-template-rows: 320px; height: auto; }
          .hero-side { display: none; }
        }

        /* ACCORDION */
        .day-accordion {
          border: 1px solid #eaeaea;
          border-radius: 16px;
          margin-bottom: 12px;
          background: #ffffff;
          transition: box-shadow 0.2s ease;
        }
        .day-accordion.open {
          border-color: #dcdcdc;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        .day-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .day-btn-left { display: flex; align-items: center; gap: 16px; }
        .day-number {
          display: grid; place-items: center;
          width: 48px; height: 48px;
          background: #fdfaf6; color: ${THEME_GOLD};
          border-radius: 12px; font-weight: 400; font-size: 1.1rem;
          flex-shrink: 0;
          font-family: Georgia, serif;
          border: 1px solid #f2ebe1;
        }
        .day-title {
          font-size: 1.15rem; font-weight: 400; color: ${THEME_GOLD};
          margin: 0; font-family: Georgia, serif;
        }
        .day-chevron {
          width: 36px; height: 36px;
          display: grid; place-items: center;
          border-radius: 50%; border: 1px solid #eaeaea;
          color: #999; transition: transform 0.3s;
        }
        .day-accordion.open .day-chevron {
          transform: rotate(180deg);
          background: ${THEME_GOLD}; color: #fff; border-color: ${THEME_GOLD};
        }
        .day-body {
          padding: 0 20px 24px 84px;
        }
        @media (max-width: 600px) {
          .day-body { padding: 0 20px 20px 20px; }
        }

        /* Airy paragraphs for day details */
        .day-body .day-detail-text p {
          margin: 0 0 0.5em 0;
        }
        .day-body .day-detail-text p:last-child {
          margin-bottom: 0;
        }

        /* ========== DAY HIGHLIGHTS (Cream box + orange dots) ========== */
        .day-highlights-box {
          background-color: #FAF6F0;
          border-radius: 16px;
          padding: 22px 26px;
          margin-top: 24px;
          margin-bottom: 4px;
          border: 1px solid #f0e9df;
        }
        .day-highlights-title {
          color: #1e293b;
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 16px 0;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        }
        .day-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 28px;
        }
        @media (max-width: 640px) {
          .day-highlights-list { grid-template-columns: 1fr; }
        }
        .day-highlights-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.5;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
          font-weight: 400;
        }
        .day-highlights-bullet {
          color: #D96128;
          font-size: 1.35rem;
          line-height: 1;
          margin-top: 1px;
          flex-shrink: 0;
          font-weight: 700;
        }

        /* CTA */
        .cta-section {
          background: #f7f4ef;
          border-top: 1px solid #eae3d9;
          padding: 90px 0;
          margin-top: 60px;
        }
        .cta-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .cta-title {
          font-family: Georgia, serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: ${THEME_GOLD};
          line-height: 1.2;
          margin: 0 0 20px;
        }
        .cta-desc {
          color: ${THEME_TEXT};
          font-weight: 300;
          font-size: 1.05rem;
          line-height: 1.65;
          margin: 0 0 32px;
          max-width: 520px;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: ${THEME_GOLD};
          color: #ffffff;
          padding: 16px 32px;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 400;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
        }
        .cta-btn:hover {
          background: #876233;
          transform: translateY(-2px);
        }
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .contact-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: ${THEME_GOLD};
          color: #ffffff;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        .contact-label {
          font-size: 1.1rem;
          font-weight: 400;
          font-family: Georgia, serif;
          color: ${THEME_GOLD};
          margin: 0 0 2px;
        }
        .contact-value {
          color: ${THEME_TEXT};
          font-weight: 300;
          font-size: 0.98rem;
          text-decoration: none;
        }
        .contact-value:hover { color: ${THEME_GOLD}; }
      `,
        }}
      />

      {/* ================= HEADER + GALLERY ================= */}
      <div className="container tour-header-wrap">
        <div>
          <p style={eyebrowStyle}>Private Morocco Trip</p>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
              fontWeight: 400,
              color: THEME_GOLD,
              lineHeight: "1.3",
              marginBottom: "20px",
              fontFamily: "Georgia, serif",
              display: "block",
            }}
          >
            {tour.title}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {duration && (
              <span style={pillStyle}>
                <IconClock /> {duration}
              </span>
            )}
            {(start || end) && (
              <span style={pillStyle}>
                <IconPin /> {cap(start)} {start && end ? "→" : ""} {cap(end)}
              </span>
            )}
            {groupSize && (
              <span style={pillStyle}>
                <IconUsers /> {cap(groupSize)}
              </span>
            )}
          </div>
        </div>

        <div className="hero-gallery">
          <div className="hero-main">
            <img src={galleryImages[0]} alt={`${tour.title} 1`} />
          </div>
          <div className="hero-side">
            <img src={galleryImages[1]} alt={`${tour.title} 2`} />
          </div>
          <div className="hero-side">
            <img src={galleryImages[2]} alt={`${tour.title} 3`} />
          </div>
          <div className="hero-side">
            <img src={galleryImages[3]} alt={`${tour.title} 4`} />
          </div>
          <div className="hero-side">
            <img src={galleryImages[4]} alt={`${tour.title} 5`} />
          </div>
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <section className="container pro-tour-layout" style={{ marginBottom: 40 }}>
        <div className="tour-detail-main">
          {/* 1. OVERVIEW */}
          {tour.overviewParagraphs?.length > 0 && (
            <section className="pro-card detail-section">
              <p className="eyebrow" style={eyebrowStyle}>
                About this trip
              </p>
              <h2 style={standardH2Style}>Overview</h2>
              {tour.overviewParagraphs.map((p, i) => (
                <div
                  key={i}
                  className="lead"
                  style={{ ...bodyTextStyle, marginTop: i === 0 ? 16 : 14 }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </section>
          )}

          {/* 2. ITINERARY + DAY HIGHLIGHTS */}
          {tour.itinerary?.length > 0 ? (
            <section className="pro-card detail-section">
              <p className="eyebrow" style={eyebrowStyle}>
                Day by day
              </p>
              <h2 style={dynamicH2Style}>
                {cleanHeadingTitle(tour.title, "itinerary")} Itinerary
              </h2>
              <div style={{ marginTop: 24 }}>
                {tour.itinerary.map((day, idx) => {
                  const isOpen = openDay === idx;
                  const dayNum =
                    String(day.day || "")
                      .replace(/\D/g, "")
                      .slice(0, 2) || String(idx + 1);

                  return (
                    <div
                      key={idx}
                      className={`day-accordion ${isOpen ? "open" : ""}`}
                    >
                      <button
                        className="day-btn"
                        onClick={() => setOpenDay(isOpen ? null : idx)}
                      >
                        <div className="day-btn-left">
                          <span className="day-number">{dayNum}</span>
                          <h3 className="day-title">{day.title}</h3>
                        </div>
                        <span className="day-chevron">
                          <IconChevron />
                        </span>
                      </button>

                      {isOpen && (
                        <div className="day-body">
                          {(() => {
                            const { highlights, cleanParagraphs } = extractDayHighlights(
                              day.paragraphs || []
                            );

                            return (
                              <>
                                {/* 1) DAY DETAILS (Story text rendered first) */}
                                {cleanParagraphs.map((p, i) => (
                                  <div
                                    key={i}
                                    className="day-detail-text"
                                    style={{
                                      marginTop: i === 0 ? 0 : 14,
                                      color: "#64748b", // Soft gray-blue text
                                      fontWeight: 300,
                                      fontSize: "1.02rem",
                                      lineHeight: 1.75,
                                    }}
                                    dangerouslySetInnerHTML={{ __html: p }}
                                  />
                                ))}

                                {/* 2) DAY HIGHLIGHTS BOX (Rendered underneath) */}
                                {highlights.length > 0 && (
                                  <div className="day-highlights-box">
                                    <h4 className="day-highlights-title">
                                      Day Highlights
                                    </h4>
                                    <ul className="day-highlights-list">
                                      {highlights.map((hl, hlIdx) => (
                                        <li
                                          key={hlIdx}
                                          className="day-highlights-item"
                                        >
                                          <span className="day-highlights-bullet">
                                            •
                                          </span>
                                          <span>{hl}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* 3. INCLUSIONS */}
          {((tour.included && tour.included.length > 0) ||
            (tour.excluded && tour.excluded.length > 0)) && (
            <section className="pro-card detail-section">
              <p className="eyebrow" style={eyebrowStyle}>
                Inclusions
              </p>
              <div
                className="include-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "32px",
                  marginTop: 20,
                }}
              >
                {tour.included && tour.included.length > 0 && (
                  <div>
                    <h2 style={{ ...standardH2Style, fontSize: "1.25rem" }}>
                      Included
                    </h2>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {tour.included.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: "flex",
                            gap: "10px",
                            color: THEME_TEXT,
                            fontWeight: 300,
                          }}
                        >
                          <span style={{ color: THEME_GOLD }}>
                            <IconCheck />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excluded && tour.excluded.length > 0 && (
                  <div>
                    <h2 style={{ ...standardH2Style, fontSize: "1.25rem" }}>
                      Not Included
                    </h2>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {tour.excluded.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: "flex",
                            gap: "10px",
                            color: THEME_TEXT,
                            fontWeight: 300,
                          }}
                        >
                          <span style={{ color: THEME_GOLD, fontWeight: 300 }}>
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 4. WHY CHOOSE */}
          <section className="pro-card detail-section">
            <p className="eyebrow" style={eyebrowStyle}>
              Why book with us
            </p>
            <h3 style={dynamicH3Style}>
              Why Choose Our {cleanHeadingTitle(tour.title, "itinerary")}?
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >
              {whyChooseItems.map((item, i) => (
                <div
                  key={`${item.title}-${i}`}
                  style={{
                    padding: "24px",
                    borderRadius: 16,
                    border: "1px solid #eaeaea",
                    background: "#fdfaf6",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 400,
                      margin: "0 0 10px 0",
                      color: THEME_GOLD,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.description ? (
                    <div
                      style={{
                        margin: 0,
                        fontSize: "0.95rem",
                        color: THEME_TEXT,
                        fontWeight: 300,
                        lineHeight: "1.6",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* 5. FAQ */}
          {tour.faqItems && tour.faqItems.length > 0 ? (
            <section className="pro-card detail-section faq-section">
              <p className="eyebrow" style={eyebrowStyle}>
                Questions
              </p>
              <h2 style={dynamicH2Style}>
                FAQs About {cleanHeadingTitle(tour.title, "itinerary")}
              </h2>
              <div className="faq-list" style={{ marginTop: 24 }}>
                {tour.faqItems.map((item) => (
                  <div
                    key={item.question}
                    className="faq-item"
                    style={{
                      borderBottom: "1px solid #eaeaea",
                      padding: "20px 0",
                    }}
                  >
                    <h3
                      className="faq-question"
                      style={{
                        fontSize: "1.15rem",
                        color: THEME_GOLD,
                        fontWeight: 400,
                        margin: "0 0 12px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {item.question.replace(/^\d+[\.\)]\s*/, "")}
                    </h3>
                    <div
                      className="lead faq-answer"
                      style={{
                        margin: 0,
                        color: THEME_TEXT,
                        fontWeight: 300,
                        lineHeight: "1.6",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* --------- SIDEBAR --------- */}
        <aside className="tour-detail-sidebar pro-sidebar">
          <div className="booking-card pro-card" style={{ padding: "28px 24px" }}>
            <p
              className="eyebrow"
              style={{
                color: THEME_GOLD,
                fontWeight: 400,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              Private Departure
            </p>

            <p
              style={{
                margin: 0,
                color: "#999",
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Price from
            </p>
            {tourPrice > 0 ? (
              <div
                className="booking-price"
                style={{
                  marginTop: 6,
                  color: THEME_GOLD,
                  fontSize: "2rem",
                  lineHeight: 1.1,
                  fontFamily: "Georgia, serif",
                }}
              >
                <strong>
                  {sym}
                  {tourPrice}
                </strong>
                <span
                  style={{
                    fontSize: "0.95rem",
                    color: "#888",
                    fontWeight: 300,
                    fontFamily: "sans-serif",
                  }}
                >
                  {" "}
                  / per person
                </span>
              </div>
            ) : (
              <div
                className="booking-price"
                style={{
                  marginTop: 6,
                  color: THEME_GOLD,
                  fontFamily: "Georgia, serif",
                }}
              >
                <strong style={{ fontSize: "1.6rem", fontWeight: 400 }}>
                  Request a quote
                </strong>
              </div>
            )}
            <p
              style={{
                marginTop: 10,
                fontSize: "0.82rem",
                color: "#777",
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              Final price depends on dates, group size & accommodation level.
            </p>

            <div
              style={{
                margin: "20px 0 0",
                padding: "14px 16px",
                background: "#fdfaf6",
                borderRadius: 14,
                border: "1px solid #f2ebe1",
                display: "grid",
                gap: 10,
              }}
            >
              {duration && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.88rem",
                  }}
                >
                  <span
                    style={{
                      color: "#777",
                      fontWeight: 300,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IconClock size={14} /> Duration
                  </span>
                  <strong style={{ color: THEME_GOLD, fontWeight: 400 }}>
                    {duration}
                  </strong>
                </div>
              )}
              {tourType && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.88rem",
                  }}
                >
                  <span style={{ color: "#777", fontWeight: 300 }}>Trip Type</span>
                  <strong style={{ color: THEME_GOLD, fontWeight: 400 }}>
                    {cap(tourType)}
                  </strong>
                </div>
              )}
              {groupSize && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.88rem",
                  }}
                >
                  <span
                    style={{
                      color: "#777",
                      fontWeight: 300,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IconUsers size={14} /> Group Size
                  </span>
                  <strong style={{ color: THEME_GOLD, fontWeight: 400 }}>
                    {cap(groupSize)}
                  </strong>
                </div>
              )}
              {start && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.88rem",
                  }}
                >
                  <span
                    style={{
                      color: "#777",
                      fontWeight: 300,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IconPin size={14} /> Departure
                  </span>
                  <strong
                    style={{
                      color: THEME_GOLD,
                      fontWeight: 400,
                      maxWidth: 140,
                      textAlign: "right",
                    }}
                  >
                    {cap(start)}
                  </strong>
                </div>
              )}
              {languages && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.88rem",
                  }}
                >
                  <span style={{ color: "#777", fontWeight: 300 }}>Languages</span>
                  <strong
                    style={{
                      color: THEME_GOLD,
                      fontWeight: 400,
                      maxWidth: 150,
                      textAlign: "right",
                      fontSize: "0.82rem",
                    }}
                  >
                    {languages}
                  </strong>
                </div>
              )}
            </div>

            {(start || end) && (
              <div
                style={{
                  marginTop: 12,
                  padding: "12px 16px",
                  background: "#fdfaf6",
                  borderRadius: 12,
                  border: "1px solid #f2ebe1",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    color: THEME_GOLD,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Trip Route
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    color: THEME_GOLD,
                  }}
                >
                  {cap(start)}
                  {start && end ? " → " : ""}
                  {cap(end)}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #eaeaea",
                margin: "18px 0 20px",
                fontSize: "0.88rem",
                color: "#777",
                fontWeight: 300,
              }}
            >
              <span>Response time</span>
              <strong style={{ color: THEME_GOLD, fontWeight: 400 }}>
                Within 24h
              </strong>
            </div>

            <form onSubmit={onInquiry} style={{ display: "grid", gap: 12 }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fcfaf8",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  boxSizing: "border-box",
                }}
              />
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: 14,
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  background: "#fcfaf8",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: 100,
                  background: THEME_GOLD,
                  color: "#fff",
                  fontWeight: 400,
                  fontFamily: "Georgia, serif",
                  border: "none",
                  cursor: status === "loading" ? "wait" : "pointer",
                  fontSize: "1.05rem",
                  letterSpacing: "0.02em",
                }}
              >
                {status === "loading" ? "Sending..." : "Request a Quote →"}
              </button>

              {status === "success" && (
                <p
                  style={{
                    color: "#2e7d32",
                    fontSize: "0.85rem",
                    margin: 0,
                    fontWeight: 300,
                    textAlign: "center",
                  }}
                >
                  Thank you! Your request for &ldquo;{tour.title}&rdquo; has been
                  sent.
                </p>
              )}
              {status === "error" && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "0.85rem",
                    margin: 0,
                    fontWeight: 300,
                    textAlign: "center",
                  }}
                >
                  Something went wrong. Please try again or WhatsApp us.
                </p>
              )}

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: 100,
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  fontWeight: 400,
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                }}
              >
                <IconWhatsApp /> WhatsApp us
              </a>
            </form>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid #eaeaea",
                display: "grid",
                gap: 8,
              }}
            >
              {[
                "Best price guarantee",
                "Free cancellation options",
                "Local team support 24/7",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.82rem",
                    color: "#777",
                    fontWeight: 300,
                  }}
                >
                  <span style={{ color: THEME_GOLD, display: "flex" }}>
                    <IconCheck />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container cta-grid">
          <div>
            <h2 className="cta-title">Ready for a Morocco Adventure?</h2>
            <p className="cta-desc">
              Have questions about our Morocco trips, day trips or custom plans?
              Contact our local team and let us help you plan the perfect
              experience.
            </p>
            <Link href="/contact" className="cta-btn">
              Get in Touch <IconMail />
            </Link>
          </div>

          <div className="contact-list">
            <div className="contact-item">
              <div className="contact-icon">
                <IconMail />
              </div>
              <div>
                <p className="contact-label">Email us</p>
                <a
                  href="mailto:vacationstomorocco@gmail.com"
                  className="contact-value"
                >
                  vacationstomorocco@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <IconHeadphones />
              </div>
              <div>
                <p className="contact-label">Call us</p>
                <a href="tel:+212668422869" className="contact-value">
                  +212 668 422 869
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <IconInstagram />
              </div>
              <div>
                <p className="contact-label">Follow us</p>
                <span className="contact-value">@vacationstomorocco</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          right: 24,
          bottom: 32,
          zIndex: 90,
          width: 60,
          height: 60,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "#25D366",
          color: "#fff",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        <IconWhatsApp size={30} />
      </a>
    </div>
  );
}

/* --------- icons --------- */
function IconClock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconPin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconUsers({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconHeadphones() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconWhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.55c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.58-.5-.68-.5h-.58c-.2 0-.52.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.55 3.02 1.3 3.02.87 3.57.82.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}