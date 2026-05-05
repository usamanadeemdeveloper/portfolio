"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
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
  const [progressKey, setProgressKey] = useState(0);

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
      setProgressKey((k) => k + 1);
    },
    [cardsPerView],
  );

  const handleScroll = useCallback(() => {
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
  }, [currentIndex, cardsPerView, projects.length]);

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

  const handleNext = useCallback(() => {
    const maxScrollableIndex = projects.length - cardsPerView;
    scrollToProject(currentIndex >= maxScrollableIndex ? 0 : currentIndex + 1);
  }, [currentIndex, projects.length, cardsPerView, scrollToProject]);

  const handlePrev = useCallback(() => {
    const maxScrollableIndex = projects.length - cardsPerView;
    scrollToProject(currentIndex <= 0 ? maxScrollableIndex : currentIndex - 1);
  }, [currentIndex, projects.length, cardsPerView, scrollToProject]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden py-32"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="mb-24 text-center w-full px-4">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.5em] text-white/50 text-[10px] md:text-xs font-bold mb-3"
        >
          Portfolio
        </motion.p>
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

        {/* Pause only on carousel hover, not entire section */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth py-10 scrollbar-thin scrollbar-track-slate-900/20 scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/40"
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
      </div>

      {/* Pagination dots + progress */}
      <div className="flex flex-col items-center gap-4 mt-12 z-20">
        <div className="flex justify-center gap-3">
          {projects.map((project, i) => (
            <button
              key={project._id}
              onClick={() => scrollToProject(i)}
              aria-label={`Go to project ${i + 1}`}
              className="relative flex items-center justify-center"
            >
              {i === currentIndex && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full bg-blue-500/30"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <motion.div
                animate={{
                  width: i === currentIndex ? 40 : 8,
                  backgroundColor:
                    i === currentIndex
                      ? "rgb(59,130,246)"
                      : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.4 }}
                className="h-1 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Auto-scroll progress bar */}
        {!isPaused && (
          <div className="w-24 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              key={progressKey}
              className="h-full bg-blue-500/60 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
        )}

        <AnimatePresence>
          {isPaused && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold"
            >
              Paused
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default Projects;
