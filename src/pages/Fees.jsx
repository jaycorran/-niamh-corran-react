import { Button } from "../components/Button";
import { Check } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { ClosingRoom, MarginNoteSection, TypographicPageHero } from "../components/Shared";
import { formatClosingHours, site } from "../data/site";
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
      <TypographicPageHero
        marginNote="Fees"
        title={
          <>
            Simple, <em>transparent</em> pricing
          </>
        }
        lead="Every session includes time to talk, treat and plan, and receipts are provided for private health insurance."
      />

      <section className="fees-pricing-section">
        <div className="container fees-pricing">
          {site.fees.map((fee, index) => (
            <Reveal as="article" className="fee-panel" delay={index * 0.08} key={fee.name}>
              {fee.featured && <span className="fee-tag">Most common</span>}
              <p className="eyebrow">{fee.duration}</p>
              <h2>{fee.name}</h2>
              <p className="fee-price">
                €{fee.price}
                <small>/ {fee.duration}</small>
              </p>
              <ul className="fee-includes">
                {fee.includes.map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button to="/booking" block>
                Book now
              </Button>
            </Reveal>
          ))}
        </div>
      </section>

      <MarginNoteSection as="section" note="Good to know" className="fees-small-print">
        <Reveal>
          <h2>
            The <em>small print</em>
          </h2>
          <ul className="fees-ledger">
            {notes.map((note) => (
              <li key={note}>
                <Check size={18} />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </MarginNoteSection>

      <ClosingRoom
        title={
          <>
            Ready to <em>book?</em>
          </>
        }
        sub={`Choose a time that suits you in Kinsale or Carrigaline. ${formatClosingHours()}.`}
      />
    </>
  );
}
