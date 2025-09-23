"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectNav from "./ProjectNav";
import { PROJECTS_QUERYResult } from "@/sanity.types";

type ProjectsProps = {
  projects: PROJECTS_QUERYResult;
};

function Projects({ projects }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToProject = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;

    container.scrollTo({ left: width * index, behavior: "smooth" });
    setCurrentIndex(index);
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % projects.length;
        scrollToProject(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollToProject((currentIndex - 1 + projects.length) % projects.length);
      }
      if (e.key === "ArrowRight") {
        scrollToProject((currentIndex + 1) % projects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, projects.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col items-center justify-center w-full min-h-screen text-center overflow-hidden"
    >
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[15px] text-blue-400 text-xl md:text-2xl">
        Projects
      </h3>

      <div className="mt-[6rem] md:mt-[7rem] w-full">
        <div
          ref={scrollRef}
          className="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-gray-700/20 scrollbar-thumb-blue-500/80"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
        <ProjectNav
          onPrev={() =>
            scrollToProject(
              (currentIndex - 1 + projects.length) % projects.length
            )
          }
          onNext={() => scrollToProject((currentIndex + 1) % projects.length)}
        />
      </div>

      {/* Background accent strip */}
      <div className="absolute top-1/4 left-0 w-full h-[400px] -skew-y-12 bg-blue-500/10" />
    </motion.div>
  );
}

export default Projects;
