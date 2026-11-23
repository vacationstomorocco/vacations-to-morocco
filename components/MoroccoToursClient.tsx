"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type Tour = {
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

type MoroccoToursClientProps = {
  tours: Tour[];
};

const ALLOWED_CITIES = ["Marrakech", "Tangier", "Casablanca", "Fes", "Agadir"];

export default function MoroccoToursClient({
  tours = [],
}: MoroccoToursClientProps) {
  const [activeCity, setActiveCity] = useState("All Trips");

  const filterCities = ["All Trips", ...ALLOWED_CITIES];

  const filteredTours = useMemo(() => {
    if (activeCity === "All Trips") return tours;
    return tours.filter(
      (t) => t.city?.toLowerCase().trim() === activeCity.toLowerCase()
    );
  }, [tours, activeCity]);

  const sectionTitle =
    activeCity === "All Trips" ? "All Morocco Trips" : `${activeCity} Departures`;

  const sectionCopy =
    activeCity === "All Trips"
      ? "Browse our complete collection of private Morocco desert routes, old imperial city explorations, and customizable itineraries."
      : `Handcrafted private trips and custom itineraries departing directly from ${activeCity}.`;

  return (
    <div style={{ background: "#f8f7f3" }}>
      {/* ── STICKY CITY FILTER BAR ── */}
      <section
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          padding: "16px 24px",
          background: "rgba(248, 247, 243, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e8e6e0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {filterCities.map((city) => {
            const isActive = activeCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setActiveCity(city)}
                style={{
                  height: 42,
                  padding: "0 22px",
                  borderRadius: 100,
                  border: isActive ? "1px solid #1a1a1a" : "1px solid #e8e6e0",
                  background: isActive ? "#1a1a1a" : "#fff",
                  color: isActive ? "#fff" : "#1a1a1a",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                }}
              >
                {city}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── TOURS LIST ── */}
      <section style={{ padding: "50px 24px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 400,
                color: "#1a1a1a",
                margin: "0 0 12px",
              }}
            >
              {sectionTitle}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#6b6b6b",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              {sectionCopy}
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.5rem",
                  margin: "0 0 12px",
                  color: "#1a1a1a",
                }}
              >
                No trips found for this departure city
              </h3>
              <p style={{ color: "#6b6b6b", marginBottom: 24 }}>
                We can create a custom private route from {activeCity} on request.
              </p>
              <button
                type="button"
                onClick={() => setActiveCity("All Trips")}
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View all trips
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 28,
              }}
            >
              {filteredTours.map((tour, index) => {
                const desc =
                  tour.description.length > 130
                    ? tour.description.slice(0, 130).trimEnd() + "…"
                    : tour.description;

                return (
                  <article
                    key={tour.id}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      overflow: "hidden",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image Container */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "4/3",
                        overflow: "hidden",
                      }}
                    >
                      <Link href={`/tours/${tour.slug}`}>
                        <img
                          src={tour.image}
                          alt={tour.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Link>

                      {/* Number badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "1.1rem",
                          color: "#fff",
                          background: "rgba(0,0,0,0.35)",
                          backdropFilter: "blur(6px)",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Duration pill */}
                      {tour.duration && (
                        <span
                          style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            background: "#fff",
                            color: "#1a1a1a",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "6px 14px",
                            borderRadius: 100,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {tour.duration}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div
                      style={{
                        padding: "22px 22px 0",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          color: "#e07a5f",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        From {tour.city || "Morocco"}
                      </span>

                      <h3
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "1.6rem",
                          fontWeight: 400,
                          lineHeight: 1.25,
                          margin: "0 0 12px",
                        }}
                      >
                        <Link
                          href={`/tours/${tour.slug}`}
                          style={{ color: "#1a1a1a", textDecoration: "none" }}
                        >
                          {tour.title}
                        </Link>
                      </h3>

                      <p
                        style={{
                          fontSize: "0.92rem",
                          lineHeight: 1.65,
                          color: "#6b6b6b",
                          margin: "0 0 20px",
                          flex: 1,
                        }}
                      >
                        {desc ||
                          `Overview of ${tour.title}. A private Morocco trip with flexible pacing and local team guides.`}
                      </p>
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        borderTop: "1px solid #eee",
                        padding: "16px 22px",
                      }}
                    >
                      <Link
                        href={`/tours/${tour.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          color: "#1a1a1a",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          textDecoration: "none",
                        }}
                      >
                        See this trip
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}