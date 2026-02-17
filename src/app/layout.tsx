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
  title: "LEAGUE 1V1 | Where Hoops Meet Combat",
  description:
    "League 1V1 — 1-on-1 basketball with weight classes and tournament-style competition. The ultimate proving ground.",
  keywords: ["basketball", "1v1", "league", "tournament", "combat", "sports"],
  metadataBase: new URL("https://league1v1.vercel.app"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "LEAGUE 1V1 | Where Hoops Meet Combat",
    description:
      "1-on-1 basketball with weight classes and tournament-style competition. The ultimate proving ground.",
    siteName: "League 1V1",
    type: "website",
    images: [
      {
        url: "/league1v1.png",
        width: 1200,
        height: 630,
        alt: "League 1V1 - Where Hoops Meet Combat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAGUE 1V1 | Where Hoops Meet Combat",
    description:
      "1-on-1 basketball with weight classes and tournament-style competition.",
    images: ["/league1v1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${anton.variable} antialiased`}
      >
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
