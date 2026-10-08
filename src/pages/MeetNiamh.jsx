import { PageHero, CTA } from "../components/Shared";
import { Reveal, Stagger, Item } from "../components/Reveal";
import { Check } from "../components/Icons";
import { site } from "../data/site";
import "./MeetNiamh.css";

const values = [
  {
    t: "Listen first",
    p: "Real, lasting results come from understanding the whole person: your history, your goals and your day-to-day life.",
  },
  {
    t: "Treat the cause",
    p: "By offering chartered physiotherapy, traditional acupuncture, or a combination of the two, Niamh treats the root cause, not just the symptoms.",
  },
  {
    t: "Explain everything",
    p: "Modern, evidence-informed practice blended with time-honoured wisdom, always explained in plain language.",
  },
  {
    t: "Leave with a plan",
    p: "No two treatments are quite the same, and you'll always leave with a clear sense of the next step.",
  },
];

export default function MeetNiamh() {
  return (
    <>
      <PageHero
        title={
          <>
            Care from someone <em>who listens</em>
          </>
        }
        lead="Chartered physiotherapist with over 20 years' experience and a qualified acupuncturist, bringing both disciplines together with warmth and genuine care."
      />

      {/* Bio */}
      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "62rem" }}>
          {/* Low threshold: this block is several viewports tall on mobile, so 25% never enters view. */}
          <Reveal amount={0.02}>
            <p className="eyebrow">About Niamh</p>
            <h2 className="h2" style={{ marginTop: "1rem" }}>
              A holistic approach <em>to your health</em>
            </h2>
            <div className="photo-collage photo-collage-2up">
              <div className="photo-collage-item photo-collage-main">
                <img
                  className="niamh-photo"
                  src="/images/niamh-corran-portrait-1400.webp"
                  srcSet="/images/niamh-corran-portrait-800.webp 800w, /images/niamh-corran-portrait-1400.webp 1400w"
                  sizes="(min-width: 900px) 40vw, 100vw"
                  width="1400"
                  height="1868"
                  alt="Niamh Corran, chartered physiotherapist and acupuncturist"
                />
              </div>
              <div className="photo-collage-item photo-collage-wide">
                <img src="/home-clinic.jpeg" alt="The clinic room where Niamh sees patients" />
              </div>
            </div>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                Niamh is a CORU-registered chartered physiotherapist with over 20 years' experience across the NHS and
                Irish healthcare, in acute, rehabilitation and community settings. She holds a BSc (Hons) in
                Physiotherapy from Keele University and has built specialist expertise in musculoskeletal, chronic pain,
                neurology, respiratory and care of older adults, treating conditions from back pain, arthritis, stroke,
                MS and Parkinson's Disease to post-surgical rehabilitation, falls and balance problems.
              </p>
              <p>
                Her experience includes the highly respected Pain Management Programme at the Walton Centre in
                Liverpool, the UK's leading specialist neurosciences centre, where she helped people manage
                long-standing pain through a biopsychosocial approach, pain education, mindfulness and graded movement.
                More recently she qualified as a Traditional Chinese Medicine Practitioner and Acupuncturist, earning a
                Licentiate in Acupuncture with Distinction at the College of Medical Acupuncture and Traditional Chinese
                Medicine.
              </p>
              <p>
                By combining chartered physiotherapy with traditional acupuncture, she treats the root cause, not just
                the symptoms, blending modern, evidence-based practice with years of hands-on experience. Appointments
                are built around you: above all, she takes the time to listen, so your care always feels personal.
              </p>
            </div>
            <ul className="creds" aria-label="Qualifications">
              {site.credentials.map((c) => (
                <li key={c}>
                  <i>
                    <Check size={12} />
                  </i>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section" style={{ background: "var(--seafoam-tint)" }}>
        <div className="container">
          <Reveal style={{ maxWidth: "48rem", marginBottom: "3.5rem" }}>
            <p className="eyebrow">Philosophy</p>
            <h2 className="h2" style={{ marginTop: "1rem" }}>
              Gentle medicine. <em>Deeply personal.</em>
            </h2>
            <p className="lead" style={{ marginTop: "1.25rem" }}>
              Every person is different, so every treatment plan should be too.
            </p>
          </Reveal>
          <Stagger className="steps light" as="ul">
            {values.map((v, i) => (
              <Item as="li" className="step" key={v.t}>
                <span className="num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{v.t}</h3>
                <p>{v.p}</p>
                <span className="glow" aria-hidden="true" />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quote */}
      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "60rem" }}>
          <Reveal>
            <p className="statement" style={{ textAlign: "center", margin: "0 auto" }}>
              "I want every person who walks through the door to feel heard, understood, and to leave knowing exactly
              what happens next."
            </p>
            <p className="eyebrow" style={{ justifyContent: "center", display: "flex", marginTop: "2rem" }}>
              Niamh Corran
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        title={
          <>
            Work <em>with Niamh</em>
          </>
        }
        sub="Book an appointment in Kinsale or Carrigaline. Physiotherapy, acupuncture, or both."
      />
    </>
  );
}
