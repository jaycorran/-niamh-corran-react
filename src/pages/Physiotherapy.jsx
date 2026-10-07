import {
  ClosingRoom,
  MarginNoteSection,
  QuietRiver,
  TypographicPageHero,
} from "../components/Shared";
import { Reveal } from "../components/Reveal";
import { Spine, Joint, Pulse, Cane, Scalpel, Brain } from "../components/Icons";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";
import { physioAreas, physioConditions } from "../data/site";
import "./Physiotherapy.css";

const areas = [
  {
    Icon: Spine,
    p: "A full diagnosis and tailored plan for pain that can affect sleep, work, sport and daily life, and that sometimes shows up as headaches, arm or leg pain, or weakness.",
  },
  {
    Icon: Joint,
    p: "Care for the musculoskeletal system, from overuse injuries and muscle imbalance to joint irritation, nerve entrapment and tendon problems.",
  },
  {
    Icon: Pulse,
    p: "Evidence-based treatment for persistent pain, using a graded return to movement and pain education to help you regain control and confidence.",
  },
  {
    Icon: Cane,
    p: "Specialist treatment to help you stay mobile, steady and independent as you age, either in clinic or at home.",
  },
  {
    Icon: Scalpel,
    p: "Structured recovery after surgery, including joint replacement, to rebuild strength, movement and confidence.",
  },
  {
    Icon: Brain,
    p: "Rehabilitation to improve movement, balance and everyday function for a range of neurological conditions.",
  },
].map((area, index) => ({ ...area, title: physioAreas[index] }));

const steps = [
  { number: "01", title: "Assessment", text: "A full history and physical assessment to pinpoint the root cause of your symptoms." },
  {
    number: "02",
    title: "Treatment",
    text: "Hands-on therapy and, where useful, acupuncture, tailored to you and always explained clearly.",
  },
  { number: "03", title: "Rehab plan", text: "A simple home programme and guidance so progress continues between sessions." },
];

export default function Physiotherapy() {
  return (
    <>
      <TypographicPageHero
        className="physio-hero"
        marginNote="Kinsale & Carrigaline"
        title={
          <>
            Chartered <em>physiotherapy</em>
          </>
        }
        lead="Expert, hands-on care to relieve pain, restore movement and get you back to doing what you love, with a plan built around your goals."
      />

      <QuietRiver className="physio-river" items={physioConditions} />

      <section className="physio-section physio-approach" aria-labelledby="physio-approach-title">
        <MarginNoteSection note="The approach">
          <Reveal>
            <p className="eyebrow">The approach</p>
            <h2 id="physio-approach-title">
              Treating the cause, <em>not just the symptom</em>
            </h2>
          </Reveal>
          <div className="physio-approach-grid">
            <Reveal className="physio-prose">
              <p>
                As a CORU-registered chartered physiotherapist, Niamh begins with a thorough assessment to understand
                what's really driving your pain or restriction. From there, you'll get a clear, personalised treatment
                plan that may combine hands-on therapy, targeted exercise and, where helpful, acupuncture or cupping.
              </p>
              <p>
                A key part of every plan is preventing the problem coming back, leaving you stronger, more mobile and
                better equipped for the future. Learning how the body and mind respond to pain and injury has also been
                shown to speed up recovery.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoPlaceholder
                className="physio-photo-placeholder"
                aspect="4 / 3"
                caption="Studio photograph — coming soon"
              />
            </Reveal>
          </div>
        </MarginNoteSection>
      </section>

      <section className="physio-section physio-focus" aria-labelledby="physio-focus-title">
        <MarginNoteSection note="Areas of focus">
          <Reveal className="physio-section-heading">
            <p className="eyebrow">How it helps</p>
            <h2 id="physio-focus-title">
              Areas of <em>focus</em>
            </h2>
            <p className="lead">Some of the most common reasons people come to see Niamh.</p>
          </Reveal>
          <div className="physio-ledger">
            {areas.map(({ Icon, title, p }, index) => (
              <Reveal as="article" className="physio-ledger-row" key={title} delay={index * 0.03}>
                <span className="physio-ledger-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="physio-ledger-icon" aria-hidden="true">
                  <Icon size={25} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginNoteSection>
      </section>

      <section className="physio-section physio-conditions" aria-labelledby="physio-conditions-title">
        <MarginNoteSection note="Common conditions">
          <Reveal className="physio-section-heading">
            <p className="eyebrow">In detail</p>
            <h2 id="physio-conditions-title">
              Common conditions <em>treated</em>
            </h2>
            <p className="lead">These are some of the conditions Niamh sees most often.</p>
          </Reveal>
          <Reveal>
            <ul className="physio-condition-list">
              {physioConditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </Reveal>
        </MarginNoteSection>
      </section>

      <section className="physio-section physio-visit" aria-labelledby="physio-visit-title">
        <MarginNoteSection note="Your visit">
          <Reveal className="physio-section-heading">
            <p className="eyebrow">Your visit</p>
            <h2 id="physio-visit-title">
              What to <em>expect</em>
            </h2>
          </Reveal>
          <ol className="physio-visit-list">
            {steps.map((step, index) => (
              <Reveal as="li" className="physio-visit-row" key={step.number} delay={index * 0.05}>
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
        className="physio-closing"
        title={
          <>
            Start your <em>recovery</em>.
          </>
        }
        sub="Book a physiotherapy appointment in Kinsale or Carrigaline. Not sure if physio is right for you? Call and ask."
      />
    </>
  );
}
