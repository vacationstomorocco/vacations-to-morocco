import { Metadata } from "next";
import { notFound } from "next/navigation";
import TourTemplate from "@/components/tours/TourTemplate";
import DayTripJsonLd from "@/components/seo/DayTripJsonLd";
import { getDayTripBySlug, getDayTripSlugs, getTourSlugs } from "@/lib/wordpress";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vacationstomorocco.com"
).replace(/\/$/, "");

function safeString(val: any): string {
  if (typeof val === "string") return val;
  if (val === null || val === undefined) return "";
  return String(val);
}

function cleanText(str?: string) {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

// 1. Generate Static Params for Next.js Static Generation
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    let slugs = await getDayTripSlugs();

    // Fallback if empty during build
    if (!slugs || slugs.length === 0) {
      slugs = await getTourSlugs();
    }

    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs.map((slug) => ({
        slug: String(slug),
      }));
    }
  } catch (error) {
    console.error("Failed to generate static params for day trips:", error);
  }

  return [{ slug: "day-trip" }];
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await Promise.resolve(params);
    if (!slug) return {};

    const trip = await getDayTripBySlug(slug);
    if (!trip) return {};

    const canonicalUrl = `${SITE_URL}/trips/${slug}`;
    const ogImage = trip.images?.[0] || "/picture/all-morocco-tours.webp";
    const seoTitle = trip.seoTitle || `${trip.title} | Vacations to Morocco`;
    const seoDescription =
      trip.seoDescription ||
      (Array.isArray(trip.overviewParagraphs) && trip.overviewParagraphs[0]
        ? cleanText(trip.overviewParagraphs[0]).slice(0, 155)
        : "") ||
      `Book a private same-day excursion to ${trip.title} with Vacations to Morocco. Local driver and comfortable AC vehicle.`;

    return {
      metadataBase: new URL(SITE_URL),
      title: seoTitle,
      description: seoDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        siteName: "Vacations to Morocco",
        images: [{ url: ogImage, width: 1200, height: 630, alt: trip.title }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Morocco Day Trip | Vacations to Morocco",
    };
  }
}

// 3. Dynamic Single Trip Page Component
export default async function DynamicTripPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);

  if (!slug) {
    notFound();
  }

  let trip: any = null;

  try {
    trip = await getDayTripBySlug(slug);
  } catch (err) {
    notFound();
  }

  if (!trip || !trip.title) {
    notFound();
  }

  // Format Itinerary for Schema
  const formattedItinerary = Array.isArray(trip.itinerary)
    ? trip.itinerary.map((item: any, idx: number) => ({
        title: safeString(item?.title || `Stop ${idx + 1}`),
        description: Array.isArray(item?.paragraphs)
          ? item.paragraphs.map(cleanText).join(" ")
          : cleanText(safeString(item?.paragraphs || "")),
      }))
    : [];

  // Format FAQs for Schema
  const validFaqs = Array.isArray(trip.faqItems)
    ? trip.faqItems
        .filter((item: any) => item && (item.question || item.answer))
        .map((item: any) => ({
          question: safeString(item.question).replace(/^\d+[\.\)]\s*/, ""),
          answer: safeString(item.answer),
        }))
    : [];

  const tripDescription =
    trip.seoDescription ||
    (Array.isArray(trip.overviewParagraphs) && trip.overviewParagraphs[0]
      ? cleanText(trip.overviewParagraphs[0])
      : trip.title);

  return (
    <>
      {/* Unified JSON-LD (TouristTrip + BreadcrumbList + FAQPage) */}
      <DayTripJsonLd
        title={trip.title}
        description={tripDescription}
        image={trip.images?.[0] || "/picture/all-morocco-tours.webp"}
        slug={slug}
        price={trip.tourPrice}
        priceCurrency={trip.tourCurrency || "EUR"}
        duration="PT10H" // Standard full day return
        itinerary={formattedItinerary}
        faqs={validFaqs}
      />

      {/* Renders your exact tour design */}
      <TourTemplate tour={trip} siteUrl={SITE_URL} />
    </>
  );
}