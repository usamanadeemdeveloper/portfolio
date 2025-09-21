import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";


export const metadata: Metadata = {
  title: "Usama Nadeem",
  description: "Personal website of Usama Nadeem",
  icons: {
    icon: "/favicon.ico",
  },
};

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
