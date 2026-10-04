import { Link } from "react-router-dom";
import { nav, site } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-statement">
            Holistic care, <em className="em">built around you.</em>
          </p>
          <div className="accreds" aria-label="Accreditations">
            <a
              className="accred accred-logo"
              href="https://www.coru.ie/check-the-register/"
              target="_blank"
              rel="noopener noreferrer"
              title="CORU registered physiotherapist — check the register"
            >
              <img
                src="/coru-logo.png"
                alt="CORU — Regulating Health and Social Care Professionals. Registered physiotherapist."
                width="250"
                height="80"
                loading="lazy"
              />
            </a>
            <span className="accred accred-logo accred-logo-plain">
              <img
                src="/iscp-logo-white.png"
                alt="ISCP — Chartered Physiotherapist member"
                loading="lazy"
              />
            </span>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Hours</h4>
          <ul>
            {site.hours.map((h) => (
              <li key={h.day}>
                {h.day} · {h.open} – {h.close}
              </li>
            ))}
            <li style={{ opacity: 0.6, fontSize: "0.85rem" }}>Other days by arrangement</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            {site.locations.map((loc) => (
              <li key={loc.name}>
                {loc.line1}, {loc.line2}, {loc.line3}, {loc.line4}
              </li>
            ))}
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {site.name} {site.tagline}
        </p>
        <p>Kinsale & Carrigaline, Co. Cork</p>
      </div>
    </footer>
  );
}
