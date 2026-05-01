import { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import getProjectBySlug from "@/sanity/lib/getProjectBySlug";
import getSocials from "@/sanity/lib/getSocials";
import { urlFor } from "@/sanity/lib/image";
import {
  BackToProjects,
  HeroSection,
  ContentSection,
  StructuredData,
} from "@/app/components/ProjectDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project?.title) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.seoDescription || "No description available",
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.seoDescription || "No description available",
      type: "article",
      url: `/projects/${slug}`,
      siteName: "Usama Nadeem Portfolio",
      images: project.images?.[0]
        ? [{ 
            url: urlFor(project.images[0]).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: project.title
          }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.seoDescription || "No description available",
      images: project.images?.[0] ? [urlFor(project.images[0]).width(1200).height(630).url()] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, socials] = await Promise.all([
    getProjectBySlug(slug),
    getSocials(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden scroll-smooth">
      <StructuredData project={project} slug={slug} />

      <Header socials={socials} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 sm:pt-40">
        <BackToProjects />
        <HeroSection project={project} />
        <ContentSection project={project} />
      </div>
    </main>
  );
}
