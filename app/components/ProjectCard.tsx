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
    <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-20 lg:p-32 h-screen">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {project.image && (
          <Image
            alt={`${project.title} screenshot`}
            src={urlFor(project.image).url()}
            className="object-contain"
            height={300}
            width={300}
          />
        )}
      </motion.div>

      <div className="space-y-6 max-w-4xl px-4 text-center">
        <h4 className="text-3xl md:text-4xl font-semibold text-white">
          <span className="underline decoration-blue-500/50 block mb-2">
            Case Study {index + 1} of {total}:
          </span>
          {project.title}
        </h4>
        <p className="text-base md:text-lg text-gray-400 whitespace-pre-line break-words">
          {project.summary}
        </p>

        <div className="flex justify-center flex-wrap gap-3 mt-4">
          {project.technologies?.filter(Boolean).map((tech) => (
            <div
              key={tech._id}
              className="flex items-center justify-center px-2 py-1 bg-gray-800 rounded-md border border-[#3B82F6]/20 shadow-sm"
            >
              {tech.image && (
                <Image
                  src={urlFor(tech.image).url()}
                  alt={`${tech.title} Logo`}
                  width={24}
                  height={24}
                  className="mr-2 rounded-full"
                />
              )}
              <span className="text-xs sm:text-sm text-gray-200">
                {tech.title}
              </span>
            </div>
          ))}
        </div>

        {project.linkToBuild && (
          <div className="mt-6">
            <a
              href={project.linkToBuild}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-[#3B82F6] text-white font-medium rounded-md hover:bg-blue-600 transition"
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
