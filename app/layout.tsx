import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// 🟢 WebSite Schema for Google Site Name
const siteNameSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vacations to Morocco",
  "alternateName": ["Morocco Vacations"],
  "url": "https://vacationstomorocco.com/",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vacationstomorocco.com"),
  title: {
    default: "Vacations to Morocco | Private Morocco Trips & Desert Journeys",
    template: "%s | Vacations to Morocco",
  },
  description:
    "Private Sahara desert trips, old imperial cities, Atlas Mountains, and custom Morocco travel itineraries from Marrakech, Casablanca, Fes, Tangier, and Agadir.",
  
  // 🟢 ADDED: Global OpenGraph Site Name for Google & Social Media
  openGraph: {
    siteName: "Vacations to Morocco",
    type: "website",
    locale: "en_US",
  },

  // 🟢 GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: "2I05gkyBAKNwWhDloavPyZwPVUuVUSZuEONh6pvMbSE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* 🟢 Performance Fix: Preconnect to Unsplash for faster Hero Image loading */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* 🟢 ADDED: Structured Data telling Google your Site Name */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <a className="mobile-book-bar" href="/contact">
          Plan my Morocco trip
        </a>
      </body>
    </html>
  );
}