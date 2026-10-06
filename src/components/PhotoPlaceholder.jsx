import { Camera } from "lucide-react";

/**
 * PhotoPlaceholder: a soft tinted panel with a centred lucide icon and a small
 * "Photo coming soon" caption, for any photo slot with no real image yet.
 *
 * Never renders bracketed internal text. Styling lives in index.css (`.photo-ph`).
 *
 * @param {"sage"|"peach"|"sky"|"blush"} [tint] background tint (default sage)
 * @param {string} [aspect] CSS aspect-ratio override (default 4 / 5)
 * @param {string} [caption] caption text (default "Photo coming soon")
 */
export function PhotoPlaceholder({ tint = "sage", aspect = "4 / 5", caption = "Photo coming soon", className = "" }) {
  return (
    <div
      className={["photo-ph", className].filter(Boolean).join(" ")}
      data-tint={tint}
      style={{ aspectRatio: aspect }}
    >
      <Camera size={34} strokeWidth={1.6} absoluteStrokeWidth aria-hidden="true" />
      <span>{caption}</span>
    </div>
  );
}
