import { PageHero } from "../components/Shared";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { Pin, Phone, Mail, Clock } from "../components/Icons";
import { site } from "../data/site";

// Pre-filled email template. Tapping the button opens the visitor's own email
// app with this ready to complete, no booking service or backend required.
const emailSubject = "Appointment enquiry";
const emailBody = `Hi Niamh,

I'd like to arrange an appointment. My details are below:

Name:
Phone:
Service (physiotherapy, acupuncture, combined, or not sure):
Preferred location (Kinsale or Carrigaline):
Preferred days & times:

A little about what's going on:


Thank you,`;

const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
  emailBody
)}`;

export default function Booking() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title={
          <>
            Book your <em>appointment</em>
          </>
        }
        lead="Get in touch by email or phone and Niamh will get back to you within one working day to arrange a time."
        cta={false}
        aside={
          <Button href={site.phoneHref} variant="glass">
            Call {site.phone}
          </Button>
        }
      />

      <section className="section">
        <div className="container split">
          <div className="sticky">
            <Reveal>
              <p className="eyebrow">Get in touch</p>
              <h2 className="h2" style={{ marginTop: "1rem" }}>
                How to <em>book</em>
              </h2>
              <p className="lead" style={{ marginTop: "1.25rem" }}>
                Get in touch by phone or email and Niamh will be happy to help. Let her know whether you'd like
                physiotherapy, acupuncture, or a combined appointment, along with a few times that would suit you.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="contact-list">
                <li>
                  <span className="ico">
                    <Pin />
                  </span>
                  <div>
                    <small>Locations</small>
                    {site.locations.map((loc) => (
                      <div key={loc.name}>
                        {loc.line1}, {loc.line2}, {loc.line3}, {loc.line4}
                      </div>
                    ))}
                  </div>
                </li>
                <li>
                  <span className="ico">
                    <Phone />
                  </span>
                  <div>
                    <small>Phone</small>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="ico">
                    <Mail />
                  </span>
                  <div>
                    <small>Email</small>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </li>
                <li>
                  <span className="ico">
                    <Clock />
                  </span>
                  <div>
                    <small>Opening hours</small>
                    <dl className="hours" style={{ marginTop: "0.5rem" }}>
                      {site.hours.map((h) => (
                        <div key={h.day}>
                          <dt>{h.day}</dt>
                          <dd>
                            {h.open} – {h.close}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="note" style={{ marginTop: "0.5rem" }}>
                      Other days by appointment.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="success" aria-label="Email Niamh">
              <h3>Email Niamh</h3>
              <p>
                The simplest way to get started is a short email. Tap the button below and your email app will open
                with a ready-made template, just fill in the gaps and send. Niamh replies within one working day.
              </p>
              <pre className="email-template">{emailBody}</pre>
              <Button href={mailtoHref} variant="coral" block>
                Email {site.email}
              </Button>
              <p className="form-status" style={{ color: "var(--muted-light)" }}>
                Prefer to talk? Call <a href={site.phoneHref}>{site.phone}</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
