import { Metadata } from "next";
import { notFound } from "next/navigation";
import TourTemplate from "@/components/tours/TourTemplate";
import SingleTourJsonLd from "@/components/seo/SingleTourJsonLd";
import { getTourBySlug, getAllTourSlugs } from "@/lib/wordpress";

// Force all tour pages to be pre-built (fixes 404 on static export)
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vacationstomorocco.com"
).replace(/\/$/, "");

// 1. Generate Static Params for Next.js Pre-rendering
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await getAllTourSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs.map((slug) => ({
        slug: String(slug).trim().replace(/\/$/, ""),
      }));
    }
  } catch (error) {
    console.error("Failed to generate static params:", error);
  }
  return [];
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const rawSlug = resolvedParams?.slug;
    if (!rawSlug || rawSlug === "morocco-tours") return {};

    let cleanSlug = String(rawSlug).trim().replace(/\/$/, "");
    try {
      cleanSlug = decodeURIComponent(cleanSlug);
    } catch {}

    const tour = await getTourBySlug(cleanSlug);
    if (!tour) return {};

    const canonicalUrl = `${SITE_URL}/tours/${cleanSlug}/`;
    const ogImage =
      tour.socialImage || `${SITE_URL}/picture/all-morocco-tours.webp`;

    const seoTitle = tour.seoTitle || tour.title || "Morocco Private Trip";
    const seoDescription =
      tour.seoDescription ||
      (Array.isArray(tour.overviewParagraphs) && tour.overviewParagraphs[0]
        ? tour.overviewParagraphs[0].slice(0, 155)
        : "") ||
      `${tour.title} — Private trip with Vacations to Morocco.`;

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
        images: [{ url: ogImage, width: 1200, height: 630, alt: tour.title }],
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
    return {};
  }
}

// 3. Dynamic Tour Page Render
export default async function DynamicTourPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;

  if (!rawSlug || rawSlug === "morocco-tours") notFound();

  let cleanSlug = String(rawSlug).trim().replace(/\/$/, "");
  try {
    cleanSlug = decodeURIComponent(cleanSlug);
  } catch {}

  let tour: any = null;

  try {
    tour = await getTourBySlug(cleanSlug);
  } catch (err) {
    notFound();
  }

  if (!tour || !tour.title) notFound();

  return (
    <>
      <SingleTourJsonLd tour={tour} siteUrl={SITE_URL} />
      <TourTemplate tour={tour} siteUrl={SITE_URL} />
    </>
  );
}