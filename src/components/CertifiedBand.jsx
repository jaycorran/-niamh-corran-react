import { site } from "../data/site";

// The four short, verbatim claims this band restates — read directly from site.credentials
// (confirmed to contain each string exactly as written) so the band can never drift from the
// single source of truth.
const bandClaims = ["CORU Registered Physiotherapist", "ISCP Chartered Member", "20+ years' experience", "Fully insured"];
const claims = bandClaims.filter((c) => site.credentials.includes(c));

/**
 * CertifiedBand: a slim --harbour band directly below the Home hero, restating four
 * credential claims (verbatim from site.credentials) separated by a sparkle/dot glyph.
 */
export function CertifiedBand() {
  return (
    <section className="certified-band" aria-label="Credentials">
      <div className="container certified-band-inner">
        {claims.map((c, i) => (
          <span className="certified-claim" key={c}>
            {i > 0 && <i aria-hidden="true" />}
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
