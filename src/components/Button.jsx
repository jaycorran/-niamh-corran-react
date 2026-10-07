import { Link } from "react-router-dom";
import { Arrow } from "./Icons";

/**
 * Quiet Room pill button.
 * variant: "primary" | "glass" | "ghost"
 * to -> internal Link, href -> external anchor, else <button>
 */
export function Button({ children, to, href, variant = "primary", block = false, type = "button", className = "", ...rest }) {
  const cls = ["btn", "button-system", variant || "primary", block ? "block" : "", className]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="icon btn-arrow">
        <Arrow size={14} />
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  return (
    <button type={type} className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function LinkArrow({ children, to, href, dir = "right", className = "", ...rest }) {
  const cls = ["link-arrow", "quiet-link", className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      <Arrow size={14} dir={dir} />
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}
