import getPageInfo from "@/sanity/lib/getPageInfo";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RegisterSW from "./register-sw";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getPageInfo();

  return {
    title: {
      template: `%s | ${pageInfo?.name || "Portfolio"}`,
      default: pageInfo?.name || "Portfolio",
    },
    description:
      pageInfo?.backgroundInformation?.slice(0, 160) ??
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: pageInfo?.canonicalUrl,
    },
    openGraph: {
      title: pageInfo?.name || "Portfolio",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      url: pageInfo?.canonicalUrl ?? "",
      type: "website",
      siteName: pageInfo?.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo?.name || "Portfolio",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    },
    // Modern way to handle preconnects in Next.js Metadata
    other: {
      "preconnect": [
        "https://media.licdn.com",
        "https://cdn.jsdelivr.net",
        "https://avatars.githubusercontent.com",
        "https://raw.githubusercontent.com",
        "https://picsum.photos"
      ]
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-background scroll-smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
