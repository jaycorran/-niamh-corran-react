import {
  ClosingRoom,
  MarginNoteSection,
  PhotoWindow,
  TypographicPageHero,
} from "../components/Shared";
import { Reveal } from "../components/Reveal";
import { Check } from "../components/Icons";
import { site } from "../data/site";
import "./MeetNiamh.css";

const values = [
  {
    title: "Listen first",
    text: "Real, lasting results come from understanding the whole person: your history, your goals and your day-to-day life.",
  },
  {
    title: "Treat the cause",
    text: "By offering chartered physiotherapy, traditional acupuncture, or a combination of the two, Niamh treats the root cause, not just the symptoms.",
  },
  {
    title: "Explain everything",
    text: "Modern, evidence-informed practice blended with time-honoured wisdom, always explained in plain language.",
  },
  {
    title: "Leave with a plan",
    text: "No two treatments are quite the same, and you'll always leave with a clear sense of the next step.",
  },
];

export default function MeetNiamh() {
  return (
    <>
      <TypographicPageHero
        className="meet-hero"
        marginNote="Kinsale & Carrigaline"
        eyebrow="Meet Niamh"
        title={
          <>
            Care from someone <em>who listens</em>
          </>
        }
        lead="Chartered physiotherapist with over 20 years' experience and a qualified acupuncturist, bringing both disciplines together with warmth and genuine care."
      />

      <section id="meet-portrait" className="meet-section meet-portrait" aria-labelledby="meet-bio-title">
        <MarginNoteSection note="About Niamh">
          <Reveal>
            <p className="eyebrow">About Niamh</p>
            <h2 id="meet-bio-title">
              A holistic approach <em>to your health</em>
            </h2>
          </Reveal>
          <div className="meet-bio-grid">
            <Reveal>
              <PhotoWindow
                className="meet-niamh-window"
                imageClassName="meet-niamh-image"
                src="/Niamh.jpeg"
                srcSet="/Niamh.jpeg 1200w"
                sizes="(min-width: 980px) 34vw, (min-width: 700px) 42vw, 100vw"
                alt="Niamh Corran, chartered physiotherapist and acupuncturist"
                aspect="3 / 4"
                objectPosition="center top"
                loading="eager"
              />
            </Reveal>
            <Reveal className="meet-bio-copy" delay={0.08}>
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
              <ul className="meet-credentials" aria-label="Qualifications">
                {site.credentials.map((credential) => (
                  <li key={credential}>
                    <span aria-hidden="true">
                      <Check size={13} />
                    </span>
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="meet-room-print">
            <PhotoWindow
              src="/home-clinic.jpeg"
              srcSet="/home-clinic.jpeg 1086w"
              sizes="(min-width: 980px) 68vw, 100vw"
              alt="The clinic room where Niamh sees patients"
              aspect="4 / 3"
            />
          </Reveal>
        </MarginNoteSection>
      </section>

      <section className="meet-section meet-philosophy" aria-labelledby="meet-philosophy-title">
        <MarginNoteSection note="Philosophy">
          <Reveal className="meet-section-heading">
            <p className="eyebrow">Philosophy</p>
            <h2 id="meet-philosophy-title">
              Gentle medicine. <em>Deeply personal.</em>
            </h2>
            <p className="lead">Every person is different, so every treatment plan should be too.</p>
          </Reveal>
          <ul className="meet-value-list">
            {values.map((value, index) => (
              <Reveal as="li" className="meet-value-row" key={value.title} delay={index * 0.05}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </MarginNoteSection>
      </section>

      <section className="meet-quote" aria-label="Niamh Corran quote">
        <div className="container">
          <Reveal>
            <blockquote>
              <span aria-hidden="true">“</span>
              <p>
                I want every person who walks through the door to feel heard, understood, and to leave knowing exactly
                what happens next.
              </p>
              <cite>Niamh Corran</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <ClosingRoom
        className="meet-closing"
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
