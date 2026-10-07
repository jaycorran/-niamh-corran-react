import { Button } from "../components/Button";
import { Clock, Mail, Phone, Pin } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { TypographicPageHero } from "../components/Shared";
import { site } from "../data/site";
import "./Booking.css";

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
      <TypographicPageHero
        title={
          <>
            Book your <em>appointment</em>
          </>
        }
        lead="Get in touch by email or phone and Niamh will get back to you within one working day to arrange a time."
        cta={false}
        aside={
          <Button href={site.phoneHref} variant="glass" className="booking-call-pill">
            Call {site.phone}
          </Button>
        }
      />

      <section className="booking-section">
        <div className="container booking-grid">
          <Reveal className="booking-contact">
            <p className="eyebrow">Get in touch</p>
            <h2>
              How to <em>book</em>
            </h2>
            <p className="booking-intro">
              Get in touch by phone or email and Niamh will be happy to help. Let her know whether you'd like
              physiotherapy, acupuncture, or a combined appointment, along with a few times that would suit you.
            </p>

            <ul className="booking-ledger">
              <li>
                <span className="booking-icon">
                  <Pin />
                </span>
                <div>
                  <h3>Locations</h3>
                  {site.locations.map((location) => (
                    <address key={location.name}>
                      <strong>{location.name}</strong>
                      <span>
                        {location.line1}, {location.line2}, {location.line3}, {location.line4}
                      </span>
                    </address>
                  ))}
                </div>
              </li>
              <li>
                <span className="booking-icon">
                  <Phone />
                </span>
                <div>
                  <h3>Phone</h3>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </li>
              <li>
                <span className="booking-icon">
                  <Mail />
                </span>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
              <li>
                <span className="booking-icon">
                  <Clock />
                </span>
                <div>
                  <h3>Opening hours</h3>
                  <dl className="booking-hours">
                    {site.hours.map((hours) => (
                      <div key={hours.day}>
                        <dt>{hours.day}</dt>
                        <dd>
                          {hours.open} – {hours.close}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="booking-note">Other days by appointment.</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal as="aside" delay={0.1} className="email-panel" aria-label="Email Niamh">
            <h2>Email Niamh</h2>
            <p>
              The simplest way to get started is a short email. Tap the button below and your email app will open
              with a ready-made template, just fill in the gaps and send. Niamh replies within one working day.
            </p>
            <pre className="email-template">{emailBody}</pre>
            <Button href={mailtoHref} block>
              Email {site.email}
            </Button>
            <p className="booking-status">
              Prefer to talk? Call <a href={site.phoneHref}>{site.phone}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
