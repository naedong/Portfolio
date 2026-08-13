import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "Portfolio";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "naedong";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${repositoryOwner}.github.io/${repositoryName}`).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "한원철 — Product Builder",
  description: "모바일 앱과 백엔드를 직접 설계하고 개발하는 한원철의 포트폴리오.",
  openGraph: {
    title: "WONCHEOL HAN — PRODUCT BUILDER",
    description: "From product definition to working code. Explore UniCal, Deutsch Flow, TravelB and more.",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-v2.png`, width: 1731, height: 909, alt: "Woncheol Han — Product Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WONCHEOL HAN — PRODUCT BUILDER",
    description: "Mobile products and secure backends — designed and built end to end.",
    images: [`${siteUrl}/og-v2.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  );
}
