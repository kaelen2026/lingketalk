# @lingketalk/www

The [lingketalk.com](https://lingketalk.com) site: Next.js 16 App Router, React
19, Tailwind CSS v4, deployed to Vercel.

Commands normally run from the repo root through Turborepo — see the
[root README](../../README.md). To run them here directly:

```bash
pnpm dev           # dev server on :3000
pnpm build         # production build
pnpm start         # serve the production build
pnpm lint          # ESLint (Next.js + React rules)
pnpm check-types   # tsc --noEmit
pnpm test          # requires a prior `pnpm build`
```

## Shape

- `app/` — App Router routes. The landing page is a single static route.
  - `layout.tsx` holds the site metadata (title, Open Graph, Twitter card) and
    the shared chrome: `<header>` and `<footer>` render here, as siblings of
    `<main>`, so they keep their banner and contentinfo landmark roles.
  - `page.tsx` is a server component and renders only `<main>`;
    `subscription-form.tsx` is the only client component.
  - `arrow.tsx` wraps the single icon the site uses.
- `app/globals.css` — the whole stylesheet, hand-written on top of Tailwind v4.
- `public/` — static assets. The hero, editorial, and about images are served
  through `next/image` and optimized by Vercel at request time.
- `tests/` — boots `next start` against the real build and asserts the rendered
  HTML, so it catches metadata and server-render regressions.

## Notes

The subscription form is currently client-side only: it validates the address
and acknowledges the intent without persisting anything. Wiring it to a real
mailing list means adding a server action or route handler plus a store — there
is no database in this project today.

Icons come from [lucide-react](https://lucide.dev); do not hand-roll SVG paths.
Their size, stroke, and colour stay in the bare `svg` rule in `globals.css` —
lucide emits those as presentation attributes, which CSS outranks, so the
stylesheet keeps one house style for every icon.
