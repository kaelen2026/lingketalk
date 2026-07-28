import { About } from "./_sections/about";
import { Editorial } from "./_sections/editorial";
import { Hero } from "./_sections/hero";
import { Subscribe } from "./_sections/subscribe";

/**
 * The landing page is a reading order, so this file is deliberately just that
 * order. Each section owns its own markup and copy; the shared chrome around
 * <main> lives in `layout.tsx`.
 *
 * `_sections` is a private folder — the underscore keeps Next from treating it
 * as a route segment.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Editorial />
      <About />
      <Subscribe />
    </main>
  );
}
