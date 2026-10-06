import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "../data/site";
import { Button } from "./Button";
import { EASE } from "./Reveal";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src="/1A-original.svg" alt="" />
    </span>
  );
}

function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" aria-label="Niamh Corran Physiotherapy and Acupuncture — home" onClick={onClick}>
      <BrandMark />
      <span className="brand-text">
        <span className="brand-name">{site.name}</span>
        <span className="brand-sub">{site.tagline}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    if (open) {
      closeBtnRef.current?.focus();
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={["header", scrolled ? "scrolled" : ""].join(" ")}>
        <div className="container header-inner">
          <Brand />

          <nav className="nav-desktop" aria-label="Primary">
            {nav
              .filter((n) => !n.cta)
              .map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "active" : "")}>
                  {n.label}
                </NavLink>
              ))}
          </nav>

          <div className="header-right">
            <Button to="/booking" variant="coral" className="header-cta">
              Book a visit
            </Button>
            <button
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
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
            className="menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="header-inner">
              <Brand onClick={() => setOpen(false)} />
              <button ref={closeBtnRef} className="menu-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                Close
              </button>
            </div>

            <nav className="menu-links" aria-label="Menu">
              {[{ to: "/", label: "Home", num: "00" }, ...nav].map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <Link to={n.to} onClick={() => setOpen(false)}>
                    <small>{n.num}</small>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="menu-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div>
                {site.address.line1}, {site.address.line3}
              </div>
              <div>
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
              <div>Tue & Wed 8–21 · Fri 8–17</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
