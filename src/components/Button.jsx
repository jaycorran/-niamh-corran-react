import { Link } from "react-router-dom";
import { Arrow } from "./Icons";

/**
 * Button: pill button with hover fill + rotating arrow.
 * variant: "" | "coral" | "glass" | "ghost"
 * to -> internal Link, href -> external anchor, else <button>
 */
export function Button({ children, to, href, variant = "", block = false, type = "button", className = "", ...rest }) {
  const cls = ["btn", variant, block ? "block" : "", className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      <span className="icon">
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

export function LinkArrow({ children, to, href, dir = "right", ...rest }) {
  const inner = (
    <>
      {children}
      <Arrow size={14} dir={dir} />
    </>
  );
  if (to)
    return (
      <Link to={to} className="link-arrow" {...rest}>
        {inner}
      </Link>
    );
  return (
    <a href={href} className="link-arrow" {...rest}>
      {inner}
    </a>
  );
}
