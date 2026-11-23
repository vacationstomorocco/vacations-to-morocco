"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type DayTrip = {
  id: string | number;
  slug: string;
  title: string;
  city: string;
  location?: string;
  duration?: string;
  image: string;
  description?: string;
  price?: number;
};

type City = {
  name: string;
  slug: string;
  emoji: string;
};

type Props = {
  dayTrips: DayTrip[];
  cities: City[];
};

export default function DayTripsClient({ dayTrips = [], cities = [] }: Props) {
  // Default to "all" so all WordPress day trips are visible immediately
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const filteredTrips = useMemo(() => {
    if (selectedCity === "all") return dayTrips;

    return dayTrips.filter((trip) => {
      const cityKey = selectedCity.toLowerCase();
      const tripCity = (trip.city || "").toLowerCase();
      const tripLocation = (trip.location || "").toLowerCase();
      const tripTitle = (trip.title || "").toLowerCase();

      return (
        tripCity.includes(cityKey) ||
        tripLocation.includes(cityKey) ||
        tripTitle.includes(`from ${cityKey}`) ||
        tripTitle.includes(cityKey)
      );
    });
  }, [dayTrips, selectedCity]);

  return (
    <>
      <style>{clientStyles}</style>

      <div className="dtc-controls">
        <div className="dtc-group">
          <label className="dtc-label">Departure City</label>
          <div className="dtc-cities">
            <button
              type="button"
              onClick={() => setSelectedCity("all")}
              className={`dtc-city-btn ${selectedCity === "all" ? "active" : ""}`}
            >
              <span className="dtc-emoji">✨</span>
              <span>All Cities</span>
            </button>

            {cities.map((city) => (
              <button
                type="button"
                key={city.slug}
                onClick={() => setSelectedCity(city.slug)}
                className={`dtc-city-btn ${selectedCity === city.slug ? "active" : ""}`}
              >
                <span className="dtc-emoji">{city.emoji}</span>
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="dtc-results">
        {filteredTrips.length === 0 ? (
          <div className="dtc-empty">
            <p>
              No day trips found
              {selectedCity !== "all"
                ? ` departing from ${cities.find((c) => c.slug === selectedCity)?.name || selectedCity}`
                : ""}
              .
            </p>
            <Link href="/contact" className="dtc-empty-btn">
              Request Custom Day Trip
            </Link>
          </div>
        ) : (
          <div className="dtc-grid">
            {filteredTrips.map((trip) => {
              const image = trip.image || "/picture/all-morocco-tours.webp";
              const desc = (trip.description || "").replace(/<[^>]*>/g, "").trim();
              const price = Number(trip.price || 0);

              return (
                <article key={trip.id || trip.slug} className="dtc-card">
                  {/* DIRECT LINK TO /trips/your-slug */}
                  <Link href={`/trips/${trip.slug}`} className="dtc-card-link">
                    <div className="dtc-card-img">
                      <Image
                        src={image}
                        alt={trip.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="dtc-card-body">
                      <h3>{trip.title}</h3>

                      {desc && (
                        <p>{desc.slice(0, 130)}{desc.length > 130 ? "..." : ""}</p>
                      )}

                      {/* TAG CHIPS MATCHING YOUR IMAGE */}
                      <div className="dtc-chips">
                        <span className="dtc-chip">
                          📍 {trip.location || `${trip.city} Excursion`}
                        </span>
                        <span className="dtc-chip">
                          ⏱️ {trip.duration || "1 Day"}
                        </span>
                      </div>

                      {/* PRICE BADGE MATCHING YOUR IMAGE */}
                      <div className="dtc-price-row">
                        <span className="dtc-price-pill">
                          {price > 0 ? `From €${price}` : "Inquire Price"}
                        </span>
                      </div>

                      {/* LINK TEXT */}
                      <div className="dtc-footer">
                        <span className="dtc-more">View Tour Details →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

const clientStyles = `
  .dtc-controls {
    background: #FFFFFF;
    border: 1px solid #efe8dd;
    border-radius: 28px;
    padding: 32px 36px;
    box-shadow: 0 10px 30px rgba(22, 58, 52, 0.03);
    margin-bottom: 45px;
  }

  .dtc-group { margin-bottom: 0; }

  .dtc-label {
    display: block;
    color: #163a34;
    font-weight: 800;
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 1.8px;
    margin-bottom: 16px;
  }

  .dtc-cities {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .dtc-city-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 12px 22px;
    background: #FA8F6;
    background-color: #faf7f2;
    border: 1.5px solid #efe8dd;
    border-radius: 999px;
    color: #163a34;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 220ms ease;
  }

  .dtc-city-btn:hover {
    border-color: #C76542;
    background-color: #fff9f4;
    transform: translateY(-2px);
  }

  .dtc-city-btn.active {
    background-color: #163a34;
    color: #ffffff;
    border-color: #163a34;
    box-shadow: 0 8px 22px rgba(22, 58, 52, 0.22);
  }

  .dtc-emoji { font-size: 1.1rem; }

  /* CARDS GRID */
  .dtc-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
  }

  .dtc-card {
    background: #FFFFFF;
    border: 1px solid #efe8dd;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(22, 58, 52, 0.03);
    transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
  }

  .dtc-card:hover {
    transform: translateY(-6px);
    border-color: #e0d5c7;
    box-shadow: 0 20px 40px rgba(22, 58, 52, 0.08);
  }

  .dtc-card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }

  .dtc-card-img {
    position: relative;
    width: 100%;
    height: 230px;
    background: #F0EAE1;
  }

  .dtc-card-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .dtc-card-body h3 {
    font-family: Georgia, "Times New Roman", serif;
    color: #163a34;
    font-size: 1.35rem;
    font-weight: 700;
    margin: 0 0 12px;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }

  .dtc-card-body p {
    color: #5d6662;
    line-height: 1.65;
    font-size: 0.92rem;
    margin: 0 0 18px;
    flex: 1;
  }

  /* CHIPS (LOCATION & DURATION) */
  .dtc-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
  }

  .dtc-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background-color: #f5f0e6;
    color: #5d6662;
    font-size: 0.78rem;
    font-weight: 600;
  }

  /* PRICE BADGE */
  .dtc-price-row {
    margin-bottom: 18px;
  }

  .dtc-price-pill {
    display: inline-block;
    padding: 6px 14px;
    background-color: #f7f2ea;
    color: #333333;
    font-size: 0.82rem;
    font-weight: 700;
    border-radius: 999px;
  }

  .dtc-footer {
    padding-top: 14px;
    border-top: 1px dashed #efe8dd;
  }

  .dtc-more {
    color: #C76542;
    font-weight: 700;
    font-size: 0.92rem;
    transition: color 180ms ease;
  }

  .dtc-card:hover .dtc-more {
    color: #a94f31;
  }

  /* EMPTY STATE */
  .dtc-empty {
    text-align: center;
    padding: 60px 30px;
    background: #FFFFFF;
    border: 2px dashed #efe8dd;
    border-radius: 28px;
  }

  .dtc-empty p {
    color: #5d6662;
    font-size: 1.05rem;
    margin: 0 0 22px;
  }

  .dtc-empty-btn {
    display: inline-block;
    padding: 14px 30px;
    background: #C76542;
    color: #ffffff;
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 1024px) {
    .dtc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 640px) {
    .dtc-controls { padding: 24px; }
    .dtc-grid { grid-template-columns: 1fr; }
    .dtc-city-btn { padding: 10px 16px; font-size: 0.88rem; }
  }
`;