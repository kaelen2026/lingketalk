import { ArrowRight } from "lucide-react";

/**
 * The one arrow glyph the whole site uses, on buttons and text links.
 *
 * Decorative: every call site already carries its own label, so the arrow is
 * hidden from assistive tech rather than announced as a second, empty link.
 *
 * Size and stroke stay in the bare `svg` rule in `globals.css` along with the
 * rest of the styling. Lucide emits `width`/`height`/`stroke-width` as
 * presentation attributes, and CSS declarations outrank those, so the
 * stylesheet still wins.
 */
export function Arrow() {
  return <ArrowRight aria-hidden="true" />;
}
