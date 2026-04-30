"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { isGif, urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  project: PROJECTS_QUERYResult[number];
  cardsPerView: number;
  index: number;
};

function ProjectCard({ project, index, cardsPerView }: ProjectCardProps) {
  const firstImage = project.images?.[0];
  const imageUrl = firstImage ? urlFor(firstImage).url() : null;
  const isGifImage = imageUrl ? isGif(imageUrl) : false;

  const caseStudyHref = project.slug?.current
    ? `/projects/${project.slug.current}`
    : null;

  return (
    <div
      className={`w-full ${
        cardsPerView === 2 ? "lg:w-1/2" : "w-full"
      } flex-shrink-0 snap-start flex justify-center p-5 sm:p-8 lg:p-10`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative w-full h-full max-w-2xl"
      >
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-[2rem] blur-xl opacity-40 md:opacity-0 md:group-hover:opacity-100 transition duration-1000" />

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 relative flex flex-col h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-500 md:hover:border-white/20 shadow-2xl">
          {/* IMAGE — clicking image navigates to case study */}
          {imageUrl && (
            <Link
              href={caseStudyHref || "#"}
              className={`block ${!caseStudyHref && "pointer-events-none cursor-not-allowed"}`}
              tabIndex={!caseStudyHref ? -1 : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="relative w-full aspect-video overflow-hidden p-4 pb-0"
              >
                <div className="relative w-full h-full rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden border border-white/5">
                  <Image
                    alt={project.title || "Project preview"}
                    src={imageUrl}
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-110"
                    unoptimized={isGifImage}
                    fill
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />

                  {/* Glass Badge */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] text-white font-bold uppercase tracking-widest">
                      Case Study
                    </p>
                  </div>

                  {/* Mobile Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 md:hidden">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">
                      Project #{index + 1}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col flex-1">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">
                #{index + 1} Selected Works
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <h3 className="hidden md:block text-3xl sm:text-4xl font-bold text-white mb-4 md:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-white/40 text-sm sm:text-base leading-relaxed mb-8 line-clamp-2 font-medium">
              {project.summary}
            </p>

            {/* TECH */}
            {/* TECH */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="flex flex-wrap gap-2 mb-8 sm:mb-10"
            >
              {project.technologies
                ?.filter(Boolean)
                .slice(0, 4)
                .map((tech) => (
                  <motion.div
                    key={tech._id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.04,
                      borderColor: "rgba(255,255,255,0.15)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white/[0.03] backdrop-blur-md border border-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300"
                  >
                    {tech.image && (
                      <motion.div
                        initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="relative w-3 h-3 sm:w-3.5 sm:h-3.5"
                      >
                        <Image
                          src={urlFor(tech.image).url()}
                          alt={tech.title || ""}
                          fill
                          className="object-contain opacity-60"
                        />
                      </motion.div>
                    )}

                    <span className="text-[9px] sm:text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      {tech.title}
                    </span>
                  </motion.div>
                ))}
            </motion.div>

            {/* ACTIONS */}
            <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
              {caseStudyHref && (
                <Link
                  href={caseStudyHref}
                  className="flex items-center gap-2 group/btn w-fit"
                >
                  <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-1.5 md:group-hover:text-blue-400 md:group-hover:border-blue-400 transition-all duration-300">
                    View Full Case Study
                  </span>
                  <svg
                    className="w-4 h-4 text-white/40 group-hover:translate-x-1 group-hover:text-blue-400 transition-all duration-300 -mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}

              {/* LIVE PREVIEW */}
              {project.linkToBuild && (
                <motion.a
                  href={project.linkToBuild}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600/20 backdrop-blur-md border border-blue-500/20 px-6 py-3 sm:px-8 sm:py-3 md:group-hover:bg-blue-600 text-white text-xs font-bold rounded-xl sm:rounded-2xl transition-all duration-500 shadow-xl shadow-blue-900/10 tracking-widest uppercase text-center"
                >
                  Live Preview
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectCard;
