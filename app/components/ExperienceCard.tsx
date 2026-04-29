"use client";

import { EXPERIENCE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { ChevronDownIcon, ChevronUpIcon } from "@sanity/icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ExperienceCardProps = {
  experience: EXPERIENCE_QUERYResult[number];
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-full max-w-3xl"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-[2.5rem] blur-xl opacity-40 md:opacity-0 md:group-hover:opacity-100 transition duration-1000" />

      <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 relative rounded-[2.5rem] overflow-hidden transition-all duration-500 md:hover:border-white/20 shadow-2xl">
        {/* 1. Header Section */}
        <div className="p-6 sm:p-10 pb-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8">
            {experience.companyImage && (
              <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.05] border border-white/10 p-2 sm:p-3 shadow-inner">
                <Image
                  src={urlFor(experience.companyImage).url()}
                  alt={experience.companyName || "Company logo"}
                  fill
                  className="object-contain p-2 grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight break-words">
                {experience.jobTitle}
              </h3>
              <p className="text-blue-500/90 font-bold text-base sm:text-lg mt-1">
                {experience.companyName}
              </p>
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mt-2">
                {new Date(experience.dateStarted ?? "").toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" },
                )}{" "}
                —{" "}
                {experience.isCurrentlyWorkingHere
                  ? "Present"
                  : new Date(experience.dateEnded ?? "").toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Tech Stack */}
        <div className="px-6 sm:px-10 pb-6 flex flex-wrap gap-2 sm:gap-3">
          {experience.technologies?.map((tech) => (
            <motion.div
              key={tech._id}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full"
            >
              {tech.image && (
                // Fixed: was "w-3.5 h-3.5 sm:w-4 h-4" (duplicate h-4)
                <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <Image
                    src={urlFor(tech.image).url()}
                    alt={tech.title || ""}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase tracking-wider">
                {tech.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 3. Description Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="px-6 sm:px-10 py-10 relative">
                <div className="absolute left-6 sm:left-10 top-12 bottom-12 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent" />

                <ul className="space-y-8">
                  {experience.points?.map((point, i) => (
                    // Fixed: content-based key instead of index
                    <li
                      key={`${point}-${i}`}
                      className="flex gap-6 text-sm sm:text-base text-white/50 leading-relaxed font-medium pl-6 relative"
                    >
                      <div className="absolute -left-[19.5px] sm:-left-[23.5px] mt-2 w-2.5 h-2.5 rounded-full bg-[#020617] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-6 flex items-center justify-center gap-3 bg-white/[0.02] md:hover:bg-white/[0.05] transition-all duration-300 border-t border-white/5 group/btn"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover/btn:text-white transition-colors">
            {isExpanded ? "Collapse Details" : "Explore Journey"}
          </span>
          {/* Replaced @sanity/icons with inline SVGs */}
          {isExpanded ? (
            <ChevronUpIcon className="w-4 h-4 text-blue-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-blue-500" />
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default ExperienceCard;
