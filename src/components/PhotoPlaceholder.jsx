import { Camera } from "./Icons";

/** The one intentional frame used where commissioned photography is still pending. */
export function PhotoPlaceholder({ tint = "sage", aspect = "4 / 5", caption = "Photo coming soon", className = "" }) {
  return (
    <div
      className={["photo-ph", "photo-placeholder", className].filter(Boolean).join(" ")}
      data-tint={tint}
      style={{ aspectRatio: aspect }}
    >
      <Camera size={34} strokeWidth={1.6} aria-hidden="true" />
      <span>{caption}</span>
    </div>
  );
}
