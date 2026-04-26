"use client";

import { Skill as SkillType } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

type SkillProps = {
  skill: SkillType;
};

function Skill({ skill }: SkillProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-center gap-4"
    >
      <motion.div 
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-500 md:group-hover:border-blue-500/50 md:group-hover:bg-blue-500/10 md:group-hover:-translate-y-2 shadow-lg"
      >
        {skill.image && (
          <Image
            src={urlFor(skill.image).url()}
            alt={skill.title || "Skill"}
            fill
            className="object-contain p-4 sm:p-5 grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
          />
        )}
        {/* Subtle persistent shine for mobile depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
      </motion.div>
      
      <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/40 md:group-hover:text-blue-400 transition-colors duration-300 tracking-[0.2em] uppercase text-center">
        {skill.title}
      </p>
      
      {/* Progress indicator - made more visible for mobile */}
      {skill.progress !== undefined && (
        <div className="w-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="h-full bg-blue-500/60"
          />
        </div>
      )}
    </motion.div>
  );
}

export default Skill;
