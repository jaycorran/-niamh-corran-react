// Small, pure helpers for per-route SEO: a schema.org/MedicalBusiness JSON-LD payload built
// entirely from src/data/site.js (no invented facts) and a document-head updater used by
// App.jsx's Page() wrapper to set the <title>, <meta name="description"> and the JSON-LD
// <script> tag on every route change.

/** Builds a schema.org/MedicalBusiness JSON-LD object from site.js. */
export function buildJsonLd(site) {
  const prices = site.fees.map((f) => f.price);
  const priceRange = prices.length ? `€${Math.min(...prices)}–€${Math.max(...prices)}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    telephone: site.phone,
    email: site.email,
    priceRange,
    address: site.locations.map((loc) => ({
      "@type": "PostalAddress",
      name: loc.name,
      streetAddress: `${loc.line1}, ${loc.line2}`,
      addressLocality: loc.line3,
      postalCode: loc.line4,
      addressCountry: "IE",
    })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
  };
}

const META_DESCRIPTION_ID = "meta-description";
const JSON_LD_ID = "jsonld-medicalbusiness";

/** Sets/updates the document title, meta description and JSON-LD script for the current route. */
export function setPageSeo({ title, description, jsonLd }) {
  document.title = title;

  let meta = document.getElementById(META_DESCRIPTION_ID);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.id = META_DESCRIPTION_ID;
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description || "");

  let script = document.getElementById(JSON_LD_ID);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSON_LD_ID;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}
