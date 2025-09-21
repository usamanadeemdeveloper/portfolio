"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);

function ExperienceCard() {
  return (
    <article
      className="
        flex flex-col items-center rounded-lg 
        bg-[rgb(28,28,28)] p-6 sm:p-8 md:p-10 
        hover:opacity-100 opacity-50 cursor-pointer transition-opacity duration-300 
        overflow-hidden flex-shrink-0 
        w-full md:w-[50%] lg:w-[47%] 
        snap-center shadow-lg shadow-black/40 border border-[#3B82F6]/20
      "
    >
      {/* Company Logo */}
      <MotionImage
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src="https://media.licdn.com/dms/image/v2/D4E0BAQF6anYWQL3vnA/company-logo_200_200/B4EZVGZGpVHgAI-/0/1740642742988/treesols_logo?e=1761177600&v=beta&t=ivPDB0W7O3uh7H_9EyRFru2GcvSM5PzOJvu230UwKFo"
        alt="Company logo"
        width={160}
        height={160}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full object-cover object-center border-2 border-[#3B82F6]/40 shadow-md"
      />

      {/* Text Content */}
      <div className="w-full px-2 sm:px-6 md:px-10 text-center mt-6">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-100">
          Sr. Software Engineer
        </h4>
        <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mt-1 text-[#3B82F6]">
          True Refined Solution
        </p>

        {/* Tech Stack */}
        <div className="flex justify-center space-x-2 my-4">
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            className="rounded-full sm:w-10 sm:h-10 border border-[#3B82F6]/30 shadow-sm"
            alt="JavaScript"
            unoptimized
            height={36}
            width={36}
          />

          {/* Add more tech icons */}
        </div>

        {/* Duration + Summary */}
        <div className="text-left mt-4">
          <p className="uppercase text-gray-400 text-xs sm:text-sm md:text-base py-2 tracking-wide">
            Started work… – Ended…
          </p>

          <ul className="list-disc space-y-2 sm:space-y-3 ml-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">
            <li>
              Spearheaded{" "}
              <span className="text-[#3B82F6]">scalable architecture</span> for
              core platform features.
            </li>
            <li>
              Optimized <span className="text-[#3B82F6]">database queries</span>{" "}
              improving performance by 40%.
            </li>
            <li>
              Mentored juniors on{" "}
              <span className="text-[#3B82F6]">best coding practices</span>.
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
