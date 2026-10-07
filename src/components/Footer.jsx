import { Link } from "react-router-dom";
import { nav, site } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer quiet-footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/1A-reverse.svg" alt="Niamh Corran Physiotherapy & Acupuncture" />
          <p className="footer-statement">
            Holistic care, <em className="em">built around you.</em>
          </p>
          <div className="accreds" aria-label="Accreditations">
            <a
              className="accred accred-logo coru-chip"
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
            <span className="accred accred-logo accred-logo-plain iscp-mark">
              <img src="/iscp-logo-white.png" alt="ISCP — Chartered Physiotherapist member" loading="lazy" />
            </span>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Hours</h2>
          <ul>
            {site.hours.map((hours) => (
              <li key={hours.day}>
                {hours.day} · {hours.open} – {hours.close}
              </li>
            ))}
            <li className="footer-note">Other days by arrangement</li>
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <address>
            <ul>
              {site.locations.map((location) => (
                <li key={location.name}>
                  {location.line1}, {location.line2}, {location.line3}, {location.line4}
                </li>
              ))}
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </address>
        </div>

        <nav aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cookies">Cookie Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Disclaimer</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <div>
          <p>
            © {year} {site.name} {site.tagline}
          </p>
          <p>Kinsale & Carrigaline, Co. Cork</p>
        </div>
      </div>
    </footer>
  );
}
