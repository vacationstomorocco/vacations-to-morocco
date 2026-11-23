import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, BlogPostData } from "@/lib/wordpress";
import BlogArchiveJsonLd from "@/components/seo/BlogArchiveJsonLd";

const SITE_URL = "https://vacationstomorocco.com";
const PAGE_URL = `${SITE_URL}/blog`;
const BRAND_NAME = "Vacations to Morocco";
const HERO_IMAGE = "/picture/3-days-desert-tour-from-agadir-erg-chigaga.webp";

export const metadata: Metadata = {
  title: "Morocco Travel Blog & Guides | Vacations to Morocco",
  description:
    "Easy Morocco travel tips, Sahara desert packing guides, city trip ideas, and real local advice from our team in Morocco.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Morocco Travel Blog & Guides | Vacations to Morocco",
    description:
      "Easy travel tips, Sahara Desert guides, and local advice for planning your private trip to Morocco.",
    url: PAGE_URL,
    siteName: BRAND_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Morocco Travel Blog & Guides - Vacations to Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Travel Blog & Guides | Vacations to Morocco",
    description:
      "Easy Morocco travel guides, desert packing tips, and trip planning from our local team.",
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
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/** Build simple tag pills from category / title keywords */
function getTags(post: BlogPostData): string[] {
  const tags: string[] = [];
  if (post.category) tags.push(post.category);

  const title = (post.title || "").toLowerCase();
  if (title.includes("riad")) {
    tags.push("Best Riads in Morocco", "Moroccan Riads");
  }
  if (title.includes("december") || title.includes("winter")) {
    tags.push("Morocco in December", "Morocco Winter Travel");
  }
  if (title.includes("walking")) {
    tags.push("Morocco Walking Holidays");
  }
  if (title.includes("camp") || title.includes("desert")) {
    tags.push("Desert Camps", "Sahara Glamping");
  }
  if (title.includes("marrakech")) {
    tags.push("Marrakech Travel");
  }
  if (title.includes("fes") || title.includes("fez")) {
    tags.push("Fes Travel");
  }

  // unique, max 3
  return Array.from(new Set(tags)).slice(0, 3);
}

export default async function BlogPage() {
  let posts: BlogPostData[] = [];

  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    posts = [];
  }

  const blogCards = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    category: post.category,
    date: post.date,
  }));

  return (
    <main className="blog-page">
      <BlogArchiveJsonLd blogs={blogCards} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .blog-page {
          background: #f7f3ec;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* ---- Hero ---- */
        .blog-hero {
          position: relative;
          min-height: 48vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .blog-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .blog-hero-bg img {
          object-fit: cover;
        }
        .blog-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.45) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }
        .blog-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 72px;
          text-align: center;
          color: #fff;
        }
        .blog-hero-eyebrow {
          color: #e29c68;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.8rem;
          margin-bottom: 14px;
        }
        .blog-hero-inner h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .blog-hero-inner p {
          margin: 0 auto;
          max-width: 520px;
          font-size: 1.1rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.88);
          font-weight: 400;
        }

        /* ---- Section header (Top Blog style) ---- */
        .blog-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 24px 90px;
        }
        .blog-section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px;
        }
        .blog-section-header h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.9rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: #8c6339;
          margin: 0 0 12px;
        }
        .blog-section-header p {
          margin: 0;
          color: #6b6560;
          font-size: 1.05rem;
          line-height: 1.65;
        }

        /* ---- 2-column horizontal cards (matches screenshot) ---- */
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px 40px;
        }

        .blog-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 20px;
          align-items: start;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease;
        }
        .blog-card:hover {
          transform: translateY(-3px);
        }

        .blog-card-image {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 14px;
          overflow: hidden;
          background: #e8e0d4;
          flex-shrink: 0;
        }
        .blog-card-image img {
          object-fit: cover;
        }

        .blog-card-body {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding-top: 2px;
        }

        .blog-card-meta {
          font-size: 0.8rem;
          color: #8a847c;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .blog-card-meta .dot {
          margin: 0 6px;
          color: #a88b6a;
        }
        .blog-card-meta .cat {
          color: #a88b6a;
        }

        .blog-card-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.1rem, 1.6vw, 1.3rem);
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .blog-card:hover .blog-card-title {
          color: #8c6339;
        }

        .blog-card-excerpt {
          margin: 0 0 14px;
          color: #5c564e;
          font-size: 0.92rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }
        .blog-card-tag {
          display: inline-block;
          padding: 5px 12px;
          border: 1px solid #ddd5c8;
          border-radius: 6px;
          font-size: 0.72rem;
          color: #6b6560;
          background: #fff;
          white-space: nowrap;
        }

        .blog-card-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a1a;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
        }
        .blog-card:hover .blog-card-link {
          color: #8c6339;
        }

        .blog-empty {
          text-align: center;
          padding: 60px 20px;
          color: #6b6560;
          font-size: 1.05rem;
        }

        .blog-footer-link {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
        .blog-footer-link a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1rem;
          color: #8c6339;
          text-decoration: none;
          transition: gap 0.2s ease;
        }
        .blog-footer-link a:hover {
          gap: 12px;
          color: #6e4c2a;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .blog-card {
            grid-template-columns: 160px 1fr;
            gap: 16px;
          }
          .blog-card-image {
            height: 170px;
          }
        }

        @media (max-width: 600px) {
          .blog-hero-inner {
            padding: 110px 20px 56px;
          }
          .blog-section {
            padding: 48px 16px 72px;
          }
          .blog-card {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .blog-card-image {
            height: 200px;
          }
        }
      `,
        }}
      />

      {/* ========== HERO ========== */}
      <section className="blog-hero">
        <div className="blog-hero-bg">
          <Image
            src={HERO_IMAGE}
            alt="Morocco Travel Blog & Guides"
            fill
            priority
            sizes="100vw"
          />
          <div className="blog-hero-overlay" />
        </div>
        <div className="blog-hero-inner">
          <p className="blog-hero-eyebrow">Vacations to Morocco — Local Tips</p>
          <h1>Morocco Travel Blog &amp; Guides</h1>
          <p>
            Easy travel tips, Sahara Desert packing guides, and real local
            advice for planning your private trip.
          </p>
        </div>
      </section>

      {/* ========== BLOG LIST ========== */}
      <section className="blog-section">
        <div className="blog-section-header">
          <h2>Top Blog</h2>
          <p>
            Our latest Morocco travel guides, local stories, and simple tips
            to help you plan a great trip.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>No articles found right now. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => {
              const tags = getTags(post);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    <Image
                      src={post.image || "/picture/Marrakech.webp"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 200px"
                    />
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      {formatDate(post.date)}
                      <span className="dot">·</span>
                      <span className="cat">
                        {post.category || "Morocco Travel Tips"}
                      </span>
                    </div>

                    <h2 className="blog-card-title">{post.title}</h2>

                    <p className="blog-card-excerpt">
                      {post.excerpt ||
                        "Read our latest Morocco travel guide and local tips."}
                    </p>

                    {tags.length > 0 && (
                      <div className="blog-card-tags">
                        {tags.map((tag) => (
                          <span key={tag} className="blog-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="blog-card-link">
                      Read article <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="blog-footer-link">
          <Link href="/contact">
            Want a custom trip? Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}