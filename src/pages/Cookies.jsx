import { LinkArrow } from "../components/Button";

export default function Cookies() {
  return (
    <>
      <header className="prose-page-header">
        <div className="container">
          <h1>Cookie Policy</h1>
          <p className="note">Last Updated: October 2026</p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "62rem" }}>
          <div className="prose">
            <h2 id="what-are-cookies">1. What Are Cookies</h2>
            <p>
              Cookies are compact text files stored on your computer or mobile hardware when visiting websites. They
              are broadly deployed to make websites operate fluidly, optimize performance, and deliver traffic
              context to site operators.
            </p>

            <h2 id="how-we-use-cookies">2. How We Use Cookies</h2>
            <p>
              This site currently sets no cookies and loads no third-party trackers, analytics, or embedded widgets.
              There is no login, no booking session, and no cookie banner, because none of these features exist on
              this site today — a banner would have nothing to ask your consent for.
            </p>

            <h2 id="cookies-we-use">3. Cookies We Use</h2>
            <p>
              We don't use any of the cookie categories described above. The fonts on this site are self-hosted (not
              loaded from a third-party font service), and our map links take you to Google Maps in a new tab rather
              than embedding a tracking map on this page. If we ever add analytics, a booking system, or an embedded
              map that sets cookies, we will introduce a consent banner before any non-essential cookie is set, and
              update this page first.
            </p>

            <h2 id="controlling-cookie-settings">4. Controlling Cookie Settings</h2>
            <p>
              You can still control cookies in general through your browser's own settings — this is unaffected by
              anything on this site, since this site does not set any.
            </p>
          </div>

          <p style={{ marginTop: "2.5rem" }}>
            <LinkArrow to="/" dir="left">
              Back to home
            </LinkArrow>
          </p>
        </div>
      </section>
    </>
  );
}
