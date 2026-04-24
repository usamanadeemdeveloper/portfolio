"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectNav from "./ProjectNav";

type ProjectsProps = {
  projects: PROJECTS_QUERYResult;
};

function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Detect screen size and handle alignment
  useEffect(() => {
    const update = () => setCardsPerView(window.innerWidth >= 1024 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToProject = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;

      // Calculate card width based on current container size
      const cardWidth = container.offsetWidth / cardsPerView;

      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    },
    [cardsPerView],
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPos = container.scrollLeft;
    const cardWidth = container.offsetWidth / cardsPerView;

    // Update index based on scroll position (helps with manual swiping)
    const newIndex = Math.round(scrollPos / cardWidth);
    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < projects.length
    ) {
      setCurrentIndex(newIndex);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Logic: If at the end, go back to 0, otherwise move by 1
      const maxScrollableIndex = projects.length - cardsPerView;
      const nextIndex =
        currentIndex >= maxScrollableIndex ? 0 : currentIndex + 1;
      scrollToProject(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, projects.length, cardsPerView, isPaused, scrollToProject]);

  // Button Handlers
  const handleNext = () => {
    const maxScrollableIndex = projects.length - cardsPerView;
    const nextIndex = currentIndex >= maxScrollableIndex ? 0 : currentIndex + 1;
    scrollToProject(nextIndex);
  };

  const handlePrev = () => {
    const maxScrollableIndex = projects.length - cardsPerView;
    const prevIndex = currentIndex <= 0 ? maxScrollableIndex : currentIndex - 1;
    scrollToProject(prevIndex);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden group px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="my-5 text-center">
        <h3 className="uppercase tracking-[15px] text-blue-500/80 font-semibold text-sm md:text-xl">
          Portfolio
        </h3>
      </div>

      <div className="relative w-full pb-4">
        {/* Navigation */}
        <div className="absolute inset-y-0 w-full pointer-events-none flex items-center justify-between px-4 z-50">
          <ProjectNav onPrev={handlePrev} onNext={handleNext} />
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              cardsPerView={cardsPerView}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-full h-[30vh] -translate-y-1/2 -skew-y-6 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent -z-10 pointer-events-none" />

      <div className="flex justify-center gap-2 mt-8 mb-4 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToProject(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex
                ? "w-8 bg-blue-500"
                : "w-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
