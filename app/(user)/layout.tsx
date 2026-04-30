import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import getPageInfo from "@/sanity/lib/getPageInfo";

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getPageInfo();

  return {
    title: pageInfo?.name,
    description:
      pageInfo?.backgroundInformation?.slice(0, 160) ??
      "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    alternates: {
      canonical: pageInfo?.canonicalUrl,
    },
    openGraph: {
      title: pageInfo?.name ?? "",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
      url: pageInfo?.canonicalUrl ?? "",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageInfo?.name ?? "",
      description:
        pageInfo?.backgroundInformation?.slice(0, 160) ??
        "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
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
