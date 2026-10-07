/* Small inline icon set — dependency-free stroke icons that inherit currentColor. */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function StrokeIcon({ size, viewBox = "0 0 24 24", strokeWidth, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      aria-hidden="true"
      {...base}
      strokeWidth={strokeWidth ?? base.strokeWidth}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Arrow({ size = 16, dir = "right", ...rest }) {
  const rot = { right: 0, down: 90, left: 180, up: -90, upright: -45 }[dir] ?? 0;
  return (
    <StrokeIcon size={size} style={{ transform: `rotate(${rot}deg)` }} {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </StrokeIcon>
  );
}

export function Check({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} strokeWidth={2} {...rest}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </StrokeIcon>
  );
}

export function Star({ size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...rest}>
      <path d="M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.5l-6 3.3 1.4-6.7-5-4.6 6.7-.8z" />
    </svg>
  );
}

export function Pin({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </StrokeIcon>
  );
}

export function Phone({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </StrokeIcon>
  );
}

export function Mail({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </StrokeIcon>
  );
}

export function Clock({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </StrokeIcon>
  );
}

export function Calendar({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </StrokeIcon>
  );
}

export function Shield({ size = 18, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2.3 2.3L15.5 10" />
    </StrokeIcon>
  );
}

export function Camera({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} {...rest}>
      <path d="M5 7h3l1.5-2h5L16 7h3a2 2 0 0 1 2 2v9H3V9a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </StrokeIcon>
  );
}

export function Leaf({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M12 37c0-15 13-23 25-25-2 13-11 25-25 25Z" />
      <path d="M19 31c6-4 11-9 13-15" />
    </StrokeIcon>
  );
}

export function Moon({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M31 25a10 10 0 1 1-9-11 8 8 0 0 0 9 11Z" />
      <path d="M33 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" />
    </StrokeIcon>
  );
}

export function Flower({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M24 7c4 4 4 11 0 15-4-4-4-11 0-15Z" />
      <path d="M24 41c4-4 4-11 0-15-4 4-4 11 0 15Z" />
      <path d="M7 24c4-4 11-4 15 0-4 4-11 4-15 0Z" />
      <path d="M41 24c-4-4-11-4-15 0 4 4 11 4 15 0Z" />
      <circle cx="24" cy="24" r="3" />
    </StrokeIcon>
  );
}

export function Body({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <circle cx="24" cy="11" r="4.5" />
      <path d="M14 35c0-7 4-12 10-12s10 5 10 12" />
      <circle cx="20" cy="27" r="1" fill="currentColor" />
      <circle cx="24" cy="25" r="1" fill="currentColor" />
      <circle cx="28" cy="27" r="1" fill="currentColor" />
    </StrokeIcon>
  );
}

export function Lotus({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M24 8c3 6 3 11 0 15-3-4-3-9 0-15Z" />
      <path d="M11 21c7 1 10 4 11 10-7 1-11-3-11-10Z" />
      <path d="M37 21c-7 1-10 4-11 10 7 1 11-3 11-10Z" />
      <path d="M8 31c9 6 23 6 32 0" />
    </StrokeIcon>
  );
}

export function Spine({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M24 6v36" />
      <rect x="18" y="10" width="12" height="5" rx="2.5" />
      <rect x="18" y="19" width="12" height="5" rx="2.5" />
      <rect x="18" y="28" width="12" height="5" rx="2.5" />
    </StrokeIcon>
  );
}

export function Joint({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M8 14c8-2 12 4 14 10s6 12 18 10" />
      <circle cx="22" cy="24" r="5" />
    </StrokeIcon>
  );
}

export function Pulse({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M6 24h8l4-10 6 20 5-14 3 4h10" />
    </StrokeIcon>
  );
}

export function Cane({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M18 40V16a7 7 0 0 1 14 0" />
      <path d="M12 40h12" />
    </StrokeIcon>
  );
}

export function Scalpel({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M8 40l20-20" />
      <path d="M28 20l8-12 4 4-12 8z" />
      <path d="M14 34l4 4" />
    </StrokeIcon>
  );
}

export function Brain({ size = 24, ...rest }) {
  return (
    <StrokeIcon size={size} viewBox="0 0 48 48" strokeWidth={1.8} {...rest}>
      <path d="M20 10a6 6 0 0 0-6 6 6 6 0 0 0-4 10 6 6 0 0 0 6 8h4V10z" />
      <path d="M28 10a6 6 0 0 1 6 6 6 6 0 0 1 4 10 6 6 0 0 1-6 8h-4V10z" />
      <path d="M24 10v24" />
    </StrokeIcon>
  );
}
