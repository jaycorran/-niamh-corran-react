import { PageHero } from "../components/Shared";
import { Button } from "../components/Button";

export default function NotFound() {
  return (
    <PageHero
      title={
        <>
          That page has <em>wandered off</em>
        </>
      }
      lead="The link may be old, or the page may have moved. Head back home, or book an appointment from here."
      cta={false}
      compact
      aside={
        <div className="btn-row">
          <Button to="/" variant="ghost">
            Back home
          </Button>
          <Button to="/booking" variant="coral">
            Book a visit
          </Button>
        </div>
      }
    />
  );
}
