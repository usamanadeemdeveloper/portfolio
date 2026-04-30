"use client";

import { EXPERIENCE_QUERYResult } from "@/sanity.types";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

type Props = {
  experiences: EXPERIENCE_QUERYResult;
};

function WorkExperience({ experiences }: Props) {
  // Sort experiences by date (descending)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return (
      new Date(b.dateStarted ?? "").getTime() -
      new Date(a.dateStarted ?? "").getTime()
    );
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col min-h-screen max-w-7xl px-6 md:px-10 mx-auto justify-center items-center py-32 overflow-hidden"
    >
      {/* Static Blue Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="mb-24 text-center w-full px-4">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.5em] text-white/50 text-[10px] md:text-xs font-bold mb-3"
          >
            Journey
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40"
          >
            Professional <span className="text-blue-500/80">Experience</span>
          </motion.h2>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {/* Timeline line that draws down */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent origin-top hidden lg:block"
            initial={{ scaleY: 0, height: "100%" }}
            whileInView={{ scaleY: 1, height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="w-full space-y-16 flex flex-col items-center">
            {sortedExperiences.map((experience, index) => (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="w-full flex justify-center"
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default WorkExperience;
