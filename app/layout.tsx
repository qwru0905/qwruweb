import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": "https://stx4r.me/",
  "name": "qwru0905의 개인 웹사이트",
  "inLanguage": "ko-KR",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://stx4r.me/#person",
    "name": "qwru0905",
    "url": "https://stx4r.me/",
    "email": "mailto:qwru0905@gmail.com",
    "description": "유튜버로 활동하는 동시에 여러가지 개발하는 사람.",
    "knowsLanguage": ["ko", "en"],
    "knowsAbout": ["C", "C++", "Python", "Java"],
    "sameAs": ["https://github.com/qwru0905"]
  }
}

export const metadata: Metadata = {
  title: "qwru0905's Web",
  description: "qwru0905의 개인 웹",
  authors: [{ name: "qwru0905" }],
  robots: "index follow max-image-preview:large",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
