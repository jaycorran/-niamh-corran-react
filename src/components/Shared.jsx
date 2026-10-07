import { useEffect, useRef, useState } from "react";
import { Button, LinkArrow } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

const RIVER_SPEED = 18;

/** Editorial page opening: margin note, eyebrow, serif title, lead and action. */
export function TypographicPageHero({ marginNote, eyebrow, title, lead, cta = true, aside, className = "" }) {
  const action = cta === true ? <Button to="/booking">Book an appointment</Button> : cta;
  return (
    <section className={["page-hero", "typographic-page-hero", className].filter(Boolean).join(" ")}>
      <div className="container page-hero-inner typographic-page-hero-inner">
        {marginNote && (
          <Reveal gate={false} className="margin-note hero-margin-note">
            {marginNote}
          </Reveal>
        )}
        <div className="typographic-page-hero-copy">
          {eyebrow && (
            <Reveal gate={false}>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal gate={false} delay={0.08}>
            <h1>{title}</h1>
          </Reveal>
        </div>
        <Reveal gate={false} delay={0.16} className="page-hero-aside typographic-page-hero-aside">
          {lead && <p className="lead">{lead}</p>}
          {aside}
          {action}
        </Reveal>
      </div>
    </section>
  );
}

/** Twelve-column section with a dedicated left annotation column on wide screens. */
export function MarginNoteSection({ note, eyebrow, children, id, className = "", as = "div" }) {
  const Tag = as;
  return (
    <Tag id={id} className={["container", "margin-note-section", className].filter(Boolean).join(" ")}>
      <div className="margin-note-section-label">
        {note && <span className="margin-note">{note}</span>}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      </div>
      <div className="margin-note-section-content">{children}</div>
    </Tag>
  );
}

/** A real photograph presented as a quiet, matted window. */
export function PhotoWindow({
  src,
  srcSet,
  sizes,
  alt,
  aspect = "4 / 3",
  caption,
  className = "",
  imageClassName = "",
  loading = "lazy",
  objectPosition,
}) {
  return (
    <figure className={["photo-window", className].filter(Boolean).join(" ")} style={{ "--photo-aspect": aspect }}>
      <div className="photo-window-mat">
        <img
          className={imageClassName}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={loading}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A single rule and generous air, replacing decorative section dividers. */
export function HorizonRule({ className = "" }) {
  return <div className={["container", "horizon-rule", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}

/** Decorative, measured conditions drift. Full lists remain available in page content. */
export function QuietRiver({ items, dark = false, className = "" }) {
  const groupRef = useRef(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const element = groupRef.current;
    if (!element) return undefined;
    const measure = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) setDuration(width / RIVER_SPEED);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [items]);

  const renderGroup = (ref, duplicate = false) => (
    <div className="quiet-river-group marquee-group" ref={ref}>
      {items.map((item, index) => {
        const isLabel = typeof item === "object" && item !== null && item.label;
        const value = isLabel ? item.label : item;
        return (
          <span className="quiet-river-item" key={`${duplicate ? "duplicate" : "source"}-${value}-${index}`}>
            {isLabel ? <span className="marquee-label">{item.label}</span> : <span>{item}</span>}
            <i aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div className={["marquee", "quiet-river", dark ? "dark" : "", className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="marquee-track quiet-river-track" style={duration ? { animationDuration: `${duration}s` } : undefined}>
        {renderGroup(groupRef)}
        {renderGroup(null, true)}
      </div>
    </div>
  );
}

/** Full-bleed forest invitation used to close service and marketing pages. */
export function ClosingRoom({ title, sub, children, cta = true, showPhone = true, className = "" }) {
  const action = cta === true ? <Button to="/booking">Book an appointment</Button> : cta;
  return (
    <section className={["cta", "closing-room", className].filter(Boolean).join(" ")}>
      <div className="container cta-inner closing-room-inner">
        <Reveal>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="cta-aside closing-room-aside">
          {sub && <p>{sub}</p>}
          {children}
          {action && <div>{action}</div>}
          {showPhone && (
            <a className="phone" href={site.phoneHref}>
              {site.phone}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Long-form paper layout with an optional sticky margin table of contents. */
export function DocumentLayout({ children, toc = [], tocLabel = "On this page", className = "" }) {
  return (
    <div className={["container", "document-layout", className].filter(Boolean).join(" ")}>
      {toc.length > 0 && (
        <nav className="document-toc" aria-label={tocLabel}>
          <p className="eyebrow">{tocLabel}</p>
          <ul>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <article className="document-prose">{children}</article>
    </div>
  );
}

export { LinkArrow };
