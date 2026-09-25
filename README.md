# MORNING THEORY — Coffee • Bakes • Good Days

A frontend-only website demo for a fictional specialty café in Bandra West, Mumbai.
Business details, menu, prices and testimonials are illustrative. No orders, payments,
reservations or messages are sent anywhere.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · Lucide icons.
Fonts (Fraunces, DM Sans, Caveat) are self-hosted via Fontsource.

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run preview   # serve the production build
```

When deploying, configure the host to serve `index.html` for unknown paths (SPA fallback) so deep links such as `/menu/pistachio-latte` work.

## Re-branding for another café

| What | Where |
| --- | --- |
| Name, tagline, contact, hours, locations, tax and delivery fees | `src/config/cafe.ts` |
| Menu items, prices, options, dietary tags | `src/data/products.ts`, `src/data/menu.ts` |
| Hero slides, brand strip, craft pillars | `src/data/home.ts` |
| Gallery and Instagram feed | `src/data/gallery.ts` |
| Testimonials, FAQs, legal copy | `src/data/testimonials.ts`, `src/data/faqs.ts`, `src/data/legal.ts` |
| Colours and type | `@theme` block in `src/index.css` |

## Images

All photography is from Unsplash (Unsplash License, no Unsplash+ assets), stored locally as
WebP in three responsive sizes under `public/images/`. Photographer credits live in
`public/images/CREDITS.md`, on the `/credits` page, and in `src/data/images.ts`, which holds
the metadata and alt text for each image.
