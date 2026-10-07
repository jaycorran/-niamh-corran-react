import { site } from "../data/site";

const claims = site.credentials.filter(
  (_, index, credentials) => index < 2 || index >= credentials.length - 2,
);

/** Four source-of-truth credentials in a slim, hairline ribbon. */
export function CertifiedBand() {
  return (
    <section className="certified-band credential-ribbon" aria-label="Credentials">
      <div className="container certified-band-inner credential-ribbon-inner">
        {claims.map((claim, index) => (
          <span className="certified-claim credential-claim" key={claim}>
            {index > 0 && <i aria-hidden="true" />}
            {claim}
          </span>
        ))}
      </div>
    </section>
  );
}
