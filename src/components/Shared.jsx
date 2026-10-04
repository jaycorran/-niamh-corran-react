import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Button, LinkArrow } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

/* ---------- Ambient blurred background blobs (with gentle parallax) ---------- */
export function Ambient({ parallax = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 20 });
  const sy = useSpring(y, { stiffness: 40, damping: 20 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!parallax || reduce) return;
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 40);
      y.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax, reduce, x, y]);

  return (
    <div className="hero-bg" aria-hidden="true">
      <motion.div className="blob b1" style={{ x: sx, y: sy }} />
      <motion.div className="blob b2" style={{ x: sy, y: sx }} />
      <motion.div className="blob b3" style={{ x: sx, y: sy }} />
      <div className="grain" />
    </div>
  );
}

/* ---------- Scrolling marquee ---------- */
export function Marquee({ items, dark = false }) {
  const group = (
    <div className="marquee-group">
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
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}

/* ---------- Sub-page hero ---------- */
export function PageHero({ eyebrow, title, lead, cta = true, aside }) {
  return (
    <section className="page-hero">
      <Ambient />
      <div className="container page-hero-inner">
        <div>
          <Reveal>
            <p className="eyebrow on-dark">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>{title}</h1>
          </Reveal>
        </div>
        <Reveal delay={0.18} className="page-hero-aside">
          {lead && <p className="lead">{lead}</p>}
          {aside}
          {cta && (
            <Button to="/booking" variant="glass">
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
      <Ambient parallax={false} />
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

/* ---------- Custom cursor dot ---------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      setBig(!!(t && t.closest && t.closest("a, button, [role=button], input, select, textarea, label")));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return <motion.div className="cursor" style={{ x: sx, y: sy, scale: big ? 3 : 1 }} aria-hidden="true" />;
}

/* ---------- Preloader ---------- */
export function Preloader({ onDone }) {
  const [show, setShow] = useState(true);
  const done = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      if (!done.current) {
        done.current = true;
        onDone?.();
      }
    }, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!show) return null;
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="word">
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Niamh Corran
        </motion.span>
      </div>
    </motion.div>
  );
}

export { LinkArrow };
