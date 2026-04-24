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
      className="min-h-screen max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-center text-center md:text-left"
    >
      <div className="mb-12 text-center">
        <h3 className="uppercase tracking-[12px] md:tracking-[20px] text-gray-500 text-lg md:text-2xl">
          Skills
        </h3>

        <p className="mt-4 uppercase tracking-[2px] md:tracking-[3px] text-gray-500 text-xs md:text-sm">
          Hover over a skill for current proficiency
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center items-center">
        {skills.map((skill, index) => (
          <Skill
            key={skill._id}
            skill={skill}
            directionLeft={index % 2 === 0}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default Skills;
