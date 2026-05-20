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
  title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
  description:
    "Teamcenter PLM consultant specializing in Active Workspace customization, BMIDE configuration, and workflow development for mission-critical U.S. defense programs. ASEP & CompTIA Security+ certified.",
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
  ],
  authors: [{ name: "Sam Nicklaus" }],
  openGraph: {
    title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
    description:
      "Teamcenter PLM consultant specializing in Active Workspace, BMIDE, and defense-grade system implementation.",
    url: "https://https://samuel-nicklaus.vercel.app",
    siteName: "Sam Nicklaus Portfolio",
    type: "website",
    images: [
      {
        url: "https://samuel-nicklaus.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sam Nicklaus — PLM Consultant & Defense Systems Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Nicklaus | PLM Consultant & Defense Systems Specialist",
    description:
      "Teamcenter PLM consultant specializing in Active Workspace, BMIDE, and defense-grade system implementation.",
    images: ["https://samuel-nicklaus.vercel.app/og-image.png"],
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
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics /> 
      </body>
    </html>
  );
}