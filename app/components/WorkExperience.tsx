"use client";

import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCE_QUERYResult } from "@/sanity.types";

type Props = {
  experiences: EXPERIENCE_QUERYResult;
};
function WorkExperience({ experiences }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col min-h-screen text-center md:text-left max-w-7xl px-6 md:px-10 mx-auto justify-center items-center"
    >
      {/* Heading */}
      <h3 className="mt-20 mb-12 uppercase tracking-[12px] md:tracking-[20px] text-gray-400 text-lg md:text-2xl">
        <span className="text-[#3B82F6]">Experience</span>
      </h3>

      {/* Scrollable Experience Cards */}
      <div className="w-full flex space-x-6 overflow-x-auto pb-6 px-2 md:px-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-[#3B82F6]/70 hover:scrollbar-thumb-[#3B82F6]">
        {experiences?.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.section>
  );
}

export default WorkExperience;
