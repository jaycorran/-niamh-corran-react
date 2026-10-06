import { PageHero } from "../components/Shared";
import { LinkArrow } from "../components/Button";
import { site } from "../data/site";

export default function Terms() {
  return (
    <>
      <PageHero
        compact
        title="Terms and Conditions"
        lead="Please read this before booking or using this site"
        cta={false}
        aside={<p className="note">Last Updated: October 2026</p>}
      />

      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "62rem" }}>
          <div className="prose">
            <h2 id="scope-of-agreement">1. Scope of Agreement</h2>
            <p>
              These standard Terms and Conditions govern the utilization of this platform and any clinical treatment
              contracts made with {site.legalName}. By browsing this website or completing a service booking, you
              unconditionally accept these provisions in full.
            </p>

            <h2 id="cancellation-policy">2. Clinic Scheduling &amp; Cancellation Policies</h2>
            <ul>
              <li>
                Appointment Notice: To maintain professional continuity, the clinic enforces a strict 24-hour
                cancellation window.
              </li>
              <li>
                Fees for Late Cancellations: Cancellations completed within less than 24 hours of an allocated slot,
                or total no-show incidents, will incur a structural penalty fee equivalent to [percentage, e.g.,
                100%] of the planned appointment tariff.
              </li>
              <li>
                Late Arrivals: Should a patient arrive late, treatments will conclude precisely at the scheduled time
                to protect subsequent patients, with the full clinical fee remaining due.
              </li>
            </ul>

            <h2 id="payment-insurance">3. Payment &amp; Health Insurance Disclosures</h2>
            <ul>
              <li>
                Settlement Timeline: All outstanding session fees must be paid in full immediately upon the
                conclusion of each consultation or treatment session.
              </li>
              <li>
                Private Health Insurance: While our physical therapists maintain active CORU registrations and
                professional association certifications valid for claims with Irish health insurers (e.g., VHI, Laya,
                Irish Life Health), the structural responsibility for verifying specific policy coverage windows,
                caps, and claim limits rests exclusively with the individual patient.
              </li>
            </ul>

            <h2 id="clinical-disclosures">4. Clinical Disclosures &amp; Medical Intake Indemnity</h2>
            <p>
              Patients are legally and ethically obligated to supply complete, accurate, and transparent details
              regarding their full medical histories, current medication regimes, physical symptoms, and potential
              pregnancies during intake assessments. {site.legalName} accepts zero liability for any clinical
              complications, adverse reactions, or treatment issues arising from a patient's failure to disclose
              relevant physical or medical details.
            </p>

            <h2 id="governing-jurisdiction">5. Governing Jurisdiction</h2>
            <p>
              These terms, use of this site, and all formal clinical treatment practices are governed entirely by
              the laws of Ireland. Any formal legal disputes fall under the exclusive jurisdiction of the Irish court
              system.
            </p>

            <div className="legal-gaps-callout">
              <p className="eyebrow">Under review</p>
              <p>
                This document is being reviewed with our solicitor: some wording (including 'unconditional
                acceptance by browsing' and 'zero liability' phrasing, and the reference to 'our physical therapists'
                as a team) may need updating to reflect that Niamh is a sole practitioner and that liability for
                negligence causing personal injury cannot be excluded under Irish law.
              </p>
            </div>
          </div>

          <p style={{ marginTop: "2.5rem" }}>
            <LinkArrow to="/" dir="left">
              Back to home
            </LinkArrow>
          </p>
        </div>
      </section>
    </>
  );
}
