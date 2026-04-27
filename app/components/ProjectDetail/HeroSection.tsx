"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
};

export default function HeroSection({ project }: Props) {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">
            Case Study
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold mb-6">{project.title}</h1>

        <p className="text-white/60 max-w-3xl mb-10 leading-relaxed text-lg">
          {project.seoDescription || "No description available"}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.technologies?.map((tech, i: number) => (
            <motion.div
              key={tech?._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
              className="bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full flex items-center gap-3"
            >
              {tech?.image && (
                <div className="relative w-4 h-4">
                  <Image
                    src={urlFor(tech.image).url()}
                    alt={tech.title || "Technology"}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">
                {tech?.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
