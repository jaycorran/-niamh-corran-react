// Paper-size model for the dev-only poster tool.
// All ISO A-series sheets share the ratio 1 : √2. Dimensions are the real
// portrait millimetre sizes; `dims()` swaps them for landscape and emits the
// token used by the print `@page { size: ... }` rule.

export const PAPER = {
  a2: { label: "A2", w: 420, h: 594 },
  a3: { label: "A3", w: 297, h: 420 },
  a4: { label: "A4", w: 210, h: 297 },
  a5: { label: "A5", w: 148, h: 210 },
  a6: { label: "A6", w: 105, h: 148 },
};

export const ORIENTATIONS = ["portrait", "landscape"];

export const DEFAULT_SIZE = "a4";
export const DEFAULT_ORIENTATION = "portrait";

/** long / short edge ratio (≈ √2) for a paper size. */
export function ratio(size) {
  const p = PAPER[size];
  return Math.max(p.w, p.h) / Math.min(p.w, p.h);
}

/** Normalise a size key to a valid one (falls back to the default). */
export function normalizeSize(size) {
  return size && Object.prototype.hasOwnProperty.call(PAPER, size) ? size : DEFAULT_SIZE;
}

/** Normalise an orientation to 'portrait' | 'landscape'. */
export function normalizeOrientation(o) {
  return ORIENTATIONS.includes(o) ? o : DEFAULT_ORIENTATION;
}

/**
 * Resolve real dimensions + the CSS `@page size` token for a size/orientation.
 * @returns {{ wmm:number, hmm:number, cssSize:string, label:string }}
 */
export function dims(size, orientation) {
  const key = normalizeSize(size);
  const o = normalizeOrientation(orientation);
  const p = PAPER[key];
  const portrait = o === "portrait";
  const wmm = portrait ? p.w : p.h;
  const hmm = portrait ? p.h : p.w;
  return { wmm, hmm, cssSize: `${p.label} ${o}`, label: p.label };
}
