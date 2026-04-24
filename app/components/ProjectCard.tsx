"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { isGif, urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

type ProjectCardProps = {
  project: PROJECTS_QUERYResult[number];
  cardsPerView: number;
  index: number;
  total: number;
};

function ProjectCard({
  project,
  index,
  total,
  cardsPerView,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const firstImage = project.images?.[0];
  const imageUrl = firstImage ? urlFor(firstImage).url() : null;
  const isGifImage = imageUrl ? isGif(imageUrl) : false;

  return (
    <>
      <div
        className={`w-full ${
          cardsPerView === 2 ? "lg:w-1/2" : "w-full"
        } flex-shrink-0 snap-start flex justify-center p-3 sm:p-6 lg:p-8`}
      >
        {/* Card */}
        <div className="w-full max-w-2xl h-auto flex flex-col bg-black/20 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          {/* Preview Image */}
          {imageUrl && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Image
                alt={`${project.title} preview`}
                src={imageUrl}
                className="object-cover"
                unoptimized={isGifImage}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">
              Case study {index + 1} / {total}
            </span>

            {project.linkToBuild && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Live
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white mb-3 underline decoration-blue-500/40 underline-offset-4">
            {project.title}
          </h4>

          {/* Summary preview */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3">
            {project.summary?.slice(0, 110)}...
          </p>

          {/* Read More */}
          <button
            onClick={() => setOpen(true)}
            className="text-blue-400 text-xs hover:underline mb-5 w-fit"
          >
            View full case study →
          </button>

          {/* Tech Stack */}
          {project.technologies &&
            project.technologies.filter(Boolean).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 max-h-[140px] sm:max-h-[110px] overflow-hidden">
                {project.technologies.filter(Boolean).map((tech) => (
                  <div
                    key={tech._id}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 hover:bg-blue-500/20 transition"
                  >
                    {tech.image && (
                      <Image
                        src={urlFor(tech.image).url()}
                        alt={`${tech.title} logo`}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-xs text-blue-200 font-medium">
                      {tech.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

          {/* CTA */}
          {project.linkToBuild && (
            <div className="mt-auto border-t border-blue-500/10 pt-5">
              <a
                href={project.linkToBuild}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition"
              >
                View Live Project →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ProjectDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        project={project}
      />
    </>
  );
}

export default ProjectCard;
