import { Button } from "./Button";
import { Phone, Calendar } from "./Icons";
import { site } from "../data/site";

/**
 * Fixed bottom action bar shown only on mobile (<=767px, via CSS). Gives a thumb-reachable
 * call/book pair at all times. Hidden while the full-screen menu is open.
 */
export function MobileActionBar({ hidden = false }) {
  return (
    <div className="mobile-action-bar" aria-hidden={hidden}>
      <Button href={site.phoneHref} variant="ghost" block>
        <Phone size={16} />
        <span>Call</span>
      </Button>
      <Button to="/booking" variant="coral" block>
        <Calendar size={16} />
        <span>Book</span>
      </Button>
    </div>
  );
}
