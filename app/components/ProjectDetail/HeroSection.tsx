"use client";

import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";

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
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="flex flex-wrap gap-3"
          >
            {project.technologies?.map((tech) => (
              <motion.div
                key={tech?._id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 15,
                    scale: 0.9,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 cursor-pointer backdrop-blur-md transition-all"
              >
                {tech?.image && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-4 h-4"
                  >
                    <Image
                      src={urlFor(tech.image).url()}
                      alt={tech.title || "Technology"}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                )}

                <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">
                  {tech?.title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
