import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// 👇 YOUR HERO PICTURE 👇
const HERO_IMAGE = "/picture/vacations-to-morocco.webp";

export const metadata: Metadata = {
  title: "Vacations to Morocco | Private Trips & Sahara Desert Holidays",
  description:
    "Plan your perfect Morocco vacation. Private Sahara desert trips, old imperial cities, Atlas Mountains, and custom itineraries from Marrakech, Fes, Tangier, Casablanca, and Agadir. Local team, clear prices.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vacations to Morocco | Private Trips & Sahara Desert Holidays",
    description:
      "Private Morocco vacations planned by a local team. Sahara desert trips, old imperial cities, and custom itineraries from Marrakech, Fes, Tangier, and more.",
    url: "https://vacationstomorocco.com/",
    siteName: "Vacations to Morocco",
    locale: "en_US",
    type: "website",
    images: [{ url: HERO_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vacations to Morocco | Private Trips & Sahara Desert Holidays",
    description:
      "Private Morocco vacations planned by a local team. Sahara desert trips, old imperial cities, and custom itineraries.",
    images: [HERO_IMAGE],
  },
};

const tours = [
  {
    name: "3-Day Desert Trip from Marrakech to Fes",
    from: "From Marrakech",
    desc: "Cross the High Atlas, walk through old kasbahs, and sleep under the stars near the dunes of Merzouga.",
    duration: "3 days",
    image: "/picture/fes-to-merzouga-desert-tours.webp",
    href: "/tours/3-days-desert-tour-from-marrakech-to-fes",
  },
  {
    name: "4-Day Morocco Desert Trip from Marrakech",
    from: "From Marrakech",
    desc: "More time for mountain views, Todra Gorge, and a full day in the Sahara with a camel trek at sunset.",
    duration: "4 days",
    image: "/picture/4-days-desert-tour-marrakech-to-merzouga.webp",
    href: "/tours/4-days-marrakech-to-fes-desert-tour",
  },
  {
    name: "6-Day Desert Adventure from Marrakech to Fes",
    from: "From Marrakech",
    desc: "A slower pace through quiet villages, Dades Valley, and golden dunes on a fully private route.",
    duration: "6 days",
    image: "/picture/3-days-desert-tour-from-marrakech.webp",
    href: "/tours/6-days-desert-tour-from-marrakech-to-fes",
  },
  {
    name: "4-Day Desert Trip from Fes to Marrakech",
    from: "From Fes",
    desc: "Leave Fes through the Middle Atlas, spend a night in the Sahara, and arrive in Marrakech via mountain passes.",
    duration: "4 days",
    image: "/picture/morocco-desert-tour.webp",
    href: "/tours/3-days-desert-tour-from-fes-to-marrakech",
  },
  {
    name: "7-Day Desert Trip from Tangier to Marrakech",
    from: "From Tangier",
    desc: "Start at the Strait of Gibraltar, visit Chefchaouen and Fes, cross the Sahara, and finish in Marrakech.",
    duration: "7 days",
    image: "/picture/10-day-morocco-itinerary-from-casablanca-to-marrakech.webp",
    href: "/tours/1-week-in-morocco-itinerary-from-tangier-to-marrakech",
  },
  {
    name: "10-Day Morocco Trip from Casablanca",
    from: "From Casablanca",
    desc: "A full circuit covering Hassan II Mosque, old imperial cities, Sahara dunes, and the Atlantic coast.",
    duration: "10 days",
    image: "/picture/7-day-morocco-itinerary-from-casablanca.webp",
    href: "/tours/10-days-morocco-tour-from-casablanca",
  },
];

const places = [
  { name: "Marrakech", tag: "Markets & culture", image: "/picture/marrakech.webp", href: "/destinations/marrakech" },
  { name: "Casablanca", tag: "Mosque & Coast", image: "/picture/casablanca.webp", href: "/destinations/casablanca" },
  { name: "Fes", tag: "History & old medinas", image: "/picture/fes.webp", href: "/destinations/fes" },
  { name: "Agadir", tag: "Beach & Atlantic", image: "/picture/agadir.webp", href: "/destinations/agadir" },
  { name: "Tangier", tag: "Sea & city life", image: "/picture/tangier.webp", href: "/destinations/tangier" },
];

const blogPosts = [
  {
    title: "Riads in Morocco: Best Places to Stay and Tips",
    excerpt:
      "Discover riads in Morocco, explore the best riads in Marrakech and Fes, and get help planning your stay with Vacations to Morocco.",
    date: "Oct 18, 2026",
    category: "Morocco Travel Tips",
    image: "/picture/Marrakech.webp",
    href: "/blog/riads-in-morocco",
    tags: ["Best Riads in Marrakech", "Best Riads in Morocco", "Moroccan Riads"],
  },
  {
    title: "Morocco in December: Weather, Places to Visit & Tips",
    excerpt:
      "Plan Morocco in December with weather advice, the best places to visit, winter activities, packing tips, and Sahara Desert travel ideas.",
    date: "Oct 18, 2026",
    category: "Morocco Travel Tips",
    image: "/picture/fes.webp",
    href: "/blog/morocco-in-december",
    tags: ["Morocco December Weather", "Morocco in December", "Morocco Winter Travel"],
  },
  {
    title: "Morocco Walking Tour: Best Cities and Walking Holidays",
    excerpt:
      "Explore Morocco walking trips through historic medinas, colorful souks, coastal towns, and beautiful Atlas Mountain landscapes.",
    date: "Oct 9, 2026",
    category: "Morocco Travel Tips",
    image: "/picture/4-Days-marrakech-to-merzouga-desert-tour.webp",
    href: "/blog/morocco-walking-tour",
    tags: ["Morocco Walking Holidays"],
  },
  {
    title: "Camping in Morocco: Best Desert Camps and Mountain Escapes",
    excerpt:
      "Discover camping in Morocco, from Sahara Desert camps to Atlas Mountain escapes and luxury glamping experiences.",
    date: "Oct 9, 2026",
    category: "Morocco Travel Tips",
    image: "/picture/3-days-desert-tour-from-marrakech-to-fes.webp",
    href: "/blog/camping-in-morocco",
    tags: ["Desert Camps", "Morocco Camping", "Sahara Glamping"],
  },
];

export default function HomePage() {
  return (
    <div className="refresh-home">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* ===== HERO STYLING (ALIGNED LEFT) ===== */
        .refresh-hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 120px 24px 70px clamp(24px, 5vw, 64px);
          overflow: hidden;
          background-color: #12100e;
        }
        .refresh-hero-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          z-index: 1;
        }
        .refresh-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 620px;
          color: #fff;
          text-align: left;
          margin-left: 0;
        }
        .refresh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e28a34;
          margin-bottom: 18px;
        }
        .refresh-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #e28a34;
          display: inline-block;
        }
        .refresh-hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 6.2vw, 5.2rem);
          font-weight: 700;
          line-height: 1.05;
          margin: 0 0 22px 0;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .refresh-hero p {
          font-size: clamp(1.02rem, 1.3vw, 1.15rem);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 32px 0;
          max-width: 520px;
        }
        .refresh-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .refresh-btn-gold {
          background-color: #d89b53;
          color: #1c140e;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 26px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .refresh-btn-gold:hover {
          background-color: #e5a75f;
          transform: translateY(-2px);
        }
        .refresh-text-link {
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding-bottom: 4px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: border-color 0.2s ease, gap 0.2s ease;
        }
        .refresh-text-link:hover {
          border-bottom-color: #ffffff;
          gap: 10px;
        }

        /* ===== Destination horizontal scroll ===== */
        .refresh-place-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 16px;
          margin-top: 28px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #c4a484 #f0ebe3;
        }
        .refresh-place-scroll::-webkit-scrollbar { height: 6px; }
        .refresh-place-scroll::-webkit-scrollbar-thumb { background: #c4a484; border-radius: 99px; }
        .refresh-place-scroll::-webkit-scrollbar-track { background: #f0ebe3; border-radius: 99px; }
        .refresh-place-track {
          display: flex;
          gap: 16px;
          width: max-content;
          padding-right: 16px;
        }
        .refresh-place-card {
          position: relative;
          flex: 0 0 280px;
          width: 280px;
          height: 420px;
          border-radius: 18px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          text-decoration: none;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 20px;
          scroll-snap-align: start;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .refresh-place-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }
        .refresh-place-card span {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.9;
        }
        .refresh-place-card div {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .refresh-place-card h3 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 1.85rem;
          font-weight: 700;
          line-height: 1.15;
          color: #fff;
        }
        .refresh-place-card b {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.7);
          display: grid;
          place-items: center;
          font-size: 1rem;
          font-weight: 500;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(4px);
        }

        /* ===== Top Blog section ===== */
        .top-blog-section {
          background: #f7f3ec;
          padding: 80px 0 90px;
        }
        .top-blog-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 48px;
        }
        .top-blog-header h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 700;
          color: #8c6339;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }
        .top-blog-header p {
          margin: 0;
          color: #6b6560;
          font-size: 1.05rem;
          line-height: 1.65;
        }
        .top-blog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px 32px;
        }
        .top-blog-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 22px;
          align-items: stretch;
          text-decoration: none;
          color: inherit;
          background: transparent;
          border-radius: 16px;
          transition: transform 0.2s ease;
        }
        .top-blog-card:hover {
          transform: translateY(-3px);
        }
        .top-blog-image {
          position: relative;
          width: 100%;
          min-height: 200px;
          height: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #e8e0d4;
        }
        .top-blog-image img {
          object-fit: cover;
        }
        .top-blog-body {
          display: flex;
          flex-direction: column;
          padding: 4px 0;
          min-width: 0;
        }
        .top-blog-meta {
          font-size: 0.82rem;
          color: #8a847c;
          margin-bottom: 10px;
          font-weight: 500;
        }
        .top-blog-meta span {
          color: #a88b6a;
        }
        .top-blog-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.15rem, 1.8vw, 1.35rem);
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .top-blog-excerpt {
          margin: 0 0 14px;
          color: #5c564e;
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }
        .top-blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }
        .top-blog-tag {
          display: inline-block;
          padding: 5px 12px;
          border: 1px solid #ddd5c8;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #6b6560;
          background: #fff;
          white-space: nowrap;
        }
        .top-blog-link {
          font-size: 0.92rem;
          font-weight: 600;
          color: #1a1a1a;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
        }
        .top-blog-card:hover .top-blog-link {
          color: #8c6339;
        }
        .top-blog-footer {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }
        .top-blog-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1rem;
          color: #8c6339;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
        }
        .top-blog-all:hover {
          gap: 12px;
          color: #6e4c2a;
        }

        @media (max-width: 900px) {
          .refresh-hero {
            padding: 100px 20px 60px;
          }
          .top-blog-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .top-blog-card {
            grid-template-columns: 160px 1fr;
            gap: 18px;
          }
        }
        @media (max-width: 600px) {
          .top-blog-section { padding: 56px 0 64px; }
          .top-blog-card {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .top-blog-image {
            min-height: 200px;
            height: 200px;
          }
          .refresh-place-card {
            flex: 0 0 240px;
            width: 240px;
            height: 360px;
          }
          .refresh-place-card h3 { font-size: 1.6rem; }
        }
      `,
        }}
      />

      {/* ================= HERO ================= */}
      <section className="refresh-hero" aria-labelledby="home-heading">
        <div
          className="refresh-hero-photo"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          role="img"
          aria-label="Sahara Desert landscape in Morocco at sunset"
        />
        <div className="refresh-hero-inner">
          <div className="refresh-eyebrow">
            <span className="refresh-dot" /> PRIVATE TRIPS · MADE IN MOROCCO
          </div>
          <h1 id="home-heading">
            Vacations to Morocco.
          </h1>
          <p>
            Private trips across the Sahara Desert, old imperial cities, and Atlas Mountains.
            Planned by a local team, at your pace, with clear prices and no surprises.
          </p>
          <div className="refresh-actions">
            <Link className="refresh-btn-gold" href="/morocco-tours">
              Explore our trips <span>↗</span>
            </Link>
            <Link className="refresh-text-link" href="/contact">
              Plan my private trip <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="refresh-intro refresh-wrap">
        <div>
          <span className="refresh-kicker">WELCOME TO MOROCCO</span>
          <h2>
            Vacations to Morocco
            <br />
            <em>feels like yours.</em>
          </h2>
        </div>
        <div className="refresh-intro-copy">
          <p>
            Morocco is full of surprises. One day you can walk through the lively medinas of
            Marrakech or Fes. The next, you can watch the sun set over the grand dunes of the Sahara.
          </p>
          <p>
            At Vacations to Morocco, we help you explore these iconic destinations on a private trip made for
            your interests, schedule, and travel style. Our local team keeps everything smooth, clear, and personal.
          </p>
          <Link href="/about-us" className="refresh-inline">
            Get to know us <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ================= BEST MOROCCO TRIPS ================= */}
      <section className="refresh-tours refresh-section">
        <div className="refresh-wrap">
          <div style={{ width: "100%", marginBottom: 36 }}>
            <span className="refresh-kicker">HANDCRAFTED PRIVATE ROUTES</span>
            <h2 style={{ margin: "6px 0 10px", fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)", fontWeight: 400 }}>
              Best Morocco <em style={{ fontStyle: "italic", color: "#9A723D" }}>Trips.</em>
            </h2>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontStyle: "italic", color: "#9A723D", margin: "0 0 16px", lineHeight: 1.45 }}>
              From short desert breaks to longer adventures, find a trip that feels right for you.
            </p>
            <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#5a554e", margin: "0 0 20px", maxWidth: "100%" }}>
              Whether you have three days for a quick Sahara desert getaway or two full weeks to explore old imperial cities, quiet mountain roads, and coastal Atlantic towns, our best Morocco trips are designed to show you the real character of the country. Travel in complete comfort with a dedicated private driver and modern vehicle, stay in handpicked boutique riads and desert camps, and enjoy flexible daily pacing that never feels rushed. Our local team lives here in Morocco and will put together a clear, custom plan so you can travel with help nearby from your first message to the last day.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link className="refresh-inline" href="/morocco-tours">
                All Morocco trips <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="refresh-tour-grid">
            {tours.map((tour, i) => (
              <Link key={tour.name} href={tour.href} className="refresh-tour">
                <div
                  className="refresh-tour-photo"
                  style={{ backgroundImage: `url('${tour.image}')` }}
                  role="img"
                  aria-label={tour.name}
                >
                  <span className="refresh-tour-index">0{i + 1}</span>
                  <span className="refresh-duration">{tour.duration}</span>
                </div>
                <div className="refresh-tour-details">
                  <span>{tour.from}</span>
                  <h3>{tour.name}</h3>
                  <p>{tour.desc}</p>
                  <div>
                    See this trip <b>↗</b>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR MOROCCO DESTINATIONS ================= */}
      <section className="refresh-places refresh-section refresh-wrap">
        <div style={{ width: "100%", marginBottom: 28 }}>
          <span className="refresh-kicker">START WHERE YOU LAND</span>
          <h2 style={{ margin: "6px 0 10px", fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)", fontWeight: 400 }}>
            Our Popular <em style={{ fontStyle: "italic", color: "#9A723D" }}>Morocco Destinations.</em>
          </h2>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontStyle: "italic", color: "#9A723D", margin: "0 0 16px", lineHeight: 1.45 }}>
            Every corner has a different story. Where will yours begin?
          </p>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "#5a554e", margin: 0, maxWidth: "100%" }}>
            Explore our main city gateways—from the historic medinas and souks of Marrakech and Fes to coastal Casablanca, Tangier, and Agadir. Choose your starting point and let our local team put together a seamless private trip tailored to your rhythm.
          </p>
        </div>

        <div className="refresh-place-scroll">
          <div className="refresh-place-track">
            {places.map((place) => (
              <Link
                href={place.href}
                key={place.name}
                className="refresh-place-card"
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(15, 27, 24, .75)), url('${place.image}')`,
                }}
              >
                <span>{place.tag}</span>
                <div>
                  <h3>{place.name}</h3>
                  <b>↗</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURE ================= */}
      <section className="refresh-feature">
        <div className="refresh-feature-photo" role="img" aria-label="Sahara Desert camp under the stars near Merzouga" />
        <div className="refresh-feature-content">
          <span className="refresh-kicker">AN EXPERIENCE TO REMEMBER</span>
          <h2>
            Under the <em>Sahara stars.</em>
          </h2>
          <p>
            Walk on warm sand, watch the sky change color, and enjoy the quiet of the desert. A Sahara
            journey is more than a stop on your route—it is a memory you will take home.
          </p>
          <Link href="/morocco-tours" className="refresh-btn refresh-btn-gold">
            Discover desert trips <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="refresh-section refresh-wrap refresh-values">
        <div className="refresh-section-header">
          <div>
            <span className="refresh-kicker">WHY TRAVEL WITH US</span>
            <h2>
              Good trips start with <em>good people.</em>
            </h2>
          </div>
        </div>
        <div className="refresh-value-grid">
          <article>
            <span>01 /</span>
            <h3>We Live Here</h3>
            <p>Our local team helps you discover more than the usual tourist stops with insider knowledge.</p>
          </article>
          <article>
            <span>02 /</span>
            <h3>Your trip, your way</h3>
            <p>Choose where to go, how long to stay, and what matters most to your private group.</p>
          </article>
          <article>
            <span>03 /</span>
            <h3>Clear and honest prices</h3>
            <p>Enjoy comfortable private transport and a clear plan, with help nearby whenever you need it.</p>
          </article>
          <article>
            <span>04 /</span>
            <h3>Real local experiences</h3>
            <p>Meet authentic Morocco through its food, historic medinas, mountain passes, and hospitable people.</p>
          </article>
        </div>
      </section>

      {/* ================= TOP BLOG ================= */}
      <section className="top-blog-section">
        <div className="refresh-wrap">
          <div className="top-blog-header">
            <h2>Morocco Travel Guides</h2>
            <p>
              Practical advice, cultural stories, and destination guides to help you
              plan an unforgettable Morocco vacation.
            </p>
          </div>

          <div className="top-blog-grid">
            {blogPosts.map((post) => (
              <Link key={post.href} href={post.href} className="top-blog-card">
                <div className="top-blog-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 600px) 100vw, 200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="top-blog-body">
                  <div className="top-blog-meta">
                    {post.date} <span>·</span> {post.category}
                  </div>
                  <h3 className="top-blog-title">{post.title}</h3>
                  <p className="top-blog-excerpt">{post.excerpt}</p>
                  <div className="top-blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="top-blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="top-blog-link">
                    Read article <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="top-blog-footer">
            <Link href="/blog" className="top-blog-all">
              View all articles <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="refresh-cta">
        <div className="refresh-wrap">
          <span className="refresh-kicker">YOUR NEXT STORY STARTS HERE</span>
          <h2>
            Dreaming of <em>Morocco?</em>
          </h2>
          <p>
            Tell us when you want to travel and what you want to see. Our local team will put together a private
            trip that fits you perfectly.
          </p>
          <Link href="/contact" className="refresh-btn refresh-btn-gold">
            Plan my private trip <span>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}