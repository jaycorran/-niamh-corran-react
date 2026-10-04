import { PageHero } from "../components/Shared";
import { Button } from "../components/Button";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title={
        <>
          That page has <em>wandered off</em>
        </>
      }
      lead="The link may be old, or the page may have moved. Head back home, or book an appointment from here."
      cta={false}
      aside={
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button to="/" variant="ghost">
            Back home
          </Button>
          <Button to="/booking" variant="glass">
            Book a visit
          </Button>
        </div>
      }
    />
  );
}
