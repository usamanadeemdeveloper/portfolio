"use client";

import { useState, useRef, useEffect } from "react";
import { EXPERIENCE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownIcon } from "@sanity/icons";

const MotionImage = motion.create(Image);

type ExperienceCardProps = {
  experience: EXPERIENCE_QUERYResult[number];
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const canScroll = el.scrollHeight > el.clientHeight;
      if (!canScroll) {
        setShowHint(false);
        return;
      }

      setShowHint(el.scrollTop < 10);
    };

    handleScroll();

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="flex flex-col items-center rounded-lg bg-[rgb(28,28,28)] p-6 sm:p-8 md:p-10 hover:opacity-100 opacity-50 cursor-pointer transition-opacity duration-300 overflow-hidden flex-shrink-0 w-full md:w-[50%] lg:w-[47%] h-[550px] sm:h-[600px] md:h-[650px] snap-center shadow-lg shadow-black/40 border border-[#3B82F6]/20">
      {experience.companyImage && (
        <MotionImage
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 1.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={urlFor(experience.companyImage).url()}
          alt="Company logo"
          width={90}
          height={90}
          className="rounded-full object-cover object-center border-2 border-[#3B82F6]/40 shadow-md"
        />
      )}

      <div className="flex flex-col w-full mt-6 px-2 sm:px-6 md:px-10 flex-1 min-h-0">
        <div className="text-center flex-shrink-0">
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-100">
            {experience.jobTitle}
          </h4>
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mt-1 text-[#3B82F6]">
            {experience.companyName}
          </p>
        </div>

        <div className="flex justify-start space-x-2 my-4 overflow-x-auto max-w-full flex-shrink-0">
          {experience.technologies?.map(
            (tech) =>
              tech.image && (
                <Image
                  key={tech._id}
                  src={urlFor(tech.image).url()}
                  alt={`${tech.title} Logo`}
                  className="rounded-full sm:w-10 sm:h-10 border border-[#3B82F6]/30 shadow-sm"
                  height={36}
                  width={36}
                />
              )
          )}
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="relative flex-1 min-h-0 overflow-y-auto text-left mt-4 scrollbar-thin scrollbar-thumb-[#3B82F6] scrollbar-track-gray-800 scrollbar-thumb-rounded scrollbar-track-rounded"
        >
          <p className="uppercase py-2 text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
            {new Date(experience.dateStarted ?? "").toDateString()} -{" "}
            {experience.isCurrentlyWorkingHere
              ? "Present"
              : new Date(experience.dateEnded ?? "").toDateString()}
          </p>

          <ul className="list-disc space-y-2 sm:space-y-3 ml-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">
            {experience.points?.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Scroll hint arrow + tooltip */}
          {showHint && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce group">
              <ArrowDownIcon className="w-12 h-12 rounded-full bg-gray-800 text-[#3B82F6] p-3 cursor-pointer hover:bg-gray-700 transition" />
              {/* Tooltip */}
              <span
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-xs text-white bg-gray-900 
                 opacity-0 group-hover:opacity-100 transition whitespace-nowrap"
              >
                Scroll to see more
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
