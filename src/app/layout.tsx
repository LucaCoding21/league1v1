import type { Metadata, Viewport } from "next";
import { Geist, Anton } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  title: "LEAGUE 1V1 | Prove It On The Court",
  description:
    "League 1V1 — 1-on-1 basketball with weight classes and tournament-style competition. The ultimate proving ground.",
  keywords: ["basketball", "1v1", "league", "tournament", "combat", "sports"],
  metadataBase: new URL("https://league1v1.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "LEAGUE 1V1 | Prove It On The Court",
    description:
      "1-on-1 basketball with weight classes and tournament-style competition. The ultimate proving ground.",
    siteName: "League 1V1",
    type: "website",
    locale: "en_US",
    url: "https://league1v1.vercel.app",
    images: [
      {
        url: "/league1v1.jpg",
        width: 1200,
        height: 853,
        alt: "League 1V1 - Prove It On The Court",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAGUE 1V1 | Prove It On The Court",
    description:
      "1-on-1 basketball with weight classes and tournament-style competition.",
    images: ["/league1v1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "League 1V1",
  url: "https://league1v1.vercel.app",
  description:
    "1-on-1 basketball with weight classes and tournament-style competition. The ultimate proving ground.",
  sport: "Basketball",
  logo: "https://league1v1.vercel.app/favicon.ico",
  image: "https://league1v1.vercel.app/league1v1.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  sameAs: [
    "https://www.instagram.com/league1v1/",
    "https://www.youtube.com/@Abrahamtwins",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${anton.variable} antialiased`}
      >
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
