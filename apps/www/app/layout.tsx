import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Arrow } from "./arrow";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lingketalk.com"),
  title: "Lingke Talk｜在 AI 时代，保持人的判断",
  description: "灵客关于科技、AI 与人的独立观察：AI 洞察、工具实践与人物对话。",
  openGraph: {
    title: "Lingke Talk｜在 AI 时代，保持人的判断",
    description: "AI 洞察、工具实践与人物对话。",
    url: "https://lingketalk.com",
    siteName: "Lingke Talk",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lingke Talk｜在 AI 时代，保持人的判断",
    description: "AI 洞察、工具实践与人物对话。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
