import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found-room">
      <div className="container not-found-inner">
        <Reveal gate={false}>
          <p className="eyebrow on-dark">404</p>
        </Reveal>
        <Reveal gate={false} delay={0.08}>
          <h1>
            That page has <em>wandered off</em>
          </h1>
        </Reveal>
        <Reveal gate={false} delay={0.16} className="not-found-aside">
          <p>The link may be old, or the page may have moved. Head back home, or book an appointment from here.</p>
          <div className="not-found-actions">
            <Button to="/" variant="ghost" className="not-found-ghost">
              Back home
            </Button>
            <Button to="/booking">Book a visit</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
