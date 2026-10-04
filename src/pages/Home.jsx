import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, LinkArrow } from "../components/Button";
import { Ambient, Marquee, CTA, Chapter } from "../components/Shared";
import { Reveal, Stagger, Item, Lines } from "../components/Reveal";
import { Arrow, Check } from "../components/Icons";
import { site, openNow, physioAreas, acupunctureAreas } from "../data/site";

// Summarised treatment areas, grouped by discipline.
const marqueeItems = [
  { label: "Physiotherapy" },
  ...physioAreas,
  { label: "Acupuncture" },
  ...acupunctureAreas.filter((a) => a !== "Other conditions"),
];

const services = [
  {
    idx: "01",
    title: "Physiotherapy",
    to: "/physiotherapy",
    body:
      "Chartered assessment and hands-on treatment to restore movement and strength after injury or surgery, or helping with the stresses and strains of everyday life. Every plan comes with a home exercise programme and a clear reason for each part of it.",
    tags: physioAreas,
  },
  {
    idx: "02",
    title: "Acupuncture",
    to: "/acupuncture",
    body:
      "Traditional acupuncture, practised gently and explained plainly. Fine, single-use needles at carefully chosen points to ease pain, settle the nervous system and support the body's own recovery.",
    tags: acupunctureAreas,
    extras: ["Cupping therapy", "Electro-acupuncture"],
  },
  {
    idx: "03",
    title: "Combined care",
    to: "/fees",
    body:
      "Where it helps, both approaches in a single session: manual therapy and exercise for the mechanics, acupuncture for pain, tension and recovery. No referrals, no repeating your story.",
    tags: ["Persistent pain", "Injury recovery", "Whole-person care"],
  },
];

const steps = [
  { n: "1", t: "Listen", p: "Your history, your goals, and what a good outcome looks like for you." },
  { n: "2", t: "Assess", p: "A thorough assessment to understand the physical issue and the root cause of what's going on." },
  {
    n: "3",
    t: "Treat & plan",
    p: "Treatment starts on day one, and you leave with a plan that's simple enough to actually follow.",
  },
];

function OpenStatus() {
  const [s, setS] = useState(() => openNow());
  useEffect(() => {
    const id = setInterval(() => setS(openNow()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`status ${s.open ? "" : "closed"}`}>
      <i aria-hidden="true" /> {s.label}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" aria-labelledby="hero-title">
        <Ambient />
        <div className="container hero-inner">
          <div className="hero-top">
            <Reveal delay={0.1} y={10}>
              <p className="eyebrow on-dark">Chartered physiotherapy & acupuncture · Kinsale & Carrigaline, Co. Cork</p>
            </Reveal>
            <Reveal delay={0.3} y={10}>
              <div className="hero-scroll">
                <i aria-hidden="true" />
                Scroll
              </div>
            </Reveal>
          </div>

          <Lines
            id="hero-title"
            className="hero-title"
            delay={0.15}
            lines={[
              "Restore balance.",
              "Support wellbeing.",
              <>
                <em>Naturally.</em>
              </>,
            ]}
          />

          <div className="hero-bottom">
            <Reveal delay={0.5}>
              <p className="hero-lead">
                Niamh provides chartered physiotherapy and traditional acupuncture, whether on their own or together, to
                get to the root of what's going on and build a plan that works for you.
              </p>
              <div className="hero-actions">
                <Button to="/booking" variant="coral">
                  Book an appointment
                </Button>
                <a className="link-arrow" href="#services">
                  How I can help <Arrow size={14} dir="down" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.65} className="hero-card" as="aside" aria-label="Practice details">
              <dl>
                <div>
                  <dt>Where</dt>
                  <dd>
                    Powerhouse Studio, Kinsale
                    <br />
                    Head 2 Toe Clinic, Carrigaline
                  </dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>
                    Tue & Wed 8:00–21:00
                    <br />
                    Fri 8:00–17:00
                  </dd>
                  <OpenStatus />
                </div>
                <div>
                  <dt>Registered</dt>
                  <dd>CORU · ISCP Chartered</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      {/* ============ 01 · SERVICES ============ */}
      <section className="section" id="services" aria-labelledby="services-title">
        <Chapter num="01" label="What I offer">
          <h2 id="services-title" className="visually-hidden">
            Services
          </h2>
          <Stagger className="services" as="ul">
            {services.map((s) => (
              <Item as="li" className="service" key={s.idx}>
                <span className="service-index" aria-hidden="true">
                  {s.idx}
                </span>
                <h3>{s.title}</h3>
                <div className="service-body">
                  <p>{s.body}</p>
                  <ul className="tags" aria-label="Common reasons to visit">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {s.extras && (
                    <div className="service-extras">
                      <span className="label">Also offered</span>
                      <ul>
                        {s.extras.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Link to={s.to} className="service-cta" aria-label={`About ${s.title}`}>
                  <span className="circle">
                    <Arrow size={18} />
                  </span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </Chapter>
      </section>

      {/* ============ 02 · MEET NIAMH ============ */}
      <section className="section" aria-labelledby="niamh-title" style={{ paddingTop: 0 }}>
        <Chapter num="02" label="Your practitioner">
          <div className="grid-2">
            <Reveal>
              <div className="portrait">
                <img
                  src="/home-clinic.jpeg"
                  alt="Niamh's treatment room — acupuncture wall charts, a treatment table with towels, and a heat lamp"
                  loading="lazy"
                />
                <span className="tag">Kinsale & Carrigaline, Co. Cork</span>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 id="niamh-title" className="h2" style={{ fontSize: "clamp(1.9rem, 3.9vw, 3.6rem)" }}>
                Care from someone who <em>listens, understands and knows</em>
              </h2>
              <p style={{ marginTop: "1.5rem", color: "var(--muted)" }}>
                With over 20 years as a chartered physiotherapist across the NHS and Irish healthcare, Niamh brings deep
                experience in neurology, chronic pain, respiratory and the care of older adults. Most recently she
                qualified in traditional acupuncture, earning a Licentiate in Acupuncture with Distinction from the
                College of Medical Acupuncture and Traditional Chinese Medicine in Shannon, Co. Clare, and now blends
                both disciplines in every treatment. Her approach is warm and unhurried, taking the time to understand
                you and explain every step of your care.
              </p>
              <ul className="creds" aria-label="Qualifications">
                {["CORU Registered Physiotherapist", "ISCP Chartered Member", "BSc (Hons) Physiotherapy", "Lic.Ac (Distinction)"].map(
                  (c) => (
                    <li key={c}>
                      <i>
                        <Check size={12} />
                      </i>
                      {c}
                    </li>
                  )
                )}
              </ul>
              <p style={{ marginTop: "2rem" }}>
                <LinkArrow to="/meet-niamh">More about Niamh</LinkArrow>
              </p>
            </Reveal>
          </div>
        </Chapter>
      </section>

      {/* ============ 03 · YOUR FIRST VISIT ============ */}
      <section className="section on-dark" aria-labelledby="visit-title" style={{ background: "var(--ink)" }}>
        <Chapter num="03" label="Your first visit">
          <Reveal>
            <h2 id="visit-title" className="h2" style={{ marginBottom: "2.5rem" }}>
              What an hour with Niamh <em>looks like</em>
            </h2>
          </Reveal>
          <Stagger className="steps" as="ol">
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
        </Chapter>
      </section>

      {/* ============ 04 · PRACTICAL ============ */}
      <section className="section" aria-labelledby="practical-title">
        <Chapter num="04" label="The practical bits">
          <h2 id="practical-title" className="visually-hidden">
            Practical information
          </h2>
          <Stagger className="info">
            <Item className="info-card">
              <p className="eyebrow">Where to find me</p>
              {site.locations.map((loc, i) => (
                <div key={loc.name} style={{ marginBottom: i < site.locations.length - 1 ? "1.5rem" : 0 }}>
                  <address>
                    {loc.line1}
                    <br />
                    {loc.line2}
                    <br />
                    {loc.line3}
                    <br />
                    {loc.line4}
                  </address>
                  <LinkArrow href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" dir="upright">
                    Open in Maps
                  </LinkArrow>
                </div>
              ))}
            </Item>
            <Item className="info-card">
              <p className="eyebrow">Hours</p>
              <dl className="hours">
                {site.hours.map((h) => (
                  <div key={h.day}>
                    <dt>{h.day}</dt>
                    <dd>
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="note">Other days by arrangement.</p>
            </Item>
            <Item className="info-card">
              <p className="eyebrow">Fees</p>
              {site.fees.map((f) => (
                <div className="price-row" key={f.name}>
                  <span>{f.name.replace(" treatment", "")}</span>
                  <strong>
                    €{f.price}
                    <small>{f.duration}</small>
                  </strong>
                </div>
              ))}
              <p className="note">Receipts provided for {site.insurers.join(", ")}.</p>
              <LinkArrow to="/fees">All fees</LinkArrow>
            </Item>
          </Stagger>
        </Chapter>
      </section>

      <CTA
        title={
          <>
            Let's get you <em>moving</em> again, and <em>feeling your best</em>.
          </>
        }
        sub="Book online, or call and Niamh will help you work out whether physio, acupuncture or both is the right place to start."
      />
    </>
  );
}
