import { PageHero } from "../components/Shared";
import { LinkArrow } from "../components/Button";
import { site } from "../data/site";

const jumpLinks = [
  { id: "introduction", label: "1. Introduction" },
  { id: "data-controller", label: "2. Data Controller" },
  { id: "legal-basis", label: "3. Legal Basis for Processing Data" },
  { id: "information-we-collect", label: "4. Information We Collect" },
  { id: "data-retention", label: "5. Data Retention" },
  { id: "your-rights", label: "6. Your Rights" },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        compact
        title="Privacy Policy"
        lead="How we collect, use and protect your information"
        cta={false}
        aside={
          <>
            <p className="note">Last Updated: October 2026</p>
            <ul className="col-list">
              {jumpLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </>
        }
      />

      <section className="section" style={{ background: "var(--cloud)" }}>
        <div className="container" style={{ maxWidth: "62rem" }}>
          <div className="prose">
            <h2 id="introduction">1. Introduction</h2>
            <p>
              This Privacy Policy documents how {site.legalName} collects, uses, stores, and protects personal and
              medical data obtained from users of our website and patients attending our clinic for physiotherapy
              and acupuncture treatments in Ireland. We are fully committed to protecting your privacy in accordance
              with the Irish Data Protection Acts 1988–2018 and the General Data Protection Regulation (GDPR).
            </p>

            <h2 id="data-controller">2. Data Controller</h2>
            <p>
              The Data Controller responsible for your personal data is:
              <br />
              {site.legalName}
              <br />
              {site.registeredAddress.line1}, {site.registeredAddress.line2}, {site.registeredAddress.line3},{" "}
              {site.registeredAddress.line4}
              <br />
              Email: {site.email}
              <br />
              Phone: {site.phone}
            </p>

            <h2 id="legal-basis">3. Legal Basis for Processing Data</h2>
            <p>We process personal and special category data under the following legal bases:</p>
            <ul>
              <li>
                Article 6(1)(b) GDPR (Contract): To fulfill, manage, and execute appointments and treatment
                contracts.
              </li>
              <li>
                Article 6(1)(c) GDPR (Legal Obligation): To maintain statutory medical, tax, and corporate accounting
                archives.
              </li>
              <li>
                Article 9(2)(h) GDPR (Special Category Data): Processing is strictly necessary for the purposes of
                preventive or occupational medicine, medical diagnosis, and the provision of health or social care
                treatment.
              </li>
            </ul>

            <h2 id="information-we-collect">4. Information We Collect</h2>
            <p>We collect and hold several tiers of patient data:</p>
            <ul>
              <li>Identity Data: Full name, date of birth, gender.</li>
              <li>Contact Data: Physical address, email address, telephone numbers.</li>
              <li>
                Medical &amp; Special Category Data: Clinical intake files, medical symptoms, diagnosis records,
                acupuncture and physiotherapy treatment logs, relevant medications, and health history.
              </li>
              <li>Financial Data: Payment card footprints, billing logs, and insurance provider validation details.</li>
            </ul>

            <h2 id="data-retention">5. Data Retention</h2>
            <p>
              In compliance with national clinical standards and Irish medical indemnity insurance guidelines,
              medical records (including consultation and treatment notes) are securely retained for a minimum of 8
              years following the date of the last treatment. For minor patients, clinical data is securely retained
              until their 26th birthday.
            </p>

            <h2 id="your-rights">6. Your Rights</h2>
            <p>Under GDPR, you retain comprehensive rights over your personal data:</p>
            <ul>
              <li>Right of Access: You may request copies of all medical charts and personal files we hold.</li>
              <li>Right to Rectification: Request corrections to inaccurate personal data.</li>
              <li>
                Right to Erasure: Request deletion of data (note that statutory medical record retention rules
                override immediate deletion requests for clinical notes).
              </li>
              <li>
                Right to Complain: You have the right to lodge a formal complaint with the Data Protection
                Commission (DPC) of Ireland (
                <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer">
                  www.dataprotection.ie
                </a>
                ).
              </li>
            </ul>

            <div className="legal-gaps-callout">
              <p className="eyebrow">Under review</p>
              <p>
                This policy is being reviewed with our solicitor to add detail on: who else sees your data
                (including our email provider), how long enquiry emails and non-clinical records are kept, your
                rights to restrict, object to, and port your data, our data security measures, and a dedicated
                contact route for privacy requests.
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
