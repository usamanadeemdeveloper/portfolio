"use client";

import { EXPERIENCE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);

type ExperienceCardProps = {
  experience: EXPERIENCE_QUERYResult[number];
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="flex flex-col items-center rounded-lg bg-[rgb(28,28,28)] p-6 sm:p-8 md:p-10 hover:opacity-100 opacity-50 cursor-pointer transition-opacity duration-300 overflow-hidden flex-shrink-0 w-full md:w-[50%] lg:w-[47%] h-[550px] sm:h-[600px] md:h-[650px] snap-center shadow-lg shadow-black/40 border border-[#3B82F6]/20">
      {/* Company Logo */}
      {experience.companyImage && (
        <MotionImage
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={urlFor(experience.companyImage).url()}
          alt="Company logo"
          width={90}
          height={90}
          className="rounded-full object-cover object-center border-2 border-[#3B82F6]/40 shadow-md"
        />
      )}

      {/* Text Content */}
      <div className="flex flex-col w-full mt-6 px-2 sm:px-6 md:px-10 h-full">
        <div className="text-center">
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-100">
            {experience.jobTitle}
          </h4>
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mt-1 text-[#3B82F6]">
            {experience.companyName}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex justify-start space-x-2 my-4 overflow-x-auto max-w-full">
          {experience.technologies?.map(
            (tech) =>
              tech.image && (
                <Image
                  key={tech._id}
                  src={urlFor(tech.image).url()}
                  alt={`${tech.title} Logo`}
                  className="rounded-full sm:w-10 sm:h-10 border border-[#3B82F6]/30 shadow-sm"
                  height={36}
                  width={36}
                />
              )
          )}
        </div>

        {/* Duration + Summary */}
        <div className="flex-1 overflow-y-auto text-left mt-4 scrollbar-thin scrollbar-thumb-[#3B82F6] scrollbar-track-gray-800 scrollbar-thumb-rounded scrollbar-track-rounded">
          <p className="uppercase py-2 text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
            {new Date(experience.dateStarted ?? "").toDateString()} -{" "}
            {experience.isCurrentlyWorkingHere
              ? "Present"
              : new Date(experience.dateEnded ?? "").toDateString()}
          </p>

          <ul className="list-disc space-y-2 sm:space-y-3 ml-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">
            {experience.points?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
