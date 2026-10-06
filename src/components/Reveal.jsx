import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reveal: fades + lifts children into view.
 * Usage: <Reveal delay={0.1}><h2>…</h2></Reveal>
 * gate=true (default): below-the-fold content, animates via whileInView (reveal-on-scroll).
 * gate=false: first-viewport content (hero/PageHero), animates on mount so it is never
 * blank before an IntersectionObserver fires.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  className,
  style,
  once = true,
  amount = 0.25,
  gate = true,
}) {
  const reduce = useReducedMotion();
  if (!gate) {
    // Mount-triggered, CSS-driven entrance (per design.md's motion rules): a plain class
    // toggle, not a JS/rAF-scheduled animation, so first-paint content never depends on a
    // timer or observer firing before it can become visible.
    const PlainTag = as;
    return (
      <PlainTag
        className={[className, reduce ? "" : "reveal-mount"].filter(Boolean).join(" ")}
        style={{ ...style, animationDelay: reduce ? undefined : `${delay}s` }}
      >
        {children}
      </PlainTag>
    );
  }
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px", amount }}
      transition={{ duration: 0.35, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Stagger: reveals each direct child in sequence.
 */
export function Stagger({ children, className, style, stagger = 0.08, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Item({ children, className, style, as = "div", ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} style={style} variants={item} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Lines: animates each line of a heading up from behind a mask.
 * Pass an array of strings / nodes, one per line.
 */
export function Lines({ lines, className, delay = 0, as = "h1", id }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h1;
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export { EASE };
