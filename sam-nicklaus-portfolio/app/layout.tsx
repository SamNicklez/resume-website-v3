import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.samnicklaus.com'),
  title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
  description:
    "Teamcenter PLM consultant specializing in Active Workspace customization, BMIDE configuration, and workflow development for mission-critical U.S. defense programs.",
  keywords: [
    "Teamcenter PLM",
    "Active Workspace",
    "BMIDE",
    "PLM Consultant",
    "Siemens Teamcenter",
    "Defense Systems Engineer",
    "Digital Thread",
    "MBSE",
    "Systems Engineering",
    "Sam Nicklaus",
    "Siemens Government Technologies",
    "CompTIA Security+",
    "ASEP",
    "Blog"
  ],
  authors: [{ name: "Sam Nicklaus" }],
  alternates: {
    canonical: 'https://www.samnicklaus.com',
  },
  openGraph: {
    title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
    description:
      "Teamcenter PLM consultant specializing in Active Workspace, BMIDE, and defense-grade system implementation.",
    url: "https://www.samnicklaus.com",
    siteName: "Sam Nicklaus Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
    description:
      "Teamcenter PLM consultant specializing in Active Workspace, BMIDE, and defense-grade system implementation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">

        {/* ── Global Person Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sam Nicklaus',
              url: 'https://www.samnicklaus.com',
              jobTitle: 'Software Implementation Consultant',
              worksFor: {
                '@type': 'Organization',
                name: 'Siemens Government Technologies',
              },
              sameAs: [
                'https://www.linkedin.com/in/sam-nicklaus/',
              ],
              knowsAbout: [
                'Teamcenter PLM',
                'Active Workspace',
                'BMIDE',
                'Systems Engineering',
                'MBSE',
              ],
            }),
          }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}