import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBlogPostSlugs,
  getPostBySlug,
  getAllPosts,
  BlogPostData,
} from "@/lib/wordpress";
import BlogPostJsonLd from "@/components/seo/BlogPostJsonLd";

// Force all blog pages to be pre-built (fixes 404 on static export)
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vacationstomorocco.com"
).replace(/\/$/, "");
const FALLBACK_IMAGE = "/picture/all-morocco-tours.webp";

/* -------------------- HELPERS -------------------- */
function decodeHtml(html: string) {
  return (html || "")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string) {
  return decodeHtml(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function slugifyId(text: string) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function addHeadingIds(html: string) {
  const used = new Map<string, number>();

  return (html || "").replace(
    /<h([2-6])([^>]*)>(.*?)<\/h\1>/gi,
    (_full, level, attrs, inner) => {
      const existingIdMatch = String(attrs).match(/\sid=["']([^"']+)["']/i);
      if (existingIdMatch?.[1]) {
        const existing = existingIdMatch[1];
        used.set(existing, (used.get(existing) || 0) + 1);
        return `<h${level}${attrs}>${inner}</h${level}>`;
      }

      const text = stripHtml(inner);
      const base = slugifyId(text) || "heading";
      const count = (used.get(base) || 0) + 1;
      used.set(base, count);
      const id = count === 1 ? base : `${base}-${count}`;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}

/* -------------------- STATIC PARAMS -------------------- */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await getBlogPostSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs.map((slug) => ({
        slug: String(slug).trim().replace(/\/$/, ""),
      }));
    }
  } catch (error) {
    console.error("Failed to generate static params for blog:", error);
  }
  return [];
}

/* -------------------- METADATA -------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const rawSlug = resolvedParams?.slug;
    if (!rawSlug) return {};

    let cleanSlug = String(rawSlug).trim().replace(/\/$/, "");
    try {
      cleanSlug = decodeURIComponent(cleanSlug);
    } catch {}

    const post = await getPostBySlug(cleanSlug);
    if (!post) return { title: "Blog Not Found | Vacations to Morocco" };

    const canonicalUrl = `${SITE_URL}/blog/${cleanSlug}/`;
    const ogImage = post.image || FALLBACK_IMAGE;
    const seoTitle = post.seoTitle || post.title || "Morocco Travel Blog";
    const seoDescription = post.seoDescription || post.excerpt;

    return {
      metadataBase: new URL(SITE_URL),
      title: { absolute: seoTitle },
      description: seoDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        siteName: "Vacations to Morocco",
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [ogImage],
      },
    };
  } catch (error) {
    return { title: "Morocco Travel Blog | Vacations to Morocco" };
  }
}

/* -------------------- PAGE -------------------- */
export default async function DynamicBlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;

  if (!rawSlug) notFound();

  let cleanSlug = String(rawSlug).trim().replace(/\/$/, "");
  try {
    cleanSlug = decodeURIComponent(cleanSlug);
  } catch {}

  let post: BlogPostData | null = null;
  try {
    post = await getPostBySlug(cleanSlug);
  } catch (err) {
    console.error("Error fetching single post:", err);
  }

  if (!post || !post.title) notFound();

  const rawContent = post.content || "";
  const content = addHeadingIds(rawContent);

  const title = post.title;
  const excerpt = post.excerpt;
  const featuredImage = post.image || FALLBACK_IMAGE;
  const category = post.category || "Morocco Travel Tips";
  const author = post.author || "Vacations to Morocco";

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch 4 related posts for the sticky sidebar
  let relatedPosts: Array<{
    slug: string;
    title: string;
    image: string;
    category: string;
    date: string;
  }> = [];

  try {
    const allPosts = await getAllPosts();
    relatedPosts = allPosts
      .filter((p) => p.slug !== post?.slug)
      .slice(0, 4)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        image: p.image || FALLBACK_IMAGE,
        category: p.category || "Morocco Travel",
        date: new Date(p.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));
  } catch {
    relatedPosts = [];
  }

  return (
    <main className="sb-page">
      <BlogPostJsonLd
        title={title}
        description={excerpt}
        image={featuredImage}
        datePublished={post.date}
        dateModified={post.dateModified || post.date}
        slug={cleanSlug}
        authorName={author}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .sb-page {
          background-color: #fcfaf8;
          color: #1a1a1a;
          min-height: 100vh;
        }

        /* ===== LEFT ALIGNED HERO ===== */
        .sb-hero {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: center;
          padding: 140px 24px 80px;
          overflow: hidden;
          color: #fff;
        }
        .sb-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .sb-hero-bg img {
          object-fit: cover;
        }
        .sb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%);
          z-index: 1;
        }
        .sb-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        .sb-hero-content {
          max-width: 700px;
        }
        .sb-back {
          display: inline-flex;
          align-items: center;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .sb-back:hover { color: #fff; }
        .sb-cat {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .sb-hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 16px;
        }
        .sb-hero p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          margin: 0 0 24px;
        }
        .sb-meta {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }
        .sb-meta span { color: #fff; }

        /* ===== MAIN TWO COLUMN LAYOUT ===== */
        .sb-layout {
          max-width: 1150px;
          margin: 0 auto;
          padding: 60px 24px 100px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px;
          align-items: start;
        }

        /* ===== LEFT: ARTICLE CONTENT ===== */
        .sb-content {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #4a4a4a;
        }
        .sb-content h2, .sb-content h3, .sb-content h4 {
          font-family: Georgia, "Times New Roman", serif;
          color: #0f1b18;
          font-weight: 700;
          margin: 2rem 0 1rem;
        }
        .sb-content h2 { font-size: 1.8rem; }
        .sb-content h3 { font-size: 1.4rem; }
        .sb-content p { margin-bottom: 1.5rem; }
        .sb-content ul, .sb-content ol {
          margin: 0 0 1.5rem 1.5rem;
          padding: 0;
        }
        .sb-content li { margin-bottom: 0.5rem; }
        .sb-content a {
          color: #a85a3c;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .sb-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem 0;
        }

        /* ===== RIGHT: STICKY SIDEBAR (More Blogs) ===== */
        .sb-sidebar {
          position: sticky;
          top: 120px;
        }
        .sb-side-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid #eaeaea;
          padding-bottom: 12px;
          margin-bottom: 24px;
        }
        .sb-side-head h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f1b18;
          margin: 0;
        }
        .sb-side-head a {
          font-size: 0.85rem;
          font-weight: 600;
          color: #a85a3c;
          text-decoration: none;
        }
        .sb-side-head a:hover { text-decoration: underline; }
        
        .sb-related-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sb-related-card {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 16px;
          text-decoration: none;
          align-items: center;
          group;
        }
        .sb-related-img {
          width: 100px;
          height: 80px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          background: #eaeaea;
        }
        .sb-related-img img { object-fit: cover; transition: transform 0.3s ease; }
        .sb-related-card:hover .sb-related-img img { transform: scale(1.05); }
        
        .sb-related-text {
          display: flex;
          flex-direction: column;
        }
        .sb-related-cat {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a85a3c;
          margin-bottom: 4px;
        }
        .sb-related-title {
          font-family: Georgia, serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0f1b18;
          line-height: 1.3;
          margin: 0 0 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sb-related-card:hover .sb-related-title { color: #a85a3c; }
        
        .sb-related-date {
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== READY FOR ADVENTURE BANNER ===== */
        .adventure-banner-section {
          background-color: #f5f1ea;
          padding: 80px 24px;
          border-top: 1px solid #e6e0d5;
        }
        .adventure-container {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }
        .adventure-left h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 2.75rem;
          font-weight: 600;
          color: #241e17;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .adventure-left p {
          font-size: 1.05rem;
          color: #5c5449;
          line-height: 1.6;
          max-width: 520px;
          margin-bottom: 32px;
        }
        .adventure-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #85612c;
          color: #ffffff;
          padding: 14px 32px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(133, 97, 44, 0.25);
          text-decoration: none;
        }
        .adventure-btn:hover {
          background-color: #6e4f21;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(133, 97, 44, 0.35);
          color: #ffffff;
        }
        .adventure-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .adventure-contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .adventure-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #85612c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }
        .adventure-contact-info h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1612;
          margin: 0 0 4px 0;
        }
        .adventure-contact-info p, 
        .adventure-contact-info a {
          font-size: 0.95rem;
          color: #5c5449;
          margin: 0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .adventure-contact-info a:hover {
          color: #85612c;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .sb-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .sb-sidebar {
            position: static;
          }
          .sb-hero-overlay {
             background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
          }
          .adventure-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}} />

      {/* 1. HERO SECTION */}
      <section className="sb-hero">
        <div className="sb-hero-bg">
          <Image
            src={featuredImage}
            alt={title}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="sb-hero-overlay" />
        
        <div className="sb-hero-inner">
          <div className="sb-hero-content">
            <Link href="/blog" className="sb-back">
              ← Back to blog
            </Link>
            
            <div>
              <span className="sb-cat">{category}</span>
            </div>
            
            <h1>{title}</h1>
            
            {excerpt && <p>{excerpt}</p>}
            
            <div className="sb-meta">
              By <span>{author}</span> &nbsp;&nbsp; {formattedDate}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Article + Sticky Sidebar) */}
      <section className="sb-layout">
        
        {/* Left: Article Content */}
        <article 
          className="sb-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Right: Sticky Sidebar (More Blogs) */}
        <aside className="sb-sidebar">
          <div className="sb-side-head">
            <h3>More Blogs</h3>
            <Link href="/blog">View all</Link>
          </div>

          <div className="sb-related-list">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="sb-related-card">
                <div className="sb-related-img">
                  <Image 
                    src={rp.image} 
                    alt={rp.title} 
                    fill 
                    sizes="100px"
                  />
                </div>
                <div className="sb-related-text">
                  <span className="sb-related-cat">{rp.category}</span>
                  <h4 className="sb-related-title">{rp.title}</h4>
                  <span className="sb-related-date">{rp.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>

      </section>

      {/* 3. READY FOR ADVENTURE BANNER */}
      <section className="adventure-banner-section">
        <div className="adventure-container">
          <div className="adventure-left">
            <h2>Ready for a Morocco Trip?</h2>
            <p>
              Have questions about our private trips, desert tours, or city
              plans? Reach out to our local team and we&apos;ll help you put
              together the right trip.
            </p>
            <Link href="/contact" className="adventure-btn">
              <span>Get in Touch</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </Link>
          </div>

          <div className="adventure-right">
            {/* Email */}
            <div className="adventure-contact-item">
              <div className="adventure-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="adventure-contact-info">
                <h4>Email us</h4>
                <a href="mailto:vacationstomorocco@gmail.com">vacationstomorocco@gmail.com</a>
              </div>
            </div>

            {/* Call */}
            <div className="adventure-contact-item">
              <div className="adventure-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
                </svg>
              </div>
              <div className="adventure-contact-info">
                <h4>Call us</h4>
                <a href="tel:+212668422869">+212 668 422 869</a>
              </div>
            </div>

            {/* Follow us */}
            <div className="adventure-contact-item">
              <div className="adventure-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <div className="adventure-contact-info">
                <h4>Follow us</h4>
                <a href="https://instagram.com/vacationstomorocco" target="_blank" rel="noopener noreferrer">@vacationstomorocco</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}