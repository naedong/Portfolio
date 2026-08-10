import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://signal-garden-hwc.gim21041.chatgpt.site"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "한원철 — Product Builder",
  description: "모바일 앱, 안전 중심 백엔드, AI 기능을 직접 설계하고 구현하는 한원철의 인터랙티브 포트폴리오.",
  openGraph: {
    title: "WONCHEOL HAN — PRODUCT BUILDER",
    description: "From product definition to working code. Explore UniCal, Deutsch Flow, Friend and more.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og.png`, width: 1731, height: 909, alt: "Woncheol Han Product Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WONCHEOL HAN — PRODUCT BUILDER",
    description: "Mobile, backend and AI products — designed and built end to end.",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  );
}
