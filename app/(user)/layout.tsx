import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import getPageInfo from "@/sanity/lib/getPageInfo";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getPageInfo();
  const baseImage = pageInfo?.heroImage || pageInfo?.profilePic;
  const ogImageUrl = baseImage ? urlFor(baseImage).width(1200).height(630).url() : "";
  const siteUrl = "https://usamanadeem.vercel.app";

  return {
    title: pageInfo?.name,
    description:
      pageInfo?.backgroundInformation?.slice(0, 160) ??
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
    openGraph: {
      title: pageInfo?.name ?? "",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      url: "/",
      type: "website",
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: pageInfo?.name || "Portfolio",
      }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo?.name ?? "",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <SanityLive />
    </>
  );
}
