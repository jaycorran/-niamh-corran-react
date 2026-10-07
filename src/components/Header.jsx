import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatCompactHours, nav, site } from "../data/site";
import { Button } from "./Button";
import { EASE } from "./Reveal";

function BrandMark({ inverse = false }) {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={inverse ? "/1A-reverse.svg" : "/1A-original.svg"} alt="" />
    </span>
  );
}

function Brand({ onClick, inverse = false }) {
  return (
    <Link to="/" className="brand" aria-label="Niamh Corran Physiotherapy and Acupuncture — home" onClick={onClick}>
      <BrandMark inverse={inverse} />
      <span className="brand-text">
        <span className="brand-name">{site.name}</span>
        <span className="brand-sub">{site.tagline}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const returnFocusRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    if (open) {
      returnFocusRef.current = document.activeElement;
      closeBtnRef.current?.focus();
      window.addEventListener("keydown", onKey);
    } else if (wasOpenRef.current) {
      returnFocusRef.current?.focus();
    }
    wasOpenRef.current = open;

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={["header", "quiet-header", scrolled ? "scrolled" : ""].join(" ")}>
        <div className="container header-inner">
          <Brand />

          <nav className="nav-desktop" aria-label="Primary">
            {nav
              .filter((item) => !item.cta)
              .map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                  {item.label}
                </NavLink>
              ))}
          </nav>

          <div className="header-right">
            <Button to="/booking" className="header-cta">
              Book<span className="header-cta-long"> a visit</span>
            </Button>
            <button
              ref={menuBtnRef}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              Menu
              <span className="bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={menuRef}
            className="menu-overlay quiet-menu"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
          >
            <div className="header-inner">
              <Brand inverse onClick={() => setOpen(false)} />
              <button ref={closeBtnRef} className="menu-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                Close
              </button>
            </div>

            <nav className="menu-links" aria-label="Menu">
              {[{ to: "/", label: "Home", num: "00" }, ...nav].map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.18 + index * 0.045, duration: reduceMotion ? 0 : 0.45, ease: EASE }}
                >
                  <Link to={item.to} onClick={() => setOpen(false)}>
                    <small>{item.num}</small>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="menu-meta"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0 : 0.4 }}
            >
              <div>
                {site.address.line1}, {site.address.line3}
              </div>
              <div>
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
              <div>{formatCompactHours()}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
