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
      const maxScrollableIndex = projects.length - cardsPerView;
      const nextIndex =
        currentIndex >= maxScrollableIndex ? 0 : currentIndex + 1;
      scrollToProject(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, projects.length, cardsPerView, isPaused, scrollToProject]);

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
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="mb-24 text-center w-full px-4">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.5em] text-white/30 text-[10px] md:text-xs font-bold mb-3"
        >
          Portfolio
        </motion.h3>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40"
        >
          Selected <span className="text-blue-500/80">Case Studies</span>
        </motion.h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-10">
        <ProjectNav onPrev={handlePrev} onNext={handleNext} />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar py-10"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              cardsPerView={cardsPerView}
              index={i}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-12 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToProject(i)}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              i === currentIndex
                ? "w-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                : "w-2 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
