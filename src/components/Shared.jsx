import { useEffect, useRef, useState } from "react";
import { Button, LinkArrow } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

/* ---------- Soft organic wave divider (design §2.6) ---------- */
export function Wave({ fill = "var(--cream)" }) {
  return (
    <svg className="wave-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 40C240 8 480 8 720 32C960 56 1200 72 1440 48L1440 80L0 80Z"
        fill={fill}
      />
    </svg>
  );
}

/* ---------- Scrolling marquee ---------- */
// Perceived scroll speed is held CONSTANT in px/s across every page (the track travels
// one group-width per cycle). The duration is derived from the measured width of a single
// marquee-group via a ResizeObserver, so a long track (e.g. Acupuncture) and a short one
// (Home) scroll at the same visual pace rather than a fixed 85s regardless of content.
const MARQUEE_SPEED = 34; // px per second

export function Marquee({ items, dark = false }) {
  const groupRef = useRef(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => {
      // The track is two groups wide and translates -50% (exactly one group) per cycle,
      // so the travelled distance equals one group's width.
      const width = el.getBoundingClientRect().width;
      if (width > 0) setDuration(width / MARQUEE_SPEED);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  const group = (ref) => (
    <div className="marquee-group" ref={ref}>
      {items.map((t, i) => {
        const isLabel = typeof t === "object" && t !== null && t.label;
        return (
          <span key={i} style={{ display: "contents" }}>
            {isLabel ? <span className="marquee-label">{t.label}</span> : <span>{t}</span>}
            <i />
          </span>
        );
      })}
    </div>
  );
  return (
    <div className={`marquee ${dark ? "dark" : ""}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {group(groupRef)}
        {group(null)}
      </div>
    </div>
  );
}

/* ---------- Sub-page hero ---------- */
export function PageHero({ title, lead, cta = true, aside, compact = false }) {
  return (
    <section className={`page-hero${compact ? " page-hero--compact" : ""}`}>
      <div className="container page-hero-inner">
        <Reveal gate={false}>
          <h1>{title}</h1>
        </Reveal>
        <Reveal gate={false} delay={0.18} className="page-hero-aside">
          {lead && <p className="lead">{lead}</p>}
          {aside}
          {cta && (
            <Button to="/booking" variant="ghost">
              Book an appointment
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Closing call to action ---------- */
export function CTA({ title, sub }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <Reveal>
          <h2 id="cta-title">{title}</h2>
        </Reveal>
        <Reveal delay={0.12} className="cta-aside">
          <p>{sub}</p>
          <div>
            <Button to="/booking" variant="coral">
              Book an appointment
            </Button>
          </div>
          <a className="phone" href={site.phoneHref}>
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Chapter label (sticky numbered sidebar) ---------- */
export function Chapter({ num, label, children, id }) {
  return (
    <div className="container chapter" id={id}>
      <div className="chapter-label">
        <span className="num" aria-hidden="true">
          {num}
        </span>
        <p className="eyebrow">{label}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export { LinkArrow };
