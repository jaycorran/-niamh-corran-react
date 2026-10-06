import { PageHero } from "../components/Shared";
import { LinkArrow } from "../components/Button";
import { site } from "../data/site";

export default function Accessibility() {
  return (
    <>
      <PageHero
        compact
        title="Accessibility"
        lead="Our aim for this site, and where we are today"
        cta={false}
      />

      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "62rem" }}>
          <div className="prose">
            <h2>Our commitment</h2>
            <p>
              We've built this site to meet WCAG 2.1 AA as a quality target. This is a design aspiration we hold
              ourselves to, not a legal compliance statement.
            </p>

            <h2>What we've done</h2>
            <ul>
              <li>A skip link to jump straight to the main content.</li>
              <li>Full keyboard navigation throughout the site.</li>
              <li>Visible focus states on every interactive element.</li>
              <li>Support for reduced-motion preferences.</li>
              <li>Text with colour contrast that's been checked for readability.</li>
            </ul>

            <h2>Tell us if something doesn't work</h2>
            <p>
              If you come across anything on this site that's difficult to use, please let us know by emailing{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we'll do our best to help and to improve it.
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
