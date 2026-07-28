import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
