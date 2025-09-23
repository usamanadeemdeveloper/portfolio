"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

type ProjectCardProps = {
  project: PROJECTS_QUERYResult[number];
  index: number;
  total: number;
};

function ProjectCard({ project, index, total }: ProjectCardProps) {
  return (
    <div className="w-full flex-shrink-0 snap-center flex flex-col items-center justify-start p-6 sm:p-10 md:p-16 lg:p-20 min-h-[80vh] md:min-h-screen">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto flex justify-center"
      >
        {project.image && (
          <Image
            alt={`${project.title} screenshot`}
            src={urlFor(project.image).url()}
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        )}
      </motion.div>

      <div className="mt-6 sm:mt-10 w-full max-w-3xl px-4 text-center space-y-5 sm:space-y-6">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          <span className="block underline decoration-blue-500/50 mb-2">
            Case Study {index + 1} of {total}:
          </span>
          {project.title}
        </h4>

        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line break-words">
          {project.summary}
        </p>

        <div className="mt-4 w-full flex flex-wrap justify-center gap-3">
          {project.technologies?.filter(Boolean).map((tech) => (
            <div
              key={tech._id}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg border border-blue-500/20 shadow-sm hover:bg-gray-700 transition"
            >
              {tech.image && (
                <Image
                  src={urlFor(tech.image).url()}
                  alt={`${tech.title} Logo`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-xs sm:text-sm text-gray-200 font-medium">
                {tech.title}
              </span>
            </div>
          ))}
        </div>

        {project.linkToBuild && (
          <div className="mt-6 text-center">
            <a
              href={project.linkToBuild}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live project: ${project.title}`}
              className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-md"
            >
              View Live Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
