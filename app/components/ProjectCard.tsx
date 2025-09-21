"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  index: number;
  total: number;
  title: string;
  description: string;
  imageUrl: string;
}

function ProjectCard({
  index,
  total,
  title,
  description,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-20 lg:p-32 h-screen">
      {/* Image */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Image
          src={imageUrl}
          alt={`${title} screenshot`}
          width={300}
          height={300}
          className="max-h-40 md:max-h-60 object-contain"
        />
      </motion.div>

      {/* Text */}
      <div className="space-y-8 max-w-4xl px-4 text-center">
        <h4 className="text-3xl md:text-4xl font-semibold text-white">
          <span className="underline decoration-blue-500/50 block mb-2">
            Case Study {index + 1} of {total}:
          </span>
          {title}
        </h4>
        <p className="text-base md:text-lg text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
