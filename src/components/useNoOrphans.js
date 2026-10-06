import { useEffect } from "react";

// Typographic "no orphans": glue the last two words of every text block with a
// non-breaking space so no paragraph, list item or heading ever ends with a single
// word on its own line. CSS `text-wrap: pretty` (index.css) handles most cases, but
// Chrome only re-wraps when the last line is *visually* short, so a long final word
// ("breathlessness.") in a narrow card can still sit alone. The copy itself is
// unchanged; only the final breakable space becomes U+00A0.
const BLOCKS = "p, li, dd, dt, h1, h2, h3, h4, figcaption, blockquote";
const SKIP = ".marquee, pre, [aria-hidden='true']";
const BREAKABLE = /[ \t\n\r]/;
const MIN_WORDS = 3;
const MAX_PAIR_CHARS = 24; // never glue a pair too long to fit a narrow column

function glue(el) {
  if (el.closest(SKIP) || el.querySelector(BLOCKS)) return;
  const words = el.textContent.trim().split(/\s+/);
  if (words.length < MIN_WORDS) return;
  if (words.slice(-2).join(" ").length > MAX_PAIR_CHARS) return;

  const nodes = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) nodes.push(walker.currentNode);

  let seenWord = false;
  for (let n = nodes.length - 1; n >= 0; n--) {
    const text = nodes[n].nodeValue;
    for (let i = text.length - 1; i >= 0; i--) {
      const ch = text[i];
      if (ch === "\u00A0") return; // already glued
      if (BREAKABLE.test(ch)) {
        if (seenWord) {
          // Also swap hyphens in the glued pair for non-breaking hyphens (U+2011, present
          // in Plus Jakarta Sans), otherwise "long-term wellbeing" just breaks at "long-".
          let start = i;
          while (start > 0 && !BREAKABLE.test(text[start - 1])) start--;
          const pair = (text.slice(start, i) + "\u00A0" + text.slice(i + 1)).replace(/-/g, "\u2011");
          nodes[n].nodeValue = text.slice(0, start) + pair;
          return;
        }
      } else {
        seenWord = true;
      }
    }
  }
}

export function useNoOrphans(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      document.querySelectorAll(BLOCKS).forEach(glue);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    schedule();
    // Re-run when routes change, accordions open, etc. Our own edit is idempotent, so the
    // characterData mutation it causes settles after one extra no-op pass.
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);
}
