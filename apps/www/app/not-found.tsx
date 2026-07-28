import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "./arrow";

/** The layout's title template appends the site name. */
export const metadata: Metadata = {
  title: "页面不存在",
};

/**
 * Renders inside the root layout, so the header and footer come for free and a
 * wrong URL still lands somewhere that looks like the site.
 *
 * Supplies its own <main> because it replaces `page.tsx` entirely.
 */
export default function NotFound() {
  return (
    <main className="not-found shell">
      <span className="section-number">404</span>
      <h1>这一页还没有写。</h1>
      <p>链接可能已经失效，也可能这篇内容还没有发布。</p>
      <Link className="button" href="/">
        回到首页
        <Arrow />
      </Link>
    </main>
  );
}
