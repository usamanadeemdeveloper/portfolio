"use client";

import { Skill as SkillType } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

type SkillProps = {
  directionLeft?: boolean;
  skill: SkillType;
};

function Skill({ skill, directionLeft }: SkillProps) {
  return (
    <motion.div
      initial={{ x: directionLeft ? -200 : 200, opacity: 0 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative flex cursor-pointer"
    >
      {/* Icon container */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28">
        {skill.image && (
          <Image
            className="rounded-full border border-gray-500 object-cover transition duration-300 ease-in-out group-hover:grayscale z-0"
            src={urlFor(skill.image).url()}
            sizes="(max-width: 768px) 100vw, 200px"
            alt={`${skill.title} Logo`}
            fill
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-90 group-hover:bg-white z-10">
          <p className="text-xs sm:text-sm md:text-lg font-bold text-black">
            {skill.progress}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Skill;
