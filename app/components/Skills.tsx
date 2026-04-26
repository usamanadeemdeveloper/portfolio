"use client";

import { GetSkillsResult } from "@/sanity.types";
import { motion } from "framer-motion";
import Skill from "./Skill";

type SkillsProps = {
  skills: GetSkillsResult;
};

function Skills({ skills }: SkillsProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative min-h-screen max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-center py-32 overflow-hidden"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="mb-24 text-center w-full">
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.5em] text-white/30 text-[10px] md:text-xs font-bold mb-3"
        >
          Expertise
        </motion.h3>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40"
        >
          Technical <span className="text-blue-500/80">Toolkit</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-16 sm:gap-x-12 sm:gap-y-20 w-full max-w-6xl">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <Skill skill={skill} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Skills;
