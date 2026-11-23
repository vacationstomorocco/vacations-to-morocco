"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type WPTour = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  acf?: {
    price?: number | string;
    duration_days?: number | string;
    group_size?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: any;
  };
};

const FALLBACK_IMAGE = "/images/tour-placeholder.jpg";

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export default function ToursGrid({
  destination,
  perPage = 12,
}: {
  destination?: string; // e.g. "marrakech"
  perPage?: number;
}) {
  const [tours, setTours] = useState<WPTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setErrorMsg(null);

        const url =
          `/api/wp-tours?per_page=${perPage}` +
          (destination ? `&destination=${encodeURIComponent(destination)}` : "");

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || `Failed to fetch (${res.status})`);
        }

        const data = await res.json();

        // Only update state if component is still mounted and request wasn't aborted
        if (isMounted && !controller.signal.aborted) {
          setTours(data.tours || []);
        }
      } catch (e: any) {
        // Silently ignore abort errors when components unmount or re-render
        if (e?.name === "AbortError" || controller.signal.aborted || !isMounted) {
          return;
        }
        setErrorMsg(e?.message || "Failed to load trips");
      } finally {
        if (isMounted && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [destination, perPage]);

  if (loading) {
    return <p className="text-center text-gray-600 py-10">Loading trips...</p>;
  }

  if (errorMsg) {
    return <p className="text-center text-red-600 py-10">{errorMsg}</p>;
  }

  if (tours.length === 0) {
    return (
      <p className="text-center text-gray-600 py-10">
        No trips found{destination ? ` for ${destination}` : ""}.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {tours.map((tour) => {
        const img =
          tour._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          FALLBACK_IMAGE;
        const title = stripHtml(tour.title.rendered);
        const excerpt = stripHtml(tour.excerpt.rendered);
        const price = tour.acf?.price;
        const days = tour.acf?.duration_days;

        return (
          <article
            key={tour.slug}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            <div className="relative h-56 bg-gray-100">
              <Image src={img} alt={title} fill className="object-cover" />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{title}</h2>
              <p className="text-gray-600 mb-5 line-clamp-3">{excerpt}</p>

              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                {days ? <span>{days} days</span> : <span />}
                {price ? (
                  <span className="text-orange-600 font-bold">
                    From ${price}
                  </span>
                ) : null}
              </div>

              <Link
                href={`/tours/${tour.slug}`}
                className="text-orange-600 font-semibold"
              >
                View trip →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}