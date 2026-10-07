import {
  ClosingRoom,
  MarginNoteSection,
  PhotoWindow,
  QuietRiver,
  TypographicPageHero,
} from "../components/Shared";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";
import { Reveal } from "../components/Reveal";
import { Lotus, Moon, Flower, Body, Leaf, Pulse, Brain } from "../components/Icons";
import { acupunctureAreas, acupunctureConditions } from "../data/site";
import "./Acupuncture.css";

const focusAreas = [
  { Icon: Lotus, text: "Calm a busy mind and ease tension held in the body." },
  { Icon: Moon, text: "Settle the nervous system for deeper, more restful sleep." },
  {
    Icon: Flower,
    text: "Support for menstrual, menopausal and peri-menopausal concerns, fertility, and pregnancy-related issues such as nausea, tiredness and pelvic pain.",
  },
  { Icon: Body, text: "Relief for arthritic, muscular, joint and nerve-related pain." },
  { Icon: Leaf, text: "Ease the frequency and intensity of headaches and migraine." },
  { Icon: Pulse, text: "Lowers inflammation, eases muscle tension and reduces breathlessness." },
  {
    Icon: Brain,
    text: "Help with conditions such as Bell's palsy, IBS, dizziness, and cardiovascular health including hypertension.",
  },
].map((area, index) => ({ ...area, title: acupunctureAreas[index] }));

const cuppingBenefits = [
  {
    Icon: Body,
    title: "Muscle relaxation & tension release",
    text: "A kind of 'reverse massage' (myofascial decompression): rather than pressing down, the suction lifts the skin and muscle upward to loosen tight knots and soften scar tissue. Helpful for muscle tension, scar tissue and carpal tunnel syndrome.",
  },
  {
    Icon: Pulse,
    title: "Targeted pain management",
    text: "Evidence suggests cupping may temporarily ease chronic discomfort, particularly lower back and neck pain, knee osteoarthritis and shoulder tightness, and migraines and tension headaches.",
  },
  {
    Icon: Leaf,
    title: "Enhanced blood flow",
    text: "Drawing blood to the treated area is believed to jump-start the body's natural healing, flooding the tissue with nutrients and oxygen while flushing out metabolic waste.",
  },
  {
    Icon: Lotus,
    title: "Systemic relaxation",
    text: "Many people feel a deep sense of comfort and full-body relaxation, which researchers suggest may come from an increased release of the body's own natural painkillers (endogenous opioids).",
  },
];

const electroBenefits = [
  {
    Icon: Pulse,
    title: "Stronger stimulation",
    text: "Continuous, consistent electrical pulses in place of manual needle manipulation.",
  },
  {
    Icon: Leaf,
    title: "Faster relief",
    text: "Activates acupuncture points more quickly, which can shorten treatment times.",
  },
  {
    Icon: Body,
    title: "Broader coverage",
    text: "Effectively stimulates larger areas of the body by linking paired needles.",
  },
  {
    Icon: Brain,
    title: "Biochemical response",
    text: "Triggers the release of endorphins (natural painkillers) and helps reduce inflammation.",
  },
];

const steps = [
  {
    number: "01",
    title: "Consultation",
    text: "A gentle conversation about your health, history and what you'd like to work on.",
  },
  {
    number: "02",
    title: "Treatment",
    text: "Fine, sterile, single-use needles placed at carefully chosen points while you rest.",
  },
  { number: "03", title: "Aftercare", text: "Simple, natural steps to support your wellbeing between sessions." },
];

function BenefitLedger({ benefits, label }) {
  return (
    <div className="acupuncture-benefit-ledger" aria-label={label}>
      {benefits.map(({ Icon, title, text }, index) => (
        <Reveal as="article" className="acupuncture-benefit-row" key={title} delay={index * 0.04}>
          <span aria-hidden="true">0{index + 1}</span>
          <Icon size={23} />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Acupuncture() {
  return (
    <>
      <TypographicPageHero
        className="acupuncture-hero"
        marginNote="Kinsale & Carrigaline"
        title={
          <>
            Traditional <em>acupuncture</em>
          </>
        }
        lead="A gentle, natural therapy that supports the body's own ability to heal, ease pain and restore balance."
      />

      <QuietRiver className="acupuncture-river" items={acupunctureConditions} />

      <section className="acupuncture-section acupuncture-practice" aria-labelledby="acupuncture-practice-title">
        <MarginNoteSection note="The practice">
          <div className="acupuncture-practice-grid">
            <Reveal className="acupuncture-practice-copy">
              <p className="eyebrow">The practice</p>
              <h2 id="acupuncture-practice-title">
                What is <em>acupuncture?</em>
              </h2>
              <p className="acupuncture-statement">
                An ancient therapy that helps the body heal itself and return to balance.
              </p>
              <div className="acupuncture-prose">
                <p>
                  Acupuncture has been practised for thousands of years as part of Traditional Chinese Medicine. Fine,
                  sterile, single-use needles are placed at specific points on the body. In traditional terms these
                  points lie along meridians, pathways along which energy, or "Qi", flows; keeping that flow free
                  supports good health, while blockages can contribute to illness.
                </p>
                <h3>How it works</h3>
                <p>
                  Modern research offers a complementary explanation. Inserting a needle creates a tiny, controlled
                  stimulus that can kick-start the body's natural healing response, prompt the release of the body's
                  own pain-relieving chemicals (endorphins), and help dampen the pain signals travelling to the brain.
                  Acupuncture has both a local effect, where the needles are placed, and a wider effect across the body,
                  which is why it can be helpful for a broad range of conditions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoWindow
                className="acupuncture-photo"
                imageClassName="acupuncture-needle-photo"
                src="/images/acupuncture-needle-placement-back-1600.webp"
                srcSet="/images/acupuncture-needle-placement-back-800.webp 800w, /images/acupuncture-needle-placement-back-1600.webp 1600w"
                sizes="(min-width: 980px) 38vw, (min-width: 760px) 44vw, 100vw"
                alt="Niamh placing fine acupuncture needles along a patient's lower back"
                aspect="4 / 3"
                loading="eager"
              />
            </Reveal>
          </div>
        </MarginNoteSection>
      </section>

      <section className="acupuncture-section acupuncture-focus" aria-labelledby="acupuncture-focus-title">
        <MarginNoteSection note="Areas of focus">
          <Reveal className="acupuncture-section-heading">
            <p className="eyebrow">How it helps</p>
            <h2 id="acupuncture-focus-title">
              Areas of <em>focus</em>
            </h2>
            <p className="lead">
              Acupuncture may support a wide range of concerns. These are some Niamh works with most often.
            </p>
          </Reveal>
          <div className="acupuncture-focus-ledger">
            {focusAreas.map(({ Icon, title, text }, index) => (
              <Reveal as="article" className="acupuncture-focus-row" key={title} delay={index * 0.03}>
                <span aria-hidden="true">0{index + 1}</span>
                <Icon size={25} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginNoteSection>
      </section>

      <section className="acupuncture-section acupuncture-uses" aria-labelledby="acupuncture-uses-title">
        <MarginNoteSection note="Uses">
          <div className="acupuncture-uses-grid">
            <div className="acupuncture-uses-copy">
              <Reveal className="acupuncture-section-heading">
                <p className="eyebrow">Uses</p>
                <h2 id="acupuncture-uses-title">
                  What acupuncture <em>can help with</em>
                </h2>
                <p className="lead">
                  Acupuncture is used around the world to provide safe, effective relief for many conditions. Niamh
                  commonly uses it to help with:
                </p>
              </Reveal>
              <Reveal>
                <ul className="acupuncture-use-list">
                  {acupunctureConditions.map((condition) => (
                    <li key={condition}>{condition}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <PhotoWindow
                className="acupuncture-photo acupuncture-uses-photo"
                imageClassName="acupuncture-uses-photo-img"
                src="/images/acupuncture-two-hand-technique-1600.webp"
                srcSet="/images/acupuncture-two-hand-technique-800.webp 800w, /images/acupuncture-two-hand-technique-1600.webp 1600w"
                sizes="(min-width: 980px) 32vw, (min-width: 760px) 40vw, 100vw"
                alt="Niamh using both hands to place acupuncture needles along a patient's upper back"
                aspect="4 / 3"
              />
            </Reveal>
          </div>
        </MarginNoteSection>
      </section>

      <section className="acupuncture-deep-room" aria-labelledby="cupping-title">
        <MarginNoteSection note="Also offered">
          <div className="acupuncture-deep-intro">
            <Reveal className="acupuncture-deep-copy">
              <p className="eyebrow">Also offered</p>
              <h2 id="cupping-title">
                Cupping <em>therapy</em>
              </h2>
              <p className="lead">An ancient therapy, used on its own or combined with acupuncture.</p>
              <p>
                Cupping is an ancient practice in which specialised cups are placed on the skin to create a gentle
                suction. The vacuum draws the skin and the superficial muscle layer upward into the cup, which is
                believed to increase blood circulation, relieve muscle tension and promote cellular repair. It's widely
                used for pain management, deep-tissue relaxation and sports recovery, and Niamh often combines it with
                acupuncture within a single session.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoPlaceholder
                className="acupuncture-cupping-placeholder"
                aspect="4 / 3"
                caption="Cupping photo coming soon"
              />
            </Reveal>
          </div>
          <BenefitLedger benefits={cuppingBenefits} label="Cupping therapy" />
        </MarginNoteSection>
      </section>

      <section className="acupuncture-deep-room acupuncture-deep-room-alt" aria-labelledby="electro-title">
        <MarginNoteSection note="Also offered">
          <div className="acupuncture-deep-intro">
            <Reveal className="acupuncture-deep-copy">
              <p className="eyebrow">Also offered</p>
              <h2 id="electro-title">
                Electro-<em>acupuncture</em>
              </h2>
              <p className="lead">A modern form of acupuncture that adds gentle electrical stimulation.</p>
              <p>
                In electro-acupuncture, a small, adjustable electrical current is passed between pairs of acupuncture
                needles to enhance and sustain the therapeutic stimulation. It's commonly used for pain relief such as
                headaches, migraines and back pain.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoWindow
                className="acupuncture-photo acupuncture-photo-dark"
                imageClassName="acupuncture-session-photo"
                src="/images/acupuncture-session-overview-1600.webp"
                srcSet="/images/acupuncture-session-overview-800.webp 800w, /images/acupuncture-session-overview-1600.webp 1600w"
                sizes="(min-width: 980px) 38vw, (min-width: 760px) 44vw, 100vw"
                alt="Overhead view of an acupuncture session showing needles placed along a patient's back"
                aspect="4 / 3"
              />
            </Reveal>
          </div>
          <BenefitLedger benefits={electroBenefits} label="Electro-acupuncture" />
        </MarginNoteSection>
      </section>

      <section className="acupuncture-section acupuncture-visit" aria-labelledby="acupuncture-visit-title">
        <MarginNoteSection note="Your visit">
          <Reveal className="acupuncture-section-heading">
            <p className="eyebrow">Your visit</p>
            <h2 id="acupuncture-visit-title">
              What to <em>expect</em>
            </h2>
            <p className="lead">Every visit is unhurried and centred on you.</p>
          </Reveal>
          <ol className="acupuncture-visit-list">
            {steps.map((step, index) => (
              <Reveal as="li" className="acupuncture-visit-row" key={step.number} delay={index * 0.05}>
                <span aria-hidden="true">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </MarginNoteSection>
      </section>

      <ClosingRoom
        className="acupuncture-closing"
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
