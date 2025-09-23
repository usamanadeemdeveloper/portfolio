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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      initial={
        isMobile
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: directionLeft ? -200 : 200 }
      }
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
    >
      <div className="relative w-[80px] sm:w-[100px] md:w-[120px] xl:w-[140px] aspect-square mx-auto min-w-[80px] min-h-[80px]">
        {skill.image && (
          <Image
            src={urlFor(skill.image).url()}
            alt={`${skill.title} Logo`}
            fill
            className="rounded-full border border-gray-500 object-cover transition duration-300 ease-in-out group-hover:grayscale"
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition duration-300 ease-in-out group-hover:opacity-90 group-hover:bg-white">
          <p className="text-xs sm:text-sm md:text-lg font-bold text-black">
            {skill.progress}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Skill;
