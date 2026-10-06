/* Icon set.
 *
 * `Arrow` stays hand-rolled to preserve its `dir` rotation API (used by Button and
 * LinkArrow, including the 45° "upright" variant). Every other export is a thin wrapper
 * over lucide-react (ISC licensed), keeping the original component name and `size` prop so
 * no page or component import has to change — the "ugly" hand-drawn glyphs are swapped for
 * lucide behind the same names (design §2.11). All lucide wrappers inherit currentColor and
 * use a 1.6 absolute stroke width.
 */
import {
  Check as LuCheck,
  Star as LuStar,
  MapPin,
  Phone as LuPhone,
  Mail as LuMail,
  Clock as LuClock,
  CalendarDays,
  ShieldCheck,
  Leaf as LuLeaf,
  Moon as LuMoon,
  Flower2,
  PersonStanding,
  Flower as LuFlower,
  Bone,
  Activity,
  Accessibility as LuAccessibility,
  Stethoscope,
  Brain as LuBrain,
} from "lucide-react";

const STROKE = { strokeWidth: 1.6, absoluteStrokeWidth: true };

/* Hand-rolled directional arrow — keeps the `dir` rotation API. */
export function Arrow({ size = 16, dir = "right", ...rest }) {
  const rot = { right: 0, down: 90, left: 180, up: -90, upright: -45 }[dir] ?? 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rot}deg)` }}
      {...rest}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Utility glyphs */
export function Check({ size = 18, ...rest }) {
  return <LuCheck size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Star({ size = 18, ...rest }) {
  return <LuStar size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Pin({ size = 18, ...rest }) {
  return <MapPin size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Phone({ size = 18, ...rest }) {
  return <LuPhone size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Mail({ size = 18, ...rest }) {
  return <LuMail size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Clock({ size = 18, ...rest }) {
  return <LuClock size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Calendar({ size = 18, ...rest }) {
  return <CalendarDays size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Shield({ size = 18, ...rest }) {
  return <ShieldCheck size={size} aria-hidden="true" {...STROKE} {...rest} />;
}

/* Themed illustrative glyphs for acupuncture / physio features */
export function Leaf({ size = 24, ...rest }) {
  return <LuLeaf size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Moon({ size = 24, ...rest }) {
  return <LuMoon size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Flower({ size = 24, ...rest }) {
  return <Flower2 size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Body({ size = 24, ...rest }) {
  return <PersonStanding size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Lotus({ size = 24, ...rest }) {
  return <LuFlower size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Spine({ size = 24, ...rest }) {
  return <Bone size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Joint({ size = 24, ...rest }) {
  return <Bone size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Pulse({ size = 24, ...rest }) {
  return <Activity size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Cane({ size = 24, ...rest }) {
  return <LuAccessibility size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Scalpel({ size = 24, ...rest }) {
  return <Stethoscope size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
export function Brain({ size = 24, ...rest }) {
  return <LuBrain size={size} aria-hidden="true" {...STROKE} {...rest} />;
}
