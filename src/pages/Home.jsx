import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, LinkArrow } from "../components/Button";
import { Marquee, CTA, Chapter, Wave } from "../components/Shared";
import { CertifiedBand } from "../components/CertifiedBand";
import { Reveal, Stagger, Item, Lines } from "../components/Reveal";
import { Arrow, Check } from "../components/Icons";
import { site, openNow, physioAreas, acupunctureAreas } from "../data/site";
import "./Home.css";

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

// First three entries of Faq.jsx's `faqs` array, duplicated verbatim (Faq.jsx does not export
// the array, and is owned by another stream — not edited here) for the FAQ teaser below.
const faqTeaser = [
  {
    q: "What should I wear?",
    a: "Comfortable, loose-fitting clothing is best, so Niamh can assess and treat the affected area easily. Please also bring a pair of shorts to every appointment.",
  },
  {
    q: "Is acupuncture safe?",
    a: "Yes. At the clinic, acupuncture is carried out by a chartered physiotherapist with specific training and qualifications in the technique. The needles are sterile, single-use and safely disposed of after every treatment.",
  },
  {
    q: "Does acupuncture hurt?",
    a: "It isn't a painful treatment. The fine needles are usually inserted just a few millimetres and produce a mild sensation at most. You may notice a small scratch as a needle goes in, and it's usually pain-free on removal.",
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
        {/* Treatment photo: the right-hand panel on desktop, fading into cream towards
            the copy; below the copy on mobile. A soft bottom fade blends into the Wave
            divider. */}
        <div className="hero-media">
          <img
            className="hero-media__img"
            src="/images/hamstring-treatment-sunlit-room-1672.webp"
            srcSet="/images/hamstring-treatment-sunlit-room-900.webp 900w, /images/hamstring-treatment-sunlit-room-1672.webp 1672w"
            sizes="(min-width: 900px) 60vw, 100vw"
            width="1672"
            height="941"
            alt="Niamh treating a patient in her clinic, bending their knee to stretch the hamstring"
            fetchPriority="high"
            decoding="async"
          />
          <span className="hero-media__fade" aria-hidden="true" />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <Reveal gate={false} delay={0.05} y={10}>
              <p className="eyebrow hero-eyebrow">
                Chartered physiotherapy & acupuncture
                <br />
                Kinsale & Carrigaline, Co. Cork
              </p>
            </Reveal>
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
            <Reveal gate={false} delay={0.5}>
              <p className="lead hero-lead">
                Niamh provides chartered physiotherapy and traditional acupuncture, whether on their own or together,
                to get to the root of what's going on and build a plan that works for you.
              </p>
              <div className="hero-actions">
                <Button to="/booking" variant="coral">
                  Book an appointment
                </Button>
                <Button href="#services" variant="ghost">
                  How I can help
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
        <Wave fill="var(--cream)" />
      </section>

      <CertifiedBand />

      {/* ============ PRACTICAL BITS ============ */}
      <section className="section" aria-labelledby="practical-title" style={{ background: "var(--cream-2)" }}>
        <Chapter num="01" label="The practical bits">
          <h2 id="practical-title" className="visually-hidden">
            Practical information
          </h2>
          <Stagger className="info">
            {site.locations.map((loc) => (
              <Item className="info-card" key={loc.name}>
                <p className="eyebrow">{loc.name}</p>
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
                {loc.name === site.locations[0].name && <OpenStatus />}
              </Item>
            ))}
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
          <div className="insurer-badges" aria-label="Insurers">
            {site.insurers.map((ins) => (
              <span className="insurer-badge" key={ins}>
                {ins}
              </span>
            ))}
          </div>
        </Chapter>
      </section>

      <Marquee items={marqueeItems} />

      {/* ============ SERVICES ============ */}
      <section className="section" id="services" aria-labelledby="services-title">
        <Chapter num="02" label="What I offer">
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

      {/* ============ PHOTO BAND · coastal stretch ============ */}
      <section className="photo-band" aria-labelledby="band-title">
        <img
          className="photo-band__bg"
          src="/images/coast-2400.webp"
          srcSet="/images/coast-1200.webp 1200w, /images/coast-2400.webp 2400w"
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="photo-band__scrim" aria-hidden="true" />
        <img
          className="photo-band__figure"
          src="/images/stretch-1600.webp"
          srcSet="/images/stretch-900.webp 600w, /images/stretch-1600.webp 1067w"
          sizes="(max-width: 767px) 80vw, 45vw"
          alt="Woman easing tension in her neck and lower back"
          loading="lazy"
          decoding="async"
        />
        <div className="container photo-band__inner">
          <Reveal>
            <h2 id="band-title" className="photo-band__title">
              Get back to what <em>you love.</em>
            </h2>
            <div className="photo-band__actions">
              <Button to="/booking" variant="coral">
                Book an appointment
              </Button>
              <LinkArrow to="/physiotherapy">About physiotherapy</LinkArrow>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MEET NIAMH ============ */}
      <section className="section" aria-labelledby="niamh-title" style={{ paddingTop: 0, background: "var(--seafoam-tint)" }}>
        <Chapter num="03" label="Your practitioner">
          <div className="grid-2">
            <Reveal>
              <div className="portrait">
                <img
                  className="niamh-photo"
                  src="/images/niamh-corran-portrait-1400.webp"
                  srcSet="/images/niamh-corran-portrait-800.webp 800w, /images/niamh-corran-portrait-1400.webp 1400w"
                  sizes="(min-width: 900px) 45vw, 100vw"
                  width="1400"
                  height="1868"
                  alt="Niamh Corran, chartered physiotherapist and acupuncturist"
                  loading="lazy"
                />
                <span className="tag">Kinsale & Carrigaline, Co. Cork</span>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 id="niamh-title" className="h2" style={{ fontSize: "clamp(1.9rem, 3.9vw, 3.6rem)" }}>
                Care from someone who <em>listens, understands and knows</em>
              </h2>
              <p style={{ marginTop: "1.5rem", color: "var(--ink-soft)" }}>
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

      {/* ============ YOUR FIRST VISIT ============ */}
      <section className="section" aria-labelledby="visit-title" style={{ background: "var(--cloud)" }}>
        <Chapter num="04" label="Your first visit">
          <Reveal>
            <h2 id="visit-title" className="h2" style={{ marginBottom: "2.5rem" }}>
              What an hour with Niamh <em>looks like</em>
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
        </Chapter>
      </section>

      {/* ============ FAQ TEASER ============ */}
      <section className="section" aria-labelledby="faq-teaser-title" style={{ background: "var(--seafoam-tint)" }}>
        <Chapter num="05" label="Good questions">
          <Reveal>
            <h2 id="faq-teaser-title" className="h2" style={{ marginBottom: "2.5rem" }}>
              Before your <em>first visit</em>
            </h2>
          </Reveal>
          <Stagger className="faq-teaser">
            {faqTeaser.map((f) => (
              <Item as="div" className="info-card" key={f.q}>
                <h3 className="h3" style={{ fontSize: "1.15rem" }}>
                  {f.q}
                </h3>
                <p className="note">{f.a}</p>
              </Item>
            ))}
          </Stagger>
          <p style={{ marginTop: "2.5rem" }}>
            <LinkArrow to="/faq">See all FAQs</LinkArrow>
          </p>
        </Chapter>
      </section>

      {/* ============ LOCATION/HOURS BAND ============ */}
      <section className="section location-hours-band" aria-labelledby="hours-title" style={{ background: "var(--seafoam-tint)" }}>
        <Chapter num="06" label="Where & when">
          <h2 id="hours-title" className="visually-hidden">
            Location and hours
          </h2>
          <Stagger className="info">
            {site.locations.map((loc) => (
              <Item className="info-card" key={loc.name}>
                <p className="eyebrow">{loc.name}</p>
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
              </Item>
            ))}
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
              <OpenStatus />
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
