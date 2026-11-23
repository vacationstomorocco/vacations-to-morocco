export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  meals: string;
  stay: string;
};

export type Tour = {
  slug: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  price?: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
};

export const tours: Tour[] = [
  {
    slug: "10-days-morocco-tour-from-casablanca",
    title: "10-Day Essential Morocco Trip from Casablanca",
    category: "Classic Morocco",
    location: "Casablanca · Old Imperial Cities · Sahara · Marrakech",
    duration: "10 days / 9 nights",
    groupSize: "2–50 guests",
    rating: 5.0,
    reviews: 2150,
    price: 890,
    oldPrice: 1400,
    image: "/picture/10-days-casablanca.jpg",
    gallery: [
      "/picture/10-days-casablanca.jpg",
      "/picture/merzouga-desert.jpg"
    ],
    shortDescription:
      "Explore Morocco on a 10-day classic trip covering the four old imperial cities, the Atlas Mountains, and the Sahara Desert, with a camel ride and luxury desert camp.",
    overview:
      "The quintessential 10-day classic route starting in Casablanca. Perfect for first-time visitors seeking history, old imperial culture, high mountain passes, and desert magic.",
    highlights: [
      "Visit Casablanca Hassan II Mosque",
      "Explore Fes ancient medina with an official guide",
      "Erg Chebbi sunset camel safari & luxury camp night",
      "High Atlas mountain passes & Marrakech Medina"
    ],
    included: [
      "Private high-comfort transport with AC",
      "Boutique Riads & Sahara Desert Camp",
      "Local official guides in Fes & Marrakech",
      "Daily breakfast & desert camp dinners"
    ],
    excluded: ["Flight tickets", "Lunches", "Personal expenses", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Casablanca Arrival → Rabat",
        description: "Visit Hassan II mosque and transfer to imperial capital Rabat.",
        meals: "Dinner included",
        stay: "Riad/Hotel in Rabat"
      },
      {
        day: 2,
        title: "Rabat → Chefchaouen",
        description: "Explore Rabat landmarks before driving to the Blue Pearl Chefchaouen.",
        meals: "Breakfast included",
        stay: "Riad in Chefchaouen"
      },
      {
        day: 3,
        title: "Chefchaouen → Volubilis → Fes",
        description: "Discover Roman ruins of Volubilis on your way to medieval Fes.",
        meals: "Breakfast included",
        stay: "Traditional Riad in Fes Medina"
      }
    ]
  },
  {
    slug: "4-days-marrakech-to-fes-desert-tour",
    title: "4-Day Marrakech to Fes Desert Trip",
    category: "Desert Journey",
    location: "Marrakech · Merzouga · Fes",
    duration: "4 days / 3 nights",
    groupSize: "2–10 guests",
    rating: 4.9,
    reviews: 1142,
    price: 320,
    oldPrice: 520,
    image: "/picture/4-days-marrakech-fes.jpg",
    gallery: [
      "/picture/4-days-marrakech-fes.jpg",
      "/picture/merzouga-desert.jpg"
    ],
    shortDescription:
      "Connect Marrakech to Fes through kasbahs, Todra Gorge, and Erg Chebbi desert dunes, with a camel ride experience on this 4-day desert trip.",
    overview:
      "Travel from Marrakech to Fes on a 4-day private adventure through Morocco’s iconic south, high Atlas mountain roads, and Merzouga Sahara sand dunes.",
    highlights: [
      "Visit UNESCO-listed Ait Ben Haddou Kasbah",
      "Hike inside the spectacular Todra Gorges",
      "Camel trek & night in Erg Chebbi desert camp",
      "Drive through Ziz Valley and Middle Atlas Cedar Forest"
    ],
    included: [
      "Private AC Vehicle with professional driver",
      "Accommodations with Dinner & Breakfast",
      "Camel ride in Erg Chebbi dunes",
      "Overnight luxury or standard desert camp"
    ],
    excluded: ["Lunches and drinks", "Entry fees", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → High Atlas → Dades Valley",
        description: "Cross High Atlas Mountains to Ait Ben Haddou and Dades Valley.",
        meals: "Dinner included",
        stay: "Hotel in Dades Valley"
      },
      {
        day: 2,
        title: "Dades Valley → Todra Gorge → Merzouga Desert",
        description: "Explore Todra Gorges and arrive in Merzouga for sunset camel ride.",
        meals: "Breakfast & Dinner included",
        stay: "Sahara Desert Camp"
      },
      {
        day: 3,
        title: "Merzouga Desert Exploration",
        description: "Discover desert villages, Nomad families, and Gnawa music in Khamlia.",
        meals: "Breakfast & Dinner included",
        stay: "Desert Hotel in Merzouga"
      },
      {
        day: 4,
        title: "Merzouga → Ziz Valley → Midelt → Fes",
        description: "Travel north through Ziz Valley and Cedar Forest of Ifrane to Fes.",
        meals: "Breakfast included",
        stay: "Trip ends in Fes"
      }
    ]
  },
  {
    slug: "14-days-morocco-itinerary-from-casablanca",
    title: "14-Day Grand Morocco Trip from Casablanca",
    category: "Grand Trip",
    location: "Casablanca · Chefchaouen · Fes · Sahara · Marrakech",
    duration: "14 days / 13 nights",
    groupSize: "2–12 guests",
    rating: 5.0,
    reviews: 88,
    price: 1190,
    oldPrice: 1650,
    image: "/picture/14-days-casablanca.jpg",
    gallery: [
      "/picture/14-days-casablanca.jpg",
      "/picture/chefchaouen.jpg"
    ],
    shortDescription:
      "The complete grand trip experience covering old imperial cities, blue Chefchaouen, Sahara, and Atlantic coast in 2 weeks in Morocco.",
    overview:
      "An in-depth 14-day discovery of Morocco starting in Casablanca. Experience historic medinas, blue streets, high mountain peaks, Sahara dunes, and coastal breezes.",
    highlights: [
      "Hassan II Mosque in Casablanca",
      "Blue city of Chefchaouen & imperial Fes",
      "Merzouga Sahara camel safari & starry night",
      "Marrakech sights & coastal day in Essaouira"
    ],
    included: [
      "Private vehicle & professional driver-guide",
      "Handpicked 3/4-star Riads & Hotels",
      "Official city guides in Fes & Marrakech",
      "Daily breakfast & desert dinners"
    ],
    excluded: ["Flights", "Lunches", "Personal spending"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Casablanca → Rabat",
        description: "Visit Hassan II Mosque and head to imperial capital Rabat.",
        meals: "Dinner included",
        stay: "Riad in Rabat"
      }
    ]
  },
  {
    slug: "3-days-desert-tour-from-fes-to-marrakech",
    title: "3-Day Desert Trip from Fes to Marrakech",
    category: "Desert Journey",
    location: "Fes · Merzouga · Marrakech",
    duration: "3 days / 2 nights",
    groupSize: "2–10 guests",
    rating: 4.9,
    reviews: 115,
    price: 160,
    oldPrice: 390,
    image: "/picture/3-days-fes-marrakech.jpg",
    gallery: [
      "/picture/3-days-fes-marrakech.jpg"
    ],
    shortDescription:
      "Travel from Fes to Marrakech through Middle Atlas forest, Merzouga sand dunes, and kasbahs on this 3-day desert trip.",
    overview:
      "A fast-paced popular route taking you from medieval Fes across the Middle Atlas to the Sahara desert before concluding in vibrant Marrakech.",
    highlights: [
      "Stop in Ifrane (Little Switzerland)",
      "Meet Barbary Macaque monkeys in Azrou cedar forest",
      "Camel ride & night in Erg Chebbi desert camp",
      "Visit Ait Ben Haddou Kasbah"
    ],
    included: [
      "Private transport in modern AC 4x4 or Minivan",
      "English-speaking driver",
      "Overnight in Dades Valley & Desert Camp",
      "Camel trek in Sahara"
    ],
    excluded: ["Lunches", "Drinks", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Fes → Ifrane → Midelt → Merzouga",
        description: "Drive through cedar forests and Ziz valley into Merzouga desert.",
        meals: "Dinner included",
        stay: "Desert Camp tent in Merzouga"
      }
    ]
  },
  {
    slug: "10-days-southern-morocco-kasbahs-tour-from-agadir",
    title: "10-Day Southern Morocco & Kasbahs from Agadir",
    category: "Southern Discovery",
    location: "Agadir · Taroudant · Sahara · Marrakech",
    duration: "10 days / 9 nights",
    groupSize: "2–50 guests",
    rating: 4.8,
    reviews: 964,
    image: "/picture/10-days-agadir.jpg",
    gallery: [
      "/picture/10-days-agadir.jpg"
    ],
    shortDescription:
      "Discover ancient clay castles, saffron valleys, Atlantic beaches, old kasbahs, and Sahara sand dunes from Agadir.",
    overview:
      "Explore the hidden south of Morocco starting from sunny Agadir. Discover Taroudant, Draa Valley, Sahara dunes, and Atlas kasbahs.",
    highlights: [
      "Wander walled ramparts of Taroudant",
      "Visit Taliouine (Moroccan Saffron capital)",
      "Camel safari in Erg Chebbi desert",
      "Relax in coastal Essaouira"
    ],
    included: [
      "Private vehicle with dedicated driver",
      "9 Nights lodging with breakfasts and dinners in desert",
      "Camel trek in Merzouga"
    ],
    excluded: ["Lunches", "Drinks", "Entry fees"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Taroudant",
        description: "Pickup in Agadir, drive to ancient walled town of Taroudant.",
        meals: "Dinner included",
        stay: "Riad in Taroudant"
      }
    ]
  },
  {
    slug: "12-days-morocco-tour-from-essaouira-to-casablanca",
    title: "12-Day Morocco Trip From Essaouira to Casablanca",
    category: "Coast & Desert",
    location: "Essaouira · Marrakech · Sahara · Fes · Casablanca",
    duration: "12 days / 11 nights",
    groupSize: "2–50 guests",
    rating: 4.9,
    reviews: 727,
    image: "/picture/12-days-essaouira.jpg",
    gallery: [
      "/picture/12-days-essaouira.jpg"
    ],
    shortDescription:
      "Start on the Atlantic coast in Essaouira, journey across Sahara desert, and end in economic heart Casablanca.",
    overview:
      "A scenic 12-day journey linking coastal Atlantic towns with High Atlas mountain villages, deep Sahara desert dunes, and royal old imperial medinas.",
    highlights: [
      "Explore coastal Medina of Essaouira",
      "Tour red city Marrakech & vibrant Jemaa el-Fnaa",
      "Sahara camel ride & camp night",
      "Medina guided tour of Fes"
    ],
    included: [
      "Private AC transport",
      "English-speaking driver-guide",
      "11 Nights hotel & desert camp accommodations",
      "Daily breakfasts"
    ],
    excluded: ["Lunches", "Tips", "Travel Insurance"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Essaouira",
        description: "Welcome pickup and check-in at coastal riad.",
        meals: "Dinner included",
        stay: "Riad in Essaouira"
      }
    ]
  },
  {
    slug: "8-days-morocco-itinerary-from-rabat-to-marrakech",
    title: "8-Day Old Imperial Cities & Sahara from Rabat",
    category: "Imperial & Desert",
    location: "Rabat · Chefchaouen · Fes · Sahara · Marrakech",
    duration: "8 days / 7 nights",
    groupSize: "2–50 guests",
    rating: 4.9,
    reviews: 93,
    image: "/picture/Rabat.webp",
    gallery: [
      "/picture/8-days-rabat.webp"
    ],
    shortDescription:
      "A balanced 8-day Morocco itinerary taking you from Morocco’s capital city Rabat through blue Chefchaouen to Sahara sand dunes and Marrakech.",
    overview:
      "Experience Morocco's highlights in 8 action-packed days starting in coastal capital Rabat, continuing through Rif mountains, imperial Fes, Merzouga dunes, ending in Marrakech.",
    highlights: [
      "Hassan Tower & Kasbah des Oudaias in Rabat",
      "Blue alleyways of Chefchaouen",
      "Erg Chebbi sunset camel safari",
      "Majorelle Garden in Marrakech"
    ],
    included: [
      "Private vehicle throughout",
      "Experienced local driver",
      "Desert camp with dinner & breakfast",
      "City tours"
    ],
    excluded: ["Lunches", "Entry tickets"],
    itinerary: [
      {
        day: 1,
        title: "Rabat → Chefchaouen",
        description: "Explore Rabat landmarks before driving to Chefchaouen.",
        meals: "Dinner included",
        stay: "Riad in Chefchaouen"
      }
    ]
  },
  {
    slug: "1-week-in-morocco-itinerary-from-tangier-to-marrakech",
    title: "7-Day Morocco Highlights: Tangier to Marrakech",
    category: "North to South",
    location: "Tangier · Chefchaouen · Fes · Sahara · Marrakech",
    duration: "7 days / 6 nights",
    groupSize: "2–10 guests",
    rating: 4.8,
    reviews: 1605,
    price: 680,
    oldPrice: 890,
    image: "/picture/7-days-tangier.jpg",
    gallery: [
      "/picture/7-days-tangier.jpg"
    ],
    shortDescription:
      "Ideal for travelers arriving in Tangier who want to see Morocco’s best sights in a one-week Morocco itinerary.",
    overview:
      "Cross Morocco from north to south in 7 days. Start at the gateway of Africa in Tangier, travel through blue Chefchaouen, historic Fes, Merzouga Sahara dunes, and finish in Marrakech.",
    highlights: [
      "Hercules Caves & Cap Spartel in Tangier",
      "Chefchaouen Medina photoshoot stops",
      "Overnight luxury camp in Erg Chebbi",
      "Ait Ben Haddou fortified kasbah"
    ],
    included: [
      "Pickup from Tangier Port or Airport",
      "Private AC transport",
      "6 Nights accommodations",
      "Camel ride"
    ],
    excluded: ["Lunches", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Tangier → Chefchaouen",
        description: "Meet in Tangier, visit Cap Spartel, drive to Chefchaouen.",
        meals: "Dinner included",
        stay: "Riad in Chefchaouen"
      }
    ]
  }
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}