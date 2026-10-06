import { PageHero, CTA, Marquee } from "../components/Shared";
import { Reveal, Stagger, Item } from "../components/Reveal";
import { Lotus, Moon, Flower, Body, Leaf, Pulse, Brain } from "../components/Icons";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";
import { acupunctureAreas, acupunctureConditions } from "../data/site";
import "./Acupuncture.css";

const tints = ["sage", "peach", "sky", "blush"];

// Titles come from acupunctureAreas (shared with the Home marquee); icon + description live here.
const focus = [
  { Icon: Lotus, p: "Calm a busy mind and ease tension held in the body." },
  { Icon: Moon, p: "Settle the nervous system for deeper, more restful sleep." },
  {
    Icon: Flower,
    p: "Support for menstrual, menopausal and peri-menopausal concerns, fertility, and pregnancy-related issues such as nausea, tiredness and pelvic pain.",
  },
  { Icon: Body, p: "Relief for arthritic, muscular, joint and nerve-related pain." },
  { Icon: Leaf, p: "Ease the frequency and intensity of headaches and migraine." },
  {
    Icon: Pulse,
    p: "Lowers inflammation, eases muscle tension and reduces breathlessness.",
  },
  {
    Icon: Brain,
    p: "Help with conditions such as Bell's palsy, IBS, dizziness, and cardiovascular health including hypertension.",
  },
].map((c, i) => ({ ...c, t: acupunctureAreas[i] }));

const uses = acupunctureConditions;

const cuppingBenefits = [
  {
    Icon: Body,
    t: "Muscle relaxation & tension release",
    p: "A kind of 'reverse massage' (myofascial decompression): rather than pressing down, the suction lifts the skin and muscle upward to loosen tight knots and soften scar tissue. Helpful for muscle tension, scar tissue and carpal tunnel syndrome.",
  },
  {
    Icon: Pulse,
    t: "Targeted pain management",
    p: "Evidence suggests cupping may temporarily ease chronic discomfort, particularly lower back and neck pain, knee osteoarthritis and shoulder tightness, and migraines and tension headaches.",
  },
  {
    Icon: Leaf,
    t: "Enhanced blood flow",
    p: "Drawing blood to the treated area is believed to jump-start the body's natural healing, flooding the tissue with nutrients and oxygen while flushing out metabolic waste.",
  },
  {
    Icon: Lotus,
    t: "Systemic relaxation",
    p: "Many people feel a deep sense of comfort and full-body relaxation, which researchers suggest may come from an increased release of the body's own natural painkillers (endogenous opioids).",
  },
];

const electroBenefits = [
  {
    Icon: Pulse,
    t: "Stronger stimulation",
    p: "Continuous, consistent electrical pulses in place of manual needle manipulation.",
  },
  {
    Icon: Leaf,
    t: "Faster relief",
    p: "Activates acupuncture points more quickly, which can shorten treatment times.",
  },
  {
    Icon: Body,
    t: "Broader coverage",
    p: "Effectively stimulates larger areas of the body by linking paired needles.",
  },
  {
    Icon: Brain,
    t: "Biochemical response",
    p: "Triggers the release of endorphins (natural painkillers) and helps reduce inflammation.",
  },
];

const steps = [
  {
    n: "1",
    t: "Consultation",
    p: "A gentle conversation about your health, history and what you'd like to work on.",
  },
  {
    n: "2",
    t: "Treatment",
    p: "Fine, sterile, single-use needles placed at carefully chosen points while you rest.",
  },
  { n: "3", t: "Aftercare", p: "Simple, natural steps to support your wellbeing between sessions." },
];

export default function Acupuncture() {
  return (
    <>
      <PageHero
        title={
          <>
            Traditional <em>acupuncture</em>
          </>
        }
        lead="A gentle, natural therapy that supports the body's own ability to heal, ease pain and restore balance."
      />

      <Marquee items={acupunctureConditions} />

      {/* What it is */}
      <section className="section">
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">The practice</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                What is <em>acupuncture?</em>
              </h2>
              <p className="statement" style={{ marginTop: "1.5rem", fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}>
                An ancient therapy that helps the body heal itself and return to balance.
              </p>
              <figure className="section-photo">
                <img
                  src="/images/acupuncture-needle-placement-back-1600.webp"
                  srcSet="/images/acupuncture-needle-placement-back-800.webp 800w, /images/acupuncture-needle-placement-back-1600.webp 1600w"
                  sizes="(min-width: 900px) 40vw, 100vw"
                  width="1600"
                  height="1200"
                  alt="Niamh placing fine acupuncture needles along a patient's lower back"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="prose" style={{ fontSize: "1.12rem" }}>
            <p>
              Acupuncture has been practised for thousands of years as part of Traditional Chinese Medicine. Fine,
              sterile, single-use needles are placed at specific points on the body. In traditional terms these points
              lie along meridians, pathways along which energy, or "Qi", flows; keeping that flow free supports good
              health, while blockages can contribute to illness.
            </p>
            <h3 className="h3" style={{ color: "var(--forest)", marginTop: "1rem" }}>
              How it works
            </h3>
            <p>
              Modern research offers a complementary explanation. Inserting a needle creates a tiny, controlled
              stimulus that can kick-start the body's natural healing response, prompt the release of the body's own
              pain-relieving chemicals (endorphins), and help dampen the pain signals travelling to the brain.
              Acupuncture has both a local effect, where the needles are placed, and a wider effect across the body,
              which is why it can be helpful for a broad range of conditions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Focus areas */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal style={{ marginBottom: "3rem", maxWidth: "40rem" }}>
            <p className="eyebrow">How it helps</p>
            <h2 className="h2" style={{ marginTop: "1rem" }}>
              Areas of <em>focus</em>
            </h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>
              Acupuncture may support a wide range of concerns. These are some Niamh works with most often.
            </p>
          </Reveal>
          <Stagger className="features" as="ul">
            {focus.map((c, i) => (
              <Item as="li" className={`feature feature--${tints[i % tints.length]}`} key={c.t}>
                <span className="idx" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="icon-tile">
                  <c.Icon size={26} />
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Uses */}
      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">Uses</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                What acupuncture <em>can help with</em>
              </h2>
              <p className="lead" style={{ marginTop: "1.25rem" }}>
                Acupuncture is used around the world to provide safe, effective relief for many conditions. Niamh
                commonly uses it to help with:
              </p>
              <figure className="section-photo">
                <img
                  src="/images/acupuncture-two-hand-technique-1600.webp"
                  srcSet="/images/acupuncture-two-hand-technique-800.webp 800w, /images/acupuncture-two-hand-technique-1600.webp 1600w"
                  sizes="(min-width: 900px) 40vw, 100vw"
                  width="1600"
                  height="1200"
                  alt="Niamh using both hands to place acupuncture needles along a patient's upper back"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="col-list" style={{ marginTop: 0 }}>
              {uses.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Cupping therapy */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <div className="split">
            <div className="sticky">
              <Reveal>
                <p className="eyebrow">Also offered</p>
                <h2 className="h2" style={{ marginTop: "1rem" }}>
                  Cupping <em>therapy</em>
                </h2>
                <p className="lead" style={{ marginTop: "1.25rem" }}>
                  An ancient therapy, used on its own or combined with acupuncture.
                </p>
                <PhotoPlaceholder className="section-photo-ph" tint="peach" aspect="4 / 3" caption="Cupping photo coming soon" />
              </Reveal>
            </div>
            <Reveal delay={0.1} className="prose" style={{ fontSize: "1.12rem" }}>
              <p>
                Cupping is an ancient practice in which specialised cups are placed on the skin to create a gentle
                suction. The vacuum draws the skin and the superficial muscle layer upward into the cup, which is
                believed to increase blood circulation, relieve muscle tension and promote cellular repair. It's widely
                used for pain management, deep-tissue relaxation and sports recovery, and Niamh often combines it with
                acupuncture within a single session.
              </p>
            </Reveal>
          </div>
          <Stagger className="features" as="ul" style={{ marginTop: "3rem" }}>
            {cuppingBenefits.map((c, i) => (
              <Item as="li" className={`feature feature--${tints[i % tints.length]}`} key={c.t}>
                <span className="idx" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="icon-tile">
                  <c.Icon size={26} />
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Electro-acupuncture */}
      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container">
          <div className="split">
            <div className="sticky">
              <Reveal>
                <p className="eyebrow">Also offered</p>
                <h2 className="h2" style={{ marginTop: "1rem" }}>
                  Electro-<em>acupuncture</em>
                </h2>
                <p className="lead" style={{ marginTop: "1.25rem" }}>
                  A modern form of acupuncture that adds gentle electrical stimulation.
                </p>
                <figure className="section-photo">
                  <img
                    src="/images/acupuncture-session-overview-1600.webp"
                    srcSet="/images/acupuncture-session-overview-800.webp 800w, /images/acupuncture-session-overview-1600.webp 1600w"
                    sizes="(min-width: 900px) 40vw, 100vw"
                    width="1600"
                    height="1200"
                    alt="Overhead view of an acupuncture session showing needles placed along a patient's back"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="prose" style={{ fontSize: "1.12rem" }}>
              <p>
                In electro-acupuncture, a small, adjustable electrical current is passed between pairs of acupuncture
                needles to enhance and sustain the therapeutic stimulation. It's commonly used for pain relief such as
                headaches, migraines and back pain.
              </p>
            </Reveal>
          </div>
          <Stagger className="features" as="ul" style={{ marginTop: "3rem" }}>
            {electroBenefits.map((c, i) => (
              <Item as="li" className={`feature feature--${tints[i % tints.length]}`} key={c.t}>
                <span className="idx" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="icon-tile">
                  <c.Icon size={26} />
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What to expect */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p className="eyebrow">Your visit</p>
            <h2 className="h2" style={{ marginTop: "1rem" }}>
              What to <em>expect</em>
            </h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>
              Every visit is unhurried and centred on you.
            </p>
          </Reveal>
          <Stagger className="steps light" as="ol">
            {steps.map((s) => (
              <Item as="li" className="step" key={s.n}>
                <span className="num" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
                <span className="glow" aria-hidden="true" />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA
        title={
          <>
            Restore your <em>balance</em>
          </>
        }
        sub="Book an acupuncture appointment in Kinsale or Carrigaline, or ask whether combining it with physiotherapy would suit you."
      />
    </>
  );
}
