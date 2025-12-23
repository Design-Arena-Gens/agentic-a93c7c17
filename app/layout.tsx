import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter, Bebas_Neue } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Daily Horror SEO Intelligence",
  description: "Fresh USA horror niche YouTube SEO insights with viral keywords, titles, and metadata designed for growth.",
  keywords: [
    "horror stories",
    "true horror",
    "youtube seo",
    "viral keywords",
    "paranormal",
    "usa horror trends"
  ],
  authors: [{ name: "Horror SEO Agency" }],
  openGraph: {
    title: "Daily Horror SEO Intelligence",
    description: "Daily viral keyword vault for USA horror storytellers on YouTube and Shorts.",
    url: "https://agentic-a93c7c17.vercel.app",
    siteName: "Horror SEO Daily",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Horror SEO Intelligence",
    description: "Unlock viral USA horror keywords, titles, and tags for YouTube.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-midnight text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
