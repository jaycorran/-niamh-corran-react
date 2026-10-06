import { PageHero, CTA } from "../components/Shared";
import { Reveal, Stagger, Item } from "../components/Reveal";
import { Button } from "../components/Button";
import { Check } from "../components/Icons";
import { site } from "../data/site";
import "./Fees.css";

const notes = [
  `Receipts provided for private health insurance (${site.insurers.join(", ")}).`,
  "Physiotherapy and acupuncture can be combined within a session, just ask.",
  "The same clear rates apply to physiotherapy and acupuncture.",
  "Please give 24 hours' notice to reschedule or cancel.",
];

export default function Fees() {
  return (
    <>
      <PageHero
        compact
        title={
          <>
            Simple, <em>transparent</em> pricing
          </>
        }
        lead="Every session includes time to talk, treat and plan, and receipts are provided for private health insurance."
      />

      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container">
          <Stagger className="pricing">
            {site.fees.map((f) => (
              <Item as="article" className={`price-card ${f.featured ? "featured" : ""}`} key={f.name}>
                {f.featured && <span className="badge">Most common</span>}
                <p className="eyebrow" style={{ color: f.featured ? "var(--seafoam)" : undefined }}>
                  {f.duration}
                </p>
                <h3>{f.name}</h3>
                <p className="price">
                  €{f.price}
                  <small>/ {f.duration}</small>
                </p>
                <ul className="ticks">
                  {f.includes.map((i) => (
                    <li key={i}>
                      <Check size={16} />
                      {i}
                    </li>
                  ))}
                </ul>
                <Button to="/booking" variant={f.featured ? "coral" : ""} block>
                  Book now
                </Button>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" style={{ background: "var(--seafoam-tint)" }}>
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">Good to know</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                The <em>small print</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="ticks" style={{ fontSize: "1.1rem", gap: "1.25rem" }}>
              {notes.map((n) => (
                <li key={n}>
                  <Check size={18} />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTA
        title={
          <>
            Ready to <em>book?</em>
          </>
        }
        sub="Choose a time that suits you in Kinsale or Carrigaline. Tuesday and Wednesday until 9pm, Friday until 5pm."
      />
    </>
  );
}
