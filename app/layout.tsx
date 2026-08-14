import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const PortfolioKorean = localFont({
  src: "./fonts/pretendard-portfolio.woff2",
  display: "fallback",
  variable: "--font-portfolio-korean",
  weight: "100 900",
});

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "Portfolio";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "naedong";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${repositoryOwner}.github.io/${repositoryName}`).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "한원철 — Product Builder",
  description: "모바일 앱과 백엔드를 직접 설계하고 개발하는 한원철의 포트폴리오.",
  applicationName: "Woncheol Han Portfolio",
  authors: [{ name: "Woncheol Han", url: "https://github.com/naedong" }],
  creator: "Woncheol Han",
  keywords: ["Woncheol Han", "한원철", "Product Builder", "Flutter", "Kotlin", "Spring Boot", "Mobile Developer", "Portfolio"],
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: `${siteUrl}/favicon.png`, type: "image/png", sizes: "64x64" }],
  },
  openGraph: {
    title: "WONCHEOL HAN — PRODUCT BUILDER",
    description: "From product definition to working code. Explore UniCal, Deutsch Flow, TravelB and more.",
    type: "website",
    siteName: "Woncheol Han Portfolio",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Woncheol Han",
  alternateName: "한원철",
  url: siteUrl,
  sameAs: ["https://github.com/naedong"],
  knowsAbout: ["Product design", "Flutter", "Kotlin", "Spring Boot", "Mobile application development"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${GeistSans.variable} ${PortfolioKorean.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
