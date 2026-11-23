import Link from "next/link";
import type { Metadata } from "next";
import { getToursByStartLocation } from "@/lib/wordpress";
import DestinationsJsonLd from "@/components/seo/DestinationsJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/destinations/fes`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/fes.webp";

const GEO_LAT = 34.0608;
const GEO_LNG = -4.9742;

const seoTitle = "Visit Fes Morocco | Private Trips & Medina Guide | Vacations to Morocco";
const seoDescription = "Explore Fes, Morocco's spiritual and cultural capital. Discover the ancient Fes el-Bali Medina, Chouara Tannery, Al-Qarawiyyin, and book private multi-day desert trips starting from Fes.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: ["Fes trips", "private trips from Fes", "Fes to Merzouga desert trip", "Fes to Marrakech trip", "Fes el-Bali guide", "Chouara Tannery Fes", "FEZ airport Morocco trips", "Fes travel guide", "Morocco cultural trips from Fes"],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: seoTitle, description: seoDescription, url: PAGE_URL, siteName: BRAND_NAME, images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: "Panoramic view over the ancient Medina of Fes el-Bali" }], locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: "Visit Fes Morocco | Private Cultural & Desert Trips", description: seoDescription, images: [HERO_IMAGE] },
};

const experiences = [
  { number: "01", title: "Witness Chouara Tannery", description: "Morocco's iconic medieval tanneries where leather is still dyed by hand in stone vats using centuries-old organic techniques." },
  { number: "02", title: "Explore Fes el-Bali Medina", description: "Step into the world's largest car-free urban area — over 9,000 winding alleyways teeming with artisan craft, spices, and copperware." },
  { number: "03", title: "Bou Inania Madrasa & Al-Qarawiyyin", description: "Marvel at Marinid tilework and carved cedarwood, and visit the historical perimeter of the world's oldest continually operating university." },
];

const practicalInfo = [
  { label: "Region / Location", value: "Fès-Meknès, Northern Morocco" },
  { label: "Best Season", value: "March–May & Sept–Nov" },
  { label: "Nearest Airport", value: "Fes–Saïss Airport (FEZ)" },
  { label: "Recommended Stay", value: "2 to 3 days" },
];

const faqs = [
  { question: "How many days do you need in Fes?", answer: "Two days is ideal to explore the historic UNESCO Medina, Chouara tanneries, and major madrasas. Adding a third day allows for day trips to the Roman ruins of Volubilis, Meknes, or Moulay Idriss Zerhoun." },
  { question: "Do I need a local guide in the Fes Medina?", answer: "A licensed local guide is highly recommended for your first day. The Medina of Fes el-Bali has over 9,000 winding streets and no vehicle access, making an official guide invaluable." },
  { question: "Can I do a Sahara Desert trip starting from Fes?", answer: "Yes! Fes is one of Morocco's best departure points for private Sahara Desert trips to Merzouga (Erg Chebbi dunes). Itineraries cross the Middle Atlas cedar forests." },
  { question: "Can Vacations to Morocco arrange airport pickups from Fes?", answer: "Yes. We offer VIP pickups from Fes–Saïss Airport (FEZ) and provide custom private trips connecting Fes with Chefchaouen, the old imperial cities, and the Sahara Desert." },
];

export default async function FesDestinationPage() {
  const tours = await getToursByStartLocation("fes");
  const relatedTours = tours.map((tour) => ({ name: tour.title, url: `/tours/${tour.slug}`, description: tour.quickAnswer || tour.seoDescription, price: tour.tourPrice || 390, currency: tour.tourCurrency || "EUR" }));

  return (
    <>
      <DestinationsJsonLd name="Fes" slug="fes" description={seoDescription} image={HERO_IMAGE} latitude={GEO_LAT} longitude={GEO_LNG} region="Fès-Meknès" tourHighlights={["Chouara Leather Tannery", "Fes el-Bali Medieval Medina", "Al-Qarawiyyin Mosque & University", "Bou Inania Madrasa"]} faqs={faqs} relatedTours={relatedTours} />

      <style dangerouslySetInnerHTML={{ __html: `
        .tour-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .tour-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .tour-card:hover .tour-img { transform: scale(1.05); }
        .tour-card:hover .tour-arrow { transform: translateX(4px); }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .exp-card { transition: all 0.3s ease; }
        .exp-card:hover { background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transform: translateY(-2px); }
        .hero-btn { transition: background-color 0.3s ease; }
        .hero-btn:hover { background-color: #b86a4e !important; }
        .cta-btn { transition: background-color 0.3s ease; }
        .cta-btn:hover { background-color: #7d5930 !important; }
        .contact-link { transition: color 0.2s ease; }
        .contact-link:hover { color: #956b3b !important; }
      `}} />

      <main style={{ backgroundColor: "#f8f7f3", minHeight: "100vh", paddingBottom: "80px" }}>
        
        {/* HERO */}
        <section style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "center", paddingTop: "80px" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={HERO_IMAGE} alt="Fes" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 100%)" }} />

          <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <span style={{ display: "inline-block", color: "#e07a5f", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", fontWeight: 700, marginBottom: "16px" }}>
              Destination Guide
            </span>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1, margin: "0 0 24px 0", maxWidth: "800px" }}>
              Fes <br />
              <em style={{ fontStyle: "italic", color: "#e07a5f", fontWeight: 400 }}>Spiritual Capital</em>
            </h1>
            <p style={{ color: "#f8f7f3", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "600px", margin: "0 0 40px 0" }}>
              Ancient car-free alleyways, leather tanneries unchanged since the Middle Ages, and master artisans keeping centuries of craft alive.
            </p>
            
            <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
              <Link href="#tours" className="hero-btn" style={{ backgroundColor: "#cd7b5d", color: "#fff", padding: "16px 36px", borderRadius: "8px", fontSize: "1.05rem", fontWeight: 600, textDecoration: "none" }}>
                Explore Fes Trips
              </Link>
              <Link href="/contact" style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "6px", textDecorationThickness: "2px" }}>
                Plan a Private Trip
              </Link>
            </div>
          </div>
        </section>

        {/* INFO STRIP */}
        <section style={{ backgroundColor: "#fbf9f4", padding: "48px 24px", borderBottom: "1px solid #eaeaea" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
            {practicalInfo.map((info, i) => (
              <div key={i}>
                <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#777", margin: "0 0 8px 0", fontWeight: 600 }}>{info.label}</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111", margin: 0 }}>{info.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTRO */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ maxWidth: "800px" }}>
            <span style={{ display: "inline-block", color: "#e07a5f", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "12px" }}>Welcome to Fes</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#222", marginBottom: "24px", lineHeight: 1.2 }}>Step back in time inside Morocco&apos;s oldest imperial city</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#555", margin: 0 }}>
              Fes is the living spiritual and cultural heart of traditional Morocco (learn more about <a href="https://en.wikipedia.org/wiki/Fez,_Morocco" target="_blank" rel="noopener noreferrer" style={{ color: "#e07a5f", textDecoration: "underline" }}>Fes on Wikipedia</a>). Founded in the 8th century, its ancient walled Medina (Fes el-Bali) is a UNESCO World Heritage site where donkey carts still haul goods through narrow stone passages, and master craftsmen hammer out copper, carve cedar, and tan leather by hand.
            </p>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px 24px" }}>
          <div style={{ marginBottom: "40px", maxWidth: "720px" }}>
            <span style={{ display: "inline-block", color: "#e07a5f", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "12px" }}>Signature Experiences</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#222", margin: "0 0 12px 0" }}>Top things to do in Fes</h2>
            <p style={{ color: "#666", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>From watching master artisans dye leather in the medieval Chouara Tannery to navigating the vibrant labyrinth of Fes el-Bali, visiting the ancient Al-Qarawiyyin University, and admiring intricate Marinid madrasas.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {experiences.map((exp) => (
              <div key={exp.number} className="exp-card" style={{ padding: "40px 32px", backgroundColor: "#f0efe9", borderRadius: "12px", border: "1px solid #e5e4de" }}>
                <span style={{ display: "block", fontSize: "2.5rem", fontWeight: 300, color: "#e07a5f", fontFamily: "Georgia, serif", marginBottom: "20px" }}>{exp.number}</span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#222", marginBottom: "12px", fontFamily: "Georgia, serif" }}>{exp.title}</h3>
                <p style={{ color: "#555", lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TOURS GRID */}
        <section id="tours" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div style={{ maxWidth: "640px" }}>
              <span style={{ display: "inline-block", color: "#e07a5f", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "12px" }}>Popular Multi-Day Trips</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#222", margin: "0 0 16px 0" }}>Trips from Fes</h2>
              <p style={{ color: "#666", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>Depart directly from your Fes riad or Fes–Saïss Airport (FEZ). Travel through the Middle Atlas, Ziz Valley, and Erg Chebbi dunes on your way to Marrakech, Chefchaouen, or Casablanca.</p>
            </div>
            <Link href="/morocco-tours-from-fes" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#e07a5f", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>
              View all departures <span style={{ fontSize: "1.2rem" }}>→</span>
            </Link>
          </div>

          {tours.length === 0 ? (
            <p style={{ color: "#666", fontSize: "1.05rem" }}>No Fes trips published yet. Contact us to plan a custom itinerary!</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "32px" }}>
              {tours.map((tour, index) => {
                const tourImage = tour.images?.[0] || "/picture/all-morocco-tours.webp";
                const shortDescription = tour.quickAnswer || tour.seoDescription || "";
                return (
                  <Link key={tour.slug} href={`/tours/${tour.slug}`} className="tour-card" style={{ textDecoration: "none", backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid #eaeaea" }}>
                    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#eee" }}>
                      <img src={tourImage} alt={tour.title} className="tour-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} loading="lazy" />
                      <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#fff", color: "#222", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      {tour.duration && (
                        <div style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "#fff", color: "#222", padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                          {tour.duration}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "32px 24px 24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#e07a5f", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>From Fes</span>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.4rem", fontFamily: "Georgia, serif", color: "#222", lineHeight: 1.3 }}>{tour.title}</h3>
                      <p className="line-clamp-3" style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 24px 0", flexGrow: 1 }}>
                        {shortDescription.length > 130 ? `${shortDescription.slice(0, 127)}...` : shortDescription}
                      </p>
                      <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#222", fontWeight: 600, fontSize: "0.9rem" }}>
                        <span>See this trip</span><span className="tour-arrow" style={{ transition: "transform 0.3s ease", display: "inline-block" }}>→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* FAQS */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ display: "inline-block", color: "#e07a5f", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "12px" }}>Before you visit</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#222", margin: 0 }}>Essential Fes travel questions</h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: "24px 0", borderBottom: "1px solid #eaeaea" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#222", margin: "0 0 12px 0", fontFamily: "Georgia, serif", lineHeight: 1.35 }}>{faq.question}</h3>
                <p style={{ color: "#666", margin: 0, lineHeight: 1.75, fontSize: "0.95rem" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "64px", display: "flex", flexWrap: "wrap", gap: "64px", border: "1px solid #eaeaea", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#222", margin: "0 0 24px 0", lineHeight: 1.2 }}>Build your private Fes trip</h2>
              <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: 1.6, margin: "0 0 40px 0" }}>From Medina walking trips to old imperial city and Sahara Desert adventures — share your dates and interests and our local team will put together a custom plan.</p>
              <Link href="/contact" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "#956b3b", color: "#fff", padding: "16px 32px", borderRadius: "99px", fontSize: "1rem", fontWeight: 600, textDecoration: "none" }}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "20px", height: "20px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                Get in Touch
              </Link>
            </div>

            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "32px" }}>
              <a href="mailto:vacationstomorocco@gmail.com" className="contact-link" style={{ display: "flex", alignItems: "center", gap: "20px", color: "#222", textDecoration: "none", fontWeight: 500, fontSize: "1.05rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#fbf9f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#956b3b", flexShrink: 0 }}>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "24px", height: "24px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                vacationstomorocco@gmail.com
              </a>
              <a href="tel:+212668422869" className="contact-link" style={{ display: "flex", alignItems: "center", gap: "20px", color: "#222", textDecoration: "none", fontWeight: 500, fontSize: "1.05rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#fbf9f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#956b3b", flexShrink: 0 }}>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "24px", height: "24px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                </div>
                +212 668 422 869
              </a>
              <a href="https://instagram.com/vacationstomorocco" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: "flex", alignItems: "center", gap: "20px", color: "#222", textDecoration: "none", fontWeight: 500, fontSize: "1.05rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#fbf9f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#956b3b", flexShrink: 0 }}>
                  <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: "22px", height: "22px" }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </div>
                @vacationstomorocco
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}