import type { MetadataRoute } from "next";

// REQUIRED for Static Export builds
export const dynamic = "force-static";

const FALLBACK_SITE_URL = "https://vacationstomorocco.com";
const WP_API_URL = (
  process.env.NEXT_PUBLIC_WP_API_URL ??
  "https://cms.vacationstomorocco.com/wp-json/wp/v2"
).replace(/\/$/, "");

// 1. Static Hubs and Landing Pages
const STATIC_PATHS = [
  "",
  "/tours",
  "/trips",
  "/blog",
  "/about-us",
  "/contact",
  "/morocco-tours",
] as const;

// 2. City & Destination Pages
const DESTINATION_PATHS = [
  "/destinations/marrakech",
  "/destinations/casablanca",
  "/destinations/fes",
  "/destinations/agadir",
  "/destinations/tangier",
] as const;

// 3. Tour Departure Pages
const TOUR_DEPARTURE_PATHS = [
  "/morocco-tours-from-marrakech",
  "/morocco-tours-from-fes",
  "/morocco-tours-from-casablanca",
  "/morocco-tours-from-agadir",
  "/morocco-tours-from-tangier",
] as const;

// --- Helper Functions to Fetch Slugs from WordPress ---

async function fetchTourSlugs(): Promise<string[]> {
  try {
    let res = await fetch(`${WP_API_URL}/tours?per_page=100`);
    if (!res.ok) {
      res = await fetch(`${WP_API_URL}/tour?per_page=100`);
    }
    if (!res.ok) {
      res = await fetch(`${WP_API_URL}/posts?per_page=100`);
    }
    if (!res.ok) return [];
    
    const data = await res.json();
    return Array.isArray(data)
      ? data.map((t: any) => t?.slug || t?.post_name || "").filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

async function fetchDayTripSlugs(): Promise<string[]> {
  try {
    let res = await fetch(`${WP_API_URL}/day-trips?per_page=100`);
    if (!res.ok) {
      res = await fetch(`${WP_API_URL}/day-trip?per_page=100`);
    }
    if (!res.ok) return [];
    
    const data = await res.json();
    return Array.isArray(data)
      ? data.map((t: any) => t?.slug || t?.post_name || "").filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

async function fetchBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=100`);
    if (!res.ok) return [];
    
    const data = await res.json();
    return Array.isArray(data)
      ? data.map((t: any) => t?.slug || t?.post_name || "").filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
  ).replace(/\/+$/, "");
}

function normalizeSlugs(slugs: string[]): string[] {
  return Array.from(
    new Set(
      slugs
        .map((slug) => slug.trim().replace(/^\/+|\/+$/g, ""))
        .filter((slug) => slug.length > 0)
    )
  );
}

function getSlugsFromResult(
  result: PromiseSettledResult<string[]>,
  label: string
): string[] {
  if (result.status === "fulfilled") {
    return normalizeSlugs(result.value);
  }
  console.error(`[Sitemap] Unable to retrieve ${label}:`, result.reason);
  return [];
}

function removeDuplicateUrls(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values()
  );
}

// --- Main Next.js Sitemap Handler ---

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [tourSlugsResult, dayTripSlugsResult, blogSlugsResult] =
    await Promise.allSettled([
      fetchTourSlugs(),
      fetchDayTripSlugs(),
      fetchBlogSlugs(),
    ]);

  const tourSlugs = getSlugsFromResult(tourSlugsResult, "tour slugs");
  const dayTripSlugs = getSlugsFromResult(dayTripSlugsResult, "day-trip slugs");
  const blogSlugs = getSlugsFromResult(blogSlugsResult, "blog slugs");

  // 1. Static Hub & Landing Pages
  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: path === "" ? 1.0 : 0.9,
  }));

  // 2. City Destination Pages (/destinations/...)
  const destinationPages: MetadataRoute.Sitemap = DESTINATION_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Tour Departure Hub Pages (/Morocco-tours-from-...)
  const tourDeparturePages: MetadataRoute.Sitemap = TOUR_DEPARTURE_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic WordPress Tour Pages (/tours/[slug])
  const tourPages: MetadataRoute.Sitemap = tourSlugs.map((slug) => ({
    url: `${siteUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic WordPress Day Trip Pages (/trips/[slug])
  const dayTripPages: MetadataRoute.Sitemap = dayTripSlugs.map((slug) => ({
    url: `${siteUrl}/trips/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 6. Dynamic WordPress Blog Pages (/blog/[slug])
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return removeDuplicateUrls([
    ...staticPages,
    ...destinationPages,
    ...tourDeparturePages,
    ...tourPages,
    ...dayTripPages,
    ...blogPages,
  ]);
}