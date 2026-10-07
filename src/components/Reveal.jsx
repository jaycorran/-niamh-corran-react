import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * gate=false is a CSS mount entrance for first-viewport content.
 * gate=true is a one-shot, reduced-motion-safe reveal for below-fold content.
 */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  as = "div",
  className,
  style,
  once = true,
  amount = 0.15,
  gate = true,
}) {
  const reduce = useReducedMotion();
  if (!gate) {
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
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}

/** Legacy stagger helper retained for pages awaiting recomposition. */
export function Stagger({ children, className, style, stagger = 0.08, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
    >
      {children}
    </Tag>
  );
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function Item({ children, className, style, as = "div", ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} style={style} variants={item} {...rest}>
      {children}
    </Tag>
  );
}

/** Legacy line entrance retained for the current home page. */
export function Lines({ lines, className, delay = 0, as = "h1", id }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h1;
  return (
    <Tag className={className} id={id}>
      {lines.map((line, index) => (
        <span className="line" key={index}>
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : delay + index * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export { EASE };
