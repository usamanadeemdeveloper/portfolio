"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GetPageInfoResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

const MotionImage = motion.create(Image);

type AboutProps = {
  pageInfo: GetPageInfoResult;
};

function About({ pageInfo }: AboutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen max-w-7xl px-6 md:px-10 mx-auto flex flex-col text-center rounded-2xl shadow-lg shadow-black/40"
    >
      {/* Heading */}
      <h3 className="mt-20 mb-16 uppercase tracking-[12px] text-gray-400 text-lg md:text-2xl">
        <span className="text-[#3B82F6]">About</span>
      </h3>

      {/* Image + Text */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:text-left">
        {/* Profile Image */}
        {pageInfo?.profilePic && (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-96 xl:w-[370px] xl:h-[470px] mb-8 md:mb-0 flex-shrink-0">
            <MotionImage
              src={urlFor(pageInfo.profilePic).url()}
              className="rounded-full md:rounded-lg object-cover shadow-xl shadow-black/50 border-2 border-[#3B82F6]/40"
              initial={{ x: -200, opacity: 0, scale: 0.9 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              sizes="(max-width: 768px) 100vw, 200px"
              alt="Profile picture of Usama Nadeem"
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              fill
            />
          </div>
        )}

        {/* Text Section */}
        <div className="space-y-6 md:space-y-10 px-2 md:px-10">
          <h4 className="text-2xl md:text-3xl font-semibold text-gray-200">
            Here is a{" "}
            <span className="underline decoration-[#3B82F6]/60">little</span>{" "}
            background
          </h4>
          <p className="text-sm lg:text-base leading-relaxed break-words text-gray-300 text-left md:text-justify">
            {pageInfo?.backgroundInformation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
