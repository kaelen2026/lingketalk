import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Arrow } from "./arrow";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SHARE_DESCRIPTION,
  SITE_TITLE,
} from "./site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

/**
 * No `icons` entry: `app/icon.svg` is picked up by the file convention, which
 * emits the link tag with a content hash so the icon busts its own cache.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  // `default` is the landing page's own title; `template` frames every other
  // route's, so they only have to name themselves.
  title: {
    default: SITE_TITLE,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SHARE_DESCRIPTION,
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_SHARE_DESCRIPTION,
    images: ["/og.png"],
  },
};

/**
 * Separate from `metadata` — Next split viewport out of it in 14.
 *
 * `themeColor` has to restate `--paper` from `globals.css` as a literal, since
 * a custom property is not readable from here. Keep the two in step.
 * `colorScheme` is declared because the design is light-only; without it a
 * browser may try to force-darken form controls.
 */
export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
};

/**
 * Site chrome lives here rather than in `page.tsx` for two reasons: it is the
 * App Router's place for anything shared across routes, and it keeps <header>
 * and <footer> as siblings of <main>. Nested inside <main> they would lose
 * their banner and contentinfo roles, taking them out of landmark navigation.
 *
 * `id="top"` sits on the header so the wordmark's `#top` really means the top
 * of the page — pointing it at the hero would scroll the header out of view.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.variable}>
        <header className="site-header shell" id="top">
          <a className="wordmark" href="#top" aria-label="Lingke Talk 首页">
            LINGKE TALK
          </a>
          <nav aria-label="主导航">
            <a href="#insight">洞察</a>
            <a href="#practice">实践</a>
            <a href="#about">关于</a>
          </nav>
          <a className="button button-small" href="#subscribe">
            订阅 <span>Lingke Talk</span>
            <Arrow />
          </a>
        </header>

        {children}

        <footer className="shell">
          <div>
            <a className="wordmark" href="#top">
              LINGKE TALK
            </a>
            <p>科技在变，人的判断更重要。</p>
          </div>
          <div className="socials">
            <span>社交账号即将上线</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
