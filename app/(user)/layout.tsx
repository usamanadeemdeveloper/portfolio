import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import getPageInfo from "@/sanity/lib/getPageInfo";

export async function generateMetadata(): Promise<Metadata> {
  const pageInfo = await getPageInfo();

  return {
    title: pageInfo?.name,
    description: pageInfo?.backgroundInformation,
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      canonical: pageInfo?.canonicalUrl,
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
