export interface TourItineraryDay {
  day: string;
  dayNumber: number;
  title: string;
  paragraphs: string[];
  included: string;
  overnight: string;
}

export interface TourFaqItem {
  question: string;
  answer: string;
}

export interface TourBadge {
  text: string;
  color: "emerald" | "orange" | "amber";
}

export interface RelatedTour {
  slug: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  duration: string;
}

export interface TourData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
  datePublished: string;
  dateModified: string;

  tourPrice: number;
  tourCurrency: string;

  title: string;
  location: string;
  duration: string;
  durationISO: string;
  groupSize: string;
  languages: string;
  tourType: string;

  images: string[];
  imageAlts: string[];
  quickAnswer: string;
  overviewHtml: string;
  overviewParagraphs: string[];

  quickFacts: [string, string][];
  highlights: string[];
  itinerary: TourItineraryDay[];
  included: string[];
  excluded: string[];
  faqItems: TourFaqItem[];
  relatedTours: RelatedTour[];

  badges: TourBadge[];
  whatsappMessage: string;
}