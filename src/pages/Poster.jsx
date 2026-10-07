// =====================================================================
// Internal poster designer — DEV SERVER ONLY.
// Gated behind import.meta.env.DEV in App.jsx via a lazy import, so this
// file and its CSS/asset references are tree-shaken out of `npm run build`
// and never reach dist/. See README "Internal poster tool (dev only)".
// =====================================================================
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { site } from "../data/site.js";
import {
  PAPER,
  ORIENTATIONS,
  DEFAULT_SIZE,
  DEFAULT_ORIENTATION,
  normalizeSize,
  normalizeOrientation,
  ratio,
  dims,
} from "./posterSizes.js";
import { Mail, Phone, Pin as MapPin } from "../components/Icons";
// Poster-only Google fonts (SIL OFL 1.1), self-hosted via @fontsource.
// Imported here so they ship only with this dev-only page.
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "./Poster.css";

// ---------------------------------------------------------------------
// Dev-only assets, served by Vite from /Users/ijakubo/Desktop/Danio via
// server.fs.allow + /@fs/. These URLs resolve ONLY on the dev server and
// are never bundled. Kept as top-level consts so the build check can grep.
// ---------------------------------------------------------------------
const BG = "/@fs/Users/ijakubo/Desktop/Danio/BG.jpg";
const EWE = "/@fs/Users/ijakubo/Desktop/Danio/EweTrans.png";

// ---------------------------------------------------------------------
// Editable poster copy. Seeded from the Theme reference + src/data/site.js.
// Change these consts to re-word the poster.
// ---------------------------------------------------------------------
const HEADLINE_LEAD = "Get back";
const HEADLINE_PLAIN = "to what"; // sits before the italic emphasis
const HEADLINE_EM = "you love."; // coral italic emphasis
const CONTACT_LEAD = "Call or email to book";
const CREDS = "CORU registered\nISCP chartered physiotherapist";

// Native aspect ratio of EweTrans.png (4723 × 7085) — keeps the figure box
// proportioned to the image.
const FIGURE_AR = 4723 / 7085;

export default function Poster() {
  const [params, setParams] = useSearchParams();
  const size = normalizeSize(params.get("size") || DEFAULT_SIZE);
  const orientation = normalizeOrientation(params.get("o") || DEFAULT_ORIENTATION);
  const d = dims(size, orientation);

  // Aspect ratio of the sheet in the current orientation (w / h).
  const sheetAR = d.wmm / d.hmm;

  // Dynamic @page rule so the browser prints at the real paper size.
  useEffect(() => {
    const el = document.createElement("style");
    el.setAttribute("data-poster-page", "");
    el.textContent = `@page { size: ${d.cssSize}; margin: 0 }`;
    document.head.appendChild(el);
    return () => el.remove();
  }, [d.cssSize]);

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => p.set(k, v));
    setParams(p, { replace: true });
  };

  return (
    <div className="poster-root">
      {/* Non-printed toolbar */}
      <div className="poster-toolbar" role="toolbar" aria-label="Poster options">
        <span className="poster-toolbar__brand">Poster designer</span>
        <label>
          Size
          <select
            value={size}
            onChange={(e) => update({ size: e.target.value })}
            aria-label="Paper size"
          >
            {Object.entries(PAPER).map(([key, p]) => (
              <option key={key} value={key}>
                {p.label} — {p.w}×{p.h} mm
              </option>
            ))}
          </select>
        </label>
        <div className="poster-seg" role="group" aria-label="Orientation">
          {ORIENTATIONS.map((o) => (
            <button
              key={o}
              type="button"
              className={o === orientation ? "is-active" : ""}
              onClick={() => update({ o })}
            >
              {o[0].toUpperCase() + o.slice(1)}
            </button>
          ))}
        </div>
        <span className="poster-toolbar__meta">
          {d.label} {orientation} · {d.wmm}×{d.hmm} mm · ratio √2 ≈ {ratio(size).toFixed(3)}
        </span>
        <button type="button" className="poster-print" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>

      {/* Stage scales the poster to fit the viewport, preserving exact ratio. */}
      <div className="poster-stage">
        <div
          className={`poster poster--${orientation}`}
          style={{ aspectRatio: `${d.wmm} / ${d.hmm}` }}
          data-size={size}
          data-orientation={orientation}
        >
          {/* Full-bleed background */}
          <img className="poster__bg" src={BG} alt="" aria-hidden="true" />
          <div className="poster__scrim" aria-hidden="true" />

          {/* Figure */}
          <div
            className="poster__figure"
            style={{ "--figure-ar": FIGURE_AR, "--sheet-ar": sheetAR }}
          >
            <img className="poster__ewe" src={EWE} alt="Person easing neck and lower-back tension" />
          </div>

          {/* Content block */}
          <div className="poster__content">
            <header className="poster__brand">
              <img className="poster__logo" src="/1A-original.svg" alt="" aria-hidden="true" />
              <div className="poster__wordmark">
                <span className="poster__name">{site.name}</span>
                <span className="poster__tag">
                  {site.tagline.toUpperCase().replace(" & ", "\n& ")}
                </span>
              </div>
            </header>

            <h1 className="poster__headline">
              <span className="poster__hl-line">{HEADLINE_LEAD}</span>{" "}
              <span className="poster__hl-line">{HEADLINE_PLAIN}</span>{" "}
              <em>{HEADLINE_EM}</em>
            </h1>
            <span className="poster__rule" aria-hidden="true" />

            <p className="poster__creds">{CREDS}</p>
          </div>

          {/* Footer band: phone, email and clinic addresses (print contact). */}
          <div className="poster__footer">
            <div className="poster__reach">
              <p className="poster__contact-lead">{CONTACT_LEAD}</p>
              <p className="poster__phone">
                <Phone aria-hidden="true" strokeWidth={1.6} />
                <span>{site.phone}</span>
              </p>
              <p className="poster__email">
                <Mail aria-hidden="true" strokeWidth={1.6} />
                <span>{site.email}</span>
              </p>
            </div>
            <div className="poster__addresses">
              {site.locations.map((l) => (
                <address key={l.name} className="poster__address">
                  <strong>
                    <MapPin aria-hidden="true" strokeWidth={1.6} />
                    {l.name}
                  </strong>
                  {[l.line1, l.line2, l.line3, l.line4].map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
