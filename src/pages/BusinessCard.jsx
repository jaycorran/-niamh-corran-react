// =====================================================================
// Internal business-card designer — DEV SERVER ONLY.
// Gated behind import.meta.env.DEV in App.jsx via a lazy import (same as
// /poster), so this file, its CSS and its image never reach dist/.
//
// Everything on the card is sized in millimetres, so the PDF export prints
// at true size (85 × 55 mm, the Irish/EU standard) and the PNG export is a
// pixel-exact raster at the chosen DPI.
// =====================================================================
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toPng } from "html-to-image";
import { Phone, Mail, MapPin, Download, Printer } from "lucide-react";
import { site } from "../data/site.js";
// Poster/card typefaces (SIL OFL 1.1), self-hosted via @fontsource.
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import coastUrl from "./poster-assets/poster-background-coast.jpg";
import "./BusinessCard.css";

// ---------------------------------------------------------------------
// Card geometry (mm)
// ---------------------------------------------------------------------
const TRIM_W = 85;
const TRIM_H = 55;
const BLEED = 3; // printers' standard bleed
const SLUG = 6; // white margin that carries the crop marks
const MARK_GAP = 1; // crop marks stop this far short of the bleed edge

// ---------------------------------------------------------------------
// Card copy — real details from src/data/site.js, no invented claims.
// ---------------------------------------------------------------------
const ROLE = "Chartered Physiotherapist";
const CREDS = ["CORU registered", "ISCP chartered member"];
const AREA = `${site.locations.map((l) => l.name).join(" & ")}, Co. Cork`;

const STYLES = [
  { id: "linen", label: "Linen", front: "#faf7f2", back: "#243a30" },
  { id: "forest", label: "Forest", front: "#243a30", back: "#faf7f2" },
  { id: "coast", label: "Coast", front: "#9db7c9", back: "#faf7f2" },
  { id: "editorial", label: "Editorial", front: "#faf7f2", back: "#f3ede3" },
  { id: "sage", label: "Sage", front: "#e4ede4", back: "#243a30" },
];
const STYLE_IDS = STYLES.map((s) => s.id);
const DPI_OPTIONS = [300, 600];

// Logo colours per style + side, as [main, accent]. Set as SVG fill attributes
// (not CSS vars) so the PNG export, which inlines computed styles, keeps them.
const LIGHT = ["#2f4a3c", "#6f8f7c"];
const DARK = ["#f3f0ea", "#a9d4bf"];
const MARK_FILLS = {
  linen: { front: LIGHT, back: DARK },
  forest: { front: DARK, back: LIGHT },
  coast: { front: LIGHT, back: LIGHT },
  editorial: { front: LIGHT, back: LIGHT },
  sage: { front: LIGHT, back: DARK },
};
const WATERMARK = ["rgba(47, 74, 60, 0.09)", "rgba(47, 74, 60, 0.14)"];

/** Brand mark (paths from public/1A-original.svg). */
function Mark({ className = "", fills = LIGHT }) {
  const [main, accent] = fills;
  return (
    <svg className={`bc-mark ${className}`} viewBox="0 0 191 185" aria-hidden="true">
      <path
        className="bc-mark__main"
        fill={main}
        d="M69 181.1C97.8 187.7 123.9 159.5 113.1 130.4C111.6 126.3 109.1 122.5 106.1 119.3C95.6 108.1 85.1 109.1 72.9 102.5C69.6 100.7 66.8 98.2 64 95.7C61.5 93.3 58.9 90.7 56.9 87.8C49.2 76.4 46.6 60 50.4 46.7C54.8 31.4 63.5 21 77.1 13.1C82.4 10 87.8 7.6 93.8 6.4C100.4 5 106.8 4.6 113.5 5C114.7 5 120.1 5.9 120.7 5.2C120.2 3.5 105.6 2.3 103.2 2.1C84.1 0.9 64.5 6.3 48.4 16.5C26.2 30.4 9.8 52.3 4.5 78.1C-4.7 122.2 24.6 171 69 181.1Z"
      />
      <circle className="bc-mark__accent" fill={accent} cx="127.8" cy="47.7" r="16.9" />
      <path
        className="bc-mark__accent"
        fill={accent}
        d="M152.5 20.3C152.4 20.7 152.4 20.9 152.5 21.3C154 25.1 156 26.6 157.4 32C159.4 40.1 158.5 47.9 154.7 55.3C146.1 72.4 120.7 79.2 103 76.8C97.4 76.1 91.9 74.2 86.6 72.4C85.5 72 81.9 70.1 81.1 70.7C81.1 72.1 83.9 73.5 85 74.2C89.5 77.4 94.6 79.5 99.6 81.8C103.1 83.5 106.9 84.7 110.5 86.2C124.2 92.1 136.6 99.6 142.4 114.1C149.6 131.9 144.8 152.7 133.2 167.5C130.1 171.5 126 175 122 178.2C121.1 178.9 117.6 180.8 117.5 181.9C118.3 182.6 127.3 179.6 128.7 179C140.2 174.7 150.9 168.4 159.9 160.1C188.9 133.5 197 90 180.5 54.5C175.4 43.6 169.3 35.6 161 27.1C159.8 25.9 153.9 19.8 152.5 20.3Z"
      />
    </svg>
  );
}

/** Trim line + safe area, shown in the preview only (never printed/exported). */
function Guides() {
  return (
    <>
      <span className="bc-guide bc-guide--trim" data-guide="" aria-hidden="true" />
      <span className="bc-guide bc-guide--safe" data-guide="" aria-hidden="true" />
    </>
  );
}

function Front({ styleId, guides }) {
  return (
    <div className={`bc bc--${styleId} bc--front`}>
      {styleId === "coast" && (
        <>
          <img className="bc__photo" src={coastUrl} alt="" />
          <span className="bc__wash" aria-hidden="true" />
        </>
      )}
      {styleId === "sage" && <Mark className="bc__watermark" fills={WATERMARK} />}
      <div className="bc__safe">
        <Mark className="bc__logo" fills={MARK_FILLS[styleId].front} />
        <div className="bc__lockup">
          <p className="bc__name">{site.name}</p>
          <p className="bc__tag">
            {styleId === "editorial" ? (
              <>
                <em>Physiotherapy</em> &amp; <em>Acupuncture</em>
              </>
            ) : (
              site.tagline
            )}
          </p>
        </div>
      </div>
      {guides && <Guides />}
    </div>
  );
}

function Back({ styleId, guides }) {
  return (
    <div className={`bc bc--${styleId} bc--back`}>
      {styleId === "coast" && <img className="bc__strip" src={coastUrl} alt="" />}
      <div className="bc__safe">
        <Mark className="bc__logo" fills={MARK_FILLS[styleId].back} />
        <div className="bc__who">
          <p className="bc__name">{site.name}</p>
          <p className="bc__role">{ROLE}</p>
          <p className="bc__creds">
            <span>{CREDS[0]}</span>
            <span className="bc__dot"> · </span>
            <span>{CREDS[1]}</span>
          </p>
        </div>
        <ul className="bc__contact">
          <li>
            <Phone aria-hidden="true" strokeWidth={1.8} />
            <span>{site.phone}</span>
          </li>
          <li>
            <Mail aria-hidden="true" strokeWidth={1.8} />
            <span>{site.email}</span>
          </li>
          <li>
            <MapPin aria-hidden="true" strokeWidth={1.8} />
            <span>{AREA}</span>
          </li>
        </ul>
      </div>
      {guides && <Guides />}
    </div>
  );
}

/** One printed page: optional slug with crop marks around the (bleed) card. */
function Sheet({ children, marks, sheetRef }) {
  return (
    <div className={`bc-sheet${marks ? " bc-sheet--marks" : ""}`} ref={sheetRef}>
      {marks && (
        <span className="bc-crops" aria-hidden="true">
          {["tl", "tr", "bl", "br"].map((c) => (
            <span key={c} className={`bc-crop bc-crop--${c}`}>
              <i className="bc-crop__h" />
              <i className="bc-crop__v" />
            </span>
          ))}
        </span>
      )}
      {children}
    </div>
  );
}

export default function BusinessCard() {
  const [params, setParams] = useSearchParams();
  const styleId = STYLE_IDS.includes(params.get("style")) ? params.get("style") : "linen";
  const bleed = params.get("bleed") !== "0";
  const marks = bleed && params.get("marks") === "1";
  const guides = params.get("guides") !== "0";
  const dpi = DPI_OPTIONS.includes(Number(params.get("dpi"))) ? Number(params.get("dpi")) : 600;
  const [busy, setBusy] = useState("");
  const [fit, setFit] = useState({ k: 2, stacked: false });
  const stageRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const b = bleed ? BLEED : 0;
  const s = marks ? SLUG : 0;
  const cardW = TRIM_W + 2 * b;
  const cardH = TRIM_H + 2 * b;
  const sheetW = cardW + 2 * s;
  const sheetH = cardH + 2 * s;

  const update = (next) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => p.set(k, v));
    setParams(p, { replace: true });
  };

  // Print exactly one sheet per page, at true size.
  useEffect(() => {
    const el = document.createElement("style");
    el.setAttribute("data-card-page", "");
    el.textContent = `@page { size: ${sheetW}mm ${sheetH}mm; margin: 0 }`;
    document.head.appendChild(el);
    const prevTitle = document.title;
    document.title = `niamh-corran-business-card-${styleId}`;
    return () => {
      el.remove();
      document.title = prevTitle;
    };
  }, [sheetW, sheetH, styleId]);

  // Fit both sides into the stage: pick side-by-side or stacked, whichever
  // gives the larger preview zoom (preview only — print/PNG are true size).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const PX_PER_MM = 96 / 25.4;
    const PAD = 48; // stage padding (both sides)
    const GAP = 40; // gap between the two sides
    const CHROME = 70; // captions + meta line
    const measure = () => {
      const w = el.clientWidth - PAD;
      const h = el.clientHeight - PAD - CHROME;
      const sw = sheetW * PX_PER_MM;
      const sh = sheetH * PX_PER_MM;
      const side = Math.min((w - GAP) / (2 * sw), h / sh);
      const stack = Math.min(w / sw, (h - GAP - 30) / (2 * sh));
      const stacked = stack > side;
      const k = Math.max(0.5, Math.min(3, stacked ? stack : side));
      setFit({ k: Math.floor(k * 100) / 100, stacked });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sheetW, sheetH]);

  const exportPng = async (side) => {
    const node = side === "front" ? frontRef.current : backRef.current;
    if (!node) return;
    setBusy(side);
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(node, {
        // CSS px are 96 per inch, so this yields exactly `dpi` pixels per inch.
        pixelRatio: dpi / 96,
        cacheBust: true,
        // The sheet is scaled for on-screen preview; export it at true size.
        style: { transform: "none" },
        filter: (n) => !(n instanceof HTMLElement && "guide" in n.dataset),
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `niamh-corran-card-${styleId}-${side}-${dpi}dpi${bleed ? "-bleed" : ""}${marks ? "-marks" : ""}.png`;
      a.click();
    } finally {
      setBusy("");
    }
  };

  const vars = {
    "--trim-w": `${TRIM_W}mm`,
    "--trim-h": `${TRIM_H}mm`,
    "--bleed": `${b}mm`,
    "--slug": `${s}mm`,
    "--mark-gap": `${MARK_GAP}mm`,
    "--card-w": `${cardW}mm`,
    "--card-h": `${cardH}mm`,
    "--sheet-w": `${sheetW}mm`,
    "--sheet-h": `${sheetH}mm`,
    "--k": fit.k,
  };

  const pxW = Math.round((sheetW / 25.4) * dpi);
  const pxH = Math.round((sheetH / 25.4) * dpi);

  return (
    <div className="card-root" style={vars}>
      <div className="card-toolbar" role="toolbar" aria-label="Business card options">
        <span className="card-toolbar__brand">Business card</span>

        <div className="card-styles" role="radiogroup" aria-label="Style">
          {STYLES.map((st) => (
            <button
              key={st.id}
              type="button"
              role="radio"
              aria-checked={st.id === styleId}
              className={st.id === styleId ? "is-active" : ""}
              onClick={() => update({ style: st.id })}
            >
              <span
                className="card-swatch"
                style={{ background: `linear-gradient(135deg, ${st.front} 50%, ${st.back} 50%)` }}
                aria-hidden="true"
              />
              {st.label}
            </button>
          ))}
        </div>

        <label className="card-check">
          <input
            type="checkbox"
            checked={bleed}
            onChange={(e) => update({ bleed: e.target.checked ? "1" : "0" })}
          />
          3 mm bleed
        </label>
        <label className={`card-check${bleed ? "" : " is-disabled"}`}>
          <input
            type="checkbox"
            checked={marks}
            disabled={!bleed}
            onChange={(e) => update({ marks: e.target.checked ? "1" : "0" })}
          />
          Crop marks
        </label>
        <label className="card-check">
          <input
            type="checkbox"
            checked={guides}
            onChange={(e) => update({ guides: e.target.checked ? "1" : "0" })}
          />
          Guides
        </label>

        <div className="card-toolbar__export">
          <label>
            PNG
            <select
              value={dpi}
              onChange={(e) => update({ dpi: e.target.value })}
              aria-label="PNG resolution"
            >
              {DPI_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d} dpi
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => exportPng("front")} disabled={!!busy}>
            <Download aria-hidden="true" />
            {busy === "front" ? "Rendering…" : "Front"}
          </button>
          <button type="button" onClick={() => exportPng("back")} disabled={!!busy}>
            <Download aria-hidden="true" />
            {busy === "back" ? "Rendering…" : "Back"}
          </button>
          <button type="button" className="card-print" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            Export PDF
          </button>
        </div>
      </div>

      <div className={`card-stage${fit.stacked ? " is-stacked" : ""}`} ref={stageRef}>
        <figure className="card-side">
          <div className="card-slot">
            <Sheet marks={marks} sheetRef={frontRef}>
              <Front styleId={styleId} guides={guides} />
            </Sheet>
          </div>
          <figcaption>Front</figcaption>
        </figure>
        <figure className="card-side">
          <div className="card-slot">
            <Sheet marks={marks} sheetRef={backRef}>
              <Back styleId={styleId} guides={guides} />
            </Sheet>
          </div>
          <figcaption>Back</figcaption>
        </figure>
        <p className="card-meta">
          Trim {TRIM_W} × {TRIM_H} mm
          {bleed ? ` · bleed ${BLEED} mm (sheet ${sheetW} × ${sheetH} mm)` : " · no bleed"}
          {` · PNG ${pxW} × ${pxH} px @ ${dpi} dpi`} · PDF is vector, 2 pages (front, back)
        </p>
      </div>
    </div>
  );
}
