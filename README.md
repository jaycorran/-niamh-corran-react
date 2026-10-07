# Niamh Corran Physiotherapy & Acupuncture — React site

A React (Vite) rebuild of the Kinsale physiotherapy and acupuncture website. All copy, hours, fees and contact details were carried over from the original static site; the design, colour palette and interactions are new.

## Run it

```
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle in dist/
npm run preview   # serve the production build
```

Node is required. If `node` isn't on your PATH in a fresh terminal, it lives at `%LOCALAPPDATA%\nodejs`.

## Stack

- React 19 + Vite 8
- react-router-dom 7 (routes: `/`, `/physiotherapy`, `/acupuncture`, `/meet-niamh`, `/fees`, `/faq`, `/booking`, `/privacy`, `/cookies`, `/terms`, `/accessibility`)
- framer-motion 13 (scroll reveals, page transitions, menu, FAQ accordion)
- Native scroll only — no smooth-scroll library. First-viewport content (hero/page heroes) uses a
  CSS mount-triggered entrance instead of scroll-gated reveal, so it's never blank on load.

## Design

Palette — "Kinsale deep" — is defined once in `src/index.css` under `:root`:

- Harbour deep `#082531` · Harbour `#0b3b4c` · Cloud `#fdfbf7` · Seafoam `#9fe1cb` · Coral `#ff6b4a`

Font: Plus Jakarta Sans (variable, upright + italic; SIL OFL) for headings and body, self-hosted via
`@fontsource-variable/plus-jakarta-sans` (no Google Fonts request).

## Where things live

- `src/data/site.js` — single source of truth for phone, email, address, hours, fees, insurers, credentials and the nav. Edit here and every page updates.
- `src/components/` — Header (full-screen menu), Footer, Button, MobileActionBar, Reveal (animation helpers), Shared (hero backgrounds, marquee, page hero, CTA), Icons.
- `src/pages/` — one file per page.

## Internal poster tool (dev only)

A printable promotional poster designer lives at `/poster` on the **dev server only**:

```
npm run dev        # then open:
# http://localhost:5173/poster?size=a4&o=landscape
```

- **Sizes / orientation**: A2–A6, portrait or landscape, selected from the non-printed toolbar and URL-addressable via `?size=a4&o=landscape`. The preview scales to fit the screen while keeping the exact ISO (1:√2) proportions.
- **Export**: use the browser's **Print → Save as PDF** (toolbar button) — a dynamic `@page { size: <size> <orientation> }` rule prints at the real paper size and the toolbar is hidden in print.
- **Dev-only / not shipped**: the route is gated behind `import.meta.env.DEV` and the component is loaded through a dynamic `import()` that sits inside that guard, so Rollup emits no poster chunk and `npm run build` leaves it out of `dist/`. It does not render under `npm run preview`.
- **Assets**: the poster images live in `src/pages/poster-assets/` and are imported only by the dev-only poster page, so they are never bundled into `dist/`.

## Internal business-card designer (dev only)

A print-ready business-card designer lives at `/card` on the **dev server only** (gated exactly like `/poster`, never in `dist/`):

```
npm run dev        # then open:
# http://localhost:5173/card?style=linen
```

- **Styles**: Linen, Forest, Coast, Editorial and Sage, each with a matching front and back. Phone and email come from `src/data/site.js`.
- **Size**: 85 × 55 mm (Irish/EU standard), laid out in millimetres. Toggle a 3 mm bleed (on by default), crop marks, and on-screen trim/safe-area guides (guides are never exported).
- **Export PDF**: vector, true size, two pages (front, back) via the browser's print dialog → Save as PDF. Best for sending to a printer.
- **Export PNG**: front or back as a raster at 300 or 600 dpi (e.g. 2150 × 1441 px at 600 dpi with bleed).

## Still to do

- **Photos**: the Home hero arch, the Meet Niamh collage detail and the Physiotherapy "approach" photo use temporary stock images (`public/images/temp-*.webp`, marked `TEMP photo` in code) — swap in real photography of Niamh/the studio.
- **Testimonials**: the testimonials section on Home is a placeholder — replace with real quotes (with permission).
- **Accreditation logos**: the official CORU mark is in `public/coru-logo.png` and shown in the footer (linking to the CORU register). ISCP uses a logo (`public/iscp-logo-white.png`); the acupuncture professional body is still an unconfirmed placeholder on Meet Niamh — confirm which body applies (ACI / PRTCM / Irish Acupuncture Register / none) and add its mark once known.

## Hosting

`npm run build` and deploy `dist/` to Netlify, Cloudflare Pages or Vercel. Because it's a single-page app, add a rewrite so all routes serve `index.html` (Netlify: `/* /index.html 200` in `public/_redirects`).
