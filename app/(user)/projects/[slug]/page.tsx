import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { urlFor } from "@/sanity/lib/image";
import getProjectBySlug from "@/sanity/lib/getProjectBySlug";
import Header from "@/app/components/Header";
import getSocials from "@/sanity/lib/getSocials";
import MarkdownContent from "@/app/components/MarkdownContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project?.title) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.seoDescription,
    openGraph: {
      title: project.title,
      description: project.seoDescription ?? "No description available",
      images: project.images?.[0]
        ? [{ url: urlFor(project.images[0]).url() }]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.seoDescription ?? "No description available",
      images: project.images?.[0] ? [urlFor(project.images[0]).url()] : [],
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
    <main className="bg-background text-foreground min-h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth scrollbar-thin scrollbar-track-slate-900/20 scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40">
      <Header socials={socials} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 sm:pt-40">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="group flex items-center gap-2 text-white/40 hover:text-blue-400 transition-colors mb-12 w-fit"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-all">
            <ArrowLeftIcon className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Back to Work
          </span>
        </Link>

        {/* Project Header */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">
              Case Study
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gradient leading-[1.1] mb-8 tracking-tighter">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((tech) => (
              <div
                key={tech._id}
                className="bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3"
              >
                {tech.image && (
                  <div className="relative w-4 h-4">
                    <Image
                      src={urlFor(tech.image).url()}
                      alt={tech.title || ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">
                  {tech.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-12 sm:space-y-20 mb-24 sm:mb-32">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="relative w-full aspect-[16/10] sm:aspect-video rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
              >
                <Image
                  alt={`${project.title} gallery ${i + 1}`}
                  src={urlFor(img).url()}
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  fill
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            ))}
          </div>
        )}

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-16 md:gap-24">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                The Challenge & Solution
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full" />
            </div>
            <MarkdownContent content={project.summary ?? ""} />
          </div>

          <div className="lg:col-span-1 space-y-12 lg:border-l lg:border-white/5 lg:pl-12">
            {project.linkToBuild && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
                  Project Links
                </h3>
                <a
                  href={project.linkToBuild}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 px-8 py-5 rounded-2xl text-center text-white font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:bg-blue-500 shadow-2xl shadow-blue-900/40 active:scale-[0.98]"
                >
                  Visit Live Site
                </a>
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
                Project Specs
              </h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
                    Core Tech
                  </p>
                  <p className="text-white/80 font-bold tracking-tight">
                    {project.coreTech}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
                    Year
                  </p>
                  <p className="text-white/80 font-bold tracking-tight">
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mb-1">
                    Platform
                  </p>
                  <p className="text-white/80 font-bold tracking-tight">
                    {project.platform}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
