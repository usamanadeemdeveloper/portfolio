"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GetPageInfoResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type AboutProps = {
  pageInfo: GetPageInfoResult;
};

function About({ pageInfo }: AboutProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen max-w-7xl px-6 md:px-10 mx-auto flex flex-col justify-center items-center py-20"
    >
      {/* Background Subtle Glow - Rooted in Hero Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="mb-24 text-center w-full">
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.5em] text-white/30 text-[10px] md:text-xs font-bold mb-3"
        >
          About
        </motion.h3>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40"
        >
          The Story <span className="text-blue-500/80">Behind the Code</span>
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full max-w-6xl">
        {pageInfo?.profilePic && (
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[550px] flex-shrink-0 group"
          >
            {/* Multi-layered premium border/shadow */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-[2.5rem] blur-3xl opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative h-full w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl transition-all duration-500 md:group-hover:border-white/20">
              <Image
                src={urlFor(pageInfo.profilePic).url()}
                className="rounded-[2rem] object-cover relative z-10 w-full h-full grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
                alt={pageInfo.name || "Profile"}
                fill
                priority
              />
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 space-y-10"
        >
          <div className="space-y-6">
            <h4 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {pageInfo?.aboutQuote?.split("*").map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="text-blue-500/80">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </h4>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
          
          <p className="text-white/50 text-base md:text-lg leading-relaxed text-left lg:text-justify max-w-2xl font-medium">
            {pageInfo?.backgroundInformation}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-6">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-6 rounded-3xl group/stat md:hover:border-blue-500/30 transition-colors"
            >
              <p className="text-blue-500 font-bold text-3xl md:text-4xl mb-1 md:group-hover/stat:scale-110 transition-transform origin-left">
                {pageInfo?.experienceYears}
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                {pageInfo?.experienceLabel}
              </p>
            </motion.div>
            <motion.div 
              whileTap={{ scale: 0.95 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-6 rounded-3xl group/stat md:hover:border-blue-500/30 transition-colors"
            >
              <p className="text-blue-500 font-bold text-3xl md:text-4xl mb-1 md:group-hover/stat:scale-110 transition-transform origin-left">
                {pageInfo?.contributionTitle}
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                {pageInfo?.contributionLabel}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
