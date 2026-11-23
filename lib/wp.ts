// lib/wp.ts
// WordPress helpers for Next.js STATIC EXPORT (output: "export").

import {
  getAllTours,
  getTourBySlug as getTourBySlugFormatted,
  getAllTourSlugs as getAllTourSlugsFormatted,
  getAllDayTrips,
  getDayTripBySlug,
  getDayTripSlugs,
} from "@/lib/wordpress";

export const WP_API = (
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://cms.vacationstomorocco.com/wp-json/wp/v2"
).replace(/\/$/, "");

type WPHeaders = {
  total?: number;
  totalPages?: number;
};

function toInt(value: string | null) {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function readWpHeaders(headers: Headers): WPHeaders {
  return {
    total: toInt(headers.get("X-WP-Total")),
    totalPages: toInt(headers.get("X-WP-TotalPages")),
  };
}

function qs(params: Record<string, string | number | boolean | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) continue;
    sp.set(k, String(v));
  }
  return sp.toString();
}

async function wpFetch<T>(url: string): Promise<{ data: T; headers: WPHeaders }> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { data: [] as unknown as T, headers: {} };
    }
    const headers = readWpHeaders(res.headers);
    const data = (await res.json()) as T;
    return { data, headers };
  } catch {
    return { data: [] as unknown as T, headers: {} };
  }
}

/** Generic list fetch: /{endpoint}?{query} */
export async function wpList<T>(
  endpoint: string,
  query: Record<string, string | number | boolean | undefined> = {}
): Promise<{ items: T[]; headers: WPHeaders }> {
  const url = `${WP_API}/${endpoint}?${qs(query)}`;
  const { data, headers } = await wpFetch<T[]>(url);
  return { items: Array.isArray(data) ? data : [], headers };
}

/** Fetch a single item by slug */
export async function wpBySlug<T>(
  endpoint: string,
  slug: string,
  embed = true
): Promise<T | null> {
  const { items } = await wpList<T>(endpoint, {
    slug,
    _embed: embed ? 1 : undefined,
  });

  return Array.isArray(items) && items.length > 0 ? items[0] : null;
}

/** Fetch all slugs for an endpoint */
export async function getAllSlugs(endpoint: string): Promise<string[]> {
  try {
    const url = `${WP_API}/${endpoint}?per_page=100&_fields=slug`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = (await res.json()) as Array<{ slug?: string }>;
    if (!Array.isArray(data)) return [];

    return data
      .map((item) => item?.slug)
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  } catch {
    return [];
  }
}

/** Posts helpers (Blogs) */
export async function getPostBySlug(slug: string) {
  return wpBySlug<any>("posts", slug, true);
}

export async function getAllPostSlugs() {
  return getAllSlugs("posts");
}

export async function getPostsPage(page: number, perPage = 12) {
  const { items, headers } = await wpList<any>("posts", {
    page,
    per_page: perPage,
    _embed: 1,
    orderby: "date",
    order: "desc",
  });

  return {
    posts: items,
    total: headers.total || items.length,
    totalPages: headers.totalPages ?? 1,
  };
}

/** TOURS HELPERS (Formatted for UI components) */
export async function getTourLikeBySlug(slug: string) {
  const tour = await getTourBySlugFormatted(slug);
  if (tour) return tour;

  const trip = await getDayTripBySlug(slug);
  if (trip) return trip;

  return null;
}

export async function getAllTourSlugs() {
  const tourSlugs = await getAllTourSlugsFormatted();
  if (tourSlugs.length > 0) return tourSlugs;
  return getAllSlugs("tours");
}

export async function getToursPage(page: number, perPage = 12) {
  const allTours = await getAllTours();

  if (allTours.length > 0) {
    const start = (page - 1) * perPage;
    const paginated = allTours.slice(start, start + perPage);
    return {
      tours: paginated,
      total: allTours.length,
      totalPages: Math.ceil(allTours.length / perPage) || 1,
    };
  }

  const { items, headers } = await wpList<any>("tours", {
    page,
    per_page: perPage,
    _embed: 1,
    orderby: "date",
    order: "desc",
  });

  return {
    tours: items,
    total: headers.total || items.length,
    totalPages: headers.totalPages ?? 1,
  };
}

// Re-export day trips
export { getAllDayTrips, getDayTripBySlug, getDayTripSlugs };