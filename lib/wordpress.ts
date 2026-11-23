import type {
  TourData,
  TourItineraryDay,
  TourFaqItem,
  TourBadge,
  RelatedTour,
} from "@/types/tour";

const WP_API_URL = (
  process.env.NEXT_PUBLIC_WP_API_URL ??
  "https://cms.vacationstomorocco.com/wp-json/wp/v2"
).replace(/\/$/, "");

const SITE_DOMAIN = "https://vacationstomorocco.com";
const DEFAULT_TOUR_IMAGE = `${SITE_DOMAIN}/picture/all-morocco-tours.webp`;
const CMS_HOSTNAME = process.env.NEXT_PUBLIC_WP_HOSTNAME || "cms.vacationstomorocco.com";

export interface ExtendedTourData extends TourData {
  startLocation: string;
  endLocation: string;
  whyChooseThisTour?: { title: string; description: string }[];
}

export interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateModified: string;
  image: string;
  author: string;
  category: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type DynamicTourSection = {
  id: string;
  cityName: string;
  eyebrow: string;
  title: string;
  description: string;
  tours: ExtendedTourData[];
};

export const DESTINATIONS_CONFIG: Record<
  string,
  { cityName: string; eyebrow: string; title: string; description: string }
> = {
  marrakech: {
    cityName: "Marrakech",
    eyebrow: "Excursions & Sahara Trips From Marrakech",
    title: "Best Morocco Trips from Marrakech",
    description:
      "Marrakech is the primary gateway for desert exploration. Depart on 3 to 10-day private routes traversing the High Atlas Mountains, historic kasbahs, and the grand dunes of Merzouga.",
  },
  fes: {
    cityName: "Fes",
    eyebrow: "Cultural & Desert Departures From Fes",
    title: "Best Morocco Trips from Fes",
    description:
      "Depart from Morocco's spiritual heartland. These custom itineraries connect Fes's ancient medieval medina to the blue alleys of Chefchaouen, Middle Atlas cedar forests, and the Sahara.",
  },
  tangier: {
    cityName: "Tangier",
    eyebrow: "Northern Heritage & Imperial Routes From Tangier",
    title: "Best Morocco Trips from Tangier",
    description:
      "Cross the Strait of Gibraltar and begin your journey where Mediterranean breezes meet Atlantic coastlines. Explore Chefchaouen, old imperial Fes, and south toward Marrakech.",
  },
  casablanca: {
    cityName: "Casablanca",
    eyebrow: "Grand Cross-Country Loops From Casablanca",
    title: "Best Morocco Trips from Casablanca",
    description:
      "Begin your Moroccan voyage at the nation's premier international transit hub. Ideal for extensive grand loops connecting old imperial cities, coastal gems, and the deep desert.",
  },
  agadir: {
    cityName: "Agadir",
    eyebrow: "Southern Coast & Anti-Atlas Adventures From Agadir",
    title: "Best Morocco Trips from Agadir",
    description:
      "Combine dynamic seaside relaxation with historic southern desert trails. These trips explore Paradise Valley, the Anti-Atlas mountains, silver markets of Tiznit, and Sahara escapes.",
  },
  errachidia: {
    cityName: "Errachidia",
    eyebrow: "Direct Desert Expeditions From Errachidia",
    title: "Best Morocco Trips from Errachidia",
    description:
      "Skip the long overland drives. Land directly at Moulay Ali Cherif Airport in Errachidia and enjoy immediate premium access to the towering dunes of Merzouga and Erg Chebbi.",
  },
  essaouira: {
    cityName: "Essaouira",
    eyebrow: "Atlantic Coast & Cultural Loops From Essaouira",
    title: "Best Morocco Trips from Essaouira",
    description:
      "Known as the wind city of Africa, Essaouira is the perfect point to begin relaxed journeys blending historic Portuguese coastal fortifications with inland desert loops.",
  },
  ouarzazate: {
    cityName: "Ouarzazate",
    eyebrow: "Hollywood Desert Trails From Ouarzazate",
    title: "Best Morocco Trips from Ouarzazate",
    description:
      "Step into the gateway of the Sahara. Start directly in Morocco's cinematic capital to explore ancient Ait Ben Haddou, the Valley of Roses, and nearby Todra and Dades gorges.",
  },
  rabat: {
    cityName: "Rabat",
    eyebrow: "Diplomatic Coastal & Historical Routes From Rabat",
    title: "Best Morocco Trips from Rabat",
    description:
      "Depart from Morocco's green capital. Blending modern design with historic Almohad ruins, these trips guide you smoothly through northern coastlines, Chefchaouen, and Fes.",
  },
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

// GLOBAL IN-MEMORY BUILD CACHE
let toursBuildCache: ExtendedTourData[] | null = null;
let postsBuildCache: BlogPostData[] | null = null;

// Media ID -> Clean URL cache
const mediaCache = new Map<number, string>();

function cleanImageUrl(imgStr: string): string | null {
  let trimmed = imgStr.trim();
  if (!trimmed || /^\d+$/.test(trimmed)) return null;

  if (trimmed.startsWith("http://")) trimmed = "https://" + trimmed.slice(7);
  if (trimmed.startsWith("//")) trimmed = "https:" + trimmed;

  if (trimmed.startsWith("https://")) {
    return trimmed
      .replace("://www.vacationstomorocco.com", `://${CMS_HOSTNAME}`)
      .replace(
        "://vacationstomorocco.com/wp-content",
        `://${CMS_HOSTNAME}/wp-content`
      )
      .replace("://www.moroccantourcompany.com", `://${CMS_HOSTNAME}`)
      .replace(
        "://moroccantourcompany.com/wp-content",
        `://${CMS_HOSTNAME}/wp-content`
      );
  }

  if (trimmed.startsWith("/picture/") || trimmed.startsWith("/_next/")) {
    return `${SITE_DOMAIN}${trimmed}`;
  }

  if (trimmed.startsWith("/")) {
    return `https://${CMS_HOSTNAME}${trimmed}`;
  }

  return null;
}

/**
 * Preloads Media IDs in bulk API requests to avoid server timeouts.
 */
async function preloadMediaCache(ids: number[]) {
  const missingIds = Array.from(new Set(ids)).filter(
    (id) => id > 0 && !mediaCache.has(id)
  );

  if (missingIds.length === 0) return;

  const chunkSize = 100;
  for (let i = 0; i < missingIds.length; i += chunkSize) {
    const chunk = missingIds.slice(i, i + chunkSize);
    try {
      const res = await fetch(
        `${WP_API_URL}/media?include=${chunk.join(",")}&per_page=100`,
        { headers: DEFAULT_HEADERS }
      );

      if (res.ok) {
        const mediaList = await res.json();
        if (Array.isArray(mediaList)) {
          for (const item of mediaList) {
            const numId = Number(item?.id);
            const sourceUrl =
              item?.source_url ||
              item?.media_details?.sizes?.full?.source_url ||
              item?.media_details?.sizes?.large?.source_url ||
              item?.guid?.rendered;

            if (numId && sourceUrl && typeof sourceUrl === "string") {
              const cleanUrl = cleanImageUrl(sourceUrl);
              if (cleanUrl) {
                mediaCache.set(numId, cleanUrl);
              }
            }
          }
        }
      }
    } catch {
      // Ignore batch fetch errors
    }
  }
}

/**
 * Resolves single image ID, Object, or String URL.
 * Falls back to direct /media/{id} request if not in cache.
 */
async function resolveSingleImage(img: any): Promise<string | null> {
  if (!img) return null;

  const numId =
    typeof img === "number"
      ? img
      : typeof img === "string" && /^\d+$/.test(img.trim())
        ? Number(img.trim())
        : typeof img === "object" && (img.ID || img.id)
          ? Number(img.ID || img.id)
          : null;

  if (numId && numId > 0) {
    if (mediaCache.has(numId)) {
      return mediaCache.get(numId) || null;
    }

    // Direct single media fetch fallback
    try {
      const res = await fetch(`${WP_API_URL}/media/${numId}`, {
        headers: DEFAULT_HEADERS,
      });

      if (res.ok) {
        const data = await res.json();
        const sourceUrl =
          data?.source_url ||
          data?.media_details?.sizes?.full?.source_url ||
          data?.media_details?.sizes?.large?.source_url ||
          data?.guid?.rendered;

        if (sourceUrl && typeof sourceUrl === "string") {
          const cleanUrl = cleanImageUrl(sourceUrl);
          if (cleanUrl) {
            mediaCache.set(numId, cleanUrl);
            return cleanUrl;
          }
        }
      }
    } catch {
      // Ignore single media error
    }
    return null;
  }

  if (typeof img === "object") {
    const candidate =
      img.source_url ||
      img.url ||
      img.sizes?.full?.url ||
      img.sizes?.full?.source_url ||
      img.sizes?.large?.url ||
      img.sizes?.large?.source_url ||
      img.guid?.rendered;

    if (candidate && typeof candidate === "string") {
      return cleanImageUrl(candidate);
    }
  }

  if (typeof img === "string") {
    return cleanImageUrl(img);
  }

  return null;
}

async function fetchFromEndpoint(endpoint: string, queryStr: string = "") {
  const qStr = queryStr
    ? queryStr.startsWith("?")
      ? queryStr
      : `?${queryStr}`
    : "";
  const url = `${WP_API_URL}/${endpoint}${qStr}`;

  try {
    const res = await fetch(url, { headers: DEFAULT_HEADERS });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchToursFromWP(queryStr: string = "") {
  const endpoints = ["tours", "tour", "trips", "trip"];
  const results = await Promise.all(
    endpoints.map((ep) => fetchFromEndpoint(ep, queryStr))
  );

  const combined: any[] = [];
  const seen = new Set<string | number>();

  for (const list of results) {
    if (Array.isArray(list)) {
      for (const item of list) {
        const id = item?.id || item?.slug || item?.post_name;
        if (id && !seen.has(id)) {
          seen.add(id);
          combined.push(item);
        }
      }
    }
  }

  return combined;
}

function cleanSlugString(rawSlug?: string): string {
  if (!rawSlug || typeof rawSlug !== "string") return "";
  let clean = decodeURIComponent(rawSlug.trim().toLowerCase());
  clean = clean.replace(/%20|\s+/g, "-");
  clean = clean.replace(/[^a-z0-9-]/g, "");
  clean = clean.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean;
}

function isDayTrip(tour: ExtendedTourData): boolean {
  if (!tour) return false;
  const dur = (tour.duration || "").toLowerCase().trim();
  const title = (tour.title || "").toLowerCase().trim();
  const slug = (tour.slug || "").toLowerCase().trim();

  const combined = `${dur} ${title} ${slug}`;

  const matchMultiDay = combined.match(/(\d+)\s*(?:days?|nights?)/i);
  if (matchMultiDay && parseInt(matchMultiDay[1], 10) > 1) {
    return false;
  }

  if (slug.match(/^\d+-days?-/) || title.match(/^\d+\s*days?\s+/i)) {
    const numMatch = slug.match(/^(\d+)-/);
    if (numMatch && parseInt(numMatch[1], 10) > 1) {
      return false;
    }
  }

  return true;
}

export async function getAllTours(): Promise<ExtendedTourData[]> {
  if (toursBuildCache) {
    return toursBuildCache;
  }

  try {
    const data = await fetchToursFromWP("per_page=100&_embed");
    if (!Array.isArray(data) || data.length === 0) return [];

    // Collect Media IDs for Bulk Preloading
    const allMediaIds = new Set<number>();
    for (const wp of data) {
      const acf = wp?.acf || {};
      const candidates = [
        wp?.featured_media,
        acf?.featured_image,
        acf?.tour_image_1,
        acf?.tour_image_2,
        acf?.tour_image_3,
        acf?.tour_image_4,
        acf?.tour_image_5,
        acf?.tour_image_6,
        acf?.image,
      ];
      if (Array.isArray(acf.gallery)) candidates.push(...acf.gallery);
      if (Array.isArray(acf.images)) candidates.push(...acf.images);
      if (Array.isArray(acf.tour_gallery)) candidates.push(...acf.tour_gallery);

      for (const item of candidates) {
        const numId =
          typeof item === "number"
            ? item
            : typeof item === "string" && /^\d+$/.test(item.trim())
              ? Number(item.trim())
              : typeof item === "object" && (item?.ID || item?.id)
                ? Number(item.ID || item.id)
                : null;
        if (numId && numId > 0) allMediaIds.add(numId);
      }
    }

    // Bulk Preload Media IDs
    await preloadMediaCache(Array.from(allMediaIds));

    // Map All WordPress Tours
    const rawMapped = await Promise.all(
      data.map(async (wp) => {
        try {
          const tour = await mapWordPressToTour(wp);
          return { tour, rawWp: wp };
        } catch {
          return null;
        }
      })
    );

    const validPairs = rawMapped.filter(
      (p): p is { tour: ExtendedTourData; rawWp: any } => p !== null
    );

    const validTours = validPairs.map((p) => p.tour);

    // Resolve Related Tours (In-Memory) — link/card logic unchanged
    for (let i = 0; i < validPairs.length; i++) {
      const { tour, rawWp } = validPairs[i];
      const acf = rawWp.acf || {};
      const rawRelated =
        acf.related_tours ||
        acf.related_tour ||
        acf.related ||
        rawWp.related_tours;

      const resolved: RelatedTour[] = [];

      if (rawRelated) {
        const list = Array.isArray(rawRelated) ? rawRelated : [rawRelated];

        for (const item of list) {
          if (!item) continue;

          let match: ExtendedTourData | undefined;

          const numId =
            typeof item === "number"
              ? item
              : typeof item === "string" && /^\d+$/.test(item.trim())
                ? Number(item.trim())
                : null;

          if (numId) {
            match = validPairs.find((p) => p.rawWp.id === numId)?.tour;
          }

          if (!match && typeof item === "object") {
            const itemId = Number(item.ID || item.id);
            const itemSlug = cleanSlugString(item.slug || item.post_name || "");

            match = validTours.find(
              (t, idx) =>
                (itemId && validPairs[idx].rawWp.id === itemId) ||
                (itemSlug && cleanSlugString(t.slug) === itemSlug)
            );
          }

          if (
            !match &&
            typeof item === "string" &&
            !/^\d+$/.test(item.trim())
          ) {
            const itemSlug = cleanSlugString(item);
            match = validTours.find(
              (t) => cleanSlugString(t.slug) === itemSlug
            );
          }

          if (
            match &&
            match.slug !== tour.slug &&
            !resolved.some((r) => r.slug === match?.slug)
          ) {
            resolved.push({
              slug: match.slug,
              title: match.title,
              image: match.images[0] || DEFAULT_TOUR_IMAGE,
              price: match.tourPrice,
              currency: match.tourCurrency,
              duration: match.duration,
            } as RelatedTour);
          }
        }
      }

      // Auto-fill remaining related tours up to 3
      if (resolved.length < 3) {
        const currentCity = (tour.startLocation || "").toLowerCase();
        const sameCityTours = validTours.filter(
          (t) =>
            t.slug !== tour.slug &&
            (t.startLocation || "").toLowerCase() === currentCity &&
            !resolved.some((r) => r.slug === t.slug)
        );
        const otherTours = validTours.filter(
          (t) =>
            t.slug !== tour.slug && !resolved.some((r) => r.slug === t.slug)
        );

        const fillFrom = [...sameCityTours, ...otherTours];
        for (const f of fillFrom) {
          if (resolved.length >= 3) break;
          resolved.push({
            slug: f.slug,
            title: f.title,
            image: f.images[0] || DEFAULT_TOUR_IMAGE,
            price: f.tourPrice,
            currency: f.tourCurrency,
            duration: f.duration,
          } as RelatedTour);
        }
      }

      tour.relatedTours = resolved.slice(0, 3);
    }

    toursBuildCache = validTours;
    return validTours;
  } catch {
    return [];
  }
}

export async function getAllTourSlugs(): Promise<string[]> {
  try {
    const all = await getAllTours();
    const slugs = all.map((t) => cleanSlugString(t.slug)).filter(Boolean);
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

export async function getTourBySlug(
  slug: string
): Promise<ExtendedTourData | null> {
  try {
    if (!slug) return null;
    const cleanSlug = cleanSlugString(slug);

    const all = await getAllTours();
    const match = all.find(
      (t) =>
        cleanSlugString(t.slug) === cleanSlug ||
        cleanSlugString(t.title) === cleanSlug
    );

    if (match) return match;

    const data = await fetchToursFromWP(
      `slug=${encodeURIComponent(cleanSlug)}&_embed`
    );
    if (Array.isArray(data) && data.length > 0) {
      return await mapWordPressToTour(data[0]);
    }

    return null;
  } catch {
    return null;
  }
}

export async function getAllDayTrips(): Promise<ExtendedTourData[]> {
  try {
    const allTours = await getAllTours();
    return allTours.filter(isDayTrip);
  } catch {
    return [];
  }
}

export async function getDayTripBySlug(
  slug: string
): Promise<ExtendedTourData | null> {
  try {
    if (!slug) return null;
    const cleanSlug = cleanSlugString(slug);

    const dayTrips = await getAllDayTrips();
    const match = dayTrips.find((t) => cleanSlugString(t.slug) === cleanSlug);
    if (match) return match;

    const tour = await getTourBySlug(cleanSlug);
    if (tour && isDayTrip(tour)) return tour;

    return null;
  } catch {
    return null;
  }
}

export async function getDayTripSlugs(): Promise<string[]> {
  try {
    const dayTrips = await getAllDayTrips();
    const slugs = dayTrips.map((t) => cleanSlugString(t.slug)).filter(Boolean);
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

// BLOG POST HELPERS
export async function getAllPosts(): Promise<BlogPostData[]> {
  if (postsBuildCache) {
    return postsBuildCache;
  }

  try {
    const rawPosts = await fetchFromEndpoint("posts", "per_page=100&_embed");
    if (!Array.isArray(rawPosts) || rawPosts.length === 0) return [];

    const mapped = await Promise.all(
      rawPosts.map(async (wp) => await mapWordPressToPost(wp).catch(() => null))
    );

    const result = mapped.filter((p): p is BlogPostData => p !== null);
    postsBuildCache = result;
    return result;
  } catch {
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostData | null> {
  try {
    if (!slug) return null;
    const cleanSlug = cleanSlugString(slug);

    const all = await getAllPosts();
    const match = all.find((p) => cleanSlugString(p.slug) === cleanSlug);
    if (match) return match;

    const raw = await fetchFromEndpoint(
      "posts",
      `slug=${encodeURIComponent(cleanSlug)}&_embed`
    );
    if (Array.isArray(raw) && raw.length > 0) {
      return await mapWordPressToPost(raw[0]);
    }

    return null;
  } catch {
    return null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const posts = await getAllPosts();
    const slugs = posts.map((p) => cleanSlugString(p.slug)).filter(Boolean);
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

export async function getToursByStartLocation(
  city: string
): Promise<ExtendedTourData[]> {
  try {
    const allTours = await getAllTours();
    if (!allTours.length) return [];
    const searchCity = (city || "").toLowerCase().trim();
    if (!searchCity) return allTours;

    const key = normalizeCityKey(searchCity) || searchCity;

    return allTours.filter((tour) => {
      const startLoc = (tour.startLocation || "").toLowerCase().trim();
      const title = (tour.title || "").toLowerCase();
      const slug = (tour.slug || "").toLowerCase();

      if (startLoc) {
        const startKey = normalizeCityKey(startLoc) || startLoc;
        return startKey === key || startLoc.includes(key);
      }

      const fromCity = `from ${key}`;
      const fromCitySlug = `from-${key}`;
      const cityTo = `${key} to`;
      const cityToSlug = `${key}-to`;

      if (
        title.includes(fromCity) ||
        slug.includes(fromCitySlug) ||
        title.includes(cityTo) ||
        slug.includes(cityToSlug) ||
        slug.startsWith(`${key}-`)
      ) {
        return true;
      }

      return false;
    });
  } catch {
    return [];
  }
}

export async function getDayTripsByStartLocation(
  city: string
): Promise<ExtendedTourData[]> {
  try {
    const allTrips = await getAllDayTrips();
    if (!allTrips.length) return [];
    const searchCity = (city || "").toLowerCase().trim();
    if (!searchCity) return allTrips;

    const key = normalizeCityKey(searchCity) || searchCity;

    return allTrips.filter((trip) => {
      const startLoc = (trip.startLocation || "").toLowerCase().trim();
      const title = (trip.title || "").toLowerCase();
      const slug = (trip.slug || "").toLowerCase();

      if (startLoc) {
        const startKey = normalizeCityKey(startLoc) || startLoc;
        return startKey === key || startLoc.includes(key);
      }

      return title.includes(key) || slug.includes(key);
    });
  } catch {
    return [];
  }
}

export async function fetchDynamicDestinations(): Promise<DynamicTourSection[]> {
  try {
    const allTours = await getAllTours();
    const grouped: Record<string, ExtendedTourData[]> = {
      marrakech: [],
      fes: [],
      tangier: [],
      casablanca: [],
      agadir: [],
      errachidia: [],
      essaouira: [],
      ouarzazate: [],
      rabat: [],
    };

    allTours.forEach((tour) => {
      const rawCity = tour.startLocation || "";
      const key = normalizeCityKey(rawCity);
      if (key && grouped[key] !== undefined) {
        grouped[key].push(tour);
      } else {
        const titleLower = (tour.title || "").toLowerCase();
        const slugLower = (tour.slug || "").toLowerCase();
        for (const city of Object.keys(DESTINATIONS_CONFIG)) {
          if (
            titleLower.includes(`from ${city}`) ||
            slugLower.includes(`from-${city}`) ||
            titleLower.includes(`${city} to`) ||
            slugLower.includes(`${city}-to`)
          ) {
            grouped[city].push(tour);
            break;
          }
        }
      }
    });

    const sections: DynamicTourSection[] = [];
    for (const [id, config] of Object.entries(DESTINATIONS_CONFIG)) {
      const cityTours = grouped[id] || [];
      if (cityTours.length > 0) {
        sections.push({
          id,
          cityName: config.cityName,
          eyebrow: config.eyebrow,
          title: config.title,
          description: config.description,
          tours: cityTours.slice(0, 3),
        });
      }
    }
    return sections;
  } catch {
    return [];
  }
}

function normalizeCityKey(city: string): string {
  if (!city || typeof city !== "string") return "";
  const lower = city.toLowerCase().trim();
  if (lower.includes("marrakech") || lower.includes("marrakesh"))
    return "marrakech";
  if (lower.includes("fes") || lower.includes("fez")) return "fes";
  if (lower.includes("tangier") || lower.includes("tanger")) return "tangier";
  if (lower.includes("casablanca")) return "casablanca";
  if (lower.includes("agadir")) return "agadir";
  if (lower.includes("errachidia") || lower.includes("er-rachidia"))
    return "errachidia";
  if (lower.includes("essaouira") || lower.includes("essouira"))
    return "essaouira";
  if (lower.includes("ouarzazate")) return "ouarzazate";
  if (lower.includes("rabat")) return "rabat";
  return "";
}

async function mapWordPressToPost(wp: any): Promise<BlogPostData | null> {
  if (!wp || typeof wp !== "object") return null;

  const acf = wp.acf || {};
  const rawTitle = stripAllTags(wp.title?.rendered || "");
  const slug = cleanSlugString(wp.slug || wp.post_name || "blog-post");
  if (!slug) return null;

  const title = rawTitle || beautifySlug(slug);

  const rawCandidates: any[] = [
    wp._embedded?.["wp:featuredmedia"]?.[0],
    wp.featured_image_url,
    wp.featured_media,
    acf.featured_image,
    acf.image,
  ];

  const resolvedList = await Promise.all(
    rawCandidates.map((cand) => resolveSingleImage(cand).catch(() => null))
  );
  const resolvedImages = resolvedList.filter(Boolean) as string[];
  const image = resolvedImages[0] || DEFAULT_TOUR_IMAGE;

  const author = wp._embedded?.author?.[0]?.name || "Vacations to Morocco";
  const category =
    wp._embedded?.["wp:term"]?.[0]?.[0]?.name || "Travel Guide";

  return {
    id: wp.id || 0,
    slug,
    title,
    excerpt: stripAllTags(
      wp.excerpt?.rendered || wp.content?.rendered || ""
    ).slice(0, 200),
    content: sanitizeHtml(wp.content?.rendered || ""),
    date: wp.date || new Date().toISOString(),
    dateModified: wp.modified || new Date().toISOString(),
    image,
    author,
    category,
    seoTitle: stripAllTags(acf.seo_title) || title,
    seoDescription:
      stripAllTags(acf.seo_description) ||
      stripAllTags(wp.excerpt?.rendered || "").slice(0, 160),
  };
}

async function mapWordPressToTour(wp: any): Promise<ExtendedTourData> {
  if (!wp || typeof wp !== "object") {
    return {
      slug: "tour",
      seoTitle: "Morocco Private Trip",
      seoDescription: "Private Morocco Trip",
      socialImage: DEFAULT_TOUR_IMAGE,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      tourPrice: 0,
      tourCurrency: "EUR",
      title: "Morocco Private Trip",
      location: "Morocco",
      startLocation: "Morocco",
      endLocation: "Morocco",
      duration: "1 Day",
      durationISO: "P1D",
      groupSize: "Private trip",
      languages: "English-speaking driver",
      tourType: "Private Morocco Day Trip",
      images: [DEFAULT_TOUR_IMAGE],
      imageAlts: ["Morocco Private Trip"],
      quickAnswer: "Private Morocco Trip",
      overviewHtml: "",
      overviewParagraphs: [],
      quickFacts: [],
      highlights: [],
      itinerary: [],
      included: [],
      excluded: [],
      faqItems: [],
      relatedTours: [],
      badges: [],
      whatsappMessage: "Hello, I am interested in a Morocco trip.",
    };
  }

  const acf = wp.acf || {};
  const rawTitle = stripAllTags(wp.title?.rendered || "");
  const slug = cleanSlugString(wp.slug || wp.post_name || "tour");
  const title = rawTitle || beautifySlug(slug);

  // 1) RESOLVE IMAGE 1: FEATURED IMAGE (HERO)
  const heroCandidates = [
    wp.featured_image_url,
    wp._embedded?.["wp:featuredmedia"]?.[0],
    wp.featured_media,
    acf.featured_image,
    acf.tour_image_1,
  ];

  let heroImageUrl: string | null = null;
  for (const cand of heroCandidates) {
    if (!cand) continue;
    const resolved = await resolveSingleImage(cand).catch(() => null);
    if (resolved) {
      heroImageUrl = resolved;
      break;
    }
  }

  // 2) RESOLVE IMAGES 2 TO 6: ACF FIELDS (tour_image_2 ... tour_image_6)
  const galleryCandidates = [
    acf.tour_image_2,
    acf.tour_image_3,
    acf.tour_image_4,
    acf.tour_image_5,
    acf.tour_image_6,
  ];

  if (Array.isArray(acf.gallery)) galleryCandidates.push(...acf.gallery);
  if (Array.isArray(acf.images)) galleryCandidates.push(...acf.images);
  if (Array.isArray(acf.tour_gallery)) galleryCandidates.push(...acf.tour_gallery);

  const resolvedGallery = await Promise.all(
    galleryCandidates.map((cand) => resolveSingleImage(cand).catch(() => null))
  );

  // 3) COMBINE HERO (INDEX 0) + GALLERY IMAGES (INDEX 1 TO 5)
  const allResolvedImages: string[] = [];

  if (heroImageUrl) {
    allResolvedImages.push(heroImageUrl);
  }

  for (const url of resolvedGallery) {
    if (url && !allResolvedImages.includes(url)) {
      allResolvedImages.push(url);
    }
  }

  const uniqueImages = allResolvedImages.slice(0, 6);
  const images = uniqueImages.length > 0 ? uniqueImages : [DEFAULT_TOUR_IMAGE];

  const startLocation = stripAllTags(acf.start_location);
  const endLocation = stripAllTags(acf.end_location);
  const location =
    startLocation && endLocation
      ? `${startLocation} to ${endLocation}, Morocco`
      : startLocation || endLocation || "Morocco";

  const price = Number(acf.price_from || acf.price || acf.tour_price) || 0;
  const currency = String(acf.currency || "EUR");
  const duration = stripAllTags(acf.duration) || "1 Day";

  const overviewParagraphs = toHtmlParagraphs(
    acf.overview || wp.content?.rendered || ""
  );
  const quickAnswer = stripAllTags(
    acf.overview || wp.excerpt?.rendered || wp.content?.rendered || ""
  ).slice(0, 240);
  const highlights = linesFromText(acf.highlights);
  const included = linesFromText(acf.included);
  const excluded = linesFromText(acf.excluded || acf.not_included);
  const itinerary = parseItineraryHtml(acf.itinerary);
  const faqItems = parseFaqHtml(acf.faq || acf.faqs);
  const whyChooseThisTour = parseWhyChooseHtml(acf.why_choose_this_tour);

  const badges: TourBadge[] = [
    { text: "Private Morocco trip", color: "emerald" },
  ];
  if (startLocation && endLocation)
    badges.push({
      text: `${startLocation} to ${endLocation}`,
      color: "orange",
    });
  if (price > 0)
    badges.push({
      text: `From ${currencySymbol(currency)}${price}`,
      color: "amber",
    });

  const socialImage = images[0] || DEFAULT_TOUR_IMAGE;

  return {
    slug,
    seoTitle: stripAllTags(acf.seo_title) || title,
    seoDescription:
      stripAllTags(acf.seo_descriptions || acf.seo_description) ||
      stripAllTags(wp.excerpt?.rendered) ||
      quickAnswer ||
      title,
    socialImage,
    datePublished: wp.date || new Date().toISOString(),
    dateModified: wp.modified || new Date().toISOString(),
    tourPrice: price,
    tourCurrency: currency,
    title,
    location,
    startLocation,
    endLocation,
    duration,
    durationISO: guessDurationISO(duration),
    groupSize: stripAllTags(acf.group_size) || "Private trip",
    languages: "English-speaking driver",
    tourType: "Private Morocco Day Trip",
    images,
    imageAlts: images.map(() => title),
    quickAnswer,
    overviewHtml: "",
    overviewParagraphs,
    quickFacts: buildQuickFacts({
      duration,
      start: startLocation,
      end: endLocation,
      price,
      currency,
      groupSize: acf.group_size,
    }),
    highlights,
    itinerary,
    included,
    excluded,
    faqItems,
    relatedTours: [],
    whyChooseThisTour,
    badges,
    whatsappMessage: `Hello, I am interested in the ${title}.`,
  };
}

function beautifySlug(slug?: string): string {
  if (!slug || typeof slug !== "string") return "Morocco Trip";
  const smallWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "or",
    "but",
    "from",
    "to",
    "of",
    "in",
    "on",
    "for",
    "with",
    "at",
    "by",
  ]);
  return slug
    .split("-")
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i !== 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function currencySymbol(currency: string): string {
  const map: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    MAD: "MAD ",
  };
  return map[currency] || `${currency} `;
}

function decodeEntities(str: string): string {
  let s = String(str || "");
  for (let i = 0; i < 2; i++) {
    s = s
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0*39;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&");
  }
  return s;
}

function sanitizeHtml(html?: string): string {
  if (!html) return "";
  let s = decodeEntities(String(html));
  s = s
    .replace(/https?:\/\/localhost:3000/gi, "")
    .replace(/https?:\/\/(www\.)?vacationstomorocco\.com/gi, "")
    .replace(/https?:\/\/(www\.)?moroccantourcompany\.com/gi, "");
  s = s
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
  s = s.replace(
    /<a\s+([^>]*?)href\s*=\s*["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi,
    (_m, _b, href, _a, text) => {
      const cleanHref = String(href || "").trim();
      const cleanText = String(text || "")
        .replace(/<[^>]+>/g, "")
        .trim();
      if (!cleanHref || !cleanText) return cleanText;
      const isExternal =
        /^(https?:)?\/\//i.test(cleanHref) ||
        cleanHref.startsWith("mailto:") ||
        cleanHref.startsWith("tel:");
      return `<a href="${cleanHref}" ${
        isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""
      } style="color:#a85a3c;text-decoration:underline;font-weight:600;">${cleanText}</a>`;
    }
  );

  // ALLOW ALL TABLE TAGS, FIGURES, DIVS, AND SPANS
  s = s.replace(
    /<\/?(?!a\b|strong\b|b\b|em\b|i\b|br\b|p\b|ul\b|ol\b|li\b|h[1-6]\b|table\b|thead\b|tbody\b|tfoot\b|tr\b|th\b|td\b|figure\b|figcaption\b|div\b|span\b)[a-z][^>]*>/gi,
    ""
  );
  return s.trim();
}

function toHtmlParagraphs(html?: string): string[] {
  const clean = sanitizeHtml(html);
  if (!clean) return [];
  const byP = clean
    .split(/<\/p>/i)
    .map((part) => part.replace(/<p[^>]*>/gi, "").trim())
    .filter((p) => p.length > 0);
  if (byP.length > 0) return byP;
  return clean
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function stripAllTags(html?: string): string {
  if (!html) return "";
  return decodeEntities(String(html))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function linesFromText(field: any): string[] {
  if (!field) return [];
  if (typeof field === "string")
    return stripAllTags(field)
      .split(/\n+/)
      .map((s) => s.replace(/^[\s\-–•*]+/, "").trim())
      .filter(Boolean);
  if (Array.isArray(field))
    return field
      .map((item) =>
        stripAllTags(
          typeof item === "string"
            ? item
            : item?.text ||
                item?.item ||
                item?.value ||
                item?.highlight_item ||
                ""
        )
      )
      .filter(Boolean);
  return [];
}

function parseWhyChooseHtml(
  field: any
): { title: string; description: string }[] {
  try {
    if (!field) return [];
    if (Array.isArray(field))
      return field
        .map((item: any) => ({
          title: stripAllTags(item?.title || item?.heading || ""),
          description: sanitizeHtml(item?.description || item?.text || ""),
        }))
        .filter((x) => x.title);

    const rawHtml = decodeEntities(String(field || "")).trim();
    if (!rawHtml) return [];
    const headingSplitRegex =
      /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>([\s\S]*?)(?=(?:<h[1-6][^>]*>|$))/gi;
    const items: { title: string; description: string }[] = [];
    let match: RegExpExecArray | null;
    while ((match = headingSplitRegex.exec(rawHtml)) !== null) {
      const title = stripAllTags(match[1] || "");
      const description = sanitizeHtml(match[2] || "");
      if (title) items.push({ title, description });
    }
    if (items.length > 0) return items;

    const lines = stripAllTags(rawHtml)
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    const fallbackItems: { title: string; description: string }[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const parts = line.split(/\s+[–—\-:]\s+/);
      if (parts.length >= 2)
        fallbackItems.push({
          title: parts[0].trim(),
          description: parts.slice(1).join(" - ").trim(),
        });
      else if (i < lines.length - 1 && !lines[i + 1].match(/^[–—\-:]/)) {
        fallbackItems.push({ title: line, description: lines[i + 1] });
        i++;
      } else fallbackItems.push({ title: line, description: "" });
    }
    return fallbackItems.filter((x) => x.title);
  } catch {
    return [];
  }
}

function parseItineraryHtml(field: any): TourItineraryDay[] {
  try {
    if (!field) return [];
    if (Array.isArray(field)) {
      return field.map((item: any, index: number) => {
        const dayNum = Number(item?.day_number || item?.day) || index + 1;
        const title = stripAllTags(
          item?.title || item?.day_title || `Day ${dayNum}`
        );
        const rawDesc =
          item?.description || item?.day_description || item?.content || "";
        const htmlDesc = sanitizeHtml(rawDesc);
        const paragraphs = htmlDesc
          ? htmlDesc
              .split(/<\/p>|<br\s*\/?>\s*<br\s*\/?>/i)
              .map((s) => s.replace(/<p[^>]*>/gi, "").trim())
              .filter(Boolean)
          : [];
        return {
          day: `Day ${dayNum}`,
          dayNumber: dayNum,
          title,
          paragraphs,
          included: stripAllTags(item?.included || ""),
          overnight: stripAllTags(
            item?.overnight || item?.accommodation || ""
          ),
        };
      });
    }

    const raw = decodeEntities(String(field || ""));
    if (!raw.trim()) return [];
    let blocks = raw.split(/(?=<h[1-6][^>]*>\s*Day\s+\d+)/i);
    if (blocks.length <= 1)
      blocks = raw.split(
        /(?=(?:<p[^>]*>)?\s*(?:<strong>|<b>)?\s*Day\s+\d+\s*[:\-–.])/i
      );
    blocks = blocks.filter((b) => stripAllTags(b).trim().length > 0);
    if (blocks.length === 0) blocks = [raw];

    return blocks.map((block, index) => {
      const plainFirst =
        stripAllTags(block).split(/\n/)[0]?.trim() || `Day ${index + 1}`;
      const m = plainFirst.match(/Day\s+(\d+)\s*[:\-–.]?\s*(.*)/i);
      const dayNumber = m ? Number(m[1]) : index + 1;
      const title = stripAllTags(m?.[2] || plainFirst) || `Day ${dayNumber}`;
      let body = block.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/i, "");
      if (!/<h[1-6]/i.test(block))
        body = body.replace(
          /^(?:<p[^>]*>)?\s*(?:<strong>|<b>)?\s*Day\s+\d+\s*[:\-–.]?[^\n<]*/i,
          ""
        );
      body = sanitizeHtml(body);
      const paragraphs = body
        .split(/<\/p>|<br\s*\/?>\s*<br\s*\/?>/i)
        .map((s) => s.replace(/<p[^>]*>/gi, "").trim())
        .filter(Boolean);
      return {
        day: `Day ${dayNumber}`,
        dayNumber,
        title,
        paragraphs,
        included: "",
        overnight: "",
      };
    });
  } catch {
    return [];
  }
}

function parseFaqHtml(field: any): TourFaqItem[] {
  try {
    if (!field) return [];
    if (Array.isArray(field))
      return field
        .map((item: any) => ({
          question: stripAllTags(item?.question || item?.title || ""),
          answer: sanitizeHtml(
            item?.answer || item?.content || item?.description || ""
          ),
        }))
        .filter((x) => x.question && x.answer);

    const raw = decodeEntities(String(field || "")).trim();
    if (!raw) return [];
    const items: TourFaqItem[] = [];
    const blocks = raw
      .split(/(?:\r?\n){2,}|<\/p>/i)
      .map((b) => b.replace(/<p[^>]*>/gi, "").trim())
      .filter(Boolean);

    for (const block of blocks) {
      const m = block.match(
        /^\s*(?:<strong[^>]*>|<b>)?\s*([^?<\n\r]+\?)\s*(?:<\/strong>|<\/b>)?\s*([\s\S]*)/i
      );
      if (m) {
        const question = stripAllTags(m[1]).trim();
        const answer = sanitizeHtml(m[2]).trim();
        if (question && answer) {
          items.push({ question, answer });
          continue;
        }
      }
      const lines = block
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length >= 2 && lines[0].endsWith("?")) {
        const question = stripAllTags(lines[0]);
        const answer = sanitizeHtml(lines.slice(1).join(" "));
        if (question && answer) items.push({ question, answer });
      }
    }
    if (items.length > 0) return items;

    const lines = stripAllTags(raw)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    let currentQ = "";
    let currentA: string[] = [];
    const flush = () => {
      if (currentQ && currentA.length > 0) {
        items.push({
          question: currentQ,
          answer: sanitizeHtml(currentA.join(" ")),
        });
      }
      currentQ = "";
      currentA = [];
    };
    for (const line of lines) {
      if (line.endsWith("?")) {
        flush();
        currentQ = line;
      } else if (currentQ) {
        currentA.push(line);
      }
    }
    flush();
    return items.filter((x) => x.question && x.answer);
  } catch {
    return [];
  }
}

function guessDurationISO(duration: string): string {
  if (!duration) return "P1D";
  const m = duration.match(/(\d+)\s*day/i);
  return m ? `P${m[1]}D` : "P1D";
}

function buildQuickFacts(opts: {
  duration: string;
  start: string;
  end: string;
  price: number;
  currency: string;
  groupSize?: string;
}): [string, string][] {
  const rows: [string, string][] = [];
  if (opts.duration) rows.push(["Duration", opts.duration]);
  if (opts.start) rows.push(["Start", opts.start]);
  if (opts.end) rows.push(["End", opts.end]);
  if (opts.groupSize)
    rows.push(["Group size", stripAllTags(String(opts.groupSize))]);
  if (opts.price > 0)
    rows.push([
      "Price from",
      `${currencySymbol(opts.currency)}${opts.price} per person`,
    ]);
  return rows;
}

export const getTourSlugs = getAllTourSlugs;