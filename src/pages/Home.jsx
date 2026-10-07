import { useEffect, useState } from "react";
import { Button, LinkArrow } from "../components/Button";
import {
  ClosingRoom,
  HorizonRule,
  MarginNoteSection,
  PhotoWindow,
  QuietRiver,
  TypographicPageHero,
} from "../components/Shared";
import { CertifiedBand } from "../components/CertifiedBand";
import { Reveal } from "../components/Reveal";
import { Check } from "../components/Icons";
import { acupunctureAreas, openNow, physioAreas, site } from "../data/site";
import "./Home.css";

const lead =
  "Niamh provides chartered physiotherapy and traditional acupuncture, whether on their own or together, to get to the root of what's going on and build a plan that works for you.";

const bio =
  "With over 20 years as a chartered physiotherapist across the NHS and Irish healthcare, Niamh brings deep experience in neurology, chronic pain, respiratory and the care of older adults. Most recently she qualified in traditional acupuncture, earning a Licentiate in Acupuncture with Distinction from the College of Medical Acupuncture and Traditional Chinese Medicine in Shannon, Co. Clare, and now blends both disciplines in every treatment. Her approach is warm and unhurried, taking the time to understand you and explain every step of your care.";

const practitionerCredentials = site.credentials.slice(0, 4);

const services = [
  {
    number: "01",
    title: "Physiotherapy",
    to: "/physiotherapy",
    link: "About Physiotherapy",
    body:
      "Chartered assessment and hands-on treatment to restore movement and strength after injury or surgery, or helping with the stresses and strains of everyday life. Every plan comes with a home exercise programme and a clear reason for each part of it.",
    areas: physioAreas,
  },
  {
    number: "02",
    title: "Acupuncture",
    to: "/acupuncture",
    link: "About Acupuncture",
    body:
      "Traditional acupuncture, practised gently and explained plainly. Fine, single-use needles at carefully chosen points to ease pain, settle the nervous system and support the body's own recovery.",
    areas: acupunctureAreas,
    extras: ["Cupping therapy", "Electro-acupuncture"],
  },
  {
    number: "03",
    title: "Combined care",
    to: "/fees",
    link: "All fees",
    body:
      "Where it helps, both approaches in a single session: manual therapy and exercise for the mechanics, acupuncture for pain, tension and recovery. No referrals, no repeating your story.",
    extras: ["Persistent pain", "Injury recovery", "Whole-person care"],
  },
];

const riverItems = [...physioAreas, ...acupunctureAreas];
const brandLines = site.brandLine.match(/[^.]+\./g) ?? [site.brandLine];

function OpenStatus({ className = "" }) {
  const [status, setStatus] = useState(() => openNow());

  useEffect(() => {
    const id = setInterval(() => setStatus(openNow()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={["status", status.open ? "" : "closed", className].filter(Boolean).join(" ")} aria-live="polite">
      <i aria-hidden="true" />
      {status.label}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <TypographicPageHero
        className="home-welcome"
        eyebrow="Chartered physiotherapy & acupuncture · Kinsale & Carrigaline, Co. Cork"
        title={
          <span className="home-welcome-title">
            {brandLines.map((line, index) => {
              const content = line.trim();
              return (
                <span key={content}>
                  {index === brandLines.length - 1 ? <em>{content}</em> : content}
                  {" "}
                </span>
              );
            })}
          </span>
        }
        lead={lead}
        cta={false}
        aside={
          <>
            <div className="home-welcome-actions">
              <Button to="/booking">Book an appointment</Button>
              <LinkArrow href="#help" dir="down">
                How I can help
              </LinkArrow>
            </div>
            <div className="home-welcome-contact">
              <OpenStatus className="home-welcome-status" />
              <span aria-hidden="true">·</span>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
            <PhotoWindow
              className="home-welcome-photo"
              src="/home-clinic.jpeg"
              alt="Niamh's treatment room — acupuncture wall charts, a treatment table with towels, and a heat lamp"
              aspect="3 / 4"
              caption="The treatment room."
              loading="eager"
            />
          </>
        }
      />
      <HorizonRule className="home-welcome-horizon" />

      <CertifiedBand />

      <section className="home-practitioner" aria-labelledby="practitioner-title">
        <MarginNoteSection note="01 — Your practitioner">
          <Reveal className="home-practitioner-grid">
            <PhotoWindow
              className="home-niamh-photo"
              imageClassName="home-niamh-image"
              src="/Niamh.jpeg"
              alt="Niamh Corran, chartered physiotherapist and acupuncturist"
              aspect="3 / 4"
              objectPosition="center top"
            />
            <div className="home-practitioner-copy">
              <h2 id="practitioner-title">
                Care from someone who <em>listens, understands and knows</em>
              </h2>
              <p>{bio}</p>
              <ul className="home-credentials" aria-label="Qualifications">
                {practitionerCredentials.map((credential) => (
                  <li key={credential}>
                    <span aria-hidden="true">
                      <Check size={13} />
                    </span>
                    {credential}
                  </li>
                ))}
              </ul>
              <div className="home-practitioner-links">
                <LinkArrow to="/meet-niamh">More about Niamh</LinkArrow>
              </div>
            </div>
          </Reveal>
        </MarginNoteSection>
      </section>

      <section className="home-ledger" id="help" aria-labelledby="ledger-title">
        <MarginNoteSection note="02 — What I offer">
          <h2 id="ledger-title" className="visually-hidden">
            Services
          </h2>
          <div className="home-ledger-list">
            {services.map((service) => (
              <Reveal as="article" className="home-ledger-entry" key={service.number}>
                <span className="home-ledger-number" aria-hidden="true">
                  {service.number}
                </span>
                <div className="home-ledger-copy">
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  {service.areas && (
                    <ul className="home-ledger-areas" aria-label={`${service.title} treatment areas`}>
                      {service.areas.map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  )}
                  {service.extras && (
                    <ul className="home-ledger-tags" aria-label={`${service.title} options`}>
                      {service.extras.map((extra) => (
                        <li key={extra}>{extra}</li>
                      ))}
                    </ul>
                  )}
                  <LinkArrow to={service.to}>{service.link}</LinkArrow>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginNoteSection>
      </section>

      <section className="home-photo-band" aria-labelledby="home-band-title">
        <img
          className="home-photo-band-bg"
          src="/images/coast-2400.webp"
          srcSet="/images/coast-1200.webp 1200w, /images/coast-2400.webp 2400w"
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="home-photo-band-scrim" aria-hidden="true" />
        <img
          className="home-photo-band-figure"
          src="/images/stretch-1600.webp"
          srcSet="/images/stretch-900.webp 600w, /images/stretch-1600.webp 1067w"
          sizes="(max-width: 767px) 80vw, 45vw"
          alt="Woman easing tension in her neck and lower back"
          loading="lazy"
          decoding="async"
        />
        <div className="container home-photo-band-inner">
          <Reveal gate={false}>
            <h2 id="home-band-title" className="home-photo-band-title">
              Get back to what <em>you love.</em>
            </h2>
            <div className="home-photo-band-actions">
              <Button to="/booking">Book an appointment</Button>
              <LinkArrow to="/physiotherapy">About Physiotherapy</LinkArrow>
            </div>
          </Reveal>
        </div>
      </section>

      <QuietRiver className="home-river" items={riverItems} />

      <section className="home-practical" aria-labelledby="practical-title">
        <MarginNoteSection note="03 — The practical bits">
          <h2 id="practical-title" className="visually-hidden">
            Practical information
          </h2>
          <div className="home-practical-panels">
            {site.locations.map((location, index) => (
              <Reveal as="article" className="home-paper-panel" key={location.name} delay={index * 0.06}>
                <p className="home-panel-kicker">{location.name}</p>
                <address>
                  {location.line1}
                  <br />
                  {location.line2}
                  <br />
                  {location.line3}
                  <br />
                  {location.line4}
                </address>
                <LinkArrow href={location.mapsUrl} target="_blank" rel="noopener noreferrer" dir="upright">
                  Open in Maps
                </LinkArrow>
                {index === 0 && <OpenStatus />}
              </Reveal>
            ))}

            <Reveal as="article" className="home-paper-panel home-fees-panel" delay={0.12}>
              <p className="home-panel-kicker">Fees</p>
              <div className="home-prices">
                {site.fees.map((fee) => (
                  <div className="home-price" key={fee.name}>
                    <span>{fee.name}</span>
                    <strong>€{fee.price}</strong>
                    <small>{fee.duration}</small>
                  </div>
                ))}
              </div>
              <dl className="home-hours">
                {site.hours.map((hours) => (
                  <div key={hours.day}>
                    <dt>{hours.day}</dt>
                    <dd>
                      {hours.open} – {hours.close}
                    </dd>
                  </div>
                ))}
              </dl>
              <p>Other days by arrangement.</p>
              <p>Receipts provided for {site.insurers.join(", ")}.</p>
              <Button to="/booking">Book an appointment</Button>
            </Reveal>
          </div>
          <ul className="home-insurers" aria-label="Health insurers">
            {site.insurers.map((insurer) => (
              <li key={insurer}>{insurer}</li>
            ))}
          </ul>
        </MarginNoteSection>
      </section>

      <ClosingRoom
        className="home-closing"
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
