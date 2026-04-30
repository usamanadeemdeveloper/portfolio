"use client";

import { Skill as SkillType } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type SkillProps = {
  skill: SkillType;
};

function Skill({ skill }: SkillProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [45, -45]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-45, 45]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="group relative flex flex-col items-center gap-4">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 150 }}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg cursor-default transition-colors duration-500 group-hover:border-blue-500/50 group-hover:bg-blue-500/10"
        >
          {/* Radial glow — CSS hover driven, always visible on hover */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 70%)",
            }}
          />

          {skill.image && (
            <Image
              src={urlFor(skill.image).url()}
              alt={skill.title || "Skill"}
              fill
              className="object-contain p-4 sm:p-5 grayscale md:group-hover:grayscale-0 transition-all duration-700 relative z-10"
            />
          )}

          {/* Shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
        </motion.div>
      </div>

      <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/40 group-hover:text-blue-400 transition-colors duration-300 tracking-[0.2em] uppercase text-center">
        {skill.title}
      </p>

      {/* Progress indicator - made more visible for mobile */}
      {skill.progress !== undefined && (
        <div className="w-full max-w-[4rem] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default Skill;
