# Vacations to Morocco — Private Morocco Trips

A responsive Morocco travel website built with Next.js App Router, TypeScript and plain CSS.

## Included

- Premium responsive homepage
- Mobile navigation and sticky mobile booking button
- Trip search panel
- Reusable trip cards and data file
- Trips listing page
- Dynamic trip detail pages using `/tours/[slug]`
- Gallery, itinerary, inclusions, FAQ and sticky booking card
- Custom-trip inquiry form
- Example API route for inquiry submission
- SEO metadata and local Google fonts

## Run locally

​```bash
npm install
npm run dev
​```

Open `http://localhost:3000`.

The current Next.js documentation requires Node.js 20.9 or newer. This site uses Next.js 16.1.5 and React 19.2.7.

## Production details

1. **Brand name:** Vacations to Morocco
2. **Phone:** +212 668 422 869 (`+212668422869`)
3. **Email:** vacationstomorocco@gmail.com
4. **Website:** https://vacationstomorocco.com
5. **CMS / API:** https://cms.vacationstomorocco.com
6. **Instagram:** @vacationstomorocco
7. **WhatsApp:** https://wa.me/212668422869

## Environment variables

Create a `.env.local` file in the project root:

​```bash
NEXT_PUBLIC_WP_API_URL=https://cms.vacationstomorocco.com/wp-json/wp/v2
NEXT_PUBLIC_WP_HOSTNAME=cms.vacationstomorocco.com
NEXT_PUBLIC_SITE_URL=https://vacationstomorocco.com
​```

## Build & deploy (Static Export)

​```bash
npm run build
​```

The site is configured with `output: "export"` in `next.config.ts`, producing a static `out/` folder ready to deploy on any static host (Vercel, Netlify, Cloudflare Pages, Hostinger, etc.).

## Main folders

​```text
src/
  app/
    api/inquiry/route.ts
    contact/page.tsx
    tours/page.tsx
    tours/[slug]/page.tsx
    morocco-tours/page.tsx
    destinations/
      marrakech/page.tsx
      fes/page.tsx
      casablanca/page.tsx
      agadir/page.tsx
      tangier/page.tsx
  components/
    Header.tsx
    Footer.tsx
    TourTemplate.tsx
    CustomTripForm.tsx
  lib/
    wp.ts
    wordpress.ts
  data/
    tours.ts
public/
  picture/
    vacations-to-morocco.png
    vacations-to-morocco.webp
​```

## Add another trip

Copy one item in `data/tours.ts`, give it a unique `slug`, and update its content. The listing and dynamic trip route (`/tours/[slug]`) will update automatically.

Trips can also be managed through the WordPress CMS at `https://cms.vacationstomorocco.com`. New entries added through the WP REST API will appear automatically on the next build.

## Content guidelines

- Use **"trips"** in all user-facing copy (headings, CTAs, descriptions).
- Keep URLs/routes using `/morocco-tours`, `/tours/[slug]` — do not rename.
- Keep Header dropdown labels as **"Tours From [City]"**.
- Always refer to the brand as **Vacations to Morocco**.
- Instagram handle: **@vacationstomorocco**
- Always use the WhatsApp link `https://wa.me/212668422869`.

## SEO

- Homepage `<h1>` is **"Vacations to Morocco."** for brand ranking.
- Each trip page uses unique `seoTitle` and `seoDescription` from the CMS.
- OG and Twitter cards use `/picture/vacations-to-morocco.webp`.
- Tour card titles are rendered at 21px (`globals.css`) for readability.

## License

© Vacations to Morocco. All rights reserved.