import { PageHero, CTA, Marquee } from "../components/Shared";
import { Reveal, Stagger, Item } from "../components/Reveal";
import { Spine, Joint, Pulse, Cane, Scalpel, Brain } from "../components/Icons";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";
import { physioAreas, physioConditions } from "../data/site";
import "./Physiotherapy.css";

const tints = ["sage", "peach", "sky", "blush"];

// Titles come from physioAreas (shared with the Home marquee); icon + description live here.
const conditions = [
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
].map((c, i) => ({ ...c, t: physioAreas[i] }));

const list = physioConditions;

const steps = [
  { n: "1", t: "Assessment", p: "A full history and physical assessment to pinpoint the root cause of your symptoms." },
  {
    n: "2",
    t: "Treatment",
    p: "Hands-on therapy and, where useful, acupuncture, tailored to you and always explained clearly.",
  },
  { n: "3", t: "Rehab plan", p: "A simple home programme and guidance so progress continues between sessions." },
];

export default function Physiotherapy() {
  return (
    <>
      <PageHero
        title={
          <>
            Chartered <em>physiotherapy</em>
          </>
        }
        lead="Expert, hands-on care to relieve pain, restore movement and get you back to doing what you love, with a plan built around your goals."
      />

      <Marquee items={physioConditions} />

      {/* Approach */}
      <section className="section">
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">The approach</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                Treating the cause, <em>not just the symptom</em>
              </h2>
              <PhotoPlaceholder className="section-photo-ph" tint="sage" aspect="4 / 3" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="prose" style={{ fontSize: "1.12rem" }}>
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
        </div>
      </section>

      {/* Conditions */}
      <section className="section" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal style={{ marginBottom: "3rem", maxWidth: "40rem" }}>
            <p className="eyebrow">How it helps</p>
            <h2 className="h2" style={{ marginTop: "1rem" }}>
              Areas of <em>focus</em>
            </h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>
              Some of the most common reasons people come to see Niamh.
            </p>
          </Reveal>
          <Stagger className="features" as="ul">
            {conditions.map((c, i) => (
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

      {/* Detailed list */}
      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">In detail</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                Common conditions <em>treated</em>
              </h2>
              <p className="lead" style={{ marginTop: "1.25rem" }}>
                These are some of the conditions Niamh sees most often.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="col-list" style={{ marginTop: 0 }}>
              {list.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
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
            Start your <em>recovery</em>
          </>
        }
        sub="Book a physiotherapy appointment in Kinsale or Carrigaline. Not sure if physio is right for you? Call and ask."
      />
    </>
  );
}
