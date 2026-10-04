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
- react-router-dom 7 (routes: `/`, `/physiotherapy`, `/acupuncture`, `/meet-niamh`, `/fees`, `/booking`)
- framer-motion 13 (scroll reveals, page transitions, menu, FAQ accordion)
- lenis (smooth scrolling; disabled automatically for users who prefer reduced motion)

## Design

Palette — "Kinsale tide" — is defined once in `src/index.css` under `:root`:

- Ink `#0b1f27` · Lagoon `#12303b` · Pearl `#f7f4ee` · Sea-glass `#9fe1cb` · Coral `#ff7a59`

Fonts (Google Fonts): Fraunces (headings) and Manrope (body).

## Where things live

- `src/data/site.js` — single source of truth for phone, email, address, hours, fees, insurers, credentials and the nav. Edit here and every page updates.
- `src/components/` — Header (full-screen menu, live Kinsale clock), Footer, Button, Reveal (animation helpers), Shared (hero backgrounds, marquee, page hero, CTA, cursor, preloader), Icons.
- `src/pages/` — one file per page.

## Still to do

- **Contact form**: validates and shows a success state, but the send is simulated (see `onSubmit` in `src/pages/Booking.jsx`). Point it at Formspree, Netlify Forms or your own endpoint.
- **Photos**: the `.portrait` blocks on Home and Meet Niamh are placeholders — swap for an `<img>` of Niamh/the studio.
- **Testimonials**: sample quotes in `src/pages/Home.jsx` — replace with real ones (with permission).
- **Accreditation logos**: the official CORU mark is in `public/coru-logo.png` and shown in the footer (linking to the CORU register). ISCP / AcSI still use text badges; drop their official marks in `public/` and replace the remaining `.accred` spans, in line with their usage guidelines.

## Hosting

`npm run build` and deploy `dist/` to Netlify, Cloudflare Pages or Vercel. Because it's a single-page app, add a rewrite so all routes serve `index.html` (Netlify: `/* /index.html 200` in `public/_redirects`).
