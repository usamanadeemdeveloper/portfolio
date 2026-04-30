import getPageInfo from "@/sanity/lib/getPageInfo";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { urlFor } from "@/sanity/lib/image";
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
  const baseImage = pageInfo?.heroImage || pageInfo?.profilePic;
  const ogImageUrl = baseImage ? urlFor(baseImage).width(1200).height(630).url() : "";
  const siteUrl = "https://usamanadeem.vercel.app";

  return {
    title: {
      template: `%s | ${pageInfo?.name || "Portfolio"}`,
      default: pageInfo?.name || "Portfolio",
    },
    description:
      pageInfo?.backgroundInformation?.slice(0, 160) ??
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
    openGraph: {
      title: pageInfo?.name || "Portfolio",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      url: "/",
      type: "website",
      siteName: pageInfo?.name,
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: pageInfo?.name || "Portfolio",
      }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo?.name || "Portfolio",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      images: ogImageUrl ? [ogImageUrl] : [],
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
