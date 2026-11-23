# Rylan Hayes — Official Artist Website

A complete, production-quality country music artist website built with **Next.js 15**, **React 19**, **TypeScript** and **Tailwind CSS 4**. It includes a cinematic marketing site, a working storefront with cart and demo checkout, tour listings, music/video pages, newsletter and contact forms backed by SQLite, and full responsive/mobile navigation.

> **Demo project / fictional artist.** “Rylan Hayes”, “Neon Porch Lights”, all written content, album artwork and product mockups in this repository are original fictional content created for this build. The site is inspired by the *layout and UX patterns* of a modern country artist site; it does not use any third-party artist's name, logo, photography, code or copyrighted assets, and it is not affiliated with any real artist or label.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm run start
```

Other scripts:

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Create an optimized production build |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | Run ESLint                       |
| `npm run typecheck` | Run TypeScript with no emit      |

The database is created automatically on first write at `data/rylan-hayes.db`. Override the local path with `DATABASE_PATH`, or set `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` to use a hosted libSQL database (see `.env.example` and “Deploying to Vercel with Turso”).

---

## What’s included

### Pages

| Route                | Description |
| -------------------- | ----------- |
| `/`                  | Full-bleed hero, album release, tour preview, featured video, about, store preview, newsletter band |
| `/tour`              | Upcoming / past show tabs, month grouping, on-sale / low / sold-out states, ticket links |
| `/music`             | Featured album, full track list, discography, streaming links |
| `/videos`            | Filterable video grid with accessible modal player |
| `/about`             | Artist story, quote, timeline, off-stage section |
| `/sign-up`           | Newsletter / fan club signup |
| `/store`             | Product grid with category filters |
| `/store/[slug]`      | Product detail, options, quantity, accordions, gallery + zoom on the tracklist tee, related products |
| `/cart`              | Full cart with quantity controls and order summary |
| `/checkout`          | Validated contact / shipping / demo payment form |
| `/checkout/success`  | Real order lookup from the database, demo payment notice |
| `/contact`           | Contact form with topic selection |
| `/privacy`, `/terms` | Legal pages |
| `not-found`          | Styled 404 |

Plus `sitemap.xml`, `robots.txt`, web app manifest, favicon, Open Graph image and JSON-LD `MusicGroup` structured data.

### Functional features

- **Cart** — React context, persisted to `localStorage`, slide-out drawer plus full cart page, quantity updates, free-shipping threshold, shipping method and tax calculation shared between client and server.
- **Checkout** — server-authoritative pricing, full validation, order + line items written atomically, success page reads the real order back from the database.
- **Newsletter & contact** — validated API routes, honeypot spam trap, records persisted to SQLite.
- **Video modal** — portal-based YouTube (nocookie) embed, scroll lock, Escape to close, focus handling, category filtering.
- **Navigation** — fixed header with scroll state, active-route highlighting, announcement bar, accessible mobile overlay menu, cart badge.
- **Accessibility** — skip link, visible focus rings, reduced-motion support, semantic landmarks, labelled controls, keyboard-operable menus and dialogs.
- **SEO** — per-page metadata, canonical URLs, Open Graph/Twitter cards, sitemap, robots, manifest, structured data.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, JSON-LD, providers, header/footer
  page.tsx                Home page
  globals.css             Design tokens, utilities, animations
  api/
    subscribe/route.ts    Newsletter signup → SQLite
    contact/route.ts      Contact messages → SQLite
    checkout/route.ts     Order creation → SQLite
  manifest.ts, icon.svg, opengraph-image.tsx, sitemap.ts, robots.ts
components/
  site/                   Header, Footer, PageHero, LegalLayout
  home/                   Home page sections
  cart/                   CartProvider, CartDrawer, CartView
  checkout/               CheckoutForm
  store/                  ProductCard, StoreGrid, AddToCart, ProductVisual
  video/                  VideoModal, VideoGrid, VideoThumbnailButton
  tour/                   TourSchedule
  forms/                  NewsletterForm, ContactForm
  art/                    AlbumArt (original SVG covers)
  ui/                     Button, Icon, Reveal, SectionHeading, Marquee
lib/
  site.ts                 Site config, nav, socials, streaming/ticket URL helpers
  music.ts                Album + track data
  tour.ts                 Tour dates
  videos.ts               Video data (placeholder YouTube IDs documented here)
  products.ts             Store catalog, variants, related products
  cart-math.ts            Shipping, tax, totals (shared client/server)
  db.ts                   libSQL client + schema (local file or Turso)
  validation.ts           Shared validation helpers
  format.ts, hooks.ts     Formatting and small client hooks
public/
  images/                 Optimized WebP photography
  videos/                 Video thumbnails
```

---

## Replacing placeholder content

This is a demo build, so a few external destinations point at platform **search** pages rather than a real artist's accounts. Everything is centralised so it can be swapped in one place.

### 1. Social, streaming and ticket links — `lib/site.ts`

- `socials` — Instagram, TikTok, YouTube, Facebook, X. Replace each `href` with the artist's real profile URL.
- `streaming` — Spotify / Apple Music / Amazon Music / YouTube. Replace with real artist profile or album links.
- `streamingLinksFor(title)` — per-track links used on the music page.
- `ticketSearchUrl(query)` — currently a Ticketmaster search URL; replace with real per-show ticket URLs (or update `lib/tour.ts` to carry a `ticketUrl` per date).
- `youtubeSearchUrl(query)` — used for “watch more” links.

### 2. Videos — `lib/videos.ts`

The `youtubeId` values are **public, embeddable scenic/acoustic visualizer videos** used as clearly-labelled placeholders. Replace each ID (and the local thumbnail in `public/videos/`) with the artist's official videos. Nothing else needs to change.

### 3. Photography — `public/images/`

All photography was sourced from free-to-use **Pexels** images, downloaded and converted to WebP locally. Before launching a real artist site, replace these with properly licensed press/artist photography and update the `Image` `alt` text in the relevant components.

Image files:

| File | Used for |
| ---- | -------- |
| `hero-stage.webp` | Home hero |
| `portrait-rugged.webp`, `portrait-bw.webp`, `portrait-hat.webp` | About / editorial portraits |
| `stage-warm.webp`, `lights.webp`, `venue.webp` | Tour / section backgrounds |
| `singer-guitar.webp` | Music / about |
| `crowd.webp`, `crowd-2.webp` | Crowd / social proof |
| `cowboy-sunset.webp`, `cowboy-portrait.webp` | Editorial imagery |

### 4. Album art and product mockups

Album covers are original SVGs in `components/art/AlbumArt.tsx`; product mockups are original SVGs in `components/store/ProductVisual.tsx`. Replace them with real artwork when available.

### 5. Copy and artist details

- `lib/site.ts` — name, tagline, description, emails, location, announcement bar.
- `lib/music.ts` — album, release date, tracks.
- `lib/tour.ts` — dates, venues, statuses.
- `lib/products.ts` — catalog, prices (stored in **cents**), variants.
- Page-level copy lives directly in the relevant `app/**/page.tsx` files.

---

## The store & checkout are a demo

**No real payment is processed and no card data is stored.**

- The checkout form collects card details only to demonstrate validation and UX. It displays a clear on-page demo notice and a “Use demo card” helper (`4242 4242 4242 4242`, `12/30`, `123`).
- The API route validates the payload, **recomputes all prices from `lib/products.ts` and `lib/cart-math.ts`** (never trusting client totals), and writes the order and line items to the database.
- The success page looks the order up by order number and shows a demo notice instead of a payment confirmation.
- **No transactional email is sent.** The demo records signups, messages and orders in SQLite but does not send receipts or shipping notifications. Wire up an email provider (e.g. Resend, Postmark, SES) before launch.

### Swapping in a live payment provider

1. Add your provider SDK (e.g. Stripe) and server-side secret keys to environment variables.
2. Replace the card fields in `components/checkout/CheckoutForm.tsx` with the provider's hosted element or redirect flow.
3. In `app/api/checkout/route.ts`, keep the existing validation and total recomputation, then create a payment intent/session before writing the order. Only mark the order `paid` from a verified webhook.
4. Add a webhook route that verifies signatures and updates order status.
5. Never log or persist raw card numbers, CVCs or expiry dates.

---

## Database

SQLite through **libSQL** (`@libsql/client`). Locally it reads and writes a SQLite file at `data/rylan-hayes.db`; in production the same code talks to a hosted Turso database when `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set. The schema is created automatically by `lib/db.ts` on first use.

| Table | Purpose |
| ----- | ------- |
| `subscribers` | Newsletter/fan signups (unique email, upsert on re-subscribe) |
| `orders` | Order header, customer/shipping details, totals, status |
| `order_items` | Line items linked to orders (cascade delete) |
| `messages` | Contact form submissions |

Money is stored as **integer cents**. The local database file and WAL/SHM files are git-ignored.

To inspect locally:

```bash
sqlite3 data/rylan-hayes.db ".tables"
sqlite3 data/rylan-hayes.db "select order_number, email, total from orders order by id desc limit 10;"
```

### Deploying to Vercel with Turso

Vercel's filesystem is ephemeral, so use a hosted database instead of the local file.

1. **Create the database** at [turso.tech](https://turso.tech) (name it `rylan-hayes`), or with the Turso CLI:
   ```bash
   turso db create rylan-hayes
   turso db show rylan-hayes --url     # → TURSO_DATABASE_URL
   turso db tokens create rylan-hayes  # → TURSO_AUTH_TOKEN
   ```
   In the dashboard, the URL and a token are under the database's **Overview** and **Settings → Tokens** tabs.

2. **Import the repo into Vercel**: sign in at [vercel.com](https://vercel.com), then **Add New → Project → Import** `c9919145/rylan-hayes-website`. Framework preset: Next.js (auto-detected). Keep the default build command and output directory.

3. **Add environment variables** under Project → Settings → Environment Variables (apply to Production, Preview and Development):
   - `TURSO_DATABASE_URL` — e.g. `libsql://rylan-hayes-<org>.turso.io`
   - `TURSO_AUTH_TOKEN` — the token from step 1
   - `NEXT_PUBLIC_SITE_URL` — the production domain Vercel assigns (visible in the project overview)

4. **Deploy** (or redeploy after adding variables). Tables are created automatically on the first database request, so there's no migration command to run.

5. **Verify on the live URL**: load `/`, submit the signup at `/sign-up` and the contact form at `/contact`, place a demo order in `/store`, then confirm the success page shows the real order. Check the Turso dashboard's browser/SQL tab to see the new rows. If the tables are empty, confirm the env vars are set for the Production environment and redeploy.

You can also point a local checkout at the hosted database by putting the same variables in `.env.local`.

---

## Design system

- **Palette:** charcoal `#0b0e0f`, cream `#f4ecdd`, gold `#d9a96c`, rust `#a45432`.
- **Typography:** Fraunces (display serif), Barlow Condensed (eyebrows/nav), Inter (body) — self-hosted in `app/fonts/` and loaded with `next/font/local`, so builds don’t depend on Google Fonts being reachable.
- **Tokens & utilities:** `app/globals.css` (`@theme` variables, `.eyebrow`, `.btn` variants, `.reveal`, prose styles, reduced-motion rules).
- **Motion:** subtle scroll reveals and hero animation, all disabled under `prefers-reduced-motion`.

Custom component classes are intentionally unlayered so they win over utility classes; use the dedicated `btn-outline-ink`, `eyebrow-ink`, `link-arrow-ink` variants instead of overriding utilities.

---

## Asset licensing

- **Fonts** — Fraunces, Barlow Condensed and Inter are licensed under the SIL Open Font License and self-hosted in `app/fonts/`.
- **Photography** — sourced from Pexels under the Pexels license. Replace with artist-owned or properly licensed press photography before launch.
- **Album art and product illustrations** — original SVGs created for this project (`components/art/AlbumArt.tsx`, `components/store/ProductVisual.tsx`).
- **Placeholder videos** — embedded from public YouTube videos. Embedding does not grant a license to the underlying footage; replace with owned content before launch.
- **Icons** — inline SVG icons drawn for this project (`components/ui/Icon.tsx`).

---

## Notes

- Internal links use `next/link`; hash links (e.g. `#dates`) use plain anchors.
- API routes that touch the database use `runtime = "nodejs"` and `dynamic = "force-dynamic"`.
- Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, Open Graph URLs and the sitemap use the live domain.
- Local development uses a SQLite file; serverless hosts (Vercel, Netlify) need the hosted Turso variables above because their filesystem is ephemeral.
