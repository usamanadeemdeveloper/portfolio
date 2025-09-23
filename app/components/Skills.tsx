"use client";

import { motion } from "framer-motion";
import Skill from "./Skill";
import { GetSkillsResult } from "@/sanity.types";

type SkillsProps = {
  skills: GetSkillsResult;
};

function Skills({ skills }: SkillsProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col min-h-screen text-center md:text-left xl:flex-row max-w-7xl px-6 md:px-10 mx-auto justify-center items-center"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[12px] md:tracking-[20px] text-gray-500 text-lg md:text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-32 md:top-36 uppercase tracking-[2px] md:tracking-[3px] text-gray-500 text-xs md:text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center items-center mt-40">
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
