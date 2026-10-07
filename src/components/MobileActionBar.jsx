import { Button } from "./Button";
import { Phone, Calendar } from "./Icons";
import { site } from "../data/site";

/** Thumb-reachable call and booking actions on small screens. */
export function MobileActionBar({ hidden = false }) {
  return (
    <div className="mobile-action-bar quiet-actions" aria-hidden={hidden}>
      <Button href={site.phoneHref} variant="ghost" block>
        <Phone size={16} />
        <span>Call</span>
      </Button>
      <Button to="/booking" block>
        <Calendar size={16} />
        <span>Book</span>
      </Button>
    </div>
  );
}
